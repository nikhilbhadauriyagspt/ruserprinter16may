import { Link } from "wouter";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  const shipping = 0;
  const total = subtotal;

  return (
    <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
      <SEO title="Your Cart" />
      
      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-10">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-slate-300" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Your cart is empty</h2>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">Browse our collection of industrial printers and high-yield accessories to find what you need.</p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/shop">Explore Equipment</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-slate-100 text-sm font-semibold text-slate-500 uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-3 text-right">Total</div>
              <div className="col-span-1"></div>
            </div>

            {items.map((item) => (
              <div key={item.product_id} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:items-center py-6 md:py-4 border-b border-slate-100 last:border-0">
                <div className="col-span-1 md:col-span-6 flex items-center gap-4">
                  <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shrink-0 p-2">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    )}
                  </div>
                  <div>
                    {item.brand && <div className="text-xs font-mono text-slate-500 mb-1">{item.brand}</div>}
                    <Link href={`/product/${item.product_id}`} className="font-semibold text-slate-900 hover:text-primary transition-colors line-clamp-2">
                      {item.name}
                    </Link>
                    <div className="text-sm text-slate-500 mt-1 md:hidden">
                      {item.price.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 flex items-center justify-start md:justify-center mt-4 md:mt-0">
                  <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                    <button 
                      onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 text-slate-500 hover:text-slate-900 disabled:opacity-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-medium text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-3 text-right hidden md:block font-semibold text-slate-900">
                  {(item.price * item.quantity).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </div>

                <div className="col-span-1 flex justify-end md:justify-center absolute md:relative right-4 md:right-auto mt-4 md:mt-0">
                  <button 
                    onClick={() => removeFromCart(item.product_id)}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-100 sticky top-24">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-slate-900">{subtotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Freight Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">
                    {total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                  </span>
                </div>
              </div>

              <Button asChild size="lg" className="w-full rounded-xl text-base h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Link href="/checkout">
                  Continue to Checkout <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
