import { Button } from "@/components/ui/button";
import { Award, GraduationCap, ShieldCheck, Leaf, type LucideIcon } from "lucide-react";

export interface Credential {
  icon?: LucideIcon;
  title: string;
  detail?: string;
}

export interface MeetCoachProps {
  eyebrow?: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  imageCaption?: string;
  credentials?: Credential[];
  disclaimer?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  reverse?: boolean;
}

const defaultCredentials: Credential[] = [
  {
    icon: ShieldCheck,
    title: "Minnesota Board of Behavioral Health & Therapy (BBHT)",
    detail: "License status — to be listed by practitioner (e.g. LPC / LPCC)",
  },
  {
    icon: GraduationCap,
    title: "Certified Performance Coach (ICF / NBHWC)",
    detail: "Continuing education in somatic and breath-based modalities",
  },
  {
    icon: Leaf,
    title: "Manual & Relief Therapy Training",
    detail: "Deep-tissue, fascia release, and recovery protocols",
  },
];

const MeetCoach = ({
  eyebrow = "Meet the Coach",
  name,
  role,
  bio,
  image,
  imageCaption,
  credentials = defaultCredentials,
  disclaimer = "Coaching services are provided as performance education and are not a substitute for licensed medical or psychological treatment unless explicitly stated.",
  primaryCta,
  secondaryCta,
  reverse = false,
}: MeetCoachProps) => {
  return (
    <section className="relative py-24 px-6 bg-secondary/40">
      <div className={`container mx-auto grid lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] aspect-[4/5]">
          <img
            src={image}
            alt={`${name}, ${role}`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-4 text-primary-foreground">
            <div className="text-xs uppercase tracking-widest text-accent">{role}</div>
            <div className="font-display text-xl mt-1">{name}</div>
            {imageCaption && (
              <div className="text-xs text-primary-foreground/70 mt-1">{imageCaption}</div>
            )}
          </div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{eyebrow}</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl text-primary font-light leading-tight">
            A local approach to <span className="italic text-gradient">sustainable growth.</span>
          </h2>
          <p className="mt-6 text-foreground/70 leading-relaxed">{bio}</p>

          <div className="mt-10 glass rounded-3xl p-6 md:p-8 shadow-[var(--shadow-glass)]">
            <h3 className="font-display text-xl text-primary flex items-center gap-2">
              <Award className="h-5 w-5 text-accent" />
              Certifications &amp; Licensing
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              {credentials.map((c) => {
                const Icon = c.icon ?? ShieldCheck;
                return (
                  <li key={c.title} className="flex items-start gap-3">
                    <Icon className="h-4 w-4 text-accent mt-1 shrink-0" />
                    <div>
                      <div className="font-medium text-primary">{c.title}</div>
                      {c.detail && <div className="text-muted-foreground">{c.detail}</div>}
                    </div>
                  </li>
                );
              })}
            </ul>
            {disclaimer && (
              <p className="mt-6 text-xs text-muted-foreground leading-relaxed">{disclaimer}</p>
            )}
          </div>

          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              {primaryCta && (
                <Button variant="hero" size="lg" asChild>
                  <a href={primaryCta.href}>{primaryCta.label}</a>
                </Button>
              )}
              {secondaryCta && (
                <Button variant="outline" size="lg" asChild>
                  <a href={secondaryCta.href}>{secondaryCta.label}</a>
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MeetCoach;