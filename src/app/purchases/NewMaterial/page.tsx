'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, ImageIcon } from 'lucide-react'

export default function NuevoMaterial() {
  const [dragOver, setDragOver] = useState(false)
  const [proveedores, setProveedores] = useState([{ id: 1, nombre: '', cantidad: '', precio: '' }])

  const handleDragOver = (e) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    // Aquí iría la lógica para manejar la imagen subida
  }

  const agregarProveedor = () => {
    setProveedores([...proveedores, { id: proveedores.length + 1, nombre: '', cantidad: '', precio: '' }])
  }

  const guardarMaterial = () => {
    // Aquí iría la lógica para guardar el material
    console.log('Guardando material...')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl text-[#4d619d]">Nuevo material</h1>
            <Button className="bg-[#FF4A93] hover:bg-[#E03A7C] text-white">
              Inventario
            </Button>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <Input placeholder="Nombre..." />
            <Input placeholder="Marca..." />
            <Textarea placeholder="Descripción..." className="h-32" />
          </div>
          <div className="flex justify-end">
            <div 
              className={`w-32 h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer transition-colors ${
                dragOver ? 'border-[#FF4A93] bg-pink-50' : 'border-[#FF4A93] bg-pink-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <ImageIcon className="h-6 w-6 text-[#FF4A93]" />
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Proveedor</TableHead>
                <TableHead>Cantidad</TableHead>
                <TableHead>Precio</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proveedores.map((proveedor, index) => (
                <TableRow key={proveedor.id}>
                  <TableCell>
                    <Input 
                      placeholder={index === 0 ? "Agregar proveedor..." : ""} 
                      value={proveedor.nombre}
                      onChange={(e) => {
                        const newProveedores = [...proveedores]
                        newProveedores[index].nombre = e.target.value
                        setProveedores(newProveedores)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      value={proveedor.cantidad}
                      onChange={(e) => {
                        const newProveedores = [...proveedores]
                        newProveedores[index].cantidad = e.target.value
                        setProveedores(newProveedores)
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Input 
                      type="number" 
                      value={proveedor.precio}
                      onChange={(e) => {
                        const newProveedores = [...proveedores]
                        newProveedores[index].precio = e.target.value
                        setProveedores(newProveedores)
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={3}>
                  <Button 
                    variant="outline" 
                    className="w-full text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                    onClick={agregarProveedor}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Agregar proveedor
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="mt-8 flex justify-end">
          <Button 
            className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white px-8"
            onClick={guardarMaterial}
          >
            Guardar
          </Button>
        </div>
      </main>
    </div>
  )
}

