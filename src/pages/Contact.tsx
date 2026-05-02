import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import SEO from "@/components/site/SEO";
import StudioMap from "@/components/site/StudioMap";
import ContactForm from "@/components/site/ContactForm";
import MeetCoach from "@/components/site/MeetCoach";
import { MapPin, Mail, Phone, Star } from "lucide-react";
import coachingImg from "@/assets/coaching.jpg";
import { studioLocation, fullAddress } from "@/config/location";

const Contact = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SEO
        title="Contact ATNE Performance — Twin Cities Studio"
        description={`Reach ATNE Performance in ${studioLocation.city}, ${studioLocation.region}. Serving Minneapolis, St. Paul & the greater Twin Cities.`}
        canonical="/contact"
      />
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
              Our private studio is in {studioLocation.city}, easily accessible from {studioLocation.serviceArea}.
              In-home and virtual sessions also available across the greater Twin Cities.
            </p>

            <ul className="mt-8 space-y-5">
              <li className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                  <MapPin className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <div className="font-medium text-primary">Studio Location</div>
                  <div className="text-sm text-muted-foreground">{fullAddress}</div>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                  <Mail className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <div className="font-medium text-primary">Email</div>
                  <a href={`mailto:${studioLocation.email}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {studioLocation.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="h-10 w-10 rounded-2xl bg-accent/15 flex items-center justify-center shrink-0">
                  <Phone className="h-4 w-4 text-primary" />
                </span>
                <div>
                  <div className="font-medium text-primary">Phone</div>
                  <div className="text-sm text-muted-foreground">{studioLocation.phone}</div>
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

          <StudioMap />
        </div>
      </section>

      {/* Contact Form */}
      <section className="px-6 pb-24">
        <div className="container mx-auto max-w-2xl">
          <ContactForm />
        </div>
      </section>

      <MeetCoach
        name="Your Name, LPCC"
        role="Founder & Lead Coach"
        bio="Born and trained in Minnesota, our work blends evidence-based performance coaching with hands-on relief therapy. We believe peak performance and balance aren't opposites — they're partners. Community, presence, and craft come first."
        image={coachingImg}
        imageCaption="Photographed locally — Chain of Lakes, MPLS"
        primaryCta={{ label: "Book a Discovery Call", href: "/#booking" }}
        secondaryCta={{ label: "Email the Studio", href: `mailto:${studioLocation.email}` }}
      />

      <Footer />
    </main>
  );
};

export default Contact;