import { Button } from "@/components/ui/button";
import logo from "@/assets/atne-logo.png";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <img src={logo} alt="ATNE Performance logo" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="font-display text-xl font-extrabold uppercase tracking-wide text-primary-foreground">ATNE</span>
        </a>
        <ul className="hidden md:flex items-center gap-8 font-display text-sm font-bold uppercase tracking-widest text-primary-foreground/80">
          <li><a href="/#approach" className="hover:text-accent transition-colors">Approach</a></li>
          <li><a href="/#services" className="hover:text-accent transition-colors">Services</a></li>
          <li><a href="/#booking" className="hover:text-accent transition-colors">Booking</a></li>
          <li><a href="/contact" className="hover:text-accent transition-colors">Contact</a></li>
        </ul>
        <Button variant="hero" size="sm" asChild>
          <a href="/#booking">Book Session</a>
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
