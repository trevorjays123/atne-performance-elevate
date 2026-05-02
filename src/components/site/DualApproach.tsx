import { Brain, Leaf } from "lucide-react";
import coachingImg from "@/assets/coaching.jpg";
import therapyImg from "@/assets/therapy.jpg";

const DualApproach = () => {
  const pillars = [
    {
      eyebrow: "Performance Coaching",
      title: "Focus. Drive. Mastery.",
      body: "A high-performance protocol that sharpens your mindset, fortifies your discipline, and engineers the habits that compound into excellence.",
      points: ["Mindset architecture", "Habit engineering", "Strategic accountability"],
      icon: Brain,
      img: coachingImg,
    },
    {
      eyebrow: "Relief Therapy",
      title: "Recovery. Balance. Flow.",
      body: "Hands-on physical therapy that releases tension, restores mobility, and returns the nervous system to its calmest, most capable state.",
      points: ["Deep tissue release", "Mobility restoration", "Nervous system reset"],
      icon: Leaf,
      img: therapyImg,
    },
  ];

  return (
    <section id="approach" className="relative py-32 px-6">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-20">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">The Dual Approach</span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl text-primary font-light leading-tight">
            Two disciplines.<br />
            <span className="italic text-gradient">One peak state.</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-lg">
            Performance without recovery is burnout. Recovery without drive is stagnation. ATNE integrates both.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {pillars.map((p, i) => (
            <article
              key={p.title}
              className="group relative rounded-3xl overflow-hidden bg-card shadow-[var(--shadow-elegant)] hover:-translate-y-2 transition-all duration-700"
              style={{ transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)" }}
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div className={`absolute inset-0 ${i === 0 ? "bg-gradient-to-t from-primary via-primary/40 to-transparent" : "bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"}`} />
                <div className="absolute top-6 left-6 glass-dark rounded-full p-3">
                  <p.icon className="h-5 w-5 text-accent" />
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs uppercase tracking-[0.2em] text-accent">{p.eyebrow}</span>
                  <h3 className="mt-2 font-display text-3xl text-primary-foreground">{p.title}</h3>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <p className="text-foreground/80 leading-relaxed">{p.body}</p>
                <ul className="mt-6 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3 text-sm text-foreground/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DualApproach;