import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-forest.jpg";
import logo from "@/assets/atne-logo.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroImg}
          alt="Misty forest at golden hour"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-background" />
      </div>

      {/* Floating glow orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-accent/30 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl mx-auto text-center animate-fade-up">
          <div className="inline-flex items-center gap-2 glass-dark rounded-full px-4 py-2 mb-8 text-primary-foreground/90 text-xs tracking-widest uppercase">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Premium Performance & Recovery
          </div>

          <img src={logo} alt="ATNE Performance" width={140} height={140} className="mx-auto h-32 w-32 mb-6 drop-shadow-[0_8px_24px_hsl(154_45%_8%_/_0.6)]" />

          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground tracking-tight leading-[1.05]">
            ATNE <span className="italic text-gradient-light font-normal">Performance</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Performance coaching and relief therapy designed to elevate your mind, restore your body, and unlock the highest version of you.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="#booking">
                Unlock Your Peak State
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghostLight" size="xl" asChild>
              <a href="#approach">Discover the Approach</a>
            </Button>
          </div>

          <div className="mt-20 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { k: "10+", v: "Years Experience" },
              { k: "500+", v: "Clients Transformed" },
              { k: "1:1", v: "Bespoke Method" },
            ].map((s) => (
              <div key={s.v} className="glass-dark rounded-2xl px-4 py-5">
                <div className="font-display text-3xl text-accent">{s.k}</div>
                <div className="text-xs uppercase tracking-wider text-primary-foreground/60 mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-[var(--gradient-mist)] pointer-events-none" />
    </section>
  );
};

export default Hero;