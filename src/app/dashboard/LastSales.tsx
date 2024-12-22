import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

// Define los estados permitidos
type EstadoVenta = 'Pagado' | 'Pendiente' | 'Cancelado';

const ventasRecientes: { id: string; cliente: string; fecha: string; total: string; estado: EstadoVenta }[] = [
    { id: '#0001', cliente: 'Ana García', fecha: '15-12-2024', total: '$120.00', estado: 'Pagado' },
    { id: '#0002', cliente: 'Carlos Rodríguez', fecha: '14-12-2024', total: '$85.50', estado: 'Pendiente' },
    { id: '#0003', cliente: 'María López', fecha: '13-12-2024', total: '$200.00', estado: 'Pagado' },
    { id: '#0004', cliente: 'Juan Martínez', fecha: '12-12-2024', total: '$150.00', estado: 'Cancelado' },
    { id: '#0005', cliente: 'Laura Sánchez', fecha: '11-12-2024', total: '$95.00', estado: 'Pagado' },
];

const estadoColor: Record<EstadoVenta, string> = {
    Pagado: 'bg-green-100 text-green-800',
    Pendiente: 'bg-yellow-100 text-yellow-800',
    Cancelado: 'bg-red-100 text-red-800',
};

export function LastSales() {
    return (
        <Card className="w-full max-w-2xl mx-auto bg-white shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold text-gray-800">Últimas Ventas</CardTitle>
                <Button className="bg-[#FF77AA] hover:bg-[#e86699] text-white">Ver Todas</Button>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[300px] w-full rounded-md border">
                    <div className="space-y-4">
                        {ventasRecientes.map((venta) => (
                            <div
                                key={venta.id}
                                className="flex items-center justify-between p-4 hover:bg-gray-100 transition-colors rounded-lg"
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-900">{venta.cliente}</span>
                                    <span className="text-xs text-gray-500">{venta.id} • {venta.fecha}</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="text-sm font-medium text-gray-900">{venta.total}</span>
                                    <Badge className={`${estadoColor[venta.estado]} px-2 py-0.5 rounded-full text-xs font-semibold`}>
                                        {venta.estado}
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
