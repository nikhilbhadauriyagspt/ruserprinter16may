import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Layout } from "@/components/layout/Layout";

import Home from "@/pages/home";
import Shop from "@/pages/shop";
import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Wishlist from "@/pages/wishlist";
import Checkout from "@/pages/checkout";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import About from "@/pages/about";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsAndConditions from "@/pages/terms-and-conditions";
import ReturnPolicy from "@/pages/return-policy";
import ShippingPolicy from "@/pages/shipping-policy";
import CookiePolicy from "@/pages/cookie-policy";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import TrackOrder from "@/pages/track-order";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop">{() => <Shop />}</Route>
        <Route path="/category/:slug">
          {(params: { slug?: string }) => <Shop categorySlug={params.slug} />}
        </Route>
        <Route path="/brand/:slug">
          {(params: { slug?: string }) => <Shop brandSlug={params.slug} />}
        </Route>
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/about" component={About} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/terms-and-conditions" component={TermsAndConditions} />
        <Route path="/return-policy" component={ReturnPolicy} />
        <Route path="/shipping-policy" component={ShippingPolicy} />
        <Route path="/cookie-policy" component={CookiePolicy} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/track-order" component={TrackOrder} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider>
              <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
                <Router />
              </WouterRouter>
              <Toaster />
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
