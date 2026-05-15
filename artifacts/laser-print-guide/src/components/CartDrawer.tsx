import { Link } from "wouter";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 border-l-0 shadow-2xl">
        <SheetHeader className="p-6 border-b border-slate-100 bg-slate-50/50">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Your Cart <span className="text-slate-400 text-sm font-normal">({totalItems})</span>
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Your cart is empty</h3>
              <p className="text-slate-500 mb-8 max-w-[200px]">Looks like you haven't added anything yet.</p>
              <Button onClick={() => onOpenChange(false)} variant="outline" asChild>
                <Link href="/shop">Start Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.product_id} className="flex gap-4 group">
                  <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                    {item.image && (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        {item.brand && <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mb-1">{item.brand}</div>}
                        <h4 className="font-medium text-sm leading-tight text-slate-900 line-clamp-2 pr-4">{item.name}</h4>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.product_id)}
                        className="text-slate-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-slate-200 rounded-md">
                        <button 
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1.5 text-slate-500 hover:text-slate-900 disabled:opacity-50 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-sm">
                        {(item.price * item.quantity).toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-600">Subtotal</span>
              <span className="text-lg font-bold">
                {subtotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <Button asChild onClick={() => onOpenChange(false)} className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
                <Link href="/checkout">Checkout Now</Link>
              </Button>
              <Button asChild variant="outline" onClick={() => onOpenChange(false)} className="w-full">
                <Link href="/cart">View Cart Details</Link>
              </Button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
