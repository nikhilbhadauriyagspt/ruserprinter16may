import { PolicyLayout } from "@/components/layout/PolicyLayout";
import { Link } from "wouter";

export default function ShippingPolicy() {
  return (
    <PolicyLayout
      title="Shipping policy"
      subtitle="Read our shipping and delivery options, timeframes, and policies."
      lastUpdated="May 14, 2026"
    >
      <p className="lead">
        This shipping & delivery policy is part of our terms and conditions and should be therefore read alongside our main terms: <Link href="/terms-and-conditions" className="text-primary hover:underline font-semibold">Terms & Conditions</Link>.
      </p>
      <p>
        Please carefully review our shipping & delivery policy when purchasing our products. This policy will apply to any order you place with us.
      </p>

      <h2>What are my shipping delivery options?</h2>
      <p>
        We offer various shipping options. In some cases a third-party supplier may be managing our inventory and will be responsible for shipping your products.
      </p>
      <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 mt-6 not-prose">
        <h4 className="text-lg font-bold text-slate-900 mb-2">Free shipping</h4>
        <p className="text-slate-600 font-medium m-0 italic">We offer free standard shipping on all orders.</p>
      </div>

      <h2>Do you deliver internationally?</h2>
      <p>
        We do not offer international shipping at this time. We deliver to all addresses within the country.
      </p>

      <h2>What happens if my order is delayed?</h2>
      <p>
        If delivery is delayed for any reason we will let you know as soon as possible and will advise you of a revised estimated date for delivery.
      </p>

      <h2>Questions about returns?</h2>
      <p>
        If you have questions about returns, please review our return policy: <Link href="/return-policy" className="text-primary hover:underline font-semibold">Return Policy</Link>.
      </p>

      <h2>How can you contact us about this policy?</h2>
      <p>If you have any further questions or comments, you may contact us by:</p>
      <ul>
        <li>Email: <a href="mailto:info@laserprintguide.co">info@laserprintguide.co</a></li>
        <li>Online form: <Link href="/contact">Contact us</Link></li>
      </ul>
    </PolicyLayout>
  );
}