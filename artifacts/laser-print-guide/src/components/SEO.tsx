import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
}

const DEFAULT_DESCRIPTION = "Shop authentic printers and accessories at My Printer Master. We offer expert help, clear specs, and free shipping on all orders.";

export function SEO({ title, description = DEFAULT_DESCRIPTION }: SEOProps) {
  useEffect(() => {
    // Ensure title is between 30-60 characters
    let displayTitle = title;
    if (!displayTitle.includes("My Printer Master") && displayTitle.length < 40) {
      displayTitle = `${displayTitle} | My Printer Master`;
    }
    
    // Trim if still too long (Target 55-60 for pixel width safety)
    if (displayTitle.length > 60) {
      displayTitle = displayTitle.substring(0, 57) + "...";
    }

    document.title = displayTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      // Ensure it's around 145 chars for SERP safety
      const finalDesc = description.length > 155 ? description.substring(0, 152) + "..." : description;
      metaDescription.setAttribute("content", finalDesc);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return null;
}
