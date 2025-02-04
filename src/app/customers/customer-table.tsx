"use client"

import { useState } from "react"
import { Plus, FileText, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

const customers = [
  {
    id: "1",
    name: "Ana María",
    lastname: "Rodríguez",
    email: "ana.rodriguez@gmail.com",
    phone: "555-0101",
    address: "Calle Principal 123",
  },
  {
    id: "2",
    name: "Carlos",
    lastname: "González",
    email: "carlos.g@gmail.com",
    phone: "555-0102",
    address: "Avenida Central 456",
  },
  {
    id: "3",
    name: "Isabel",
    lastname: "Martínez",
    email: "isabel.m@gmail.com",
    phone: "555-0103",
    address: "Plaza Mayor 789",
  },
  {
    id: "4",
    name: "Luis",
    lastname: "Morales",
    email: "luis.m@gmail.com",
    phone: "555-0104",
    address: "Calle Secundaria 321",
  },
  {
    id: "5",
    name: "Patricia",
    lastname: "Vega",
    email: "patricia.v@gmail.com",
    phone: "555-0105",
    address: "Avenida Norte 654",
  },
]

export default function CustomerTable() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="w-full">
      <header className="bg-pink-100 p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-pink-600">ECOMODA CENTRAL</h1>
        </div>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Clientes</h2>
          <div className="flex gap-3">
            <Button variant="outline">
              <FileText className="w-4 h-4 mr-2" />
              Reporte de Clientes
            </Button>
            <Button className="bg-[#DB2777] hover:bg-[#DB2777]/90">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Cliente
            </Button>
          </div>
        </div>

        <div className="mb-6">
          <Input
            placeholder="Buscar cliente..."
            className="max-w-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Apellido</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {customer.name[0]}
                          {customer.lastname[0]}
                        </AvatarFallback>
                      </Avatar>
                      {customer.name}
                    </div>
                  </TableCell>
                  <TableCell>{customer.lastname}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Link href={`/customers/${customer.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
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

