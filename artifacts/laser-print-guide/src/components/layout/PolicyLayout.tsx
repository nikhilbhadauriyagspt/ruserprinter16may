import { ReactNode } from "react";
import { SEO } from "@/components/SEO";

interface PolicyLayoutProps {
  title: string;
  subtitle?: string;
  lastUpdated: string;
  children: ReactNode;
}

export function PolicyLayout({ title, subtitle, lastUpdated, children }: PolicyLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <SEO title={title} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">{title}</h1>
        {subtitle && <p className="text-lg text-slate-600 mb-4">{subtitle}</p>}
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">Last updated: {lastUpdated}</p>
      </div>
      <div className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80">
        {children}
      </div>
    </div>
  );
}
