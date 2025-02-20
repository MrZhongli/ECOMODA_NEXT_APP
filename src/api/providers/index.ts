export interface Provider {
    rif: string;
    name: string;
    email: string;
}

export async function getProviders(): Promise<Provider[]> {
    try {
        const res = await fetch("http://localhost:8000/providers", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch providers");

        const data = await res.json();
        return Array.isArray(data.providers) ? data.providers : [];
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}
