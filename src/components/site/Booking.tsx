import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Check } from "lucide-react";

const Booking = () => {
  return (
    <section id="booking" className="relative py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-hero)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/20 blur-3xl" />

      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-primary-foreground">
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Booking</span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-light leading-tight">
              Begin your<br />
              <span className="italic text-gradient">transformation.</span>
            </h2>
            <p className="mt-6 text-primary-foreground/80 text-lg max-w-md leading-relaxed">
              Schedule a complimentary 20-minute discovery call. We'll map your goals and design a sustainable path forward — together. Proudly based in the Twin Cities, serving Minneapolis, St. Paul, and the greater Minnesota community.
            </p>

            <ul className="mt-8 space-y-3">
              {["No commitment required", "Direct line to your coach", "Personalized recommendations"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-primary-foreground/90">
                  <span className="h-6 w-6 rounded-full bg-accent/20 flex items-center justify-center">
                    <Check className="h-3.5 w-3.5 text-accent" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="glass rounded-3xl p-8 md:p-10 shadow-[var(--shadow-elegant)]">
            <h3 className="font-display text-2xl text-primary">Reserve Your Session</h3>
            <p className="text-sm text-muted-foreground mt-1">Select a time that works for you.</p>

            <div className="mt-8 space-y-4">
              {[
                { day: "Tomorrow", date: "May 3", times: ["9:00 AM", "11:30 AM", "3:00 PM"] },
                { day: "Monday", date: "May 4", times: ["8:00 AM", "1:00 PM", "5:30 PM"] },
                { day: "Wednesday", date: "May 6", times: ["10:00 AM", "2:00 PM"] },
              ].map((slot) => (
                <div key={slot.date} className="rounded-2xl border border-border bg-card/60 p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium text-primary">{slot.day}</div>
                      <div className="text-xs text-muted-foreground">{slot.date}</div>
                    </div>
                    <Calendar className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {slot.times.map((t) => (
                      <button
                        key={t}
                        className="text-xs font-medium px-3 py-2 rounded-full border border-border hover:border-accent hover:bg-accent/10 hover:text-primary transition-colors"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Button variant="hero" size="lg" className="mt-8 w-full">
              Confirm Booking
            </Button>

            <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><Clock className="h-3 w-3" /> 20 min</span>
              <span className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Studio or Virtual</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;