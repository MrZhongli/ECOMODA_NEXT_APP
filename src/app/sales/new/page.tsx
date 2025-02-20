import NewBudget from "./NewBudget";

export default async function NewSalePage() {

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Nuevo pedido</h2>
            <NewBudget/>
        </section>
    );
};

