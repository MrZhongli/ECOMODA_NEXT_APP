'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos ficticios para la venta 1
const venta1 = {
    id: 1,
    cliente: "Cliente 1",
    direccionFactura: "Dirección 1",
    direccionEntrega: "Entrega 1",
    validez: "30 días",
    tarifa: "Tarifa 1",
    plazoPago: "Plazo 1",
    productos: [
        { id: 1, nombre: 'Producto A', descripcion: 'Descripción del Producto A', cantidad: 2, precio: 100, descuento: 10 },
        { id: 2, nombre: 'Producto B', descripcion: 'Descripción del Producto B', cantidad: 1, precio: 150, descuento: 0 },
    ],
    estado: "Pendiente"
}

const calcularSubtotal = (producto: any) => {
    return producto.precio * producto.cantidad * (1 - producto.descuento / 100)
}

export default function SalesBudget() {
    return (
        <div className="min-h-screen bg-white">
            {/* Barra de Breadcrumb */}
            <div className="bg-white border-b p-4">
                <div className="container mx-auto">
                    <span className="text-[#4d619d]">Ventas / Detalle / {venta1.id}</span>
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
                <h1 className="text-2xl font-bold text-[#4d619d] mb-6">Detalle de Venta #{venta1.id}</h1>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <p><strong>Cliente:</strong> {venta1.cliente}</p>
                        <p><strong>Dirección de Factura:</strong> {venta1.direccionFactura}</p>
                        <p><strong>Dirección de Entrega:</strong> {venta1.direccionEntrega}</p>
                    </div>
                    <div>
                        <p><strong>Validez:</strong> {venta1.validez}</p>
                        <p><strong>Tarifa:</strong> {venta1.tarifa}</p>
                        <p><strong>Plazos de Pago:</strong> {venta1.plazoPago}</p>
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
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Precio unitario</TableHead>
                                    <TableHead>Descuento (%)</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {venta1.productos.map((producto, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{producto.nombre}</TableCell>
                                        <TableCell>{producto.descripcion}</TableCell>
                                        <TableCell>{producto.cantidad}</TableCell>
                                        <TableCell>{producto.precio}</TableCell>
                                        <TableCell>{producto.descuento}</TableCell>
                                        <TableCell>{calcularSubtotal(producto).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="otra">
                        <p><strong>Estado:</strong> {venta1.estado}</p>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    )
}
