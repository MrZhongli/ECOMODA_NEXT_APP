'use client'

import { useState } from 'react'
import { Search, Plus, MoreHorizontal, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Datos de ejemplo
const orders = [
  {
    reference: "PO0012",
    date: "27/12/2024",
    supplier: "Accesorios y más",
    buyer: "Admin",
    status: "pending",
    total: 7976.40,
    invoiceStatus: "pending",
    expectedDelivery: "29/12/2024"
  },
  {
    reference: "PO0011",
    date: "26/12/2024",
    supplier: "Hilos y Telas S.A.",
    buyer: "Admin",
    status: "received",
    total: 5432.80,
    invoiceStatus: "invoiced",
    expectedDelivery: "28/12/2024"
  },
  {
    reference: "PO0010",
    date: "25/12/2024",
    supplier: "Textiles Express",
    buyer: "Admin",
    status: "pending",
    total: 3245.60,
    invoiceStatus: "pending",
    expectedDelivery: "27/12/2024"
  }
]

export default function PurchaseOrders() {
  const [filter, setFilter] = useState('all')

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Órdenes de compra</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Buscar órdenes..." 
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Mostrar: Todas las Órdenes
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  Todas las Órdenes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('pending')}>
                  Pendientes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('received')}>
                  Recibidas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('invoiced')}>
                  Facturadas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-[#f0627e] hover:bg-[#e05270] text-white gap-2">
              <Plus className="h-4 w-4" /> Nueva orden
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referencia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Comprador</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Estado Facturación</TableHead>
                <TableHead>Entrega Esperada</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow 
                  key={order.reference}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium">{order.reference}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.supplier}</TableCell>
                  <TableCell>{order.buyer}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={
                        order.status === 'pending' 
                          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          : 'bg-green-100 text-green-800 hover:bg-green-100'
                      }
                    >
                      {order.status === 'pending' ? 'Pendiente' : 'Recibida'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${order.total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell>
                    {order.invoiceStatus === 'pending' ? 'Pendiente de Facturar' : 'Facturado'}
                  </TableCell>
                  <TableCell>{order.expectedDelivery}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Eliminar</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

