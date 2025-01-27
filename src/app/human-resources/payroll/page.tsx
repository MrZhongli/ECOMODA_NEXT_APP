// Importa el componente PayrollCard

import { PayrollCard } from "./PayrollCard";

export default async function PayrollPage() {
    return (
        <section className="w-full max-h-full p-8">
            {/* Componente PayrollCard */}
            <PayrollCard />
        </section>
    );
};
