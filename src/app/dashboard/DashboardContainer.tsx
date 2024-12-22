"use client";

import React from 'react';
import { FinancialStatsDashboard } from "@/components/FinancialStatsDashboard";
import { LastSales } from "./LastSales";

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
                {/* Widgets */}
                <div className="flex flex-wrap -mx-2">
                    {widgets.map((widget, index) => (
                        <div
                            key={index}
                            className="w-full sm:w-1/2 md:w-1/4 px-2 mb-4"
                        >
                            <div className="bg-white shadow rounded-lg p-4 hover:shadow-md transition">
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {widget.title}
                                </h3>
                                <p className="text-3xl font-bold text-pink-500 mt-2">
                                    {widget.value}
                                </p>
                                <p className="text-gray-500">{widget.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sección combinada: Financial Stats + Últimas Ventas */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Gráficos Financieros */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <FinancialStatsDashboard />
                    </div>

                    {/* Últimas Ventas */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <LastSales />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardContainer;