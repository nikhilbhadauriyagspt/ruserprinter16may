import { useState, useMemo } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { Filter, SlidersHorizontal, ChevronDown, Search } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useProducts, useCategories, useBrands } from "@/lib/api";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

interface ShopProps {
  categorySlug?: string;
  brandSlug?: string;
}

export default function Shop({ categorySlug, brandSlug }: ShopProps) {
  const searchParams = new URLSearchParams(useSearch());
  const initialSearch = searchParams.get("search") || "";
  
  const [sort, setSort] = useState("newest");
  const [, setLocation] = useLocation();

  const { data: products, isLoading, error } = useProducts({ 
    category: categorySlug,
    search: initialSearch
  });
  
  const { data: categories } = useCategories();
  const { data: brands } = useBrands();

  const filteredAndSortedProducts = useMemo(() => {
    if (!products) return [];
    
    let result = [...products];

    // Brand filter if viewing a brand page
    if (brandSlug) {
      result = result.filter(p => p.brand_name.toLowerCase().replace(/\s+/g, '-') === brandSlug);
    }

    // Sort
    if (sort === "price-asc") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sort === "price-desc") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }
    // "newest" is default from API conceptually
    
    return result;
  }, [products, brandSlug, sort]);

  const pageTitle = categorySlug 
    ? categories?.find(c => c.slug === categorySlug)?.name || "Category"
    : brandSlug
      ? brands?.find(b => b.slug === brandSlug)?.name || "Brand"
      : initialSearch
        ? `Search results for "${initialSearch}"`
        : "Shop All Equipment";

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Categories</h4>
        <ul className="space-y-3">
          <li>
            <Link 
              href="/shop" 
              className={`text-sm hover:text-primary transition-colors ${!categorySlug ? 'text-primary font-medium' : 'text-slate-600'}`}
            >
              All Categories
            </Link>
          </li>
          {categories?.map(c => (
            <li key={c.id}>
              <Link 
                href={`/category/${c.slug}`} 
                className={`text-sm hover:text-primary transition-colors ${categorySlug === c.slug ? 'text-primary font-medium' : 'text-slate-600'}`}
              >
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h4 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wider">Brands</h4>
        <ul className="space-y-3">
          <li>
            <Link 
              href="/shop" 
              className={`text-sm hover:text-primary transition-colors ${!brandSlug ? 'text-primary font-medium' : 'text-slate-600'}`}
            >
              All Brands
            </Link>
          </li>
          {brands?.map(b => (
            <li key={b.id}>
              <Link 
                href={`/brand/${b.slug}`} 
                className={`text-sm hover:text-primary transition-colors ${brandSlug === b.slug ? 'text-primary font-medium' : 'text-slate-600'}`}
              >
                {b.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <SEO title={pageTitle} />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">{pageTitle}</h1>
          <p className="text-slate-500 mt-2">{filteredAndSortedProducts?.length || 0} products found</p>
        </div>
        
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Mobile Filter Toggle */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Filter className="w-4 h-4 mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <SheetHeader className="mb-6">
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <FilterContent />
            </SheetContent>
          </Sheet>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Sort: {sort === 'newest' ? 'Newest' : sort === 'price-asc' ? 'Price: Low to High' : 'Price: High to Low'}
                <ChevronDown className="w-4 h-4 ml-2 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="newest">Newest Arrivals</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-asc">Price: Low to High</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="price-desc">Price: High to Low</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex gap-10">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 space-y-8 sticky top-24 self-start">
          <FilterContent />
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 h-[350px] animate-pulse border border-slate-100">
                  <div className="w-full aspect-square bg-slate-100 rounded-xl mb-4"></div>
                  <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
                  <div className="h-6 bg-slate-100 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Failed to load products</h3>
              <p className="text-slate-500 mb-6">There was an error connecting to the catalog.</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No products found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your filters or search query.</p>
              <Button variant="outline" asChild>
                <Link href="/shop">Clear Filters</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
