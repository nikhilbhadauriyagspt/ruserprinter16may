import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, ShieldCheck, MousePointer2, Heart, CheckCircle2, LayoutGrid, Zap } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useFeaturedProducts, useCategories, parseImages } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";
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
      <SEO title="Laser Print Guide — Printers & Accessories" />
      
      {/* Hero */}
      <section className="bg-slate-50 px-4 py-20 md:px-8 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1200px] text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
            Laser Print Guide
          </span>
          <h1 className="mt-4 text-[40px] font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-[64px]">
            Making Printing
            <br />
            Simpler For Everyone
          </h1>
          <p className="mx-auto mt-6 max-w-[620px] text-[16px] md:text-xl leading-8 text-slate-600">
            Laser Print Guide is built around a simple goal — to make choosing the right printing products easier. We keep things clear, straightforward, and easy to explore.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="rounded-full px-8 text-base">
              <Link href="/shop">Explore Products <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
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
              <Button variant="outline" size="icon" onClick={scrollPrev} className="rounded-full border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm">
                <ChevronRight className="w-5 h-5 rotate-180" />
              </Button>
              <Button variant="outline" size="icon" onClick={scrollNext} className="rounded-full border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-white shadow-sm">
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
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Browse by Category</h2>
            <p className="text-slate-500">Find exactly what you need.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories?.map(c => (
              <Link key={c.id} href={`/category/${c.slug}`} className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-square">
                <img src={`${import.meta.env.BASE_URL}category/${c.slug}.jpg`} alt={c.name} onError={(e) => (e.currentTarget.style.display = 'none')} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white font-medium text-lg leading-tight">
                  {c.name}
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
              <h4 className="text-lg font-bold text-slate-900 mb-2">No Confusion</h4>
              <p className="text-slate-500 text-sm">We provide simple descriptions without any jargon.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <MousePointer2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">No Pressure</h4>
              <p className="text-slate-500 text-sm">Explore at your own pace with total confidence.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Calm Experience</h4>
              <p className="text-slate-500 text-sm">A distraction-free interface for a smooth journey.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Dependable</h4>
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
            Get Started With Laser Print Guide
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
