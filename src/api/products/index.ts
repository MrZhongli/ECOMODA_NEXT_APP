export interface Product {
    id: number;
    name: string;
    price: number;
}

export async function getProducts(): Promise<Product[]> {
    try {
        const res = await fetch("http://localhost:8000/products", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        return Array.isArray(data.products) ? data.products : [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
