"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

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

export default function CustomerProfile() {
  const { id } = useParams()
  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    const foundCustomer = customers.find((c) => c.id === id)
    setCustomer(foundCustomer)
  }, [id])

  if (!customer) {
    return <div>Loading...</div>
  }

  return (
    <div className="w-full">
      <header className="bg-pink-100 p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold text-pink-600">ECOMODA CENTRAL</h1>
        </div>
      </header>

      <div className="p-6">
        <Link href="/customers">
          <Button variant="outline" className="mb-6">
            Volver a la lista de clientes
          </Button>
        </Link>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <Avatar className="h-24 w-24 text-3xl">
                <AvatarFallback>
                  {customer.name[0]}
                  {customer.lastname[0]}
                </AvatarFallback>
              </Avatar>
            </div>
            <CardTitle className="text-center">{`${customer.name} ${customer.lastname}`}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {customer.email}
              </p>
              <p>
                <strong>Teléfono:</strong> {customer.phone}
              </p>
              <p>
                <strong>Dirección:</strong> {customer.address}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

