import SalesOrders from "./SalesOrders"; // Asegúrate de importar correctamente tu API
import { fetchAPI } from "../../api/config/api";

async function fetchSales() {
    try {
        const salesData = await fetchAPI<{ sales: any[] }>("/sales", "GET");
        return salesData;
    } catch (error) {
        console.error("Error fetching sales:", error);
        return { sales: [] }; // Retorna un array vacío en caso de error
    }
}

export default async function SalesPage() {
    const salesData = await fetchSales();
    console.log(salesData);

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Ventas</h2>
            <SalesOrders salesData={salesData.sales} />
        </section>
    );
}
