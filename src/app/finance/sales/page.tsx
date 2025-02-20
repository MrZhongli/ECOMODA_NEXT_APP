'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
import { BarChart, DollarSign, ShoppingBag, Store, Users } from 'lucide-react'
import Link from 'next/link'

export default function Component() {
    const [selectedBranch, setSelectedBranch] = useState('all')
    const [selectedCollection, setSelectedCollection] = useState('all')

    // Sample data - In a real app, this would come from your API
    const salesStats = {
        totalSales: 125850.00,
        pendingPayments: 12500.00,
        totalCustomers: 450,
        averageTicket: 279.67
    }

    const recentSales = [
        {
            id: 1,
            date: '2024-01-25',
            customer: 'María González',
            amount: 1250.00,
            paymentMethod: 'Tarjeta',
            status: 'Completado',
            branch: 'Central'
        },
        // More sales...
    ]

    return (
        <div className="w-full flex flex-col gap-6 p-8 justify-start">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-[#4d619d]">Módulo de Ventas</h1>
                <div className="flex gap-4">
                    <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar Sucursal" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las Sucursales</SelectItem>
                            <SelectItem value="central">Sucursal Central</SelectItem>
                            <SelectItem value="norte">Sucursal Norte</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={selectedCollection} onValueChange={setSelectedCollection}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar Colección" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las Colecciones</SelectItem>
                            <SelectItem value="summer">Verano 2024</SelectItem>
                            <SelectItem value="winter">Invierno 2023</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Ventas Totales</CardTitle>
                        <DollarSign className="h-4 w-4 text-[#4d619d]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#4d619d]">
                            ${salesStats.totalSales.toLocaleString('es-MX')}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pagos Pendientes</CardTitle>
                        <ShoppingBag className="h-4 w-4 text-[#f0627e]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-[#f0627e]">
                            ${salesStats.pendingPayments.toLocaleString('es-MX')}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Clientes Totales</CardTitle>
                        <Users className="h-4 w-4 text-[#4d619d]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{salesStats.totalCustomers}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Ticket Promedio</CardTitle>
                        <Store className="h-4 w-4 text-[#4d619d]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            ${salesStats.averageTicket.toLocaleString('es-MX')}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="sales" className="w-full">
                <TabsList>
                    <TabsTrigger value="sales">Ventas Recientes</TabsTrigger>
                    <TabsTrigger value="accounts">Cuentas Asociadas</TabsTrigger>
                    <TabsTrigger value="reports">Reportes</TabsTrigger>
                </TabsList>

                <TabsContent value="sales">
                    <Card>
                        <CardHeader>
                            <CardTitle>Registro de Ventas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Fecha</TableHead>
                                        <TableHead>Cliente</TableHead>
                                        <TableHead>Monto</TableHead>
                                        <TableHead>Método de Pago</TableHead>
                                        <TableHead>Estado</TableHead>
                                        <TableHead>Sucursal</TableHead>
                                        <TableHead>Acciones</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentSales.map((sale) => (
                                        <TableRow key={sale.id}>
                                            <TableCell>{sale.date}</TableCell>
                                            <TableCell>{sale.customer}</TableCell>
                                            <TableCell>${sale.amount.toLocaleString('es-MX')}</TableCell>
                                            <TableCell>{sale.paymentMethod}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${sale.status === 'Completado' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {sale.status}
                                                </span>
                                            </TableCell>
                                            <TableCell>{sale.branch}</TableCell>
                                            <TableCell>
                                                {/* remplazar 1 por id */}
                                                <Link href={`/finance/sales/${1}`}>
                                                    <Button variant="ghost" size="sm">Ver Detalles</Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="accounts">
                    <Card>
                        <CardHeader>
                            <CardTitle>Cuentas Contables Asociadas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm">Ingresos por Ventas</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-green-600">
                                            ${(salesStats.totalSales - salesStats.pendingPayments).toLocaleString('es-MX')}
                                        </div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-sm">Cuentas por Cobrar</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-[#f0627e]">
                                            ${salesStats.pendingPayments.toLocaleString('es-MX')}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="reports">
                    <Card>
                        <CardHeader>
                            <CardTitle>Reportes y Análisis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 md:grid-cols-3">
                                <Button className="flex items-center gap-2">
                                    <BarChart className="h-4 w-4" />
                                    Reporte de Ventas por Sucursal
                                </Button>
                                <Button className="flex items-center gap-2">
                                    <BarChart className="h-4 w-4" />
                                    Reporte de Ventas por Colección
                                </Button>
                                <Button className="flex items-center gap-2">
                                    <BarChart className="h-4 w-4" />
                                    Estado de Resultados
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}