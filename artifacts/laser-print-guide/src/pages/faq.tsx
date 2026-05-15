import { SEO } from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    q: "How do I choose between an inkjet and a laser printer?",
    a: "Laser printers excel at high-volume, text-heavy printing and produce crisp, smudge-proof documents rapidly. Inkjet printers are generally better for high-quality photo printing and media versatility. For office environments or businesses printing hundreds of pages monthly, laser is almost always the more cost-effective and reliable choice."
  },
  {
    q: "What is your return policy on commercial equipment?",
    a: "We offer a 30-day return window for unopened, unused printers and consumables. Due to the nature of industrial equipment, opened printers subject to a 15% restocking fee. Custom-configured or specialty-ordered machines are non-returnable. Please contact support before initiating any return."
  },
  {
    q: "Do you offer freight shipping for large printers?",
    a: "Yes. All our freestanding and high-capacity floor models are shipped via specialized LTL freight carriers to ensure safe transit. Standard shipping is free on orders over $500. Inside delivery and liftgate service require an additional fee selected at checkout."
  },
  {
    q: "Are the toner cartridges you sell OEM or compatible?",
    a: "We proudly sell 100% OEM (Original Equipment Manufacturer) toner cartridges. While compatible options exist on the market, we believe OEM consumables are essential for maintaining the longevity, warranty status, and output quality of professional-grade laser printers."
  },
  {
    q: "How long does standard shipping take?",
    a: "Orders placed before 2 PM PST typically ship the same day. Standard ground delivery takes 2-5 business days depending on your location. Freight shipments may take 5-10 business days and require a scheduled delivery appointment."
  },
  {
    q: "Do you offer leasing or financing options?",
    a: "We currently do not offer direct financing. We accept all major credit cards and PayPal. Many of our B2B customers utilize third-party equipment financing companies, and we are happy to provide pro-forma invoices to facilitate those transactions."
  },
  {
    q: "What kind of warranty comes with a new printer?",
    a: "All printers come with the standard manufacturer's warranty, which is typically 1 year for desktop models and up to 3 years for industrial models. Warranty specifics are listed on each product's detail page."
  },
  {
    q: "I need help setting up my network printer. Can you help?",
    a: "We provide expert guidance to help you select the right machine, but we do not provide on-site IT installation. Most modern laser printers feature straightforward network setup wizards. We recommend consulting your internal IT team or a local managed service provider for complex network integrations."
  }
];

export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <SEO title="Frequently Asked Questions" />
      
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <HelpCircle className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Everything you need to know about our equipment, shipping, and policies.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm">
        <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-slate-100 py-2">
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary hover:no-underline data-[state=open]:text-primary">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-slate-600 text-base leading-relaxed pt-2 pb-6">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      
      <div className="mt-12 text-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
        <h3 className="font-bold text-slate-900 mb-2">Still have questions?</h3>
        <p className="text-slate-500 mb-4">Our print specialists are here to help.</p>
        <a href="/contact" className="text-primary font-semibold hover:underline">Contact Support &rarr;</a>
      </div>
    </div>
  );
}
