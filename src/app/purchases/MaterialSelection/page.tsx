'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Search, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Simulated material data
const materials = [
  { id: 1, name: "Hilo negro", price: 5.99, image: "/placeholder.svg?height=100&width=200" },
  { id: 2, name: "Hilo de seda 1.5mm x 100mt", price: 12.50, image: "/placeholder.svg?height=100&width=200" },
  { id: 3, name: "Hilo rojo", price: 5.99, image: "/placeholder.svg?height=100&width=200" },
  { id: 4, name: "Hilo azul", price: 5.99, image: "/placeholder.svg?height=100&width=200" },
]

export default function MaterialSelectionPage() {
  const [quantities, setQuantities] = useState<{[key: number]: number}>({})

  const handleQuantityChange = (id: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + change)
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Button variant="ghost" className="flex items-center text-[#4d619d]">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a cotización
          </Button>
          <div className="flex-1 max-w-xl mx-4">
            <div className="relative">
              <Badge variant="secondary" className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-pink-100 text-pink-800">
                Proveedor: hilos y más
                <X className="ml-1 h-3 w-3 cursor-pointer" />
              </Badge>
              <Input type="text" placeholder="Buscar material..." className="pl-40 pr-10" />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center">
            <span className="mr-2">1/1</span>
            <Button variant="ghost" size="icon" disabled>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" disabled>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {materials.map((material) => (
            <Card key={material.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <img src={material.image} alt={material.name} className="w-full h-40 object-cover" />
              <CardContent className="p-4">
                <h3 className="text-lg font-semibold mb-2">{material.name}</h3>
                <p className="text-sm text-gray-600">Precio unitario: ${material.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
                {quantities[material.id] ? (
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="border-r h-9 rounded-none hover:bg-gray-100" 
                      onClick={() => handleQuantityChange(material.id, -1)}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{quantities[material.id]}</span>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="border-l h-9 rounded-none hover:bg-gray-100" 
                      onClick={() => handleQuantityChange(material.id, 1)}
                    >
                      +
                    </Button>
                  </div>
                ) : (
                  <Button 
                    className="w-full border hover:bg-gray-100 text-gray-700" 
                    variant="outline"
                    onClick={() => handleQuantityChange(material.id, 1)}
                  >
                    Agregar
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

