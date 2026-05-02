import logo from "@/assets/atne-logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logo} alt="ATNE Performance" width={32} height={32} className="h-8 w-8" loading="lazy" />
          <div>
            <div className="font-display text-primary font-semibold">ATNE Performance</div>
            <div className="text-xs text-muted-foreground">Elevate. Restore. Become.</div>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} ATNE Performance. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;