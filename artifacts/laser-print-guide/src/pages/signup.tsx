import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { SEO } from "@/components/SEO";
import { useRegister, useLogin } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
type FormValues = z.infer<typeof schema>;

export default function Signup() {
  const [, setLocation] = useLocation();
  const { login } = useAuth();
  const { toast } = useToast();
  const registerMutation = useRegister();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", password: "" },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await registerMutation.mutateAsync(data);
      try {
        const user = await loginMutation.mutateAsync({ email: data.email, password: data.password });
        login(user);
        toast({ title: "Welcome to My Printer Master!", description: "Your account has been created." });
        setLocation("/");
      } catch {
        toast({ title: "Account created", description: "Please sign in to continue." });
        setLocation("/login");
      }
    } catch (err) {
      toast({
        title: "Could not create account",
        description: err instanceof Error ? err.message : "Please try again.",
        variant: "destructive",
      });
    }
  };

  const benefits = [
    "Track your orders in one place",
    "Save your wishlist across devices",
    "Faster checkout next time",
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-slate-50 via-white to-blue-50/40 py-16 px-4 flex items-center justify-center">
      <SEO title="Create Account — My Printer Master" />
      <div className="w-full max-w-[1100px] grid lg:grid-cols-2 gap-10 items-center">
        <div className="hidden lg:block">
          <div className="relative aspect-[5/6] rounded-[32px] overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 shadow-2xl shadow-slate-300/40 border border-white">
            <img src={`${import.meta.env.BASE_URL}category/inkjet-printers.jpg`} alt="Inkjet Printers" className="absolute inset-0 w-full h-full object-contain p-12" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Join Us</div>
                <h2 className="mt-2 text-2xl font-semibold text-slate-900 leading-tight">Create your account in under a minute.</h2>
                <ul className="mt-4 space-y-2">
                  {benefits.map(b => (
                    <li key={b} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-8 md:p-10">
          <div className="mb-8 text-center lg:text-left">
            <h1 className="text-3xl md:text-[36px] font-semibold tracking-tight text-slate-950">Create Account</h1>
            <p className="mt-2 text-slate-500">Already have one?{" "}
              <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input placeholder="John Doe" className="pl-10 h-11 rounded-xl" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

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

              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type="tel" placeholder="03001234567" className="pl-10 h-11 rounded-xl" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="password" render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input type={showPassword ? "text" : "password"} placeholder="At least 6 characters" className="pl-10 pr-10 h-11 rounded-xl" {...field} />
                      <button type="button" onClick={() => setShowPassword(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <Button type="submit" disabled={registerMutation.isPending || loginMutation.isPending} size="lg" className="w-full h-12 rounded-xl text-base shadow-md shadow-primary/20">
                {(registerMutation.isPending || loginMutation.isPending) ? "Creating account..." : (<>Create Account <ArrowRight className="ml-2 w-4 h-4" /></>)}
              </Button>

              <p className="text-xs text-slate-500 text-center pt-2">
                By creating an account, you agree to our{" "}
                <Link href="/terms-and-conditions" className="text-primary hover:underline">Terms</Link> and{" "}
                <Link href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
