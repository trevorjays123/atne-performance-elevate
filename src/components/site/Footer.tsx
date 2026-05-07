import logo from "@/assets/atne-logo.png";
import { studioLocation } from "@/config/location";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={logo} alt="ATNE Performance" width={32} height={32} className="h-8 w-8" loading="lazy" />
            <div>
              <div className="font-display text-primary font-semibold">ATNE Performance</div>
              <div className="text-xs text-muted-foreground">Elevate. Restore. Become.</div>
            </div>
          </div>
          <div className="text-sm text-foreground/80 md:text-right max-w-md">
            Serving high-performers across Minnesota — proudly coaching clients in{" "}
            <span className="text-foreground/90 font-medium">
              {studioLocation.serviceAreas.join(", ")}
            </span>{" "}
            and the greater Twin Cities.
          </div>
        </div>

        <p className="text-xs text-muted-foreground leading-relaxed max-w-3xl">
          <span className="font-medium text-foreground/80">Disclaimer:</span> Coaching services are provided as
          performance education and are not a substitute for licensed medical or psychological treatment unless
          explicitly stated.
        </p>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pt-6 border-t border-border/60">
          <div className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} ATNE Performance. All rights reserved.
          </div>
          <a href="/contact" className="text-xs text-primary hover:text-accent transition-colors font-medium">
            Contact &amp; Location →
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;