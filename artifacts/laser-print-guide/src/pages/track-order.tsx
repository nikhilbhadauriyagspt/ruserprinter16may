import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Package, Mail, Hash, Search, Truck, CheckCircle2, Clock, XCircle } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useTrackOrder, type TrackedOrder } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  order_id: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

const STATUS_STYLES: Record<string, { color: string; icon: typeof CheckCircle2; label: string }> = {
  pending: { color: "bg-amber-100 text-amber-700", icon: Clock, label: "Pending" },
  processing: { color: "bg-blue-100 text-blue-700", icon: Package, label: "Processing" },
  shipped: { color: "bg-indigo-100 text-indigo-700", icon: Truck, label: "Shipped" },
  delivered: { color: "bg-emerald-100 text-emerald-700", icon: CheckCircle2, label: "Delivered" },
  cancelled: { color: "bg-rose-100 text-rose-700", icon: XCircle, label: "Cancelled" },
};

function StatusBadge({ status }: { status?: string }) {
  const key = (status || "pending").toLowerCase();
  const cfg = STATUS_STYLES[key] || STATUS_STYLES.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${cfg.color}`}>
      <Icon className="w-3.5 h-3.5" /> {cfg.label}
    </span>
  );
}

function OrderCard({ order }: { order: TrackedOrder }) {
  const total = typeof order.total === "string" ? parseFloat(order.total) : order.total;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">Order</div>
          <div className="mt-1 text-lg font-semibold text-slate-900">#{order.order_number || order.id}</div>
          {order.created_at && (
            <div className="mt-0.5 text-xs text-slate-500">Placed on {new Date(order.created_at).toLocaleDateString("en-US", { dateStyle: "medium" })}</div>
          )}
        </div>
        <StatusBadge status={order.status} />
      </div>

      {order.items && order.items.length > 0 && (
        <div className="border-t border-slate-100 pt-4 space-y-2">
          {order.items.slice(0, 4).map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-sm">
              <span className="text-slate-700 line-clamp-1 pr-3">{item.name} <span className="text-slate-400">× {item.quantity}</span></span>
              <span className="font-medium text-slate-900 shrink-0">${Number(item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}

      <div className="border-t border-slate-100 mt-4 pt-4 flex justify-between items-center">
        <div className="text-xs text-slate-500">{order.payment_method ? `Paid via ${order.payment_method}` : ""}</div>
        {typeof total === "number" && !Number.isNaN(total) && (
          <div className="text-right">
            <div className="text-xs text-slate-500">Total</div>
            <div className="text-lg font-bold text-slate-900">${total.toFixed(2)}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrackOrder() {
  const trackMutation = useTrackOrder();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", order_id: "" },
  });

  const onSubmit = (data: FormValues) => {
    trackMutation.mutate({
      email: data.email,
      order_id: data.order_id || undefined,
    });
  };

  const orders = trackMutation.data || [];

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-80px)] py-12 md:py-16 px-4">
      <SEO title="Track Your Order — Laser Print Guide" />
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
            <Package className="w-3.5 h-3.5" /> Order Tracking
          </span>
          <h1 className="mt-5 text-[32px] md:text-[44px] font-semibold tracking-tight text-slate-950 leading-[1.1]">
            Track Your Order
          </h1>
          <p className="mt-3 text-slate-500 max-w-[560px] mx-auto">
            Enter the email address you used at checkout to see the latest status of your orders.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 mb-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end">
              <FormField control={form.control} name="email" render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type="email" placeholder="you@example.com" className="pl-10 h-11 rounded-xl" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="order_id" render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Number <span className="text-slate-400 font-normal">(optional)</span></FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input placeholder="e.g. 12345" className="pl-10 h-11 rounded-xl" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" disabled={trackMutation.isPending} size="lg" className="h-11 rounded-xl px-6 shadow-md shadow-primary/20">
                {trackMutation.isPending ? "Searching..." : (<><Search className="w-4 h-4 mr-2" /> Track Order</>)}
              </Button>
            </form>
          </Form>
        </div>

        {trackMutation.isError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-5 text-center mb-6">
            {trackMutation.error instanceof Error ? trackMutation.error.message : "Something went wrong. Please try again."}
          </div>
        )}

        {trackMutation.isSuccess && orders.length === 0 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Package className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No orders found</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
              We couldn't find any orders matching that email. Please double-check the address you used at checkout.
            </p>
          </div>
        )}

        {orders.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900 mb-2">Found {orders.length} order{orders.length === 1 ? "" : "s"}</h2>
            {orders.map(o => <OrderCard key={String(o.id)} order={o} />)}
          </div>
        )}
      </div>
    </div>
  );
}
