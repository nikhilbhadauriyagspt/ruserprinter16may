import { useState } from "react";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";
import { ShieldCheck, Truck, Info, RotateCcw, Plus, Minus, ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faqs = [
  {
    category: "Orders & Purchasing",
    icon: ShieldCheck,
    questions: [
      {
        q: "How do I place an order for a printer?",
        a: "To place an order, select your preferred printer, add it to your cart, and complete checkout with your shipping and payment details.",
      },
      {
        q: "Is an account required to shop?",
        a: "No, you can place an order as a guest. Creating an account simply makes it easier to manage future orders and preferences.",
      },
      {
        q: "How can I check my order status?",
        a: "After placing your order, you will receive confirmation details. You can also use the order tracking option available on the website.",
      },
      {
        q: "What payment methods are supported?",
        a: "We accept major payment methods through secure checkout so your transactions remain protected and dependable.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    icon: Truck,
    questions: [
      {
        q: "Where do you ship to?",
        a: "We currently offer shipping across the United States for both residential and business locations.",
      },
      {
        q: "How long does delivery take?",
        a: "Standard delivery usually takes around 3 to 7 business days depending on your location and order details.",
      },
      {
        q: "How can I track my shipment?",
        a: "Once your order is dispatched, tracking details are shared so you can follow the shipment status.",
      },
    ],
  },
  {
    category: "Printer Information",
    icon: Info,
    questions: [
      {
        q: "Are all printers original and new?",
        a: "Yes, we provide brand-new printers in original packaging so customers receive products in proper condition.",
      },
      {
        q: "Is there a warranty provided?",
        a: "Most printers include manufacturer warranty coverage. Warranty details may vary depending on the specific product model.",
      },
      {
        q: "Are original ink and toner available?",
        a: "Yes, we also offer printing supplies for many of the models available in our catalog.",
      },
    ],
  },
  {
    category: "Returns & Support",
    icon: RotateCcw,
    questions: [
      {
        q: "What is your return policy?",
        a: "Unused products in original condition may be returned within the allowed return window, subject to our return policy terms.",
        linkText: "return policy",
        linkTo: "/return-policy"
      },
      {
        q: "What if the machine arrives with issues?",
        a: "If your order arrives damaged or has a problem, please contact support as soon as possible so we can guide you through the next steps.",
      },
    ],
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(faqs[0].category);

  const currentCategoryData = faqs.find((f) => f.category === activeCategory);
  const filteredFaqs = currentCategoryData?.questions || [];

  return (
    <div className="bg-white text-slate-950">
      <SEO
        title="FAQ | Laser Print Guide"
        description="Find instant answers to common questions about orders, shipping, and printer setups."
      />

      {/* HERO */}
      <section className="bg-slate-50 px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
            FAQ
          </span>
          <h1 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-[58px]">
            Common Questions
          </h1>
          <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-8 text-slate-600 md:text-[17px]">
            Find instant answers about orders, shipping, and printer setups. We've organized everything to make your experience smoother.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1450px] grid-cols-1 gap-10 lg:grid-cols-[320px_minmax(0,1fr)]">
          {/* LEFT SIDEBAR */}
          <aside className="h-fit bg-slate-50 p-6 rounded-2xl">
            <h2 className="mb-6 text-[14px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Topic Groups
            </h2>

            <div className="flex flex-col gap-3">
              {faqs.map((f) => (
                <button
                  key={f.category}
                  onClick={() => setActiveCategory(f.category)}
                  className={cn(
                    "flex items-center gap-4 px-5 py-4 text-left transition rounded-xl",
                    activeCategory === f.category
                      ? "bg-slate-950 text-white"
                      : "bg-white text-slate-700 hover:bg-slate-100"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-lg",
                      activeCategory === f.category
                        ? "bg-white/10"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    <f.icon size={20} />
                  </div>
                  <span className="text-[14px] font-medium leading-snug">
                    {f.category}
                  </span>
                </button>
              ))}
            </div>

            {/* HELP BOX */}
            <div className="mt-8 bg-slate-950 p-7 text-white rounded-2xl">
              <h3 className="text-[24px] font-semibold tracking-tight">
                Still Unsure?
              </h3>
              <p className="mt-4 text-[14px] leading-7 text-slate-400">
                If you couldn't find your answer here, our team is happy to help you personally.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex h-12 items-center justify-center gap-2 bg-white rounded-full px-6 text-[14px] font-medium text-slate-950 transition hover:bg-slate-200"
              >
                Contact Us
                <ArrowRight size={17} />
              </Link>
            </div>
          </aside>

          {/* FAQ ACCORDION */}
          <main>
            <div className="mb-10">
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
                Viewing Category
              </span>
              <h2 className="mt-3 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
                {activeCategory}
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <Accordion type="single" collapsible className="w-full">
                {filteredFaqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-slate-100 py-2">
                    <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary hover:no-underline data-[state=open]:text-primary">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 text-base leading-relaxed pt-2 pb-6">
                      {faq.a}
                      {faq.linkText && faq.linkTo && (
                        <> (link <Link href={faq.linkTo} className="text-primary hover:underline">{faq.linkText}</Link>)</>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </main>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 px-4 py-20 text-center md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1000px]">
          <h2 className="text-[38px] font-semibold tracking-tight text-slate-950 md:text-[54px]">
            Need More Assistance?
          </h2>
          <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-8 text-slate-600">
            Our professional support team is available to help you with printer setups and order inquiries.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-14 w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-8 text-[14px] font-medium text-white transition hover:bg-slate-800 sm:w-auto"
            >
              Contact Us
              <ArrowRight size={17} />
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-14 w-full items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-[14px] font-medium text-slate-900 transition hover:bg-slate-50 sm:w-auto"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
