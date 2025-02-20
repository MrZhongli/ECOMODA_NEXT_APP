'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PlusCircle, Trash2 } from 'lucide-react'

interface Account {
    id: number
    name: string
    type: 'ACTIVO' | 'PASIVO' | 'CAPITAL' | 'INGRESO' | 'EGRESO'
}

interface EntryLine {
    id: string
    accountId: number
    description: string
    debit: number
    credit: number
}

const ManualJournalEntryPage: React.FC = () => {
    const [accounts, setAccounts] = useState<Account[]>([])
    const [entryLines, setEntryLines] = useState<EntryLine[]>([])
    const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0])
    const [entryDescription, setEntryDescription] = useState('')
    const router = useRouter()

    useEffect(() => {
        // Aquí normalmente harías una llamada a la API para obtener las cuentas
        // Por ahora, usaremos datos de ejemplo
        const mockAccounts: Account[] = [
            { id: 1, name: 'Caja', type: 'ACTIVO' },
            { id: 2, name: 'Banco', type: 'ACTIVO' },
            { id: 3, name: 'Cuentas por Cobrar', type: 'ACTIVO' },
            { id: 4, name: 'Inventario', type: 'ACTIVO' },
            { id: 5, name: 'Cuentas por Pagar', type: 'PASIVO' },
            { id: 6, name: 'Capital Social', type: 'CAPITAL' },
            { id: 7, name: 'Ventas', type: 'INGRESO' },
            { id: 8, name: 'Costo de Ventas', type: 'EGRESO' },
        ]
        setAccounts(mockAccounts)
    }, [])

    const addEntryLine = () => {
        const newLine: EntryLine = {
            id: Date.now().toString(),
            accountId: 0,
            description: '',
            debit: 0,
            credit: 0
        }
        setEntryLines([...entryLines, newLine])
    }

    const updateEntryLine = (id: string, field: keyof EntryLine, value: any) => {
        setEntryLines(entryLines.map(line =>
            line.id === id ? { ...line, [field]: value } : line
        ))
    }

    const removeEntryLine = (id: string) => {
        setEntryLines(entryLines.filter(line => line.id !== id))
    }

    const calculateTotals = () => {
        return entryLines.reduce(
            (acc, line) => ({
                totalDebit: acc.totalDebit + line.debit,
                totalCredit: acc.totalCredit + line.credit
            }),
            { totalDebit: 0, totalCredit: 0 }
        )
    }

    const isBalanced = () => {
        const { totalDebit, totalCredit } = calculateTotals()
        return totalDebit === totalCredit
    }

    const handleSubmit = () => {
        if (!isBalanced()) {
            alert('El asiento no está balanceado. Por favor, revise los montos.')
            return
        }
        // Aquí normalmente enviarías los datos a tu API
        console.log('Asiento contable:', {
            date: entryDate,
            description: entryDescription,
            lines: entryLines
        })
        // Redirigir al libro diario después de guardar
        router.push('/finance/journal')
    }

    const { totalDebit, totalCredit } = calculateTotals()

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-[#4d619d]">Asiento Contable Manual</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <Label htmlFor="entryDate">Fecha</Label>
                        <Input
                            id="entryDate"
                            type="date"
                            value={entryDate}
                            onChange={(e) => setEntryDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="entryDescription">Descripción General</Label>
                        <Input
                            id="entryDescription"
                            value={entryDescription}
                            onChange={(e) => setEntryDescription(e.target.value)}
                            placeholder="Descripción del asiento contable"
                        />
                    </div>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cuenta</TableHead>
                            <TableHead>Descripción</TableHead>
                            <TableHead className="text-right">Debe</TableHead>
                            <TableHead className="text-right">Haber</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {entryLines.map((line) => (
                            <TableRow key={line.id}>
                                <TableCell>
                                    <Select
                                        value={line.accountId.toString()}
                                        onValueChange={(value) => updateEntryLine(line.id, 'accountId', parseInt(value))}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar cuenta" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {accounts.map((account) => (
                                                <SelectItem key={account.id} value={account.id.toString()}>
                                                    {account.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={line.description}
                                        onChange={(e) => updateEntryLine(line.id, 'description', e.target.value)}
                                        placeholder="Descripción"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={line.debit || ''}
                                        onChange={(e) => updateEntryLine(line.id, 'debit', parseFloat(e.target.value) || 0)}
                                        className="text-right"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={line.credit || ''}
                                        onChange={(e) => updateEntryLine(line.id, 'credit', parseFloat(e.target.value) || 0)}
                                        className="text-right"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeEntryLine(line.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Button
                    onClick={addEntryLine}
                    className="mt-4 bg-[#4d619d] hover:bg-[#3c4d7c] text-white"
                >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Agregar Línea
                </Button>

                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <span className="font-bold">Total Debe:</span> {totalDebit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </div>
                    <div>
                        <span className="font-bold">Total Haber:</span> {totalCredit.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                    </div>
                    <div className={`font-bold ${isBalanced() ? 'text-green-500' : 'text-red-500'}`}>
                        {isBalanced() ? 'Balanceado' : 'No Balanceado'}
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button
                    onClick={handleSubmit}
                    className="bg-[#f0627e] hover:bg-[#e05270] text-white"
                    disabled={!isBalanced()}
                >
                    Guardar Asiento
                </Button>
            </CardFooter>
        </Card>
    )
}

export default ManualJournalEntryPage