import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Star, Award, GraduationCap, ShieldCheck, Leaf } from "lucide-react";
import coachingImg from "@/assets/coaching.jpg";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-36 pb-20 px-6">
        <div className="absolute inset-0 -z-10 bg-[var(--gradient-mist)]" />
        <div className="container mx-auto max-w-4xl text-center animate-fade-up">
          <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Contact</span>
          <h1 className="mt-4 font-display text-4xl md:text-6xl text-primary font-light leading-tight">
            Rooted in the <span className="italic text-gradient">Twin Cities.</span>
          </h1>
          <p className="mt-6 text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Serving high-performers in Minnesota and the Twin Cities area
            <span className="text-foreground"> (Minneapolis &amp; St. Paul) </span>
            — with sustainable growth, balance, and a sense of community at the center of every session.
          </p>
        </div>
      </section>

      {/* Contact + Map */}
      <section className="px-6 pb-24">
        <div className="container mx-auto grid lg:grid-cols-2 gap-8">
          <div className="glass rounded-3xl p-8 md:p-10 shadow-[var(--shadow-glass)]">
            <h2 className="font-display text-3xl text-primary">Visit the Studio</h2>
            <p className="mt-3 text-foreground/70 leading-relaxed">
              Our private studio is located in the west metro, easily accessible from Edina, Minnetonka,
              and Woodbury. In-home and virtual sessions also available across the greater Twin Cities.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <div className="font-medium text-primary">Studio Location</div>
                  <div className="text-sm text-muted-foreground">Edina, MN — Twin Cities Metro</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <div className="font-medium text-primary">Email</div>
                  <a href="mailto:hello@atneperformance.com" className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    hello@atneperformance.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <div className="font-medium text-primary">Phone</div>
                  <div className="text-sm text-muted-foreground">(612) 555-0144</div>
                </div>
              </li>
            </ul>

            {/* Google Reviews trust badge */}
            <a
              href="https://g.page/r/your-google-business-id/review"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 flex items-center justify-between gap-4 rounded-2xl border border-border bg-card/60 p-4 hover:border-accent transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-white shadow-[var(--shadow-glass)] flex items-center justify-center font-bold text-lg" aria-hidden>
                  <span className="text-[#4285F4]">G</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-primary">Review us on Google</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {[0,1,2,3,4].map((i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-accent text-accent" />
                    ))}
                    <span className="ml-1.5 text-xs text-muted-foreground">5.0 · Twin Cities</span>
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-primary group-hover:text-accent transition-colors">Open →</span>
            </a>
          </div>

          {/* Google Maps embed placeholder */}
          <div className="rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] border border-border min-h-[420px] bg-muted">
            <iframe
              title="ATNE Performance studio location — Edina, Minnesota"
              src="https://www.google.com/maps?q=Edina,Minnesota&output=embed"
              className="w-full h-full min-h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Meet the Coach */}
      <section className="relative py-24 px-6 bg-secondary/40">
        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] aspect-[4/5]">
            <img
              src={coachingImg}
              alt="ATNE Performance coach in a Minneapolis studio setting"
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-dark rounded-2xl p-4 text-primary-foreground">
              <div className="text-xs uppercase tracking-widest text-accent">Founder &amp; Lead Coach</div>
              <div className="font-display text-xl mt-1">Photographed locally — Chain of Lakes, MPLS</div>
            </div>
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Meet the Coach</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl text-primary font-light leading-tight">
              A local approach to <span className="italic text-gradient">sustainable growth.</span>
            </h2>
            <p className="mt-6 text-foreground/70 leading-relaxed">
              Born and trained in Minnesota, our work blends evidence-based performance coaching with
              hands-on relief therapy. We believe peak performance and balance aren't opposites — they're
              partners. Community, presence, and craft come first.
            </p>

            {/* Certifications & Licensing */}
            <div className="mt-10 glass rounded-3xl p-6 md:p-8 shadow-[var(--shadow-glass)]">
              <h3 className="font-display text-xl text-primary flex items-center gap-2">
                <Award className="h-5 w-5 text-accent" />
                Certifications &amp; Licensing
              </h3>
              <ul className="mt-5 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <div>
                    <div className="font-medium text-primary">Minnesota Board of Behavioral Health &amp; Therapy (BBHT)</div>
                    <div className="text-muted-foreground">License status — to be listed by practitioner (e.g. LPC / LPCC)</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <div>
                    <div className="font-medium text-primary">Certified Performance Coach (ICF / NBHWC)</div>
                    <div className="text-muted-foreground">Continuing education in somatic and breath-based modalities</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Leaf className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <div>
                    <div className="font-medium text-primary">Manual &amp; Relief Therapy Training</div>
                    <div className="text-muted-foreground">Deep-tissue, fascia release, and recovery protocols</div>
                  </div>
                </li>
              </ul>
              <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
                Coaching services are provided as performance education and are not a substitute for licensed
                medical or psychological treatment unless explicitly stated.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button variant="hero" size="lg" asChild>
                <a href="/#booking">Book a Discovery Call</a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:hello@atneperformance.com">Email the Studio</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;