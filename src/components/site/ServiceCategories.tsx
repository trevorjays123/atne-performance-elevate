import { Button } from "@/components/ui/button";
import { Brain, Zap, Trophy, ArrowRight, Users } from "lucide-react";

type Tier = { name: string; duration: string; price: string };
type Service = {
  id: string;
  icon: typeof Brain;
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  tiers: Tier[];
};

const services: Service[] = [
  {
    id: "relief-coaching",
    icon: Brain,
    eyebrow: "Restore",
    title: "Relief Coaching",
    description:
      "Decompress the nervous system and reset the body. Hands-on relief work paired with breath, mobility, and recovery protocols built around your stress load.",
    highlights: ["Nervous-system reset", "Breath & mobility work", "Recovery protocols"],
    tiers: [
      { name: "Single Session", duration: "75 min", price: "$180" },
      { name: "Reset Pack (3)", duration: "75 min × 3", price: "$495" },
      { name: "Monthly Restore", duration: "4 sessions / mo", price: "$640" },
    ],
  },
  {
    id: "performance-coaching",
    icon: Zap,
    eyebrow: "Elevate",
    title: "Performance Coaching",
    description:
      "1-on-1 mental and physical performance coaching for executives, creatives, and athletes who need to operate at the top of their range — repeatedly, on demand.",
    highlights: ["Bespoke 1-on-1 method", "Focus & resilience training", "Direct messaging access"],
    tiers: [
      { name: "Discovery Session", duration: "90 min", price: "$250" },
      { name: "Monthly Coaching", duration: "4 sessions / mo", price: "$900" },
      { name: "Quarterly Program", duration: "12 weeks", price: "$2,400" },
    ],
  },
  {
    id: "baseball-training",
    icon: Trophy,
    eyebrow: "Compete",
    title: "Baseball Training",
    description:
      "Sport-specific training for ballplayers — mechanics, throwing health, hitting power, and the mental game. Built for players who want to play longer and play freer.",
    highlights: ["Throwing & hitting mechanics", "Strength & arm care", "Mental-game work"],
    tiers: [
      { name: "Single Lesson", duration: "60 min", price: "$120" },
      { name: "5-Lesson Block", duration: "60 min × 5", price: "$550" },
      { name: "Off-Season Build", duration: "8 weeks", price: "$1,400" },
    ],
  },
];

const ServiceCategories = () => {
  return (
    <section id="services" className="relative py-32 px-6 bg-secondary/40">
      <div className="container mx-auto">
        <div className="max-w-2xl mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Services</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-primary font-bold leading-tight">
            Three paths. <span className="text-gradient">One standard.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Every program is built as a complete system — not a single session. Choose the path that meets you where you are.
          </p>
        </div>

        <div className="space-y-10">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className="glass rounded-3xl p-8 md:p-10 shadow-[var(--shadow-glass)] hover:shadow-[var(--shadow-elegant)] transition-all duration-500"
            >
              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10">
                <div>
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-[var(--shadow-glow)]">
                      <s.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{s.eyebrow}</div>
                      <h3 className="font-display text-3xl text-primary font-bold">{s.title}</h3>
                    </div>
                  </div>
                  <p className="text-foreground/75 leading-relaxed">{s.description}</p>
                  <ul className="mt-6 grid sm:grid-cols-2 gap-2 text-sm text-foreground/70">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-border bg-card/70 p-6">
                  <div className="flex items-baseline justify-between mb-4">
                    <h4 className="font-display text-lg text-primary font-bold">Pricing</h4>
                    <span className="text-xs text-muted-foreground">Indicative rates</span>
                  </div>
                  <ul className="divide-y divide-border">
                    {s.tiers.map((t) => (
                      <li key={t.name} className="flex items-center justify-between py-3">
                        <div>
                          <div className="text-sm font-medium text-primary">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.duration}</div>
                        </div>
                        <div className="font-display text-lg text-primary font-bold">{t.price}</div>
                      </li>
                    ))}
                  </ul>
                  <Button variant="hero" size="lg" className="mt-6 w-full" asChild>
                    <a href={`#booking?service=${s.id}`}>
                      Book Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}

          {/* Group work placeholder */}
          <article className="rounded-3xl border border-dashed border-accent/40 bg-accent/5 p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-2xl bg-accent/15 flex items-center justify-center">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Coming Soon</div>
                <h3 className="font-display text-2xl text-primary font-bold mt-1">Group Sessions</h3>
                <p className="text-foreground/70 mt-2 max-w-xl">
                  Small-group cohorts and team training are in development. Enquire below for early access or custom group rates.
                </p>
              </div>
            </div>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact?topic=group-rates">Enquire for Group Rates</a>
            </Button>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategories;