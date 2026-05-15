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
            <Link href="/" className="flex items-center gap-2 mb-6">
              <img src={`${import.meta.env.BASE_URL}logo/logo.png`} alt="Laser Print Guide" className="h-10 w-auto" />
            </Link>
            <p className="text-slate-400 mb-8 max-w-sm leading-relaxed">
              Curated catalog of printers, accessories, and honest information. Built for your everyday needs.
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
              <li><Link href="/shop" className="hover:text-primary transition-colors">All Printers</Link></li>
              <li><Link href="/category/laser-printers" className="hover:text-primary transition-colors">Laser Printers</Link></li>
              <li><Link href="/category/inkjet-printers" className="hover:text-primary transition-colors">Inkjet</Link></li>
              <li><Link href="/category/printer-accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-primary transition-colors">Shipping</Link></li>
              <li><Link href="/return-policy" className="hover:text-primary transition-colors">Returns</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-primary transition-colors">Terms</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-primary transition-colors">Cookies</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Laser Print Guide. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
