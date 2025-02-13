"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"

type AccountType = 'ACTIVO' | 'PASIVO' | 'CAPITAL' | 'INGRESO' | 'EGRESO'

interface Account {
    id: number
    name: string
    type: AccountType
    balance: number
}

const accounts: Account[] = [
    { id: 1, name: 'Caja', type: 'ACTIVO', balance: 50000 },
    { id: 2, name: 'Banco', type: 'ACTIVO', balance: 450000 },
    { id: 3, name: 'Cuentas por Cobrar', type: 'ACTIVO', balance: 100000 },
    { id: 4, name: 'Inventario', type: 'ACTIVO', balance: 200000 },
    { id: 5, name: 'Cuentas por Pagar', type: 'PASIVO', balance: -150000 },
    { id: 6, name: 'Préstamos', type: 'PASIVO', balance: -50000 },
    { id: 7, name: 'Capital Social', type: 'CAPITAL', balance: -500000 },
    { id: 8, name: 'Ventas', type: 'INGRESO', balance: -200000 },
    { id: 9, name: 'Costo de Ventas', type: 'EGRESO', balance: 100000 },
]

export function DetailedBalanceSheet() {
    const [isExpanded, setIsExpanded] = useState(false)

    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(Math.abs(amount))
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold text-[#4d619d]">Balance Detallado</CardTitle>
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-9 p-0"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                    ) : (
                        <ChevronDown className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                        {isExpanded ? 'Colapsar detalles' : 'Expandir detalles'}
                    </span>
                </Button>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-[#f0627e] mb-4">
                    {formatCurrency(totalBalance)}
                </div>
                {isExpanded && (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Cuenta</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead className="text-right">Saldo</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {accounts.map(account => (
                                <TableRow key={account.id}>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.type}</TableCell>
                                    <TableCell className={`text-right font-bold ${account.balance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        {formatCurrency(account.balance)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
                <Button
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? 'Ocultar Detalles' : 'Ver Más'}
                </Button>
                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-[#4d619d] mb-2">Resumen de Balance</h3>
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
                        <span>Total Activos: {formatCurrency(accounts.filter(a => a.type === 'ACTIVO').reduce((sum, a) => sum + a.balance, 0))}</span>
                        <span>Total Pasivos: {formatCurrency(Math.abs(accounts.filter(a => a.type === 'PASIVO').reduce((sum, a) => sum + a.balance, 0)))}</span>
                        <div className="flex items-center">
                            <span className={`font-bold mr-2 ${totalBalance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                Balance Total: {formatCurrency(totalBalance)}
                            </span>
                            {totalBalance > 0 ? <ArrowUpRight className="h-5 w-5 text-green-500" /> : <ArrowDownRight className="h-5 w-5 text-red-500" />}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}