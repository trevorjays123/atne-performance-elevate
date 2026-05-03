import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/site/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, Mail, Phone, Search, Inbox, Trash2 } from "lucide-react";
import logo from "@/assets/atne-logo.png";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  message: string;
  created_at: string;
}

const INTERESTS = ["1-on-1 Coaching", "Group Workshops", "Relief Therapy", "Other"];

const AdminLeads = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [rows, setRows] = useState<Submission[]>([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [interest, setInterest] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) {
        navigate("/auth", { replace: true });
        return;
      }
      const { data: roleRow } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", sess.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (cancelled) return;
      if (!roleRow) {
        setAuthorized(false);
        setLoading(false);
        return;
      }
      setAuthorized(true);
      await fetchRows();
      setLoading(false);
    };
    init();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (!s) navigate("/auth", { replace: true });
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchRows = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("id,name,email,phone,interest,message,created_at")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) {
      toast({ title: "Couldn't load submissions", description: error.message, variant: "destructive" });
      return;
    }
    setRows((data ?? []) as Submission[]);
  };

  const filtered = useMemo(() => {
    const fromTs = from ? new Date(from).getTime() : null;
    const toTs = to ? new Date(to).getTime() + 24 * 60 * 60 * 1000 - 1 : null;
    const q = search.trim().toLowerCase();
    return rows.filter((r) => {
      const t = new Date(r.created_at).getTime();
      if (fromTs && t < fromTs) return false;
      if (toTs && t > toTs) return false;
      if (interest !== "all" && (r.interest || "Other") !== interest) return false;
      if (q && ![r.name, r.email, r.message, r.phone || "", r.interest || ""].join(" ").toLowerCase().includes(q)) return false;
      return true;
    });
  }, [rows, from, to, interest, search]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth", { replace: true });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this submission permanently?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) {
      toast({ title: "Delete failed", description: error.message, variant: "destructive" });
      return;
    }
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </main>
    );
  }

  if (!authorized) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <SEO title="Admin — ATNE Performance" description="Restricted." canonical="/admin/leads" />
        <div className="glass rounded-3xl p-8 max-w-md text-center shadow-[var(--shadow-elegant)]">
          <h1 className="font-display text-2xl text-primary">Access Restricted</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account isn't authorized for the admin dashboard. Ask an existing admin to grant you the
            <span className="font-medium text-primary"> admin</span> role in the backend.
          </p>
          <Button variant="outline" className="mt-6" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--gradient-mist)]">
      <SEO title="Leads — ATNE Performance Admin" description="Manage incoming contact submissions." canonical="/admin/leads" />
      <header className="border-b border-border bg-card/60 backdrop-blur sticky top-0 z-20">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ATNE" width={32} height={32} className="h-8 w-8" />
            <div>
              <div className="font-display text-primary font-semibold">Lead Inbox</div>
              <div className="text-xs text-muted-foreground">{filtered.length} of {rows.length} submissions</div>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-6 py-8 space-y-6">
        <div className="glass rounded-3xl p-5 md:p-6 grid gap-4 md:grid-cols-4">
          <div className="space-y-1.5">
            <Label htmlFor="from">From</Label>
            <Input id="from" type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="to">To</Label>
            <Input id="to" type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="interest">Interest</Label>
            <select
              id="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              {INTERESTS.map((i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="search" className="pl-9" placeholder="Name, email, message…" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <Inbox className="h-10 w-10 text-muted-foreground mx-auto" />
            <p className="mt-3 text-muted-foreground">No submissions match your filters.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {filtered.map((r) => (
              <li key={r.id} className="glass rounded-2xl p-5 md:p-6 shadow-[var(--shadow-glass)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-display text-lg text-primary">{r.name}</h3>
                      {r.interest && <Badge variant="secondary">{r.interest}</Badge>}
                    </div>
                    <div className="mt-1 flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <a href={`mailto:${r.email}`} className="flex items-center gap-1 hover:text-accent">
                        <Mail className="h-3 w-3" /> {r.email}
                      </a>
                      {r.phone && (
                        <a href={`tel:${r.phone}`} className="flex items-center gap-1 hover:text-accent">
                          <Phone className="h-3 w-3" /> {r.phone}
                        </a>
                      )}
                      <span>{new Date(r.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(r.id)} className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="mt-4 text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">{r.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
};

export default AdminLeads;