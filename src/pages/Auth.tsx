import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import SEO from "@/components/site/SEO";
import { Loader2 } from "lucide-react";
import logo from "@/assets/atne-logo.png";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate("/admin/leads", { replace: true });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/leads", { replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const trimmed = email.trim();
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: trimmed,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin/leads` },
      });
      setBusy(false);
      if (error) {
        toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
        return;
      }
      toast({ title: "Account created", description: "You can now sign in." });
      setMode("signin");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email: trimmed, password });
      setBusy(false);
      if (error) {
        toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
        return;
      }
    }
  };

  return (
    <main className="min-h-screen bg-[var(--gradient-mist)] flex items-center justify-center px-6">
      <SEO title="Admin Sign In — ATNE Performance" description="Restricted area for ATNE Performance staff." canonical="/auth" />
      <div className="w-full max-w-md glass rounded-3xl p-8 shadow-[var(--shadow-elegant)]">
        <div className="flex flex-col items-center text-center mb-6">
          <img src={logo} alt="ATNE Performance" width={56} height={56} className="h-14 w-14" />
          <h1 className="font-display text-2xl text-primary mt-3">Staff Access</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signin" ? "Sign in to manage submissions." : "Create your admin account."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" autoComplete={mode === "signup" ? "new-password" : "current-password"} required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={busy}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? "Sign In" : "Create Account"}
          </Button>
        </form>
        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-xs text-muted-foreground hover:text-primary transition-colors"
        >
          {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
        </button>
        <p className="mt-6 text-[11px] text-muted-foreground leading-relaxed text-center">
          New accounts have no admin access by default. An existing admin must grant the role.
        </p>
      </div>
    </main>
  );
};

export default Auth;