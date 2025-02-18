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

interface Journal {
    id: number
    date: string
    ref: string
    account: string
    description: string
    amount: string
    type: 'DEBE' | 'HABER'
}

const JournalPage: React.FC = () => {
    const [journals, setJournals] = useState<Journal[]>([])
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const router = useRouter()

    useEffect(() => {
        const fetchJournals = async () => {
            try {
                const response = await fetch('http://localhost:8000/journals')
                const data = await response.json()
                setJournals(data.journals)
            } catch (error) {
                console.error('Error fetching journals:', error)
            }
        }

        fetchJournals()
    }, [])

    const handleManageRequests = () => {
        router.push('/finance/journal-requests')
    }

    const handleNewManualEntry = () => {
        router.push('/finance/journal/journal-manual-entry')
    }

    const filteredJournals = journals.filter(journal =>
        (!startDate || journal.date.split('T')[0] >= startDate) &&
        (!endDate || journal.date.split('T')[0] <= endDate)
    )

    const calculateTotal = (filteredJournals: Journal[], type: 'DEBE' | 'HABER') => {
        return filteredJournals.reduce((sum, journal) => {
            if (journal.type === type) {
                return sum + parseFloat(journal.amount)
            }
            return sum
        }, 0)
    }

    const totalDebit = calculateTotal(filteredJournals, 'DEBE')
    const totalCredit = calculateTotal(filteredJournals, 'HABER')

    const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01

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
                            <TableHead>Referencia</TableHead>
                            <TableHead>Cuenta</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Monto</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredJournals.map((journal) => (
                            <TableRow key={journal.id}>
                                <TableCell>{new Date(journal.date).toLocaleDateString()}</TableCell>
                                <TableCell>{journal.ref}</TableCell>
                                <TableCell>{journal.account}</TableCell>
                                <TableCell>{journal.description}</TableCell>
                                <TableCell>{journal.type}</TableCell>
                                <TableCell className="text-right">
                                    {parseFloat(journal.amount).toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-4 flex justify-between">
                    <div>
                        <span className="font-bold">Total Debe:</span>{' '}
                        {totalDebit.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                    </div>
                    <div>
                        <span className="font-bold">Total Haber:</span>{' '}
                        {totalCredit.toLocaleString('es-ES', { style: 'currency', currency: 'USD' })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default JournalPage
