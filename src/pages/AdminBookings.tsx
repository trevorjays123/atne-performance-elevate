import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import SEO from "@/components/site/SEO";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Check, ExternalLink, Mail, LogOut } from "lucide-react";

interface BookingRow {
  id: string;
  name: string;
  email: string;
  interest: string | null;
  message: string;
  paid_at: string | null;
  created_at: string;
}

const SERVICES = ["Relief Coaching", "Performance Coaching", "Baseball Training"];

const AdminBookings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [rows, setRows] = useState<BookingRow[]>([]);
  const [service, setService] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        navigate("/auth?redirect=/admin/bookings");
        return;
      }
      const { data: isAdmin } = await supabase.rpc("has_role", {
        _user_id: sessionData.session.user.id,
        _role: "admin",
      });
      if (!isAdmin) {
        toast({ title: "Access denied", description: "Admins only.", variant: "destructive" });
        navigate("/");
        return;
      }
      setAuthorized(true);
      await load();
      setLoading(false);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const load = async () => {
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("id, name, email, interest, message, paid_at, created_at")
      .eq("submission_type", "booking")
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Couldn't load bookings", description: error.message, variant: "destructive" });
      return;
    }
    setRows((data ?? []) as BookingRow[]);
  };

  const filtered = useMemo(() => {
    return rows.filter((r) => {
      if (service !== "all" && r.interest !== service) return false;
      if (status === "paid" && !r.paid_at) return false;
      if (status === "unpaid" && r.paid_at) return false;
      return true;
    });
  }, [rows, service, status]);

  const togglePaid = async (row: BookingRow) => {
    setUpdatingId(row.id);
    const newPaidAt = row.paid_at ? null : new Date().toISOString();
    const { error } = await supabase
      .from("contact_submissions")
      .update({ paid_at: newPaidAt })
      .eq("id", row.id);
    setUpdatingId(null);
    if (error) {
      toast({ title: "Update failed", description: error.message, variant: "destructive" });
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, paid_at: newPaidAt } : r)));
    toast({ title: newPaidAt ? "Marked as paid" : "Marked as unpaid" });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </main>
    );
  }
  if (!authorized) return null;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });

  return (
    <main className="min-h-screen bg-background">
      <SEO title="Admin — Bookings" description="Manage booking requests" canonical="/admin/bookings" />
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-display text-xl font-bold text-primary">Booking Requests</h1>
          <Button variant="ghost" size="sm" onClick={signOut}>
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </header>

      <section className="container mx-auto px-6 py-8">
        <div className="flex flex-wrap gap-3 items-center mb-6">
          <div className="min-w-[220px]">
            <Select value={service} onValueChange={setService}>
              <SelectTrigger>
                <SelectValue placeholder="Service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All services</SelectItem>
                {SERVICES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-[180px]">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-muted-foreground ml-auto">
            {filtered.length} of {rows.length} request{rows.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="rounded-2xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr className="text-left">
                  <th className="px-4 py-3 font-medium">Submitted</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Service</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                      No booking requests match these filters.
                    </td>
                  </tr>
                )}
                {filtered.map((r) => (
                  <tr key={r.id} className="border-t border-border">
                    <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">{fmt(r.created_at)}</td>
                    <td className="px-4 py-3 font-medium text-primary">{r.name}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${r.email}`}
                        className="inline-flex items-center gap-1 hover:underline"
                      >
                        <Mail className="h-3.5 w-3.5" /> {r.email}
                      </a>
                    </td>
                    <td className="px-4 py-3">{r.interest ?? "—"}</td>
                    <td className="px-4 py-3">
                      {r.paid_at ? (
                        <Badge className="bg-accent text-accent-foreground">Paid · {fmt(r.paid_at)}</Badge>
                      ) : (
                        <Badge variant="outline">Unpaid</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        variant={r.paid_at ? "outline" : "default"}
                        onClick={() => togglePaid(r)}
                        disabled={updatingId === r.id}
                      >
                        {updatingId === r.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : r.paid_at ? (
                          "Mark unpaid"
                        ) : (
                          <>
                            <Check className="h-3.5 w-3.5" /> Mark paid
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminBookings;
