import { Button } from "@/components/ui/button";
import logo from "@/assets/atne-logo.png";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="container mx-auto">
        <nav className="glass rounded-full flex items-center justify-between pl-4 pr-2 py-2 shadow-[var(--shadow-glass)]">
          <a href="#" className="flex items-center gap-2">
            <img src={logo} alt="ATNE Performance logo" width={36} height={36} className="h-9 w-9 object-contain" />
            <span className="font-display text-lg font-semibold text-primary tracking-tight">ATNE</span>
          </a>
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
            <li><a href="#approach" className="hover:text-primary transition-colors">Approach</a></li>
            <li><a href="#services" className="hover:text-primary transition-colors">Services</a></li>
            <li><a href="#booking" className="hover:text-primary transition-colors">Booking</a></li>
            <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
          </ul>
          <Button variant="hero" size="sm" asChild>
            <a href="#booking">Book Session</a>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;