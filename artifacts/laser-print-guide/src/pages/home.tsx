import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, ShieldCheck, Truck, HeadphonesIcon, RotateCcw } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useProducts, useCategories, parseImages } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import printer2 from "@/assets/printer2.png";
import paper1 from "@/assets/paper1.png";
import toner1 from "@/assets/toner1.png";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: products, isLoading: isLoadingProducts } = useProducts({ limit: 8 });
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
      <SEO title="Precision Laser Printers & Accessories" />
      
      {/* Hero Bento Grid */}
      <section className="container mx-auto px-4 md:px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 auto-rows-[minmax(180px,auto)]">
          {/* Main Hero Card */}
          <div className="md:col-span-8 md:row-span-2 relative rounded-3xl overflow-hidden bg-slate-950 flex flex-col justify-end p-8 md:p-12 shadow-[0_10px_35px_rgba(15,23,42,0.06)] group">
            <div className="absolute inset-0 z-0">
              <img src={printer2} alt="High-end printer" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700 ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
            </div>
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 text-xs font-bold tracking-wider uppercase mb-4 backdrop-blur-md">Professional Grade</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 leading-[1.1]">
                Precision printing for <br className="hidden md:block"/> serious professionals.
              </h1>
              <p className="text-slate-300 text-lg md:text-xl mb-8 max-w-lg">
                Curated industrial laser printers and premium accessories built for high-volume, flawless execution.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 text-base">
                  <Link href="/shop">Shop Collection</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white backdrop-blur-md text-base">
                  <Link href="/category/printers">Browse Printers</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Secondary Bento 1 */}
          <Link href="/category/toner" className="md:col-span-4 rounded-3xl overflow-hidden bg-slate-100 relative p-6 flex flex-col shadow-[0_10px_35px_rgba(15,23,42,0.06)] group hover:-translate-y-1 transition-transform">
            <div className="absolute top-0 right-0 w-32 h-32 opacity-40 translate-x-8 -translate-y-8 mix-blend-multiply group-hover:scale-110 transition-transform duration-500">
              <img src={toner1} alt="Toner" className="w-full h-full object-contain" />
            </div>
            <div className="relative z-10 mt-auto">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">High-Yield Toner</h3>
              <p className="text-slate-600 mb-4 text-sm">Crisp blacks and vibrant colors that last longer.</p>
              <span className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all">Shop Toner <ArrowRight className="w-4 h-4 ml-1" /></span>
            </div>
          </Link>

          {/* Secondary Bento 2 */}
          <Link href="/category/accessories" className="md:col-span-4 rounded-3xl overflow-hidden bg-primary/5 relative p-6 flex flex-col shadow-[0_10px_35px_rgba(15,23,42,0.06)] group hover:-translate-y-1 transition-transform border border-primary/10">
            <div className="absolute bottom-0 right-0 w-40 h-40 opacity-40 translate-x-4 translate-y-12 mix-blend-multiply group-hover:scale-110 transition-transform duration-500">
              <img src={paper1} alt="Paper" className="w-full h-full object-contain" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Premium Media</h3>
              <p className="text-slate-600 mb-4 text-sm">Specialty paper and cardstock for perfect finish.</p>
              <span className="flex items-center text-primary font-semibold text-sm group-hover:gap-2 transition-all mt-auto">View Accessories <ArrowRight className="w-4 h-4 ml-1" /></span>
            </div>
          </Link>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Best Sellers</h2>
              <p className="text-slate-500">Our most trusted equipment.</p>
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
                products?.map(product => (
                  <div key={product.id} className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4">
                    <ProductCard product={product} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banners */}
      <section className="py-20 border-y border-slate-100 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Authorized Dealer</h4>
              <p className="text-slate-500 text-sm">Full manufacturer warranties on all equipment.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <Truck className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Fast, Safe Freight</h4>
              <p className="text-slate-500 text-sm">Specialized handling for delicate printing machinery.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <HeadphonesIcon className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">Expert Support</h4>
              <p className="text-slate-500 text-sm">Setup assistance from certified print technicians.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 text-primary">
                <RotateCcw className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-2">30-Day Returns</h4>
              <p className="text-slate-500 text-sm">Hassle-free returns on unused consumables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-950 z-0"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-8 md:p-16 border-white/10 bg-slate-900/50">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Need personalized guidance?</h2>
            <p className="text-slate-300 text-lg mb-10">
              Finding the right commercial printer is a big investment. Our print specialists are ready to help you match equipment to your exact volume and media needs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto rounded-full px-8">
                <Link href="/contact">Talk to a Specialist</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8 bg-transparent text-white border-white/20 hover:bg-white/10 hover:text-white">
                <Link href="/faq">Read our FAQ</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
