import { UtensilsCrossed, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-xl font-display">Sunny's Kitchen</span>
            </div>
            <p className="text-primary-foreground/80 max-w-md">
              Serving delicious meals and creating happy memories for families since 1995. 
              Come for the food, stay for the fun!
            </p>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-display text-lg mb-3">Hours</h4>
            <ul className="space-y-1 text-primary-foreground/80 text-sm">
              <li>Mon - Thu: 11am - 9pm</li>
              <li>Fri - Sat: 11am - 10pm</li>
              <li>Sunday: 10am - 8pm</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg mb-3">Contact</h4>
            <ul className="space-y-1 text-primary-foreground/80 text-sm">
              <li>123 Main Street</li>
              <li>Austin, TX 78701</li>
              <li>(512) 555-1234</li>
            </ul>
            <div className="flex gap-3 mt-4">
              <a href="#" className="hover:text-sunshine transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-sunshine transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-sunshine transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/60">
          <p>© 2024 Sunny's Kitchen. All rights reserved. Made with ❤️ for families.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
