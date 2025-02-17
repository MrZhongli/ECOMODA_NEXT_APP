'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PlusCircle, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react'
import { SummaryCard } from '@/components/SummaryCard'


interface JournalEntry {
    id: number
    date: string
    description: string
    debit: number
    credit: number
    reference?: string
}

interface FinancialSummary {
    activo: number
    pasivo: number
    capital: number
}

const JournalPage: React.FC = () => {
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([])
    const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([])
    const [selectedMonth, setSelectedMonth] = useState<string>('')
    const [financialSummary, setFinancialSummary] = useState<FinancialSummary>({ activo: 0, pasivo: 0, capital: 0 })
    const router = useRouter()

    useEffect(() => {
        const mockEntries: JournalEntry[] = [
            { id: 1, date: '2025-04-05', description: 'Compra de insumos', debit: 800, credit: 0, reference: 'COMP-101' },
            { id: 2, date: '2025-04-10', description: 'Pago de nómina', debit: 2000, credit: 0, reference: 'NOM-2025-04' },
            { id: 3, date: '2025-04-15', description: 'Venta de productos', debit: 0, credit: 2500, reference: 'FAC-2025-04' },
            { id: 4, date: '2025-04-20', description: 'Pago de alquiler', debit: 600, credit: 0, reference: 'ALQ-2025-04' },
            { id: 5, date: '2025-05-02', description: 'Compra de inventario', debit: 1500, credit: 0, reference: 'COMP-2025-05' },
            { id: 6, date: '2025-05-10', description: 'Ingreso por servicios', debit: 0, credit: 3000, reference: 'SERV-2025-05' },
            { id: 7, date: '2025-05-18', description: 'Pago de impuestos', debit: 700, credit: 0, reference: 'IMP-2025-05' },
            { id: 8, date: '2025-05-25', description: 'Pago de proveedores', debit: 1200, credit: 0, reference: 'PROV-2025-05' },
            { id: 9, date: '2025-06-01', description: 'Venta especial', debit: 0, credit: 5000, reference: 'FAC-2025-06' },
            { id: 10, date: '2025-06-05', description: 'Pago de mantenimiento', debit: 900, credit: 0, reference: 'MANT-2025-06' },
        ]
        setJournalEntries(mockEntries)
        setFilteredEntries(mockEntries)

        const summary = {
            activo: 7000,
            pasivo: 3000,
            capital: 4000,
        }
        setFinancialSummary(summary)
    }, [])

    const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const month = event.target.value
        setSelectedMonth(month)
        if (month) {
            setFilteredEntries(journalEntries.filter(entry => entry.date.startsWith(`2025-${month}`)))
        } else {
            setFilteredEntries(journalEntries)
        }
    }

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-2xl font-bold text-[#4d619d]">Libro Diario</CardTitle>
                <Button onClick={() => router.push('/finance/journal-requests')} className="bg-[#f0627e] hover:bg-[#e05270] text-white">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Gestionar Solicitudes
                </Button>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <label className="mr-2 font-semibold">Filtrar por mes:</label>
                    <select className="border p-2 rounded" value={selectedMonth} onChange={handleMonthChange}>
                        <option value="">Todos</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                    </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <SummaryCard title="Activo" amount={financialSummary.activo} trend={2.5} icon={<DollarSign className="h-6 w-6 text-[#f0627e]" />} />
                    <SummaryCard title="Pasivo" amount={financialSummary.pasivo} trend={-1.2} icon={<ShoppingCart className="h-6 w-6 text-[#f0627e]" />} />
                    <SummaryCard title="Capital" amount={financialSummary.capital} trend={3.8} icon={<TrendingUp className="h-6 w-6 text-[#f0627e]" />} />
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead>Referencia</TableHead>
                            <TableHead className="text-right">Debe</TableHead>
                            <TableHead className="text-right">Haber</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEntries.map(entry => (
                            <TableRow key={entry.id}>
                                <TableCell>{entry.date}</TableCell>
                                <TableCell>{entry.description}</TableCell>
                                <TableCell>{entry.reference || 'N/A'}</TableCell>
                                <TableCell className="text-right">{entry.debit > 0 ? entry.debit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : '-'}</TableCell>
                                <TableCell className="text-right">{entry.credit > 0 ? entry.credit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' }) : '-'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default JournalPage
