import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Heart, Search, Menu, X, Printer } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCategories, useBrands, useProducts } from "@/lib/api";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  const { data: categories } = useCategories();
  const { data: brands } = useBrands();
  
  // Quick search
  const { data: searchResults } = useProducts(searchQuery.length > 2 ? { search: searchQuery, limit: 5 } : undefined);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass py-3"
            : "bg-white/80 backdrop-blur-sm border-b border-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between gap-4 md:gap-8">
            {/* Mobile Menu */}
            <div className="md:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-slate-700">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-6 mt-8 text-lg font-medium text-slate-800">
                    <Link href="/">Home</Link>
                    <Link href="/shop">Shop All</Link>
                    
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Categories</span>
                      {categories?.map((c) => (
                        <Link key={c.id} href={`/category/${c.slug}`} className="text-slate-600 font-normal ml-2">
                          {c.name}
                        </Link>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Brands</span>
                      {brands?.map((b) => (
                        <Link key={b.id} href={`/brand/${b.slug}`} className="text-slate-600 font-normal ml-2">
                          {b.name}
                        </Link>
                      ))}
                    </div>
                    
                    <Link href="/contact">Contact</Link>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-slate-900 tracking-tight shrink-0">
              <Printer className="w-6 h-6 text-primary" />
              <span>Laser<span className="text-primary">Print</span>Guide</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-primary transition-colors outline-none cursor-pointer">
                  Categories
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white/90 backdrop-blur-xl border-slate-200">
                  {categories?.map((c) => (
                    <DropdownMenuItem key={c.id} asChild className="cursor-pointer hover:bg-slate-100">
                      <Link href={`/category/${c.slug}`} className="w-full">{c.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="hover:text-primary transition-colors outline-none cursor-pointer">
                  Brands
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-white/90 backdrop-blur-xl border-slate-200">
                  {brands?.map((b) => (
                    <DropdownMenuItem key={b.id} asChild className="cursor-pointer hover:bg-slate-100">
                      <Link href={`/brand/${b.slug}`} className="w-full">{b.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4 flex-1 justify-end">
              <div className="hidden lg:block relative max-w-xs w-full">
                <form onSubmit={handleSearch}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Search printers, toner..." 
                    className="pl-9 bg-slate-100/50 border-slate-200 focus-visible:ring-primary/20 rounded-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
                {searchQuery.length > 2 && searchResults && searchResults.length > 0 && (
                  <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                    {searchResults.map(p => (
                      <Link key={p.id} href={`/product/${p.slug}`} className="flex items-center gap-3 p-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0" onClick={() => setSearchQuery("")}>
                        <div className="w-10 h-10 bg-slate-100 rounded flex-shrink-0"></div>
                        <div className="flex-col overflow-hidden">
                          <p className="text-sm font-medium text-slate-900 truncate">{p.name}</p>
                          <p className="text-xs text-slate-500">{Number(p.price).toLocaleString('en-US', {style:'currency', currency:'USD'})}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/wishlist" className="relative p-2 text-slate-600 hover:text-primary transition-colors">
                <Heart className="w-5 h-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-slate-600 hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
    </>
  );
}
