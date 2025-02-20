'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
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
import { PlusCircle, Search } from 'lucide-react'

interface AccountRecord {
    id: number
    description: string
    amount: string
    type: "DEBE" | "HABER"
    accountId: number
    createdAt: string
    updatedAt: string
    deletedAt: string | null
}

interface Account {
    id: number
    name: string
}

const JournalRequestManagement: React.FC = () => {
    const [accountRecords, setAccountRecords] = useState<AccountRecord[]>([])
    const [accounts, setAccounts] = useState<Account[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [description, setDescription] = useState('')
    const [amount, setAmount] = useState('')
    const [type, setType] = useState<"DEBE" | "HABER">("DEBE")
    const [accountId, setAccountId] = useState<number | null>(null)

    // Descripciones estándar
    const standardDescriptions = [
        "Pago de nómina",
        "Compra de mercancía",
        "Venta de productos",
        "Pago de servicios públicos",
        "Depósito en banco",
        "Retiro de efectivo"
    ]

    // Función para cargar los registros contables
    const fetchAccountRecords = async () => {
        try {
            const response = await fetch('http://localhost:8000/account-records')
            const data = await response.json()
            setAccountRecords(data.accountRecords.sort((a: AccountRecord, b: AccountRecord) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
        } catch (error) {
            console.error("Error fetching account records:", error)
            setError("Error al cargar los registros contables.")
        }
    }

    // Función para cargar las cuentas
    const fetchAccounts = async () => {
        try {
            const response = await fetch('http://localhost:8000/accounts')
            const data = await response.json()
            setAccounts(data.accounts)
        } catch (error) {
            console.error("Error fetching accounts:", error)
            setError("Error al cargar las cuentas.")
        }
    }

    // Cargar datos iniciales
    useEffect(() => {
        fetchAccountRecords()
        fetchAccounts()
    }, [])

    const getAccountName = (accountId: number) => {
        const account = accounts.find(acc => acc.id === accountId)
        return account ? account.name : 'Desconocido'
    }

    const filteredRecords = accountRecords.filter(record =>
        record.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.id.toString().includes(searchQuery)
    )

    // Calcular el total del DEBE y el HABER
    const totalDebe = accountRecords
        .filter(record => record.type === "DEBE")
        .reduce((sum, record) => sum + parseFloat(record.amount), 0)

    const totalHaber = accountRecords
        .filter(record => record.type === "HABER")
        .reduce((sum, record) => sum + parseFloat(record.amount), 0)

    // Determinar si está balanceado
    const isBalanced = totalDebe === totalHaber

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!description || !amount || !accountId) {
            setError("Todos los campos son obligatorios.")
            return
        }

        try {
            const response = await fetch('http://localhost:8000/account-records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    description,
                    amount,
                    type,
                    accountId
                }),
            })

            if (!response.ok) {
                throw new Error("Error al crear el registro.")
            }

            // Limpiar el formulario
            setDescription('')
            setAmount('')
            setType("DEBE")
            setAccountId(null)
            setError(null)

            // Recargar los registros contables
            await fetchAccountRecords()
        } catch (error) {
            console.error("Error creating account record:", error)
            setError("Error al crear el registro.")
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#4d619d]">Registros Contables</CardTitle>
                </CardHeader>
                <CardContent>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <Select onValueChange={(value) => setDescription(value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar descripción estándar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {standardDescriptions.map((desc, index) => (
                                            <SelectItem key={index} value={desc}>{desc}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="O escribe una descripción manualmente"
                                    className="w-full mt-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                                <Input
                                    type="number"
                                    id="amount"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Monto"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                                <Select onValueChange={(value: "DEBE" | "HABER") => setType(value)} value={type}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DEBE">Debe</SelectItem>
                                        <SelectItem value="HABER">Haber</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="accountId" className="block text-sm font-medium text-gray-700 mb-1">Cuenta</label>
                                <Select onValueChange={(value) => setAccountId(Number(value))}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar cuenta" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {accounts.map(account => (
                                            <SelectItem key={account.id} value={account.id.toString()}>{account.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-[#f0627e] hover:bg-[#e05270] text-white">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Crear Nuevo Registro
                        </Button>
                    </form>
                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Buscar registros..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead>Monto</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Cuenta</TableHead>
                                <TableHead>Fecha de Creación</TableHead>
                                <TableHead>Balanceado</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRecords.map((record) => (
                                <TableRow key={record.id}>
                                    <TableCell>{record.id}</TableCell>
                                    <TableCell>{record.description}</TableCell>
                                    <TableCell>{parseFloat(record.amount).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</TableCell>
                                    <TableCell>{record.type}</TableCell>
                                    <TableCell>{getAccountName(record.accountId)}</TableCell>
                                    <TableCell>{new Date(record.createdAt).toLocaleDateString('es-ES')}</TableCell>
                                    <TableCell>
                                        {isBalanced ? (
                                            <span className="text-green-600">Balanceado</span>
                                        ) : (
                                            <span className="text-red-600">No balanceado</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="mt-4">
                        <p className="text-sm text-gray-700">
                            <strong>Total DEBE:</strong> {totalDebe.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </p>
                        <p className="text-sm text-gray-700">
                            <strong>Total HABER:</strong> {totalHaber.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}
                        </p>
                        <p className={`text-sm ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                            <strong>Estado:</strong> {isBalanced ? "Balanceado" : "No balanceado"}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default JournalRequestManagement