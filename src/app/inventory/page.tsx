import InventoryManagement from "./InventoryManagement";

export default async function DashboardPage() {

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-secondary font-bold mb-5">Inventario</h2>
            <InventoryManagement/>
        </section>
    );
};

