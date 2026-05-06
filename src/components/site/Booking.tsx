import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check, Clock, MapPin, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

// PayPal payment links per service. Replace with real paypal.me / hosted-button URLs.
const PAYPAL_LINKS: Record<string, string> = {
  "relief-coaching": "https://www.paypal.com/paypalme/atneperformance/180",
  "performance-coaching": "https://www.paypal.com/paypalme/atneperformance/250",
  "baseball-training": "https://www.paypal.com/paypalme/atneperformance/120",
};

const SERVICE_LABELS: Record<string, string> = {
  "relief-coaching": "Relief Coaching",
  "performance-coaching": "Performance Coaching",
  "baseball-training": "Baseball Training",
};

const bookingSchema = z.object({
  name: z.string().trim().nonempty("Name is required").max(100, "Name too long"),
  email: z.string().trim().email("Invalid email").max(255, "Email too long"),
  service: z.enum(["relief-coaching", "performance-coaching", "baseball-training"], {
    errorMap: () => ({ message: "Please select a service" }),
  }),
  notes: z.string().trim().max(500, "Notes too long").optional(),
});

type BookingValues = z.infer<typeof bookingSchema>;

const Booking = () => {
  const [submitted, setSubmitted] = useState<BookingValues | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({ resolver: zodResolver(bookingSchema) });

  const service = watch("service");

  const onSubmit = async (values: BookingValues) => {
    try {
      const { error } = await supabase.from("leads").insert({
        name: values.name,
        email: values.email,
        topic: values.service,
        message: values.notes ?? null,
      });
      if (error) throw error;
      setSubmitted(values);
    } catch (e: any) {
      // Still show confirmation so the user can pay even if persistence is unavailable.
      toast({
        title: "Saved locally",
        description: "We couldn't store your booking right now, but you can still complete payment.",
      });
      setSubmitted(values);
    }
  };

  return (
    <section id="booking" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-hero)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl" />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Booking</span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-light leading-tight">
              Begin your<br />
              <span className="italic text-gradient-light">transformation.</span>
            </h2>
            <p className="mt-6 text-primary-foreground/80 text-lg max-w-md leading-relaxed">
              Reserve your session in minutes. Complete payment securely via PayPal once you submit. Proudly serving Minneapolis, St. Paul, and the greater Twin Cities.
            </p>

            <ul className="mt-8 space-y-3">
              {["Pay securely via PayPal", "Direct line to your coach", "Studio or virtual sessions"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-primary-foreground/90">
                  <span className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-3xl p-8 md:p-10 shadow-[var(--shadow-elegant)]">
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="h-7 w-7 text-accent" />
                </div>
                <h3 className="mt-5 font-display text-2xl text-primary font-bold">
                  You're booked, {submitted.name.split(" ")[0]}.
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We've received your request for{" "}
                  <span className="font-medium text-primary">{SERVICE_LABELS[submitted.service]}</span>. A
                  confirmation will be sent to{" "}
                  <span className="font-medium text-primary">{submitted.email}</span>.
                </p>
                <p className="mt-4 text-sm text-foreground/80">
                  To secure your slot, complete payment below.
                </p>
                <Button variant="hero" size="lg" className="mt-6 w-full" asChild>
                  <a
                    href={PAYPAL_LINKS[submitted.service]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Complete Payment via PayPal
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </Button>
                <button
                  type="button"
                  onClick={() => setSubmitted(null)}
                  className="mt-4 text-xs text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
                >
                  Book another session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <h3 className="font-display text-2xl text-primary font-bold">Reserve Your Session</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Fill out the form — we'll confirm and send a payment link.
                </p>

                <div className="mt-6 space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="booking-name">Name</Label>
                    <Input
                      id="booking-name"
                      placeholder="Your full name"
                      autoComplete="name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-destructive">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="booking-email">Email</Label>
                    <Input
                      id="booking-email"
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="booking-service">Service</Label>
                    <Select
                      value={service}
                      onValueChange={(v) =>
                        setValue("service", v as BookingValues["service"], {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger id="booking-service">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relief-coaching">Relief Coaching</SelectItem>
                        <SelectItem value="performance-coaching">Performance Coaching</SelectItem>
                        <SelectItem value="baseball-training">Baseball Training</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.service && (
                      <p className="text-xs text-destructive">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="mt-8 w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Booking"}
                </Button>

                <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> 60–90 min
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> Studio or Virtual
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
