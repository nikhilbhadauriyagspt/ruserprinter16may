import { useQuery, useMutation } from "@tanstack/react-query";

const BASE_URL = "https://api.inklivo.shop/public";

export interface Category {
  id: string;
  name: string;
  slug: string;
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
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${BASE_URL}/${cleanPath}`;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/categories`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      return data.data as Category[];
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
      return data.data as Brand[];
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
      return data.data as Product[];
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
