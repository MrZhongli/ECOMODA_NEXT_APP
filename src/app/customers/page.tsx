import { fetchAPI } from "@/api/config/api";
import CustomerDashboard from "./CustomerDashboard";
// Define el tipo para los clientes
interface Customer {
    idCard: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}

export default async function CustomerPage() {
    let customersData: Customer[] = [];

    // Llamada a la API para obtener clientes
    try {
        const response = await fetchAPI<{
            message: string;
            data: { customers: Customer[] };
        }>("customers");
        customersData = response.customers;
    } catch (error) {
        console.error("Error fetching customers:", error);
    }

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Clientes</h2>
            <CustomerDashboard customersData={customersData} />
        </section>
    );
}
