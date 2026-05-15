import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Heart, Search, Menu, User, LogOut, Package } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/lib/api";
import { CartDrawer } from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout } = useAuth();

  
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
        <div className="w-full px-4 md:px-8">
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
                    <Link href="/about">About</Link>
                    <Link href="/track-order">Track Order</Link>
                    <Link href="/faq">FAQ</Link>
                    <Link href="/contact">Contact</Link>
                    <div className="border-t border-slate-200 pt-6 flex flex-col gap-4">
                      {isAuthenticated ? (
                        <>
                          <div className="text-sm text-slate-500">Signed in as <span className="font-semibold text-slate-900">{user?.name}</span></div>
                          <button onClick={logout} className="text-left text-rose-600">Sign Out</button>
                        </>
                      ) : (
                        <>
                          <Link href="/login">Sign In</Link>
                          <Link href="/signup">Create Account</Link>
                        </>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img src={`${import.meta.env.BASE_URL}logo/logo.png`} alt="My Printer Master" className="h-10 w-auto" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/track-order" className="hover:text-primary transition-colors">Track Order</Link>
              <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
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

              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors text-sm font-medium text-slate-700">
                      <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                      <span className="max-w-[100px] truncate">{user?.name?.split(" ")[0]}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="font-semibold">{user?.name}</div>
                      <div className="text-xs font-normal text-slate-500 truncate">{user?.email}</div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/track-order"><Package className="w-4 h-4 mr-2" /> Track Order</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/wishlist"><Heart className="w-4 h-4 mr-2" /> My Wishlist</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-rose-600 focus:text-rose-600">
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-slate-600 hover:text-primary transition-colors">
                  <User className="w-4 h-4" /> Sign In
                </Link>
              )}

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
