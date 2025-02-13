'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, User, MapPin, Phone, Mail, CreditCard, Package, Store, Receipt, Calendar } from 'lucide-react'

export default function Component() {
    const [time, setTime] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    // Sample data - would come from your database
    const saleDetails = {
        id: "VTA-2024-001",
        date: "2024-01-26",
        customer: {
            id_card: "12345678",
            name: "María González",
            lastname: "Pérez",
            email: "maria.gonzalez@email.com",
            phone: "+52 555 123 4567",
            address: "Av. Principal 123, Col. Centro"
        },
        branch: {
            name: "Sucursal Central",
            address: "Plaza Mayor 456",
            phone: "+52 555 987 6543"
        },
        payment: {
            method: "Tarjeta de Crédito",
            ref: "REF-123456",
            status: "Completado"
        },
        items: [
            {
                id: 1,
                name: "Vestido Floral",
                collection: "Verano 2024",
                size: "M",
                quantity: 1,
                unit_price: 1299.99,
                total: 1299.99
            },
            {
                id: 2,
                name: "Blazer Clásico",
                collection: "Invierno 2023",
                size: "S",
                quantity: 1,
                unit_price: 1899.99,
                total: 1899.99
            }
        ]
    }

    const totalAmount = saleDetails.items.reduce((sum, item) => sum + item.total, 0)

    return (
        <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-[#4d619d] mb-2">Detalle de Venta #{saleDetails.id}</h1>
                        <p className="text-gray-500 flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Fecha: {saleDetails.date}
                        </p>
                    </div>

                    {/* Large Clock Display */}
                    <Card className="w-full md:w-[300px] bg-[#4d619d] text-white">
                        <CardContent className="pt-6">
                            <div className="flex flex-col items-center">
                                <Clock className="h-8 w-8 md:h-12 md:w-12 mb-2" />
                                <div className="text-2xl md:text-4xl font-bold tabular-nums">
                                    {time.toLocaleTimeString('es-MX', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    })}
                                </div>
                                <div className="text-xs md:text-sm opacity-80 mt-1">
                                    {time.toLocaleDateString('es-MX', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Customer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[#4d619d] flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Información del Cliente
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2 text-sm">
                                    <Badge variant="outline">{saleDetails.customer.id_card}</Badge>
                                    <span className="font-semibold">
                                        {saleDetails.customer.name} {saleDetails.customer.lastname}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Mail className="h-4 w-4" />
                                    {saleDetails.customer.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Phone className="h-4 w-4" />
                                    {saleDetails.customer.phone}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <MapPin className="h-4 w-4" />
                                    {saleDetails.customer.address}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Branch and Payment Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-[#4d619d] flex items-center gap-2">
                                <Store className="h-5 w-5" />
                                Información de la Venta
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Sucursal</h3>
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <div>{saleDetails.branch.name}</div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            {saleDetails.branch.address}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            {saleDetails.branch.phone}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Pago</h3>
                                    <div className="text-sm text-gray-500 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <CreditCard className="h-4 w-4" />
                                            {saleDetails.payment.method}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Receipt className="h-4 w-4" />
                                            Ref: {saleDetails.payment.ref}
                                        </div>
                                        <Badge
                                            className={saleDetails.payment.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                                        >
                                            {saleDetails.payment.status}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Products Table */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-[#4d619d] flex items-center gap-2">
                            <Package className="h-5 w-5" />
                            Productos
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Colección</TableHead>
                                    <TableHead>Talla</TableHead>
                                    <TableHead className="text-right">Cantidad</TableHead>
                                    <TableHead className="text-right">Precio Unitario</TableHead>
                                    <TableHead className="text-right">Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {saleDetails.items.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell className="font-medium">{item.name}</TableCell>
                                        <TableCell>{item.collection}</TableCell>
                                        <TableCell>{item.size}</TableCell>
                                        <TableCell className="text-right">{item.quantity}</TableCell>
                                        <TableCell className="text-right">${item.unit_price.toLocaleString('es-MX')}</TableCell>
                                        <TableCell className="text-right">${item.total.toLocaleString('es-MX')}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={5} className="text-right font-bold">Total</TableCell>
                                    <TableCell className="text-right font-bold text-[#4d619d]">
                                        ${totalAmount.toLocaleString('es-MX')}
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex flex-col md:flex-row justify-end gap-4">
                    <Button variant="outline" className="w-full md:w-auto">
                        Imprimir Factura
                    </Button>
                    <Button className="bg-[#4d619d] hover:bg-[#3d4f7d] w-full md:w-auto">
                        Generar Nota de Crédito
                    </Button>
                </div>
            </div>
        </div>
    )
}