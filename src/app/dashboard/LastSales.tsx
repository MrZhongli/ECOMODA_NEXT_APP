"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { fetchSales } from "@/api/sales"

// Interfaces que reflejan la estructura exacta de la API
interface Customer {
    idCard: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
}

interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
}

interface SaleDetail {
    saleId: number;
    productId: number;
    quantity: number;
    unitPrice: string;
}

interface Sale {
    id: number;
    description: string;
    customerId: string;
    branchId: number;
    brandId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: null | string;
    customer: Customer;
    branch: Branch;
    saleDetail: SaleDetail[];
}

type EstadoVenta = 'Pagado' | 'Pendiente' | 'Cancelado';

const estadoColor: Record<EstadoVenta, string> = {
    Pagado: 'bg-green-100 text-green-800',
    Pendiente: 'bg-yellow-100 text-yellow-800',
    Cancelado: 'bg-red-100 text-red-800',
};

export function LastSales() {
    const [recentSales, setRecentSales] = useState<Sale[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadSales = async () => {
            try {
                const response = await fetchSales();
                console.log("Datos completos:", response);

                if (response && Array.isArray(response)) {
                    const sortedSales = response
                        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                        .slice(0, 5);
                    
                    console.log("Ventas ordenadas:", sortedSales);
                    setRecentSales(sortedSales);
                }
            } catch (error) {
                console.error("Error loading sales:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadSales();
    }, []);

    const calculateTotal = (saleDetail: SaleDetail[]) => {
        if (!saleDetail || !Array.isArray(saleDetail)) return 0;
        return saleDetail.reduce((total, detail) => {
            return total + (Number(detail.quantity) * Number(detail.unitPrice));
        }, 0);
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        } catch (error) {
            return dateString;
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold text-gray-800">Últimas Ventas</CardTitle>
                <Button className="bg-[#FF77AA] hover:bg-[#e86699] text-white">Ver Todas</Button>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] w-full rounded-md border">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-gray-500">Cargando ventas...</span>
                        </div>
                    ) : recentSales.length > 0 ? (
                        <div className="space-y-4">
                            {recentSales.map((venta) => (
                                <div
                                    key={venta.id}
                                    className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors rounded-lg"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-900">
                                            {`${venta.customer.name} ${venta.customer.lastname}`}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            #{venta.id} • {formatDate(venta.createdAt)}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <span className="text-sm font-medium text-gray-900">
                                            ${calculateTotal(venta.saleDetail).toLocaleString('es-ES', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}
                                        </span>
                                        <Badge 
                                            className={`${estadoColor['Pagado']} px-2 py-0.5 rounded-full text-xs font-semibold`}
                                        >
                                            Pagado
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <span className="text-gray-500">No hay ventas disponibles</span>
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </Card>
    );
}