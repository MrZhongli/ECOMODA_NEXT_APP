'use client'

import React, { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, User, Download, PlusCircle } from 'lucide-react'
import GenericTable from '@/components/commons/GenericTable'

// Definir el tipo de los datos del inventario
type InventoryItem = {
  id: number;
  name: string;
  description: string;
  size: string;
  price: string;
  collectionId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
interface InventoryDataProps {
  inventoryData: InventoryItem[];
}

export default function InventoryManagement({ inventoryData }: InventoryDataProps) {
  const [inventory, setInventory] = useState(inventoryData);
  const [searchQuery, setSearchQuery] = useState('');
  const [sizeFilter, setSizeFilter] = useState('Todas las tallas');
  const [collectionFilter, setCollectionFilter] = useState('Todas las colecciones');



  // Filtrar los datos del inventario según las búsquedas y filtros
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSize = sizeFilter === 'Todas las tallas' || item.size === sizeFilter;
    const matchesCollection = collectionFilter === 'Todas las colecciones' || item.collectionId.toString() === collectionFilter;
    return matchesSearch && matchesSize && matchesCollection;
  });


  // Definir columnas para la tabla
  const tableColumns = [
    {
      key: 'name',
      header: 'Nombre',
      formatter: (name: string) => <span className="font-medium">{name}</span>
    },
    {
      key: 'size',
      header: 'Talla'
    },
    {
      key: 'price',
      header: 'Precio',
      formatter: (price: string) => parseFloat(price).toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
    },
    {
      key: 'description',
      header: 'Descripción'
    }
  ]

  const handleDownloadReport = () => {
    console.log('Descargando reporte de inventario...')
  }

  const handleGenerateOrder = () => {
    console.log('Generando orden de producción...')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <header className="bg-pink-100 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-pink-600">ECOMODA CENTRAL</h1>
            <p className="text-sm text-gray-600">Barquisimeto, Lara</p>
          </div>
          <div className="flex items-center text-gray-700">
            <User className="w-5 h-5 mr-2" />
            <span>Gerente: Betty Limón</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-4">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Inventario</h2>

        {/* Barra de búsqueda y botones */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="bg-white hover:bg-gray-100 transition duration-200"
              onClick={handleDownloadReport}
            >
              <Download className="w-4 h-4 mr-2" />
              Reporte de Inventario
            </Button>
            <Button
              className="bg-pink-500 hover:bg-pink-600 text-white transition duration-200"
              onClick={handleGenerateOrder}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              Generar Orden de Producción
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                {sizeFilter} <span className="ml-2">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSizeFilter('Todas las tallas')}>
                Todas las tallas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSizeFilter('S')}>
                S
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSizeFilter('M')}>
                M
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSizeFilter('L')}>
                L
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                {collectionFilter} <span className="ml-2">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCollectionFilter('Todas las colecciones')}>
                Todas las colecciones
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCollectionFilter('1')}>
                Colección 1
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCollectionFilter('2')}>
                Colección 2
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Tabla de inventario */}
        <GenericTable
          data={filteredInventory}
          columns={tableColumns}
        />
      </main>
    </div>
  )
}