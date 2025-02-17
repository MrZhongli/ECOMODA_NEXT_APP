export interface Sale {
    id: number;
    description: string;
    customerId: string;
    branchId: number;
    brandId: number;
    saleDetail: {
        productId: string;
        quantity: number;
        unitPrice: number;
    }[];
}

export async function getSale(SaleId: string): Promise<Sale | null> {
    try {
        const res = await fetch(`http://localhost:8000/sales/${SaleId}`, { cache: "no-store" });

        if (!res.ok) throw new Error("Failed to fetch sale");

        const data = await res.json();
        return data.sale || null;  // Adjust the field based on your API response structure
    } catch (error) {
        console.error("Error fetching sale:", error);
        return null;
    }
}
