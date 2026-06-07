import { Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
  name: string;
  role: string;
  rating: number;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Marcus R.",
    role: "Collegiate Pitcher",
    rating: 5,
    quote:
      "The mental game work changed everything. I stopped reacting and started executing — every single pitch with intention.",
  },
  {
    name: "Elena S.",
    role: "Executive, Twin Cities",
    rating: 5,
    quote:
      "Relief coaching gave me my nervous system back. Sharper focus, deeper sleep, calmer days. Worth every minute.",
  },
  {
    name: "Devon K.",
    role: "Pro Hitter",
    rating: 5,
    quote:
      "All thought, no emotion — that's the standard now. My swing, my approach, my recovery all moved up a tier.",
  },
  {
    name: "Priya N.",
    role: "Founder & Athlete",
    rating: 5,
    quote:
      "The most disciplined coaching I've ever experienced. Quiet, precise, and built for people who take performance seriously.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="relative py-32 px-6 bg-primary text-primary-foreground overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 bg-[radial-gradient(60%_60%_at_50%_0%,hsl(145_47%_52%/0.35),transparent_70%)]"
      />
      <div className="container mx-auto relative">
        <div className="max-w-2xl mb-14">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
            Testimonials
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold leading-tight">
            Athletes & operators. <span className="text-gradient-light">One standard.</span>
          </h2>
          <p className="mt-4 text-primary-foreground/80">
            Real reflections from clients who train with intention.
          </p>
        </div>

        <Carousel
          opts={{ align: "start", loop: true }}
          className="w-full"
          aria-label="Client testimonials"
        >
          <CarouselContent>
            {testimonials.map((t) => (
              <CarouselItem key={t.name} className="md:basis-1/2 lg:basis-1/3">
                <article className="glass-dark h-full rounded-3xl p-8 flex flex-col gap-5 shadow-[var(--shadow-elegant)]">
                  <div
                    className="flex items-center gap-1"
                    role="img"
                    aria-label={`${t.rating} out of 5 stars`}
                  >
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < t.rating
                            ? "fill-accent text-accent"
                            : "text-primary-foreground/30"
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <blockquote className="font-display text-lg leading-relaxed text-primary-foreground">
                    “{t.quote}”
                  </blockquote>
                  <footer className="mt-auto pt-4 border-t border-primary-foreground/15">
                    <div className="font-semibold text-primary-foreground">{t.name}</div>
                    <div className="text-sm text-primary-foreground/70">{t.role}</div>
                  </footer>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-4 lg:-left-12 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground" />
          <CarouselNext className="hidden md:flex -right-4 lg:-right-12 bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/20 hover:text-primary-foreground" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;