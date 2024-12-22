// app/dashboard/page.tsx

import DashboardContainer from "./DashboardContainer";

export default async function DashboardPage() {

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Dashboard</h2>
            <DashboardContainer />
        </section>
    );
};

