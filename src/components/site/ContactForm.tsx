import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .max(30, { message: "Phone must be less than 30 characters" })
    .optional()
    .or(z.literal("")),
  interest: z
    .string()
    .trim()
    .max(60, { message: "Please pick a shorter option" })
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .nonempty({ message: "Message is required" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type ContactValues = z.infer<typeof contactSchema>;
type FieldErrors = Partial<Record<keyof ContactValues, string>>;

const ContactForm = () => {
  const { toast } = useToast();
  const [values, setValues] = useState<ContactValues>({
    name: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const update = <K extends keyof ContactValues>(key: K, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof ContactValues;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      toast({
        title: "Please check the form",
        description: "Some fields need attention before sending.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      interest: parsed.data.interest || null,
      message: parsed.data.message,
      user_agent: typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Couldn't send your message",
        description: "Please try again in a moment, or email us directly.",
        variant: "destructive",
      });
      return;
    }

    if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
      (window as any).gtag("event", "generate_lead", {
        event_category: "contact",
        event_label: parsed.data.interest || "general",
      });
    }

    toast({
      title: "Message sent",
      description: "Thanks — we'll be in touch within one business day.",
    });
    setValues({ name: "", email: "", phone: "", interest: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass rounded-3xl p-6 md:p-8 shadow-[var(--shadow-glass)] space-y-5"
    >
      <div>
        <h3 className="font-display text-2xl text-primary">Send a Message</h3>
        <p className="text-sm text-muted-foreground mt-1">
          We typically reply within one business day.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            maxLength={100}
            autoComplete="name"
            aria-invalid={!!errors.name}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            maxLength={255}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="phone">Phone <span className="text-muted-foreground font-normal">(optional)</span></Label>
          <Input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            maxLength={30}
            autoComplete="tel"
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="interest">I'm interested in</Label>
          <select
            id="interest"
            value={values.interest}
            onChange={(e) => update("interest", e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Select an option</option>
            <option value="1-on-1 Coaching">1-on-1 Coaching</option>
            <option value="Group Workshops">Group Workshops</option>
            <option value="Relief Therapy">Relief Therapy</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          maxLength={1000}
          aria-invalid={!!errors.message}
        />
        <div className="flex items-center justify-between">
          {errors.message ? (
            <p className="text-xs text-destructive">{errors.message}</p>
          ) : (
            <span className="text-xs text-muted-foreground">Tell us a bit about your goals.</span>
          )}
          <span className="text-xs text-muted-foreground">{values.message.length}/1000</span>
        </div>
      </div>

      <Button type="submit" variant="hero" size="lg" className="w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
};

export default ContactForm;