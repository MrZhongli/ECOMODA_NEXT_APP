'use client'

import React, { useState } from 'react'
import { Search, Plus } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Datos de ejemplo para los materiales
const materialesEjemplo = [
  {
    id: 1,
    nombre: "Tela Denim",
    existencias: 250,
    estado: "en_stock",
    imagen: "/placeholder.svg?height=80&width=80"
  },
  {
    id: 2,
    nombre: "Hilo Negro",
    existencias: 5,
    estado: "stock_bajo",
    imagen: "/placeholder.svg?height=80&width=80"
  },
  {
    id: 3,
    nombre: "Botones Metálicos",
    existencias: 0,
    estado: "sin_stock",
    imagen: "/placeholder.svg?height=80&width=80"
  },
  // Añade más materiales aquí para llenar la cuadrícula
]

const estadoConfig = {
  en_stock: {
    label: "En stock",
    className: "bg-[#DFFFE2] text-green-800"
  },
  stock_bajo: {
    label: "Stock bajo",
    className: "bg-[#FFF9D9] text-yellow-800"
  },
  sin_stock: {
    label: "Fuera de stock",
    className: "bg-[#FFDFDF] text-red-800"
  }
}

const TarjetaMaterial = ({ material }) => (
  <div className="bg-white rounded-lg border border-[#E0E0E0] p-4 hover:shadow-md transition-shadow cursor-pointer">
    <div className="flex justify-between items-start">
      <div className="space-y-2">
        <h3 className="font-semibold text-[#4A4A4A]">{material.nombre}</h3>
        <p className="text-sm text-gray-600">Existencias: {material.existencias}</p>
        <Badge className={cn("font-normal", estadoConfig[material.estado].className)}>
          {estadoConfig[material.estado].label}
        </Badge>
      </div>
      <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50">
        <img 
          src={material.imagen} 
          alt={material.nombre}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  </div>
)

const TarjetaVacia = () => (
  <div className="bg-white rounded-lg border border-dashed border-[#E0E0E0] p-4 flex items-center justify-center h-[140px]">
    <span className="text-gray-400 text-sm">Espacio disponible</span>
  </div>
)

export default function Inventario() {
  const [busqueda, setBusqueda] = useState("")

  const materialesFiltrados = materialesEjemplo.filter(material =>
    material.nombre.toLowerCase().includes(busqueda.toLowerCase())
  )

  // Calcular cuántas tarjetas vacías necesitamos para completar la cuadrícula
  const tarjetasVaciasNecesarias = 3 - (materialesFiltrados.length % 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="bg-white border-b border-[#E0E0E0] sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-xl font-semibold text-[#4A4A4A]">Inventario</h1>
            
            <div className="flex-1 max-w-xl relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar materiales"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10 pr-4 w-full border-[#E0E0E0] focus:border-[#FF4A93] focus:ring-[#FF4A93]"
              />
            </div>

            <Button className="bg-[#FF4A93] hover:bg-[#E03A7C] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo material
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {materialesFiltrados.map(material => (
            <TarjetaMaterial key={material.id} material={material} />
          ))}
          
          {/* Tarjetas vacías para completar la cuadrícula */}
          {tarjetasVaciasNecesarias > 0 && tarjetasVaciasNecesarias < 3 && 
            Array.from({ length: tarjetasVaciasNecesarias }).map((_, index) => (
              <TarjetaVacia key={`empty-${index}`} />
            ))
          }
        </div>

        {/* Mensaje cuando no hay resultados */}
        {materialesFiltrados.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron materiales que coincidan con tu búsqueda.</p>
          </div>
        )}
      </main>
    </div>
  )
}

