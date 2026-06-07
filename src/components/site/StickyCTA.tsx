import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:pb-6 pointer-events-none transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full"
      }`}
    >
      <div className="pointer-events-auto mx-auto max-w-3xl glass-dark rounded-2xl shadow-[var(--shadow-elegant)] px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="font-display text-sm sm:text-base text-primary-foreground font-semibold leading-tight">
            Ready to train with intention?
          </p>
          <p className="hidden sm:block text-xs text-primary-foreground/70 mt-0.5">
            All thought. No emotion. Reserve your session today.
          </p>
        </div>
        <Button variant="hero" size="lg" asChild className="shrink-0">
          <a href="#booking" aria-label="Book a session now">
            Book Now
            <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default StickyCTA;