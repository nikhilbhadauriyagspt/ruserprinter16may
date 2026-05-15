import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast({
        title: "Message Sent",
        description: "We've received your inquiry and will respond within 1 business day.",
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <SEO title="Contact Us" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        
        {/* Info Column */}
        <div className="lg:col-span-5 space-y-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">Get in Touch</h1>
            <p className="text-lg text-slate-500 leading-relaxed">
              Need help selecting a printer? Have questions about freight delivery? Our dedicated print specialists are here to provide expert guidance.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Sales & Support</h3>
                <p className="text-slate-600 mb-1">+1 (800) 555-PRINT</p>
                <p className="text-sm text-slate-400">Mon-Fri from 8am to 5pm PST.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Email Us</h3>
                <p className="text-slate-600 mb-1">support@laserprintguide.com</p>
                <p className="text-sm text-slate-400">We aim to respond within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">Headquarters</h3>
                <p className="text-slate-600">
                  123 Industrial Pkwy<br />
                  Tech District, CA 90210
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" required className="bg-slate-50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required className="bg-slate-50" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" required className="bg-slate-50" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input id="company" className="bg-slate-50" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <select 
                  id="subject" 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <option>Equipment Inquiry</option>
                  <option>Order Status</option>
                  <option>Technical Support</option>
                  <option>Returns/Refunds</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  required 
                  rows={5} 
                  className="bg-slate-50 resize-none" 
                  placeholder="How can we help you?"
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full rounded-xl" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
