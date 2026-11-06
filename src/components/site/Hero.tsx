import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-forest.jpg";
import logo from "@/assets/atne-logo.png";

const stats = [
  { k: "10+", v: "Years Experience" },
  { k: "500+", v: "Clients Trained" },
  { k: "1:1", v: "Bespoke Method" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-primary pt-28 pb-12 md:pb-20">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/60" />
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="max-w-4xl animate-fade-up">
          <div className="flex items-center gap-4 mb-8">
            <img src={logo} alt="ATNE Performance logo" width={80} height={80} className="h-16 w-16 md:h-20 md:w-20" />
            <span className="h-px w-12 bg-accent" />
            <span className="font-display text-sm md:text-base uppercase tracking-[0.3em] text-accent font-bold">
              All Thought; No Emotion
            </span>
          </div>

          <h1 className="font-display uppercase font-extrabold text-primary-foreground leading-[0.9] tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-[9rem]">
            ATNE<br />
            <span className="text-accent">Performance</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-primary-foreground/90 max-w-xl leading-relaxed">
            Performance coaching and relief therapy for athletes and high-performers across the Twin Cities. Train the mind. Restore the body. Compete at your peak.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" asChild>
              <a href="#booking">
                Unlock Your Peak State
                <ArrowRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghostLight" size="xl" asChild>
              <a href="#approach">The Approach</a>
            </Button>
          </div>
        </div>

        <div className="mt-16 md:mt-24 grid grid-cols-3 border-t border-primary-foreground/20 max-w-3xl">
          {stats.map((s, i) => (
            <div key={s.v} className={`pt-6 ${i > 0 ? "pl-4 md:pl-8 border-l border-primary-foreground/20" : ""}`}>
              <div className="font-display text-4xl md:text-5xl font-extrabold text-accent">{s.k}</div>
              <div className="text-xs uppercase tracking-widest text-primary-foreground/80 mt-1 font-semibold">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
