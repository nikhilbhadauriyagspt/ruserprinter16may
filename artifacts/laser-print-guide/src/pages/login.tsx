import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useLogin } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormValues = z.infer<typeof schema>;

export default function Login() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const user = await loginMutation.mutateAsync(data);
      login(user);
      toast({ title: "Welcome back!", description: `Signed in as ${user.name}.` });
      setLocation("/");
    } catch (err) {
      toast({
        title: "Sign in failed",
        description: err instanceof Error ? err.message : "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-blue-50/40 py-16 px-4 flex items-center justify-center">
      <SEO title="Sign In — Laser Print Guide" />
      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-10 items-center">
        <div className="hidden lg:block">
          <div className="relative aspect-[5/6] rounded-[32px] overflow-hidden bg-gradient-to-br from-blue-50 to-slate-100 shadow-2xl shadow-slate-300/40 border border-white">
            <img src={`${import.meta.env.BASE_URL}category/laser-printers.jpg`} alt="Laser Printers" className="absolute inset-0 w-full h-full object-contain p-12" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Welcome Back</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 leading-tight">Sign in to manage your orders and wishlist.</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-10">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl md:text-[36px] font-semibold tracking-tight text-slate-950">Sign In</h1>
            <p className="mt-2 text-slate-500">New here?{" "}
              <Link href="/signup" className="text-primary font-semibold hover:underline">Create an account</Link>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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

              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" className="pl-10 pr-10 h-11 rounded-xl" {...field} />
                      <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" disabled={loginMutation.isPending} size="lg" className="w-full h-12 rounded-xl text-base shadow-md shadow-primary/20">
                {loginMutation.isPending ? "Signing in..." : (<>Sign In <ArrowRight className="ml-2 w-4 h-4" /></>)}
              </Button>

              <div className="flex items-center gap-2 text-xs text-slate-500 justify-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Your information is encrypted and secure.
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
