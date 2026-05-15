import { Link } from "wouter";
import { Heart, Trash2, ShoppingCart } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { parseImages } from "@/lib/api";
import printer1 from "@/assets/printer1.png";

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleMoveToCart = (product: any) => {
    const images = parseImages(product.images);
    addToCart({
      product_id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image: images[0] || printer1,
      brand: product.brand_name,
    });
    removeFromWishlist(product.id);
    toast({
      title: "Moved to Cart",
      description: `${product.name} is ready for checkout.`,
    });
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <SEO title="Wishlist" />
      
      <div className="flex items-end justify-between mb-10 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Saved Equipment</h1>
          <p className="text-slate-500 mt-2">{items.length} items saved for later.</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <Heart className="w-8 h-8 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">No saved items</h2>
          <p className="text-slate-500 mb-8">Keep track of equipment you're considering by clicking the heart icon on any product.</p>
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link href="/shop">Browse Catalog</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((product) => {
            const images = parseImages(product.images);
            const imgSrc = images[0] || printer1;
            const price = Number(product.price);
            
            return (
              <div key={product.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm flex flex-col group hover:shadow-[0_10px_35px_rgba(15,23,42,0.06)] transition-all">
                <div className="relative aspect-square bg-slate-50 p-6">
                  <Link href={`/product/${product.slug}`}>
                    <img 
                      src={imgSrc} 
                      alt={product.name} 
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
                    />
                  </Link>
                  <button 
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full text-slate-400 hover:text-red-500 shadow-sm transition-colors border border-slate-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-5 flex flex-col flex-1 border-t border-slate-50">
                  <div className="text-xs font-mono text-slate-500 mb-1">{product.brand_name}</div>
                  <Link href={`/product/${product.slug}`} className="font-semibold text-slate-900 leading-tight mb-4 hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </Link>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-lg text-slate-900">
                      {price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </span>
                    <Button 
                      onClick={() => handleMoveToCart(product)}
                      size="sm" 
                      className="rounded-lg bg-slate-900 hover:bg-primary text-white transition-colors"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" /> Move to Cart
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
