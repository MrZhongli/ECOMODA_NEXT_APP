// app/dashboard/page.tsx
"use client";

const DashboardContainer = () => {
    const widgets = [
        { title: "Total Ventas", value: "$12,300", description: "Este mes" },
        { title: "Usuarios Activos", value: "1,245", description: "Este mes" },
        { title: "Órdenes Pendientes", value: "37", description: "En proceso" },
        { title: "Tasa de Conversión", value: "5.4%", description: "Últimos 30 días" },
    ];

    return (
        <div className="flex flex-col w-full h-screen overflow-auto bg-gray-100">

            {/* Contenido Principal */}
            <main className="flex-1 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {widgets.map((widget, index) => (
                        <div
                            key={index}
                            className="bg-white shadow rounded-lg p-6 hover:shadow-md transition"
                        >
                            <h3 className="text-xl font-semibold text-gray-800">
                                {widget.title}
                            </h3>
                            <p className="text-4xl font-bold text-pink-500 mt-2">
                                {widget.value}
                            </p>
                            <p className="text-gray-500">{widget.description}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default DashboardContainer;
