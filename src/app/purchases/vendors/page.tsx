'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MapPin, Mail, Folder, ChevronLeft, ChevronRight } from 'lucide-react'

// Datos de ejemplo para los proveedores
const proveedoresEjemplo = [
  {
    id: 1,
    nombre: "Textiles del Norte",
    categoria: "Textiles",
    logo: "/placeholder.svg",
    direccion: "Calle Principal 123, Ciudad",
    email: "info@textilesdelnorte.com",
    transacciones: 12
  },
  {
    id: 2,
    nombre: "Botones y Más",
    categoria: "Accesorios",
    logo: "/placeholder.svg",
    direccion: "Avenida Central 456, Pueblo",
    email: "contacto@botonesymas.com",
    transacciones: 8
  },
  // Agrega más proveedores aquí si lo deseas
]

const TarjetaProveedor = ({ proveedor }) => (
  <Card className="relative overflow-hidden transition-all hover:shadow-md">
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full overflow-hidden">
            <img src={proveedor.logo} alt={`Logo de ${proveedor.nombre}`} className="h-full w-full object-cover" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{proveedor.nombre}</h3>
            <Badge variant="secondary" className="mt-1 bg-pink-100 text-pink-800">
              {proveedor.categoria}
            </Badge>
          </div>
        </div>
        <Button variant="outline" size="sm" className="text-gray-600 hover:text-gray-900">
          Ver detalles
        </Button>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{proveedor.direccion}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          <span className="text-sm">{proveedor.email}</span>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center text-gray-500">
        <Folder className="h-4 w-4 mr-1" />
        <span className="text-sm">{proveedor.transacciones}</span>
      </div>
    </CardContent>
  </Card>
)

const Encabezado = () => (
  <div className="mb-8">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-3xl font-bold text-gray-900">Proveedores</h1>
      <Button className="bg-pink-600 hover:bg-pink-700">
        <Plus className="mr-2 h-4 w-4" /> Nuevo proveedor
      </Button>
    </div>
    <div className="flex items-center space-x-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Buscar proveedores..."
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" disabled>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-gray-600">1-2/2</span>
        <Button variant="outline" size="icon" disabled>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
)

export default function Proveedores() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Encabezado />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {proveedoresEjemplo.map((proveedor) => (
          <TarjetaProveedor key={proveedor.id} proveedor={proveedor} />
        ))}
      </div>
    </div>
  )
}

