import HRDashboard from "./HRDashboard";

export default async function EmployeePage() {

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-secondary font-bold mb-5">Recursos Humanos</h2>
            <HRDashboard/>
        </section>
    );
};

