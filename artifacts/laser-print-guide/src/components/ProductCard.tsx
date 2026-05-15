import { useState } from "react";
import { Link } from "wouter";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Product, parseImages } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import printer1 from "@/assets/printer1.png";

export function ProductCard({ product }: { product: Product }) {
  const images = parseImages(product.images);
  const [imgSrc, setImgSrc] = useState(images[0] || printer1);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const isWished = isInWishlist(product.id);
  const price = Number(product.price);
  const originalPrice = product.original_price ? Number(product.original_price) : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      product_id: product.id,
      name: product.name,
      price,
      image: imgSrc,
      brand: product.brand_name,
    });
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWished) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been saved.`,
      });
    }
  };

  return (
    <Link href={`/product/${product.slug}`} className="group relative flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm transition-all hover:shadow-[0_10px_35px_rgba(15,23,42,0.06)] hover:-translate-y-1">
      <div className="relative aspect-square bg-slate-50 overflow-hidden">
        <img
          src={imgSrc}
          alt={product.name}
          className="w-full h-full object-cover object-center mix-blend-multiply p-6 transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgSrc(printer1)}
        />
        
        {originalPrice && originalPrice > price && (
          <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white font-semibold">
            Sale
          </Badge>
        )}

        <button
          onClick={handleWishlistToggle}
          className={`absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200 transition-colors hover:bg-white shadow-sm z-10 ${isWished ? 'text-primary' : 'text-slate-400 hover:text-slate-900'}`}
        >
          <Heart className="w-4 h-4" fill={isWished ? "currentColor" : "none"} />
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2 z-10 bg-gradient-to-t from-black/50 to-transparent">
          <Button onClick={handleAddToCart} className="flex-1 bg-primary hover:bg-primary/90 text-white shadow-md">
            <ShoppingCart className="w-4 h-4 mr-2" /> Add
          </Button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-slate-900 leading-tight mb-2 line-clamp-2">{product.name}</h3>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-slate-400 line-through">
                {originalPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </span>
            )}
            <span className="font-bold text-lg text-slate-900">
              {price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
