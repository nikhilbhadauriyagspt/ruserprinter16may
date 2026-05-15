import { useQuery, useMutation } from "@tanstack/react-query";

const BASE_URL = "https://api.inklivo.shop/public";

export interface Category {
  id: string;
  name: string;
  slug: string;
  image?: string | null;
  children?: Category[];
}

export interface Brand {
  id: string;
  name: string;
  slug?: string;
  logo?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: string;
  original_price: string | null;
  description: string;
  images: string | string[];
  category_id: string;
  category_name: string;
  brand_name: string;
}

export interface OrderPayload {
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    country: string;
  };
  items: {
    product_id: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  total: number;
  payment_method: string;
}

export function parseImages(images: string | string[]): string[] {
  if (Array.isArray(images)) {
    return images.map(resolveImageUrl);
  }
  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      if (Array.isArray(parsed)) {
        return parsed.map(resolveImageUrl);
      }
    } catch {
      return [resolveImageUrl(images)];
    }
  }
  return [];
}

export function resolveImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  let cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (!cleanPath.startsWith("products/")) {
    cleanPath = `products/${cleanPath}`;
  }
  return `${import.meta.env.BASE_URL}${cleanPath}`;
}

const filterCategory = (c: Category): boolean => {
  const skip = ["laptop", "computer", "pc", "notebook"];
  const nameMatch = skip.some(s => c.name.toLowerCase().includes(s));
  const slugMatch = skip.some(s => c.slug.toLowerCase().includes(s));
  if (nameMatch || slugMatch) return false;
  if (c.children) {
    c.children = c.children.filter(filterCategory);
  }
  return true;
};

const filterProduct = (p: Product): boolean => {
  const name = (p.name ?? "").toLowerCase();
  const skipNames = ["laptop", "macbook", "notebook", "chromebook", "computer"];
  if (skipNames.some(s => name.includes(s))) return false;
  const brand = (p.brand_name ?? "").toLowerCase().trim();
  const skipBrands = ["brother", "xerox"];
  if (brand && skipBrands.includes(brand)) return false;
  return true;
};

const filterBrand = (b: Brand): boolean => {
  const skip = ["brother", "xerox"];
  return !skip.some(s => b.name.toLowerCase() === s);
};

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      const top = (data.data as Category[]).filter(filterCategory);
      const leaves: Category[] = [];
      for (const c of top) {
        if (c.children && c.children.length > 0) {
          for (const child of c.children) {
            if (filterCategory(child) && child.image) leaves.push(child);
          }
        } else if (c.image) {
          leaves.push(c);
        }
      }
      return leaves;
    },
  });
}

export function useBrands() {
  return useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/brands`);
      if (!res.ok) throw new Error("Failed to fetch brands");
      const data = await res.json();
      return (data.data as Brand[]).filter(filterBrand);
    },
  });
}

export function useProducts(params?: { limit?: number; category?: string; search?: string; sort?: string }) {
  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const url = new URL(`${BASE_URL}/products`);
      url.searchParams.append("limit", (params?.limit || 1000).toString());
      if (params?.category) url.searchParams.append("category", params.category);
      if (params?.search) url.searchParams.append("search", params.search);
      if (params?.sort) url.searchParams.append("sort", params.sort);

      const res = await fetch(url.toString());
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      return (data.data as Product[]).filter(filterProduct);
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/products/${slug}`);
      if (!res.ok) throw new Error("Failed to fetch product");
      const data = await res.json();
      return data.data as Product;
    },
    enabled: !!slug,
  });
}

export function useFeaturedProducts() {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/products?limit=1000`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      const products = (data.data as Product[]).filter(filterProduct);
      const featured = ["hp", "canon", "epson", "lexmark"];
      return products.filter(p => {
        const brand = (p.brand_name ?? "").toLowerCase().trim();
        return featured.includes(brand);
      });
    },
  });
}

export function useCreateOrder() {
  return useMutation({
    mutationFn: async (payload: OrderPayload) => {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create order");
      return res.json();
    },
  });
}
