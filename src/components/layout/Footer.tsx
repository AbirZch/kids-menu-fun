import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-display font-black text-base">S</span>
              </div>
              <span className="text-xl font-display font-extrabold text-accent-foreground tracking-tight">
                Sunny's Kitchen
              </span>
            </div>
            <p className="text-accent-foreground/50 max-w-md text-sm leading-relaxed">
              Serving delicious meals and creating happy memories for families since 1995.
              Come for the food, stay for the fun!
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-primary mb-4">Hours</h4>
            <ul className="space-y-2 text-accent-foreground/50 text-sm">
              <li>Mon – Thu: 11am – 9pm</li>
              <li>Fri – Sat: 11am – 10pm</li>
              <li>Sunday: 10am – 8pm</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider text-primary mb-4">Contact</h4>
            <ul className="space-y-2 text-accent-foreground/50 text-sm">
              <li>123 Main Street</li>
              <li>Austin, TX 78701</li>
              <li>(512) 555-1234</li>
            </ul>
            <div className="flex gap-3 mt-5">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-lg bg-accent-foreground/5 hover:bg-primary/20 flex items-center justify-center text-accent-foreground/40 hover:text-primary transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-accent-foreground/10 mt-10 pt-6 text-center text-xs text-accent-foreground/30">
          <p>© 2025 Sunny's Kitchen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
