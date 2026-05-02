import { studioLocation, fullAddress } from "@/config/location";
import { ExternalLink } from "lucide-react";

const StudioMap = () => {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(studioLocation.mapQuery)}&output=embed`;

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-[var(--shadow-elegant)] border border-border bg-muted">
      <iframe
        title={`${studioLocation.name} — ${studioLocation.city}, ${studioLocation.region}`}
        src={src}
        className="w-full h-[420px] border-0 block"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <a
        href={studioLocation.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 glass rounded-full px-4 py-2 text-xs font-medium text-primary shadow-[var(--shadow-glass)] flex items-center gap-1.5 hover:text-accent transition-colors"
      >
        <ExternalLink className="h-3 w-3" />
        Open in Maps
      </a>
      <div className="absolute top-4 left-4 glass rounded-2xl px-4 py-3 max-w-xs shadow-[var(--shadow-glass)]">
        <div className="text-xs uppercase tracking-widest text-accent font-semibold">Studio</div>
        <div className="font-display text-base text-primary mt-0.5">{studioLocation.name}</div>
        <div className="text-xs text-muted-foreground mt-1">{fullAddress}</div>
      </div>
    </div>
  );
};

export default StudioMap;