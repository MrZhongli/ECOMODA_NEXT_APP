export interface Customer {
    idCard: string;
    name: string;
    lastname: string;
}

export async function getCustomers(): Promise<Customer[]> {
    try {
        const res = await fetch("http://localhost:8000/customers", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch customers");

        const data = await res.json();
        // return Array.isArray(data.customers) ? data.customers : [];
        return data;
    } catch (error) {
        console.error("Error fetching customers:", error);
        return [];
    }
}
