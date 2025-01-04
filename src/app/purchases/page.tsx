import PurchasesOrders from "./PurchasesOrders";

export default async function SalesPage() {

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Purchases</h2>
            <PurchasesOrders/>
        </section>
    );
};

