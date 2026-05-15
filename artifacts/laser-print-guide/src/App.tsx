import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { CartProvider } from "@/contexts/CartContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { Layout } from "@/components/layout/Layout";
import { PolicyLayout } from "@/components/layout/PolicyLayout";

import Home from "@/pages/home";
import Shop from "@/pages/shop";
import ProductDetail from "@/pages/product-detail";
import Cart from "@/pages/cart";
import Wishlist from "@/pages/wishlist";
import Checkout from "@/pages/checkout";
import FAQ from "@/pages/faq";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function Policies() {
  return (
    <Switch>
      <Route path="/policies/privacy">
        <PolicyLayout title="Privacy Policy" lastUpdated="January 15, 2024">
          <p>At Laser Print Guide, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
          <h2>Information Collection</h2>
          <p>We collect information you provide directly to us when you create an account, make a purchase, or contact support. This includes your name, email, address, and payment details.</p>
          <h2>Information Use</h2>
          <p>We use your information to process orders, communicate with you about your purchases, and improve our services. We do not sell your personal data to third parties.</p>
          <h2>Data Security</h2>
          <p>We implement industry-standard security measures to protect your data during transmission and storage. All payment processing is handled by secure, PCI-compliant third-party providers.</p>
        </PolicyLayout>
      </Route>
      <Route path="/policies/terms">
        <PolicyLayout title="Terms of Service" lastUpdated="January 15, 2024">
          <p>By using Laser Print Guide, you agree to these Terms of Service.</p>
          <h2>Use of Service</h2>
          <p>You agree to use our website and services only for lawful purposes. You must be at least 18 years old to make a purchase.</p>
          <h2>Product Information</h2>
          <p>While we strive for accuracy, we do not warrant that product descriptions, pricing, or other content is error-free. We reserve the right to correct any errors and cancel orders if necessary.</p>
          <h2>Limitation of Liability</h2>
          <p>Laser Print Guide shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>
        </PolicyLayout>
      </Route>
      <Route path="/policies/shipping">
        <PolicyLayout title="Shipping Policy" lastUpdated="January 15, 2024">
          <p>We are committed to delivering your equipment safely and efficiently.</p>
          <h2>Standard Shipping</h2>
          <p>Orders typically ship within 1-2 business days. Standard ground shipping is free for orders over $500. For orders under $500, shipping costs are calculated at checkout based on weight and destination.</p>
          <h2>Freight Delivery</h2>
          <p>Large industrial printers require freight shipping. Delivery requires an appointment, and someone must be present to inspect and sign for the delivery. Liftgate and inside delivery services are available for an additional fee.</p>
          <h2>Damage in Transit</h2>
          <p>Please inspect all shipments immediately upon receipt. If you notice any damage, note it on the delivery receipt and contact us within 48 hours to initiate a claim.</p>
        </PolicyLayout>
      </Route>
      <Route path="/policies/return">
        <PolicyLayout title="Return Policy" lastUpdated="January 15, 2024">
          <p>We want you to be completely satisfied with your purchase.</p>
          <h2>30-Day Returns</h2>
          <p>Unopened and unused products can be returned within 30 days of receipt for a full refund, minus return shipping costs.</p>
          <h2>Opened Equipment</h2>
          <p>Opened printers and hardware may be returned within 30 days but are subject to a 15% restocking fee. The equipment must be in like-new condition with all original packaging and accessories.</p>
          <h2>Non-Returnable Items</h2>
          <p>Opened consumables (toner, ink, paper) and custom-configured orders cannot be returned.</p>
          <h2>Process</h2>
          <p>To initiate a return, please contact our support team to receive an RMA (Return Merchandise Authorization) number. Returns received without an RMA will be refused.</p>
        </PolicyLayout>
      </Route>
    </Switch>
  )
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/shop" component={Shop} />
        <Route path="/category/:slug">
          {(params) => <Shop categorySlug={params.slug} />}
        </Route>
        <Route path="/brand/:slug">
          {(params) => <Shop brandSlug={params.slug} />}
        </Route>
        <Route path="/product/:slug" component={ProductDetail} />
        <Route path="/cart" component={Cart} />
        <Route path="/wishlist" component={Wishlist} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/faq" component={FAQ} />
        <Route path="/contact" component={Contact} />
        <Route path="/policies/*" component={Policies} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}

export default App;
