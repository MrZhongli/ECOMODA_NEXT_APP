'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DollarSign, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight, Users, Package } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AccountBalanceReport from './AccountBalanceReport'
import { DetailedBalanceSheet } from './DetailedBalanceSheet'

interface SummaryCardProps {
    title: string
    amount: number
    trend: number
    icon: React.ReactNode
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, trend, icon }) => (
    <Card className="flex flex-col h-full">
        <CardHeader>
            <CardTitle className="flex items-center justify-between text-[#4d619d]">
                <span className="flex items-center">
                    {icon}
                    <span className="ml-2">{title}</span>
                </span>
                {trend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
            </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-2xl font-bold">${amount.toLocaleString()}</p>
            <p className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? '+' : ''}{trend}% vs mes anterior
            </p>
        </CardContent>
    </Card>
)

const salesData = [
    { month: 'Ene', amount: 4000 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 5000 },
    { month: 'Abr', amount: 4500 },
    { month: 'May', amount: 6000 },
    { month: 'Jun', amount: 5500 },
]

const purchasesData = [
    { month: 'Ene', amount: 3000 },
    { month: 'Feb', amount: 2500 },
    { month: 'Mar', amount: 4000 },
    { month: 'Abr', amount: 3500 },
    { month: 'May', amount: 4500 },
    { month: 'Jun', amount: 4000 },
]

// Datos de ejemplo para los widgets
const financialSummary = {
    activo: 500000,
    pasivo: 200000,
    capital: 300000,
    ventas: 150000,
    compras: 100000,
    clientes: 250,
    productos: 50
}

export default function SimplifiedDashboardFinance() {
    const [selectedType, setSelectedType] = useState<'ventas' | 'compras'>('ventas')
    const [selectedInvoice, setSelectedInvoice] = useState<string | null>(null)

    const data = selectedType === 'ventas' ? salesData : purchasesData

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-[#4d619d]">Dashboard de Finanzas</h1>
                    <Select
                        value={selectedType}
                        onValueChange={(value) => setSelectedType(value as 'ventas' | 'compras')}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Seleccionar tipo" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ventas">Ventas</SelectItem>
                            <SelectItem value="compras">Compras</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <SummaryCard
                        title="Activo"
                        amount={financialSummary.activo}
                        trend={2.5}
                        icon={<DollarSign className="h-6 w-6 text-[#f0627e]" />}
                    />
                    <SummaryCard
                        title="Pasivo"
                        amount={financialSummary.pasivo}
                        trend={-1.2}
                        icon={<ShoppingCart className="h-6 w-6 text-[#f0627e]" />}
                    />
                    <SummaryCard
                        title="Capital"
                        amount={financialSummary.capital}
                        trend={3.8}
                        icon={<TrendingUp className="h-6 w-6 text-[#f0627e]" />}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <SummaryCard
                        title="Ventas"
                        amount={financialSummary.ventas}
                        trend={5.2}
                        icon={<DollarSign className="h-6 w-6 text-[#4d619d]" />}
                    />
                    <SummaryCard
                        title="Compras"
                        amount={financialSummary.compras}
                        trend={-2.1}
                        icon={<ShoppingCart className="h-6 w-6 text-[#4d619d]" />}
                    />
                    <SummaryCard
                        title="Clientes"
                        amount={financialSummary.clientes}
                        trend={1.5}
                        icon={<Users className="h-6 w-6 text-[#4d619d]" />}
                    />
                    <SummaryCard
                        title="Productos"
                        amount={financialSummary.productos}
                        trend={0.8}
                        icon={<Package className="h-6 w-6 text-[#4d619d]" />}
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-[#4d619d]">
                            Tendencia de {selectedType === 'ventas' ? 'Ventas' : 'Compras'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="amount" fill={selectedType === 'ventas' ? "#f0627e" : "#4d619d"} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-[#4d619d]">
                            Últimas {selectedType === 'ventas' ? 'Ventas' : 'Compras'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Factura</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead className="text-right">Monto</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selectedType === 'ventas' ? (
                                    <>
                                        <TableRow>
                                            <TableCell>FAC-001</TableCell>
                                            <TableCell>2024-01-15</TableCell>
                                            <TableCell>Venta de productos</TableCell>
                                            <TableCell className="text-right">$5,000.00</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" onClick={() => setSelectedInvoice('FAC-001')}>
                                                            Ver Reporte
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Reporte de Venta - FAC-001</DialogTitle>
                                                        </DialogHeader>
                                                        <AccountBalanceReport invoice="FAC-001" type="venta" />
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>FAC-002</TableCell>
                                            <TableCell>2024-01-13</TableCell>
                                            <TableCell>Venta de servicios</TableCell>
                                            <TableCell className="text-right">$7,200.00</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" onClick={() => setSelectedInvoice('FAC-002')}>
                                                            Ver Reporte
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Reporte de Venta - FAC-002</DialogTitle>
                                                        </DialogHeader>
                                                        <AccountBalanceReport invoice="FAC-002" type="venta" />
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                ) : (
                                    <>
                                        <TableRow>
                                            <TableCell>COM-001</TableCell>
                                            <TableCell>2024-01-14</TableCell>
                                            <TableCell>Compra de insumos</TableCell>
                                            <TableCell className="text-right">$3,500.00</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" onClick={() => setSelectedInvoice('COM-001')}>
                                                            Ver Reporte
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Reporte de Compra - COM-001</DialogTitle>
                                                        </DialogHeader>
                                                        <AccountBalanceReport invoice="COM-001" type="compra" />
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>COM-002</TableCell>
                                            <TableCell>2024-01-12</TableCell>
                                            <TableCell>Compra de equipos</TableCell>
                                            <TableCell className="text-right">$2,800.00</TableCell>
                                            <TableCell>
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="outline" onClick={() => setSelectedInvoice('COM-002')}>
                                                            Ver Reporte
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-4xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Reporte de Compra - COM-002</DialogTitle>
                                                        </DialogHeader>
                                                        <AccountBalanceReport invoice="COM-002" type="compra" />
                                                    </DialogContent>
                                                </Dialog>
                                            </TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <div>
                        <DetailedBalanceSheet/>
                    </div>
                    <CardFooter>
                        <Button className="w-full bg-[#f0627e] hover:bg-[#e05270] text-white">
                            Ver Todas las {selectedType === 'ventas' ? 'Ventas' : 'Compras'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}