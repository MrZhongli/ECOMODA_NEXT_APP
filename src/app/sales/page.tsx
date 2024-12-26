import SalesOrders from "./SalesOrders";

export default async function SalesPage() {

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Sales</h2>
            <SalesOrders/>
        </section>
    );
};

