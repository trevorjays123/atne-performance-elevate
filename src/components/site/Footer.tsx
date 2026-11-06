import logo from "@/assets/atne-logo.png";
import { studioLocation } from "@/config/location";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 px-6">
      <div className="container mx-auto flex flex-col gap-10">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="flex items-start gap-3">
            <img src={logo} alt="ATNE Performance" width={48} height={48} className="h-12 w-12" loading="lazy" />
            <div>
              <div className="font-display text-2xl uppercase font-extrabold tracking-wide">ATNE Performance</div>
              <div className="text-xs uppercase tracking-[0.25em] text-accent font-bold mt-1">All Thought; No Emotion</div>
            </div>
          </div>
          <div>
            <h4 className="font-display uppercase font-bold tracking-widest text-sm text-accent mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><a href="/#services" className="hover:text-accent transition-colors">Services</a></li>
              <li><a href="/#booking" className="hover:text-accent transition-colors">Book a Session</a></li>
              <li><a href="/contact" className="hover:text-accent transition-colors">Contact &amp; Location</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display uppercase font-bold tracking-widest text-sm text-accent mb-3">Service Area</h4>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Serving high-performers across Minnesota — {studioLocation.serviceAreas.join(", ")} and the greater Twin Cities.
            </p>
          </div>
        </div>

        <p className="text-xs text-primary-foreground/70 leading-relaxed max-w-3xl">
          <span className="font-semibold text-primary-foreground/90">Disclaimer:</span> Coaching services are provided as
          performance education and are not a substitute for licensed medical or psychological treatment unless
          explicitly stated.
        </p>

        <div className="pt-6 border-t border-primary-foreground/15 text-xs text-primary-foreground/70">
          © {new Date().getFullYear()} ATNE Performance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
