import { useState } from "react";
import { useParams, Link } from "wouter";
import { Heart, ShoppingCart, Check, ShieldCheck, Truck, ChevronRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useProduct, useProducts, parseImages } from "@/lib/api";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/ProductCard";
import printer1 from "@/assets/printer1.png";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, error } = useProduct(slug || "");
  const { data: relatedProducts } = useProducts({ category: product?.category_id, limit: 4 });
  
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          <div className="aspect-square bg-slate-100 rounded-3xl"></div>
          <div className="space-y-6 pt-6">
            <div className="h-4 w-24 bg-slate-100 rounded"></div>
            <div className="h-10 w-3/4 bg-slate-100 rounded"></div>
            <div className="h-8 w-32 bg-slate-100 rounded"></div>
            <div className="space-y-2 mt-8">
              <div className="h-4 bg-slate-100 rounded"></div>
              <div className="h-4 w-5/6 bg-slate-100 rounded"></div>
              <div className="h-4 w-4/6 bg-slate-100 rounded"></div>
            </div>
            <div className="h-14 w-full bg-slate-100 rounded-xl mt-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <Button asChild><Link href="/shop">Back to Shop</Link></Button>
      </div>
    );
  }

  const images = parseImages(product.images);
  const displayImages = images.length > 0 ? images : [printer1];
  const price = Number(product.price);
  const originalPrice = product.original_price ? Number(product.original_price) : null;
  const isWished = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      name: product.name,
      price,
      quantity,
      image: displayImages[0],
      brand: product.brand_name,
    });
    toast({
      title: "Added to Cart",
      description: `${quantity}x ${product.name} has been added.`,
    });
  };

  const handleWishlistToggle = () => {
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
    <div className="bg-white">
      <SEO title={product.name} description={product.description.replace(/<[^>]*>?/gm, '').substring(0, 160)} />
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-6 py-6 border-b border-slate-100">
        <div className="flex items-center text-sm text-slate-500 gap-2 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <Link href="/shop" className="hover:text-primary">{product.category_name}</Link>
          <ChevronRight className="w-4 h-4 shrink-0" />
          <span className="text-slate-900 font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Gallery */}
          <div className="flex flex-col gap-4">
            <div className="aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 relative group flex items-center justify-center p-8">
              <img 
                src={displayImages[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = printer1;
                }}
              />
              {originalPrice && originalPrice > price && (
                <Badge className="absolute top-6 left-6 bg-red-500 text-white font-semibold px-3 py-1 text-sm">
                  Sale
                </Badge>
              )}
            </div>
            
            {displayImages.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {displayImages.map((img, i) => (
                  <button 
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 overflow-hidden bg-slate-50 flex items-center justify-center p-2 transition-all ${activeImage === i ? 'border-primary shadow-sm' : 'border-slate-100 hover:border-slate-300 opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${i+1}`} className="w-full h-full object-contain mix-blend-multiply" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col pt-2 md:pt-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-8 pb-8 border-b border-slate-100">
              <span className="text-4xl font-bold text-slate-900 tracking-tight">
                {price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </span>
              {originalPrice && originalPrice > price && (
                <span className="text-xl text-slate-400 line-through mb-1">
                  {originalPrice.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </span>
              )}
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-200 rounded-xl bg-white h-14">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-5 h-full text-slate-500 hover:text-slate-900 transition-colors font-medium text-lg"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-slate-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-5 h-full text-slate-500 hover:text-slate-900 transition-colors font-medium text-lg"
                  >
                    +
                  </button>
                </div>
                
                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className="flex-1 h-14 rounded-xl text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                </Button>
                
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={handleWishlistToggle}
                  className={`h-14 w-14 rounded-xl shrink-0 border-slate-200 ${isWished ? 'text-primary bg-primary/5 border-primary/20' : 'text-slate-500 hover:text-slate-900'}`}
                >
                  <Heart className="w-6 h-6" fill={isWished ? "currentColor" : "none"} />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <ShieldCheck className="w-5 h-5 text-primary" /> Easy Return
              </div>
              <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                <Truck className="w-5 h-5 text-primary" /> Free Shipping
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <section className="bg-slate-50 py-16 md:py-24 border-t border-slate-100">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-10">You might also need</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.filter(p => p.id !== product.id).slice(0, 4).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
