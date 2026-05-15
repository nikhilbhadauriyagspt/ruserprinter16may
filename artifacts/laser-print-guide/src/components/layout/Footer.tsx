import { Link } from "wouter";
import { Mail, ArrowRight, Lock } from "lucide-react";
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
    <footer className="bg-white text-slate-600 border-t border-slate-200">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10 mb-14">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6" aria-label="My Printer Master Home">
              <img src={`${import.meta.env.BASE_URL}logo/logo.png`} alt="My Printer Master" className="h-11 w-auto" />
            </Link>
            <p className="text-slate-500 mb-8 max-w-sm leading-relaxed text-sm">
              We help small businesses and home offices get printing right without the usual hassle. Whether it's everyday documents or important work, you can count on clean, sharp results every time you print.
            </p>
            <div>
              <div className="text-slate-900 font-semibold mb-3 text-sm uppercase tracking-wider">Email Us</div>
              <a href="mailto:info@myprintermaster.co" className="inline-flex items-center gap-3 text-slate-600 hover:text-primary transition-colors text-sm" aria-label="Send us an email at info@myprintermaster.co">
                <span className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-primary"><Mail className="w-4 h-4" aria-hidden="true" /></span>
                info@myprintermaster.co
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-slate-900 font-semibold mb-6 text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-primary transition-colors">Shop</Link></li>
              <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-semibold mb-6 text-sm uppercase tracking-wider">Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/shop" className="hover:text-primary transition-colors">Printers</Link></li>
              <li><Link href="/category/inkjet-printers" className="hover:text-primary transition-colors">Inkjet Printers</Link></li>
              <li><Link href="/category/large-format-printers" className="hover:text-primary transition-colors">Large Format Printers</Link></li>
              <li><Link href="/category/printer-accessories" className="hover:text-primary transition-colors">Printer Accessories</Link></li>
              <li><Link href="/category/laser-printers" className="hover:text-primary transition-colors">Laser Printers</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h4 className="text-slate-900 font-semibold mb-6 text-sm uppercase tracking-wider">Newsletter</h4>
            <p className="text-sm text-slate-500 mb-5 leading-relaxed">
              Join our network and get simple updates about printing products and store news.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <label htmlFor="footer-newsletter" className="sr-only">Email address for newsletter</label>
              <Input
                id="footer-newsletter"
                type="email"
                placeholder="Email address"
                required
                aria-label="Email address for newsletter"
                className="h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus-visible:ring-primary rounded-xl"
              />
              <Button type="submit" className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 text-white" aria-label="Subscribe to newsletter">
                Subscribe Now <ArrowRight className="ml-2 w-4 h-4" aria-hidden="true" />
              </Button>
            </form>

            <div className="mt-6 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-slate-600 font-bold italic">PayPal</span>
              <span className="inline-flex items-center gap-1.5"><Lock className="w-3 h-3" aria-hidden="true" /> Encrypted Payments</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} My Printer Master. All rights reserved.</p>
          <div className="flex gap-x-6 gap-y-2 flex-wrap justify-center">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link href="/return-policy" className="hover:text-primary transition-colors">Return Policy</Link>
            <Link href="/shipping-policy" className="hover:text-primary transition-colors">Shipping Policy</Link>
            <Link href="/cookie-policy" className="hover:text-primary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
