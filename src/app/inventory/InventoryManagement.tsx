'use client'

import React, { useState } from 'react'
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
  category: string;
  stock: number;
  price: number;
  description: string;
}

// Datos de inventario con el campo "id"
const inventoryData: InventoryItem[] = [
  {
    id: 1,
    name: "Vestido Floral",
    category: "Vestidos",
    stock: 15,
    price: 49.99,
    description: "Vestido floral de temporada, ideal para primavera.",
  },
  {
    id: 2,
    name: "Pantalón Casual",
    category: "Pantalones",
    stock: 5,
    price: 39.99,
    description: "Pantalón casual cómodo para uso diario.",
  },
  // Agregar más ítems si es necesario
];

const InventoryManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Todas las categorías');
  const [stockFilter, setStockFilter] = useState('Todas');

  // Filtrar los datos del inventario según las búsquedas y filtros
  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'Todas las categorías' || item.category === categoryFilter;
    const matchesStock =
      stockFilter === 'Todas' ||
      (stockFilter === 'En stock' && item.stock > 10) ||
      (stockFilter === 'Stock bajo' && item.stock > 0 && item.stock <= 10) ||
      (stockFilter === 'Fuera de stock' && item.stock === 0);
    return matchesSearch && matchesCategory && matchesStock;
  });

  // Definir columnas para la tabla
  const tableColumns = [
    {
      key: 'name',
      header: 'Nombre',
      formatter: (name: string) => <span className="font-medium">{name}</span>
    },
    {
      key: 'category',
      header: 'Categoría'
    },
    {
      key: 'stock',
      header: 'Existencias',
      formatter: (stock: number) => (
        <span className={`px-2 py-1 rounded-full text-xs font-semibold
          ${stock === 0 ? 'bg-red-100 text-red-800' :
            stock <= 10 ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'}`}>
          {stock === 0 ? 'Fuera de stock' :
            stock <= 10 ? 'Stock bajo' : 'En stock'} ({stock})
        </span>
      )
    },
    {
      key: 'price',
      header: 'Precio',
      formatter: (price: number) => price.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })
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
                {categoryFilter} <span className="ml-2">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCategoryFilter('Todas las categorías')}>
                Todas las categorías
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('Vestidos')}>
                Vestidos
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategoryFilter('Pantalones')}>
                Pantalones
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                {stockFilter} <span className="ml-2">▼</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setStockFilter('Todas')}>
                Todas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStockFilter('En stock')}>
                En stock
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStockFilter('Stock bajo')}>
                Stock bajo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStockFilter('Fuera de stock')}>
                Fuera de stock
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

export default InventoryManagement;
