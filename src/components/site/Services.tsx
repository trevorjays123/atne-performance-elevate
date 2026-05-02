import { User, Users, HandHeart, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: User,
    title: "1-on-1 Coaching",
    price: "From $250",
    desc: "Private, weekly performance sessions tailored to your goals — personal, athletic, or executive.",
    features: ["90-min deep sessions", "Custom protocols", "Unlimited messaging"],
  },
  {
    icon: Users,
    title: "Group Workshops",
    price: "From $90",
    desc: "Small-group intensives on focus, breath, and resilience. Train alongside a curated cohort.",
    features: ["Monthly cohorts", "Live + replay", "Community access"],
  },
  {
    icon: HandHeart,
    title: "Relief Therapy",
    price: "From $180",
    desc: "Hands-on physical therapy combining deep tissue, fascia release, and breathwork to restore the body.",
    features: ["75-min treatments", "Custom mobility plan", "At-studio or home"],
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-32 px-6 bg-secondary/40">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Services</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-primary font-light leading-tight">
              Crafted for those who refuse <span className="italic text-gradient">to plateau.</span>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Every offering is designed as a complete system — not a session. Choose the path that meets you where you are.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <article
              key={s.title}
              className="group relative glass rounded-3xl p-8 shadow-[var(--shadow-glass)] hover:shadow-[var(--shadow-elegant)] hover:-translate-y-1 transition-all duration-500"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center shadow-[var(--shadow-glow)]">
                  <s.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-primary/40 group-hover:text-accent group-hover:rotate-45 transition-all duration-500" />
              </div>

              <h3 className="font-display text-2xl text-primary">{s.title}</h3>
              <p className="mt-3 text-foreground/70 leading-relaxed">{s.desc}</p>

              <div className="mt-6 pt-6 border-t border-border/60">
                <ul className="space-y-2 text-sm text-foreground/70">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full bg-accent" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 font-display text-lg text-primary">{s.price}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;