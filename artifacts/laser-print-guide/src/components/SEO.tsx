import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
}

const DEFAULT_DESCRIPTION = "Shop premium printers, genuine ink cartridges, and professional toners at My Printer Master. Expert curation and free shipping on all orders.";

export function SEO({ title, description = DEFAULT_DESCRIPTION }: SEOProps) {
  useEffect(() => {
    // Ensure title is between 30-60 characters
    let displayTitle = title;
    if (!displayTitle.includes("My Printer Master") && displayTitle.length < 40) {
      displayTitle = `${displayTitle} | My Printer Master`;
    }
    
    // Trim if still too long
    if (displayTitle.length > 60) {
      displayTitle = displayTitle.substring(0, 57) + "...";
    }

    document.title = displayTitle;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta);
    }
  }, [title, description]);

  return null;
}
