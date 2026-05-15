import { Link } from "wouter";
import { SEO } from "@/components/SEO";
import { ArrowRight, CheckCircle2, ShieldCheck, MousePointer2, Heart, LayoutGrid, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const points = [
  "List products that are useful for everyday needs",
  "Present information in a clear and easy-to-read format",
  "Avoid unnecessary complexity and keep things simple",
];

const chooseUs = [
  {
    icon: ShieldCheck,
    title: "No Confusion",
    desc: "We provide simple descriptions without any jargon.",
  },
  {
    icon: MousePointer2,
    title: "No Pressure",
    desc: "Explore at your own pace with total confidence.",
  },
  {
    icon: Heart,
    title: "Calm Experience",
    desc: "A distraction-free interface for a smooth journey.",
  },
  {
    icon: CheckCircle2,
    title: "Dependable",
    desc: "Practical solutions designed for everyday use.",
  },
];

const approach = [
  {
    icon: LayoutGrid,
    title: "Clear Choices",
    desc: "Curated selection to save your time.",
  },
  {
    icon: Zap,
    title: "Straight Forward",
    desc: "Honest information without any noise.",
  },
  {
    icon: MousePointer2,
    title: "Smooth Experience",
    desc: "Distraction-free browsing experience.",
  },
];

export default function About() {
  return (
    <div className="bg-white text-slate-950">
      <SEO
        title="About Us | My Printer Master"
        description="My Printer Master makes choosing the right printing products easier with clear, straightforward choices and a smooth interface."
      />

      {/* HERO */}
      <section className="bg-slate-50 px-4 py-20 md:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
              About Us
            </span>

            <h1 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-[58px]">
              Making Printing
              <br />
              Simpler For Everyone
            </h1>

            <p className="mt-6 max-w-[620px] text-[16px] leading-8 text-slate-600">
              My Printer Master is built around a simple goal — to make choosing the
              right printing products easier. We keep things clear,
              straightforward, and easy to explore.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-slate-700 shadow-sm border border-slate-100">
                <CheckCircle2 size={18} className="text-primary" />
                Clear Choices
              </div>

              <div className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[14px] font-medium text-slate-700 shadow-sm border border-slate-100">
                <CheckCircle2 size={18} className="text-primary" />
                Straightforward Info
              </div>
            </div>

            <Button asChild size="lg" className="mt-10 rounded-full px-8 text-base">
              <Link href="/shop">Explore Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl translate-x-4 translate-y-4" />
            <img
              src={`${import.meta.env.BASE_URL}category/laser-printers.jpg`}
              alt="Simple printing solutions"
              className="relative h-auto w-full object-cover rounded-3xl bg-slate-950 shadow-xl p-8 mix-blend-multiply"
            />
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <div className="order-2 lg:order-1 relative rounded-3xl overflow-hidden bg-slate-100 p-12">
            <img
              src={`${import.meta.env.BASE_URL}category/all-in-one-printers.jpg`}
              alt="Honest printing product choices"
              className="h-auto w-full object-cover mix-blend-multiply opacity-50 scale-110"
            />
          </div>

          <div className="order-1 lg:order-2">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
              What We Do
            </span>

            <h2 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
              Honest And Simple Product Choices
            </h2>

            <p className="mt-5 text-[16px] leading-8 text-slate-600">
              We keep our approach honest and minimal, focusing on what truly
              matters to you.
            </p>

            <div className="mt-8 space-y-4">
              {points.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <CheckCircle2 size={17} />
                  </div>
                  <p className="text-[15px] leading-7 text-slate-600">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="bg-slate-50 px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 max-w-[760px]">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
              Why People Choose Us
            </span>

            <h2 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
              A Calm Shopping Experience
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {chooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon size={24} strokeWidth={2} />
                  </div>
                  <h3 className="text-[18px] font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-7 text-slate-500">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ORIGIN */}
      <section className="px-4 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1000px]">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm md:p-12">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
              Our Origin
            </span>

            <h2 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
              Why My Printer Master Started
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <p className="text-[16px] leading-8 text-slate-600">
                We started My Printer Master because we noticed how frustrating it
                was to find a reliable printer online. It had become a maze of
                confusing words, complicated descriptions, and options that just
                didn't last.
              </p>

              <p className="text-[16px] leading-8 text-slate-600">
                Our goal was simple: build a store where honesty comes first. A
                place where a small business owner or a student could find a
                dependable tool without feeling pressured or overwhelmed.
              </p>
            </div>

            <div className="mt-10 border-l-4 border-primary bg-primary/5 p-8 rounded-r-2xl">
              <p className="text-[20px] font-medium leading-relaxed text-slate-900 italic">
                “We don't just ship boxes; we provide the tools that help your
                ideas come to life on paper.”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="bg-slate-950 px-4 py-24 text-white md:px-8 lg:px-10">
        <div className="mx-auto max-w-[1200px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
            Our Approach
          </span>

          <h2 className="mt-4 text-[34px] font-semibold tracking-tight md:text-[46px]">
            Simple, Useful And Easy To Explore
          </h2>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {approach.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="bg-white/5 rounded-2xl p-10 border border-white/10">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                    <Icon size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-[20px] font-semibold">{item.title}</h3>
                  <p className="mt-4 text-[15px] leading-7 text-slate-400">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mx-auto mt-20 max-w-[760px] border-t border-white/10 pt-16">
            <h3 className="text-[26px] font-semibold">Who It's For</h3>
            <p className="mt-4 text-[18px] leading-8 text-slate-400">
              My Printer Master is designed for individuals and small businesses who
              want practical and dependable printing solutions for everyday use.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-24 text-center md:px-8 lg:px-10">
        <div className="mx-auto max-w-[900px]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
            Ready To Explore?
          </span>

          <h2 className="mt-4 text-[38px] font-semibold tracking-tight text-slate-950 md:text-[54px]">
            Get Started With My Printer Master
          </h2>

          <p className="mx-auto mt-5 max-w-[620px] text-[18px] leading-8 text-slate-600">
            You're welcome to explore our collection and find what works best
            for you.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8">
              <Link href="/shop">Start Shopping <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 bg-transparent text-slate-900 border-slate-200 hover:bg-slate-50">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}