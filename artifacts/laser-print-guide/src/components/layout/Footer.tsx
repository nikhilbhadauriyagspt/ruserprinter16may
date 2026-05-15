import { Link } from "wouter";
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export function Footer() {
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Subscribed!",
      description: "You've successfully joined our newsletter.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Newsletter strip */}
      <div className="border-b border-slate-800/80 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-[1100px] mx-auto">
            <div>
              <h3 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">Stay in the loop</h3>
              <p className="text-slate-400 mt-2 leading-relaxed">Subscribe to get printer guides, new arrivals, and special offers — straight to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 w-full">
              <Input
                type="email"
                placeholder="Enter your email address"
                required
                className="flex-1 h-12 bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-primary rounded-full px-5"
              />
              <Button type="submit" className="h-12 rounded-full px-6 bg-primary hover:bg-primary/90 text-white">
                Subscribe <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-14">
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src={`${import.meta.env.BASE_URL}logo/logo.png`} alt="Laser Print Guide" className="h-11 w-auto" />
            </Link>
            <p className="text-slate-400 mb-6 max-w-sm leading-relaxed">
              Laser Print Guide is your everyday store for printers and accessories. We make printing simpler with a curated catalog and clear, honest information for every workspace.
            </p>
            <div className="space-y-3 text-sm">
              <a href="mailto:info@laserprintguide.co" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <span className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-primary"><Mail className="w-4 h-4" /></span>
                info@laserprintguide.co
              </a>
              <a href="tel:+18005550199" className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors">
                <span className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-primary"><Phone className="w-4 h-4" /></span>
                +1 (800) 555-0199
              </a>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-primary"><MapPin className="w-4 h-4" /></span>
                Mon — Sat, 9am to 6pm
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className="hover:text-primary transition-colors">All Printers</Link></li>
              <li><Link href="/category/inkjet-printers" className="hover:text-primary transition-colors">Inkjet Printers</Link></li>
              <li><Link href="/category/laser-printers" className="hover:text-primary transition-colors">Laser Printers</Link></li>
              <li><Link href="/category/all-in-one-printers" className="hover:text-primary transition-colors">All-In-One Printers</Link></li>
              <li><Link href="/category/supertank-printers" className="hover:text-primary transition-colors">Supertank Printers</Link></li>
              <li><Link href="/category/printer-accessories" className="hover:text-primary transition-colors">Printer Accessories</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/faq" className="hover:text-primary transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Your Order</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/return-policy" className="hover:text-primary transition-colors">Return Policy</Link></li>
              <li><Link href="/wishlist" className="hover:text-primary transition-colors">My Wishlist</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Get in Touch</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Follow Us</h4>
            <p className="text-sm text-slate-400 mb-5 leading-relaxed">Join our community for tips, guides and the latest arrivals.</p>
            <div className="flex gap-3">
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-900 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-900 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-slate-900 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-slate-900 hover:bg-primary text-slate-300 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Laser Print Guide. All rights reserved.</p>
          <div className="flex gap-6 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
