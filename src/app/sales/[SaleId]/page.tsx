import { getSale, Sale } from "@/api/sales";
import SalesBudget from "./SalesBudget";

export default async function BudgetSalePage({ params }: { params: { SaleId: string } }) {
    let sale: Sale | null = null;

    try {
        sale = await getSale(params.SaleId);  // Fetch sale using the custom function
        console.log("Sale data:", sale);  // Verify the fetched data
    } catch (error) {
        console.error("Failed to fetch sale:", error);
    }

    if (!sale) {
        return <div>No se pudieron cargar los datos de la venta.</div>;
    }

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-secondary font-bold mb-5">Id # {sale.id ?? "N/A"}</h2>
            <SalesBudget sale={sale} />
        </section>
    );
}
