"use client";

import React, { useEffect, useState } from 'react';
import { FinancialStatsDashboard } from "@/components/FinancialStatsDashboard";
import { LastSales } from "./LastSales";
import { fetchSales } from '@/api/sales';


const DashboardContainer = () => {
    const [totalSales, setTotalSales] = useState(0);
    const [activeUsers, setActiveUsers] = useState(0);
    const [pendingOrders, setPendingOrders] = useState(0);
    const [conversionRate, setConversionRate] = useState(0);

    useEffect(() => {
        const loadSalesData = async () => {
            const sales = await fetchSales();
            console.log(sales)
            // Calcular el total de ventas
            const total = sales.reduce((sum: number, sale: any) => {
                return sum + sale.saleDetail.reduce((saleSum: number, detail: any) => {
                    return saleSum + (parseFloat(detail.unitPrice) * detail.quantity);
                }, 0);
            }, 0);
            setTotalSales(total);

            // Calcular usuarios activos (suponiendo que cada venta es de un usuario único)
            const uniqueCustomers = new Set(sales.map((sale: any) => sale.customerId));
            setActiveUsers(uniqueCustomers.size);

            // Calcular órdenes pendientes (suponiendo que las órdenes sin `deletedAt` están pendientes)
            const pending = sales.filter((sale: any) => sale.deletedAt === null).length;
            setPendingOrders(pending);

            // Calcular tasa de conversión (esto es un ejemplo, ajusta según tu lógica de negocio)
            const conversion = (sales.length / 100) * 5.4; // Ejemplo simple
            setConversionRate(conversion);
        };

        loadSalesData();
    }, []);

    const widgets = [
        { title: "Total Ventas", value: `$${totalSales.toFixed(2)}`, description: "Este mes" },
        { title: "Usuarios Activos", value: activeUsers.toString(), description: "Este mes" },
        { title: "Órdenes Pendientes", value: pendingOrders.toString(), description: "En proceso" },
        { title: "Tasa de Conversión", value: `${conversionRate.toFixed(2)}%`, description: "Últimos 30 días" },
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