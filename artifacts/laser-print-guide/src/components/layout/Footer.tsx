import { Link } from "wouter";
import { Printer, Mail, MapPin, Phone } from "lucide-react";
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
    <footer className="bg-slate-950 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-white tracking-tight mb-6">
              <Printer className="w-6 h-6 text-primary" />
              <span>Laser<span className="text-primary">Print</span>Guide</span>
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
              The professional's choice for industrial laser printers, accessories, and expert guidance. Built for precision.
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-primary"
              />
              <Button type="submit" variant="default" className="bg-primary hover:bg-primary/90 text-white">Subscribe</Button>
            </form>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/category/printers" className="hover:text-primary transition-colors">Printers</Link></li>
              <li><Link href="/category/toner" className="hover:text-primary transition-colors">Toner & Ink</Link></li>
              <li><Link href="/category/accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/policies/shipping" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/policies/return" className="hover:text-primary transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="text-sm">123 Industrial Pkwy<br/>Tech District, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="text-sm">+1 (800) 555-PRINT</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-500 shrink-0" />
                <span className="text-sm">support@laserprintguide.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Laser Print Guide. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/policies/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/policies/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
