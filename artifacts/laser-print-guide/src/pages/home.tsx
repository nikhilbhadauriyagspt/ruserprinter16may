import { Link } from "wouter";
import { ChevronRight, ArrowRight, ShieldCheck, MousePointer2, Heart, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useFeaturedProducts, useCategories } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: featuredProducts, isLoading: isLoadingProducts } = useFeaturedProducts();
  const { data: categories } = useCategories();

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, dragFree: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="flex flex-col min-h-screen">
      <SEO title="My Printer Master — Premium Printers & Accessories" />
      
      {/* Hero Banner */}
      <section className="bg-white">
        <img
          src={`${import.meta.env.BASE_URL}hero-banner.png`}
          alt="Print More, Achieve More — High Performance Printers for Every Business"
          className="block w-full h-auto"
        />
      </section>

      {/* About Section */}
      <section className="py-20 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-[1200px] mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-slate-100 aspect-[4/5] flex items-center justify-center p-6">
                  <img src={`${import.meta.env.BASE_URL}category/laser-printers.jpg`} alt="Laser Printers" className="w-full h-full object-contain" />
                </div>
                <div className="rounded-2xl bg-primary/95 text-white p-6 aspect-square flex flex-col justify-between">
                  <div className="text-4xl font-bold">200+</div>
                  <div className="text-sm font-medium opacity-90">Printer models hand-picked for everyday reliability.</div>
                </div>
              </div>
              <div className="space-y-4 mt-10">
                <div className="rounded-2xl bg-slate-900 text-white p-6 aspect-square flex flex-col justify-between">
                  <div className="text-4xl font-bold">10+</div>
                  <div className="text-sm font-medium opacity-80">Printer categories — from inkjet and laser to thermal and large format.</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-100 aspect-[4/5] flex items-center justify-center p-6">
                  <img src={`${import.meta.env.BASE_URL}category/inkjet-printers.jpg`} alt="Inkjet Printers" className="w-full h-full object-contain" />
                </div>
              </div>
            </div>
            <div>
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">About Our Store</span>
              <h1 className="mt-4 text-[34px] md:text-[44px] font-semibold tracking-tight text-slate-950 leading-[1.1]">
                Quality printing solutions,<br />from home to office.
              </h1>
              <p className="mt-6 text-slate-600 leading-7 text-[16px]">
                We started My Printer Master because choosing the right equipment shouldn't feel overwhelming. Whether you're setting up a home study, a small business, or a busy workspace — we help you cut through the jargon and find the solution that just works.
              </p>
              <p className="mt-4 text-slate-600 leading-7 text-[16px]">
                Every item in our collection is curated, clearly described, and backed by professional support. No pressure, no fine print — just honest help with your next hardware setup.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Quality Picks</div>
                    <div className="text-sm text-slate-500">Carefully selected for reliability.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Heart className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Honest Advice</div>
                    <div className="text-sm text-slate-500">Clear specs, no marketing fluff.</div>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="mt-8 rounded-full px-7">
                <Link href="/about">Read Our Story <ArrowRight className="ml-2 w-4 h-4" /></Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Featured Products</h2>
              <p className="text-slate-500">Carefully curated selection for your everyday needs.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm" aria-label="Previous products">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </Button>
              <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm" aria-label="Next products">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {isLoadingProducts ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4">
                    <div className="bg-white rounded-2xl p-4 h-[350px] animate-pulse">
                      <div className="w-full aspect-square bg-slate-100 rounded-xl mb-4"></div>
                      <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
                      <div className="h-6 bg-slate-100 rounded w-3/4"></div>
                    </div>
                  </div>
                ))
              ) : (
                featuredProducts?.slice(0,8).map(product => (
                  <div key={product.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4">
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">Shop by Category</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Find the right device</h2>
              <p className="text-slate-500 mt-2 max-w-md">From everyday inkjet units to high-volume laser hardware — choose the type that fits your workflow.</p>
            </div>
            <Button asChild variant="outline" className="rounded-full self-start md:self-end border-slate-200">
              <Link href="/shop">View All <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {categories?.slice(0, 8).map(c => (
              <Link key={c.id} href={`/category/${c.slug}`} className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 aspect-square border border-slate-100 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300" aria-label={`Shop ${c.name}`}>
                <img
                  src={`${import.meta.env.BASE_URL}category/${c.slug}.jpg`}
                  alt={c.name}
                  onError={(e) => (e.currentTarget.style.display = 'none')}
                  className="absolute inset-0 w-full h-full object-contain p-8 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-white via-white/90 to-transparent">
                  <div className="font-semibold text-slate-900 text-sm md:text-base leading-tight">{c.name}</div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Shop now <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Banners */}
      <section className="py-20 border-y border-slate-100 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12 text-center">
            <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">Why People Choose Us</span>
            <h2 className="mt-4 text-[34px] font-semibold tracking-tight text-slate-950 md:text-[46px]">
              A Calm Shopping Experience
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Confusion</h3>
              <p className="text-slate-500 text-sm">We provide simple descriptions without any jargon.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">No Pressure</h3>
              <p className="text-slate-500 text-sm">Explore at your own pace with total confidence.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Calm Experience</h3>
              <p className="text-slate-500 text-sm">A distraction-free interface for a smooth journey.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Dependable</h3>
              <p className="text-slate-500 text-sm">Practical solutions designed for everyday use.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-950 text-white text-center px-4">
        <div className="container mx-auto max-w-[900px]">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
            Ready To Explore?
          </span>
          <h2 className="mt-4 text-[38px] font-semibold tracking-tight md:text-[54px]">
            Get Started With My Printer Master
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[16px] leading-8 text-slate-400">
            You're welcome to explore our collection and find what works best for you.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8 bg-white text-slate-950 hover:bg-slate-100">
              <Link href="/shop">Start Shopping <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
