import { PolicyLayout } from "@/components/layout/PolicyLayout";
import { Link } from "wouter";

export default function TermsAndConditions() {
  const email = "info@laserprintguide.co";

  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="Read our legal terms and conditions for using our services."
      lastUpdated="May 14, 2026"
    >
      <h2>AGREEMENT TO OUR LEGAL TERMS</h2>
      <p>
        We are Laser Print Guide ("Company," "we," "us," "our"), operating the website http://laserprintguide.co/ (the "Site"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
      </p>
      <p>
        Laser Print Guide is your trusted destination for authentic, high-performance printers and printing accessories.
      </p>
      <p>
        You can contact us by email at <a href={`mailto:${email}`}>{email}</a>.
      </p>
      <p>
        These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and Laser Print Guide, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
      </p>
      <p>
        The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
      </p>

      <h2>1. OUR SERVICES</h2>
      <p>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</p>

      <h2>2. INTELLECTUAL PROPERTY RIGHTS</h2>
      <p>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").</p>

      <h2>3. USER REPRESENTATIONS</h2>
      <p>By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorized purpose; and (7) your use of the Services will not violate any applicable law or regulation.</p>

      <h2>4. USER REGISTRATION</h2>
      <p>You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password.</p>

      <h2>5. PRODUCTS</h2>
      <p>We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the Services. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors, and your electronic display may not accurately reflect the actual colors and details of the products.</p>

      <h2>6. PURCHASES AND PAYMENT</h2>
      <p>We accept the following forms of payment: Visa, Mastercard, PayPal.</p>
      <p>You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. All payments shall be in US dollars.</p>
      <p>We reserve the right to refuse any order placed through the Services. We may, in our sole discretion, limit or cancel quantities purchased per person, per household, or per order.</p>

      <h2>7. RETURN POLICY</h2>
      <p>Please review our Return Policy prior to making any purchases: <Link href="/return-policy">Return Policy</Link>.</p>

      <h2>8. PROHIBITED ACTIVITIES</h2>
      <p>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.</p>

      <h2>9. PRIVACY POLICY</h2>
      <p>We care about data privacy and security. Please review our Privacy Policy: <Link href="/privacy-policy">Privacy Policy</Link>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms.</p>

      <h2>10. TERM AND TERMINATION</h2>
      <p>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES, TO ANY PERSON FOR ANY REASON OR FOR NO REASON.</p>

      <h2>11. DISCLAIMER</h2>
      <p>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF.</p>

      <h2>12. LIMITATIONS OF LIABILITY</h2>
      <p>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>

      <h2>13. CONTACT US</h2>
      <p>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at: <a href={`mailto:${email}`}>{email}</a></p>
    </PolicyLayout>
  );
}