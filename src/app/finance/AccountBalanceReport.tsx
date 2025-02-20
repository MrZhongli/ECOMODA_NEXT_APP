"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

// Tipos de datos basados en la estructura de la base de datos
type AccountType = 'ACTIVO' | 'PASIVO' | 'CAPITAL' | 'INGRESO' | 'EGRESO'
type AccountRecordType = 'DEBE' | 'HABER'
type TransactionType = 'venta' | 'compra'

interface Account {
    id: number
    name: string
    type: AccountType
}

interface AccountRecord {
    id: number
    description: string
    amount: number
    type: AccountRecordType
    account_id: number
}

const accounts: Account[] = [
    { id: 1, name: 'Caja', type: 'ACTIVO' },
    { id: 2, name: 'Cuentas por Cobrar', type: 'ACTIVO' },
    { id: 3, name: 'Inventario', type: 'ACTIVO' },
    { id: 4, name: 'Cuentas por Pagar', type: 'PASIVO' },
    { id: 5, name: 'Capital Social', type: 'CAPITAL' },
    { id: 6, name: 'Ventas', type: 'INGRESO' },
    { id: 7, name: 'Costo de Ventas', type: 'EGRESO' },
    { id: 8, name: 'Compras', type: 'EGRESO' },
]

const generateRandomRecords = (invoice: string, type: TransactionType): AccountRecord[] => {
    return accounts.map(account => {
        let amount = Math.floor(Math.random() * 10000) / 100
        let recordType: AccountRecordType = Math.random() > 0.5 ? 'DEBE' : 'HABER'

        if (type === 'venta') {
            if (account.name === 'Ventas') {
                recordType = 'HABER'
            } else if (account.name === 'Costo de Ventas') {
                recordType = 'DEBE'
            }
        } else if (type === 'compra') {
            if (account.name === 'Compras') {
                recordType = 'DEBE'
            } else if (account.name === 'Cuentas por Pagar') {
                recordType = 'HABER'
            }
        }

        return {
            id: Math.floor(Math.random() * 1000),
            description: `Transacción de ${invoice}`,
            amount,
            type: recordType,
            account_id: account.id
        }
    })
}

interface AccountBalanceReportProps {
    invoice: string
    type: TransactionType
}

export default function AccountBalanceReport({ invoice, type }: AccountBalanceReportProps) {
    const records = generateRandomRecords(invoice, type)

    const calculateBalance = (accountId: number) => {
        const accountRecords = records.filter(record => record.account_id === accountId)
        return accountRecords.reduce((balance, record) => {
            return balance + (record.type === 'DEBE' ? record.amount : -record.amount)
        }, 0)
    }

    const totalVentas = records.filter(r => r.account_id === 6).reduce((sum, r) => sum + r.amount, 0)
    const totalCompras = records.filter(r => r.account_id === 8).reduce((sum, r) => sum + r.amount, 0)
    const totalCostoVentas = records.filter(r => r.account_id === 7).reduce((sum, r) => sum + r.amount, 0)
    const ganancia = type === 'venta' ? totalVentas - totalCostoVentas : -(totalCompras)

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-[#4d619d]">Balance de Cuentas - {type === 'venta' ? 'Venta' : 'Compra'} {invoice}</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Cuenta</TableHead>
                            <TableHead>Tipo</TableHead>
                            <TableHead className="text-right">Debe</TableHead>
                            <TableHead className="text-right">Haber</TableHead>
                            <TableHead className="text-right">Saldo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {accounts.map(account => {
                            const debeRecords = records.filter(r => r.account_id === account.id && r.type === 'DEBE')
                            const haberRecords = records.filter(r => r.account_id === account.id && r.type === 'HABER')
                            const debeTotal = debeRecords.reduce((sum, r) => sum + r.amount, 0)
                            const haberTotal = haberRecords.reduce((sum, r) => sum + r.amount, 0)
                            const balance = calculateBalance(account.id)

                            return (
                                <TableRow key={account.id}>
                                    <TableCell>{account.name}</TableCell>
                                    <TableCell>{account.type}</TableCell>
                                    <TableCell className="text-right">${debeTotal.toFixed(2)}</TableCell>
                                    <TableCell className="text-right">${haberTotal.toFixed(2)}</TableCell>
                                    <TableCell className={`text-right font-bold ${balance < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        ${balance.toFixed(2)}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold text-[#4d619d] mb-2">Resumen de {type === 'venta' ? 'Ganancias/Pérdidas' : 'Compras'}</h3>
                    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-md">
                        {type === 'venta' ? (
                            <>
                                <span>Total Ventas: ${totalVentas.toFixed(2)}</span>
                                <span>Costo de Ventas: ${totalCostoVentas.toFixed(2)}</span>
                            </>
                        ) : (
                            <span>Total Compras: ${totalCompras.toFixed(2)}</span>
                        )}
                        <div className="flex items-center">
                            <span className={`font-bold mr-2 ${ganancia < 0 ? 'text-red-500' : 'text-green-500'}`}>
                                {type === 'venta' ? 'Ganancia/Pérdida' : 'Impacto en Efectivo'}: ${ganancia.toFixed(2)}
                            </span>
                            {ganancia > 0 ? (
                                <ArrowUpRight className="h-5 w-5 text-green-500" />
                            ) : (
                                <ArrowDownRight className="h-5 w-5 text-red-500" />
                            )}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
