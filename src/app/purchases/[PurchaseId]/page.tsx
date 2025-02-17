import { getPurchase, PurchaseOrder } from "@/api/purcharse";
import PurchaseOrderDetail from "./PurcharseOrderDetail";

export default async function OrderDetailPage({ params }: { params: { PurchaseId: string } }) {
    let Purchase: PurchaseOrder | null = null;

    try {
        Purchase = await getPurchase(params.PurchaseId);  // Fetch sale using the custom function
        console.log("Purchase data:", Purchase);  // Verify the fetched data
    } catch (error) {
        console.error("Failed to fetch sale:", error);
    }

    if (!Purchase) {
        return <div>No se pudieron cargar los datos de la orden de compra.</div>;
    }

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-secondary font-bold mb-5">Id # {Purchase.id ?? "N/A"}</h2>
            <PurchaseOrderDetail order={Purchase} />
        </section>
    );
}
