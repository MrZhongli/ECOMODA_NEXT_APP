'use client'

import React, { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Datos de ejemplo hardcodeados
const journalEntries = [
  { id: 1, date: '2023-05-01', description: 'Venta al cliente XYZ', debit: 1000, credit: 0, account: 'Cuentas por cobrar' },
  { id: 2, date: '2023-05-01', description: 'Venta al cliente XYZ', debit: 0, credit: 1000, account: 'Ingresos por ventas' },
  { id: 3, date: '2023-05-15', description: 'Pago recibido del cliente XYZ', debit: 1000, credit: 0, account: 'Banco' },
  { id: 4, date: '2023-05-15', description: 'Pago recibido del cliente XYZ', debit: 0, credit: 1000, account: 'Cuentas por cobrar' },
  { id: 5, date: '2023-06-01', description: 'Venta al cliente ABC', debit: 1500, credit: 0, account: 'Cuentas por cobrar' },
  { id: 6, date: '2023-06-01', description: 'Venta al cliente ABC', debit: 0, credit: 1500, account: 'Ingresos por ventas' },
  { id: 7, date: '2023-06-10', description: 'Compra de suministros', debit: 500, credit: 0, account: 'Suministros' },
  { id: 8, date: '2023-06-10', description: 'Compra de suministros', debit: 0, credit: 500, account: 'Banco' },
  { id: 9, date: '2023-06-20', description: 'Pago de alquiler', debit: 800, credit: 0, account: 'Gastos de alquiler' },
  { id: 10, date: '2023-06-20', description: 'Pago de alquiler', debit: 0, credit: 800, account: 'Banco' },
]

const clients = ['XYZ', 'ABC', 'Todos']

export default function LibroDiarioContable() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [selectedClient, setSelectedClient] = useState<string>('Todos')

  const filteredEntries = useMemo(() => {
    return journalEntries.filter(entry => {
      const entryDate = new Date(entry.date)
      const clientMatch = selectedClient === 'Todos' ? true : entry.description.includes(selectedClient)
      const dateMatch = (!startDate || entryDate >= startDate) && (!endDate || entryDate <= endDate)
      return clientMatch && dateMatch
    })
  }, [selectedClient, startDate, endDate])

  const totals = useMemo(() => {
    return filteredEntries.reduce(
      (acc, entry) => {
        acc.debit += entry.debit
        acc.credit += entry.credit
        return acc
      },
      { debit: 0, credit: 0 }
    )
  }, [filteredEntries])

  const isBalanced = totals.debit === totals.credit

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[#4d619d] mb-6">Libro Diario Contable</h1>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-[#4d619d]">Filtros</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <Select onValueChange={setSelectedClient} defaultValue="Todos">
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clients.map(client => (
                    <SelectItem key={client} value={client}>{client}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicial</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PP") : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha final</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PP") : <span>Seleccionar fecha</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-[#4d619d]">Asientos Contables</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Cuenta</TableHead>
                  <TableHead className="text-right">Debe</TableHead>
                  <TableHead className="text-right">Haber</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>{entry.description}</TableCell>
                    <TableCell>{entry.account}</TableCell>
                    <TableCell className="text-right">{entry.debit > 0 ? `$${entry.debit.toFixed(2)}` : ''}</TableCell>
                    <TableCell className="text-right">{entry.credit > 0 ? `$${entry.credit.toFixed(2)}` : ''}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right font-bold">${totals.debit.toFixed(2)}</TableCell>
                  <TableCell className="text-right font-bold">${totals.credit.toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} className={`text-center font-bold ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
                    {isBalanced ? 'Las cuentas están equilibradas' : 'Las cuentas no están equilibradas'}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}