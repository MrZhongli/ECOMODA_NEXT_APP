export interface Material {
    id: number;
    name: string;
    description: string;
}

export async function getMaterials(): Promise<Material[]> {
    try {
        const res = await fetch("http://localhost:8000/materials", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        return Array.isArray(data.Materials) ? data.Materials : [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
