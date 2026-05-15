import { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    
    try {
      const response = await fetch("https://api.inklivo.shop/public/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white text-slate-950">
      <SEO
        title="Contact Us | My Printer Master Support"
        description="Connect with our professional support team for detailed printer inquiries and order assistance. We are here to help you find the perfect printing solution."
      />

      {/* HERO */}
      <section className="bg-slate-50 px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
            Contact
          </span>
          <h1 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-[58px]">
            We're Here to Help.
          </h1>
          <p className="mx-auto mt-5 max-w-[720px] text-[16px] leading-8 text-slate-600 md:text-[17px]">
            Got a question about a printer? Need help with an order? Our team is ready to provide the answers you need.
          </p>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* LEFT INFO */}
          <aside className="bg-slate-50 p-8 md:p-10 rounded-3xl">
            <h2 className="text-[30px] font-semibold tracking-tight text-slate-950 md:text-[38px]">
              Get in Touch
            </h2>
            <p className="mt-4 text-[15px] leading-7 text-slate-600">
              We value clear communication and fast responses. Reach out through any of these channels and we'll get back to you as soon as possible.
            </p>
            <div className="mt-10 border-t border-slate-200 pt-8">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-white text-primary rounded-xl shadow-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Email Us
                  </p>
                  <a
                    href="mailto:info@myprintermaster.co"
                    className="mt-2 block text-[16px] font-semibold text-slate-950 hover:text-primary transition-colors"
                  >
                    info@myprintermaster.co
                  </a>
                </div>
              </div>
            </div>
          </aside>

          {/* FORM */}
          <div className="border border-slate-100 bg-white p-6 shadow-sm rounded-3xl md:p-10 lg:p-12">
            <div className="mb-10">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
                Send a Message
              </span>
              <h3 className="mt-3 text-[30px] font-semibold tracking-tight text-slate-950 md:text-[40px]">
                Tell Us What You Need
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-slate-600">
                Fill out the form below and our team will be in touch shortly.
              </p>
            </div>

            {status === "success" ? (
              <div className="bg-slate-50 px-6 py-16 text-center rounded-2xl">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-[32px] font-semibold text-slate-950">
                  Message Sent!
                </h4>
                <p className="mx-auto mt-4 max-w-[520px] text-[15px] leading-7 text-slate-600">
                  Thank you for reaching out. We have received your message and will respond within 24 hours.
                </p>
                <Button
                  onClick={() => setStatus("idle")}
                  size="lg"
                  className="mt-8 rounded-full"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    required 
                    className="bg-slate-50 border-slate-200" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required 
                      className="bg-slate-50 border-slate-200" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone (Optional)</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      className="bg-slate-50 border-slate-200" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <select 
                    id="subject" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <option>General Inquiry</option>
                    <option>Product Question</option>
                    <option>Order Support</option>
                    <option>Technical Help</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea 
                    id="message" 
                    required 
                    rows={6} 
                    className="bg-slate-50 border-slate-200 resize-none" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" size="lg" className="w-full md:w-auto rounded-full px-8" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                    {!isSubmitting && <Send className="w-4 h-4 ml-2" />}
                  </Button>
                  {status === "error" && (
                    <p className="mt-4 text-[13px] font-medium text-red-500">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
