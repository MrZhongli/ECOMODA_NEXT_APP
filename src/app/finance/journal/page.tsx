'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PlusCircle, AlertCircle, CheckCircle } from 'lucide-react'

interface AccountBalance {
    id: number
    amountAvailable: string
    accountId: number
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

interface Account {
    id: number
    name: string
    type: 'ACTIVO' | 'PASIVO' | 'CAPITAL' | 'INGRESO' | 'EGRESO'
    createdAt: string
    updatedAt: string
    deletedAt: string | null
    accountBalance: AccountBalance | null
}

const JournalPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await fetch('http://localhost:8000/accounts')
                const data = await response.json()
                setAccounts(data.accounts)
            } catch (error) {
                console.error('Error fetching accounts:', error)
            }
        }

        fetchAccounts()
    }, [])

    const handleManageRequests = () => {
        router.push('/finance/journal-requests')
    }

    const handleNewManualEntry = () => {
        router.push('/finance/journal/journal-manual-entry')
    }

    const filteredAccounts = accounts.filter(account =>
        (!startDate || account.createdAt.split('T')[0] >= startDate) &&
        (!endDate || account.createdAt.split('T')[0] <= endDate)
    )

    const calculateBalance = (account: Account) => {
        if (!account.accountBalance) return 0
        return parseFloat(account.accountBalance.amountAvailable)
    }

    const totalDebit = filteredAccounts.reduce((sum, account) => {
        const balance = calculateBalance(account)
        if (['ACTIVO', 'EGRESO'].includes(account.type)) {
            return sum + balance
        }
        return sum
    }, 0)

    const totalCredit = filteredAccounts.reduce((sum, account) => {
        const balance = calculateBalance(account)
        if (['PASIVO', 'CAPITAL', 'INGRESO'].includes(account.type)) {
            return sum + balance
        }
        return sum
    }, 0)

    const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01 // Consideramos un pequeño margen de error debido a los cálculos con decimales

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold text-[#4d619d]">Libro Diario</CardTitle>
                <div className="flex space-x-2">
                    <Button
                        onClick={handleNewManualEntry}
                        className="bg-[#4d619d] hover:bg-[#3c4d7c] text-white"
                    >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Nuevo Asiento Manual
                    </Button>
                    <Button onClick={handleManageRequests} className="bg-[#f0627e] hover:bg-[#e05270] text-white">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Gestionar Solicitudes
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-4">
                        <div>
                            <Label htmlFor="startDate">Fecha Inicio</Label>
                            <Input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="endDate">Fecha Fin</Label>
                            <Input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        {isBalanced ? (
                            <CheckCircle className="text-green-500" />
                        ) : (
                            <AlertCircle className="text-red-500" />
                        )}
                        <span className={isBalanced ? "text-green-500" : "text-red-500"}>
                            {isBalanced ? "Balanceado" : "No Balanceado"}
                        </span>
                    </div>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Cuenta</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Debe</TableHead>
                            <TableHead className="text-right">Haber</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAccounts.map((account) => {
                            const balance = calculateBalance(account)
                            const isDebit = ['ACTIVO', 'EGRESO'].includes(account.type)
                            return (
                                <TableRow key={account.id}>
                                    <TableCell>{new Date(account.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.type}</TableCell>
                                    <TableCell className="text-right">
                                        {isDebit ? balance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : '-'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {!isDebit ? balance.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : '-'}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <div className="mt-4 flex justify-between">
                    <div>
                        <span className="font-bold">Total Debe:</span>{' '}
                        {totalDebit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </div>
                    <div>
                        <span className="font-bold">Total Haber:</span>{' '}
                        {totalCredit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default JournalPage