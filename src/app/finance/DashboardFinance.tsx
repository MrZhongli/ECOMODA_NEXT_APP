'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { DollarSign, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import Link from 'next/link'

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

export default function SimplifiedDashboardFinance() {
    const [selectedType, setSelectedType] = useState<'ventas' | 'compras'>('ventas')

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
                        title={selectedType === 'ventas' ? "Ventas Totales" : "Compras Totales"}
                        amount={selectedType === 'ventas' ? 250000 : 180000}
                        trend={selectedType === 'ventas' ? 5.2 : -2.1}
                        icon={selectedType === 'ventas' ? 
                            <DollarSign className="h-6 w-6 text-[#f0627e]" /> : 
                            <ShoppingCart className="h-6 w-6 text-[#f0627e]" />
                        }
                    />
                    <SummaryCard
                        title={selectedType === 'ventas' ? "Promedio de Venta" : "Promedio de Compra"}
                        amount={selectedType === 'ventas' ? 5000 : 4500}
                        trend={selectedType === 'ventas' ? 3.8 : 1.5}
                        icon={<TrendingUp className="h-6 w-6 text-[#f0627e]" />}
                    />
                    <SummaryCard
                        title={selectedType === 'ventas' ? "Clientes Nuevos" : "Proveedores Nuevos"}
                        amount={selectedType === 'ventas' ? 50 : 10}
                        trend={selectedType === 'ventas' ? 10 : 5}
                        icon={<DollarSign className="h-6 w-6 text-[#f0627e]" />}
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
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead className="text-right">Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selectedType === 'ventas' ? (
                                    <>
                                        <TableRow>
                                            <TableCell>2024-01-15</TableCell>
                                            <TableCell>Factura #1234</TableCell>
                                            <TableCell className="text-right">$5,000.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>2024-01-13</TableCell>
                                            <TableCell>Factura #1235</TableCell>
                                            <TableCell className="text-right">$7,200.00</TableCell>
                                        </TableRow>
                                    </>
                                ) : (
                                    <>
                                        <TableRow>
                                            <TableCell>2024-01-14</TableCell>
                                            <TableCell>Orden #5678</TableCell>
                                            <TableCell className="text-right">$3,500.00</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>2024-01-12</TableCell>
                                            <TableCell>Orden #5679</TableCell>
                                            <TableCell className="text-right">$2,800.00</TableCell>
                                        </TableRow>
                                    </>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-[#f0627e] hover:bg-[#e05270] text-white">
                        <Link href={selectedType === 'ventas' ? 'finance/sales' : 'finance/pucharses'} >
                            Ver Todas las {selectedType === 'ventas' ? 'Ventas' : 'Compras'}
                        </Link>

                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}