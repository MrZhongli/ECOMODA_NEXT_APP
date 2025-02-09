import PurchasesOrders from "./PurchasesOrders";
import { fetchAPI } from "../../api/config/api";
import PurchasesData from "./PurchasesOrders";

async function fetchPurchases() {
    try {
        const purchasesData = await fetchAPI<{ message: string; data: { purchaseOrders: any[] } }>(
            "/purchase-orders",
            "GET"
        );
        console.log("Datos obtenidos de la API:", purchasesData);
        return purchasesData.data.purchaseOrders || []; // Devuelve el arreglo de purchaseOrders
    } catch (error) {
        console.error("Error fetching purchases:", error);
        return []; // Retorna un array vacío en caso de error
    }
}

export default async function PurchasePage() {
    const Purchases = await fetchPurchases();
    console.log(Purchases);
    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Purchases</h2>
            <PurchasesOrders PurchasesData={Purchases} />
        </section>
    );
};

