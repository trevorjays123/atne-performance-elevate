import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import SEO from "@/components/site/SEO";

const ThankYou = () => {
  return (
    <>
      <SEO
        title="Thank You | ATNE Performance"
        description="Your payment is confirmed. We'll be in touch shortly to schedule your session."
      />
      <main className="min-h-screen flex items-center justify-center px-6 bg-[var(--gradient-hero)]">
        <div className="glass max-w-lg w-full rounded-3xl p-10 text-center shadow-[var(--shadow-elegant)]">
          <div className="mx-auto h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h1 className="mt-6 font-display text-3xl md:text-4xl font-bold text-primary">
            Payment received.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Thank you for booking with ATNE Performance. A confirmation has
            been sent to your email. Coach Zach will reach out within 24 hours
            to lock in your session time.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="hero" size="lg" asChild>
              <Link to="/">Back to Home</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Coach</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ThankYou;