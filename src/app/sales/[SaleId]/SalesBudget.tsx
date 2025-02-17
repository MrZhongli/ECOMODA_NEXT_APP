"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SaleDetail {
    productId: string;
    quantity: number;
    unitPrice: number;
}

interface Customer {
    idCard: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface SaleData {
    id: number;
    description: string;
    customerId: string;
    branchId: number;
    brandId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    customer: Customer | null;
    branch: Branch | null;
    saleDetail: SaleDetail[];
}

interface SalesBudgetProps {
    sale: SaleData | null;
}

const calcularSubtotal = (item: SaleDetail) => {
    return item.unitPrice * item.quantity;
}

export default function SalesBudget({ sale }: SalesBudgetProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (sale) {
            setIsLoading(false);
            console.log("Sale Data:", sale);  // Log the sale data here
        } else {
            setError("No se encontraron datos de la venta.");
            setIsLoading(false);
        }
    }, [sale]);
    
    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-blue-500 text-lg">Cargando datos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    if (!sale) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-red-500 text-lg">No se encontraron datos de la venta.</p>
            </div>
        );
    }

    // Extraer datos del cliente y la sucursal
    const customerName = sale.customer ? `${sale.customer.name} ${sale.customer.lastname}` : 'Cliente no disponible';
    const branchName = sale.branch ? sale.branch.name : 'Sucursal no disponible';

    return (
        <div className="min-h-screen bg-white">
            {/* Barra de Breadcrumb */}
            <div className="bg-white border-b p-4">
                <div className="container mx-auto">
                    <span className="text-[#4d619d]">Ventas / Detalle / {sale.customerId}</span>
                </div>
            </div>

            {/* Barra de Acciones */}
            <div className="bg-white border-b p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className="space-x-2">
                            <Button className="bg-[#f0627e] hover:bg-[#e05270] text-white">Guardar Cambios</Button>
                            <Button variant="outline">Cancelar</Button>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="link" className="text-[#4d619d]">Enviar por correo electrónico</Button>
                        <Button variant="link" className="text-[#4d619d]">Imprimir</Button>
                        <Button variant="outline">Confirmar</Button>
                        <Button variant="outline">Editar</Button>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-[#4d619d] mb-6">{sale.description || 'Sin descripción'}</h1>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <p><strong>Cliente:</strong> {customerName}</p>
                        <p><strong>Cliente ID:</strong> {sale.customerId}</p>
                        <p><strong>Sucursal:</strong> {branchName}</p>
                        <p><strong>Sucursal ID:</strong> {sale.branchId}</p>
                        <p><strong>Marca ID:</strong> {sale.brandId}</p>
                    </div>
                </div>

                <Tabs defaultValue="lineas">
                    <TabsList className="mb-4">
                        <TabsTrigger value="lineas" className="text-[#4d619d]">Líneas del pedido</TabsTrigger>
                        <TabsTrigger value="otra" className="text-[#4d619d]">Otra información</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lineas">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Producto ID</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Precio unitario</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sale.saleDetail && sale.saleDetail.length > 0 ? (
                                    sale.saleDetail.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>{item.productId}</TableCell>
                                            <TableCell>{item.quantity}</TableCell>
                                            <TableCell>
                                                {isNaN(Number(item.unitPrice)) ? "Precio inválido" : Number(item.unitPrice).toFixed(2)}
                                            </TableCell>
                                            <TableCell>{calcularSubtotal(item).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={4} className="text-center">
                                            No hay detalles de venta disponibles
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="otra">
                        <p><strong>Estado:</strong> Pendiente</p>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
