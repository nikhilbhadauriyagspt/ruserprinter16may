import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { PayPalCheckoutButtons } from "@/components/PayPalCheckoutButtons";
import { SEO } from "@/components/SEO";
import { useCart } from "@/contexts/CartContext";
import { useCreateOrder } from "@/lib/api";

const PAYPAL_CLIENT_ID = "Aa7mAnBKh44YCdokTrFjIP1wIB6mVVjrN8z-NZc_G2VLYJle_Xz9pMdOO7DRXx7zYT7Gh0dzbJUY9DDm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

const shippingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  postal_code: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export default function Checkout() {
  const [, setLocation] = useLocation();
  const { items, subtotal, totalItems, clearCart } = useCart();
  const createOrder = useCreateOrder();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [shippingData, setShippingData] = useState<ShippingFormValues | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const [orderNumber, setOrderNumber] = useState("");

  const tax = subtotal * 0.08;
  const shippingCost = subtotal > 500 ? 0 : 49;
  const total = subtotal + tax + shippingCost;

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      name: "", email: "", phone: "", address: "", city: "", postal_code: "", country: "US"
    }
  });

  if (items.length === 0 && step !== 3) {
    setLocation("/cart");
    return null;
  }

  const onSubmitShipping = (data: ShippingFormValues) => {
    setShippingData(data);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const finalizeOrder = async (paymentDetails: unknown = null) => {
    if (!shippingData) return;

    try {
      const payload = {
        customer: shippingData,
        items: items.map(i => ({
          product_id: i.product_id,
          name: i.name,
          price: i.price,
          quantity: i.quantity
        })),
        total,
        payment_method: paymentMethod,
        payment_details: paymentDetails,
      };

      const res = await createOrder.mutateAsync(payload);
      setOrderNumber(res.order_id || `ORD-${Math.floor(Math.random() * 1000000)}`);
      clearCart();
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Order failed", err);
      throw err;
    }
  };

  const handlePlaceOrder = async () => {
    await finalizeOrder();
  };

  // SUCCESS STEP
  if (step === 3) {
    return (
      <div className="container mx-auto px-4 py-20 min-h-[70vh] flex flex-col items-center justify-center text-center">
        <SEO title="Order Confirmed" />
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Order Confirmed</h1>
        <p className="text-slate-500 text-lg mb-2">Thank you for your purchase.</p>
        <p className="text-slate-900 font-medium mb-10">Order #: {orderNumber}</p>
        <div className="flex gap-4">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <SEO title="Checkout" />
      
      {/* Header */}
      <div className="bg-white border-b border-slate-200 py-6 mb-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-slate-900">Secure Checkout</h1>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
              <Lock className="w-4 h-4" /> 256-bit Encrypted
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto">
          
          {/* Main Content */}
          <div className="lg:col-span-7 xl:col-span-8">
            
            {/* Stepper Header */}
            <div className="flex items-center mb-8">
              <div className={`flex items-center gap-3 ${step === 1 ? 'text-primary' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 1 ? 'bg-primary text-white' : step > 1 ? 'bg-green-500 text-white' : 'bg-slate-200'}`}>
                  {step > 1 ? <CheckCircle2 className="w-5 h-5" /> : "1"}
                </div>
                <span className="font-bold">Shipping</span>
              </div>
              <div className="flex-1 h-px bg-slate-200 mx-4"></div>
              <div className={`flex items-center gap-3 ${step === 2 ? 'text-primary' : 'text-slate-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === 2 ? 'bg-primary text-white' : 'bg-slate-200'}`}>
                  2
                </div>
                <span className="font-bold">Payment</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm">
              {step === 1 ? (
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Shipping Address</h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitShipping)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="address" render={({ field }) => (
                          <FormItem><FormLabel>Street Address</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="city" render={({ field }) => (
                          <FormItem><FormLabel>City</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="postal_code" render={({ field }) => (
                          <FormItem><FormLabel>Postal Code</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="country" render={({ field }) => (
                          <FormItem><FormLabel>Country</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                      </div>
                      <Button type="submit" size="lg" className="w-full sm:w-auto mt-4 rounded-xl px-8">
                        Continue to Payment <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </form>
                  </Form>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">Payment Method</h2>
                      <p className="text-sm text-slate-500 mt-1">All transactions are secure and encrypted.</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setStep(1)} className="text-primary">Edit Shipping</Button>
                  </div>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-4 mb-8">
                    <div className={`flex items-center space-x-3 border-2 rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`} onClick={() => setPaymentMethod('paypal')}>
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer font-semibold text-base flex justify-between items-center">
                        PayPal
                        <div className="text-primary italic font-bold">PayPal</div>
                      </Label>
                    </div>
                    
                    <div className={`flex items-center space-x-3 border-2 rounded-xl p-4 cursor-pointer transition-colors ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300'}`} onClick={() => setPaymentMethod('cod')}>
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex-1 cursor-pointer font-semibold text-base">
                        Cash on Delivery
                        <p className="text-sm font-normal text-slate-500 mt-1">Pay when you receive your equipment.</p>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "paypal" ? (
                    <div className="border border-slate-200 rounded-xl p-4 bg-white">
                      <PayPalCheckoutButtons
                        clientId={PAYPAL_CLIENT_ID}
                        amount={total}
                        disabled={createOrder.isPending}
                        onApprove={(details) => finalizeOrder(details)}
                      />
                    </div>
                  ) : (
                    <Button
                      onClick={handlePlaceOrder}
                      disabled={createOrder.isPending}
                      size="lg"
                      className="w-full rounded-xl text-lg h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                    >
                      {createOrder.isPending ? "Processing..." : `Place Order ${total.toLocaleString("en-US", { style: "currency", currency: "USD" })}`}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2">
                {items.map(item => (
                  <div key={item.product_id} className="flex gap-4">
                    <div className="w-16 h-16 bg-slate-50 rounded-lg border border-slate-100 p-1 shrink-0">
                      {item.image && <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-900 line-clamp-2 leading-tight">{item.name}</h4>
                      <p className="text-xs text-slate-500 mt-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-semibold mt-1">{(item.price * item.quantity).toLocaleString("en-US", { style: "currency", currency: "USD" })}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-3 mb-6 text-sm text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-slate-900">{subtotal.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium text-slate-900">{tax.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium text-slate-900">{shippingCost === 0 ? "Free" : shippingCost.toLocaleString("en-US", { style: "currency", currency: "USD" })}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-slate-900">
                  {total.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
