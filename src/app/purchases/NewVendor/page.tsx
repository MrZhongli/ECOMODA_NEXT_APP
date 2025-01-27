'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react'

const RegistroProveedor = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    calle1: '',
    calle2: '',
    ciudad: '',
    estado: '',
    codigoPostal: '',
    pais: '',
    telefono: '',
    email: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Datos del formulario:', formData)
    // Aquí iría la lógica para enviar los datos al servidor
  }

  return (
    <div>
      <header className="border-b pb-4 mb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-medium text-[#4d619d]">Proveedores/ Nuevo</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">2/2</span>
                <div className="flex gap-1">
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" className="h-8 w-8">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Button className="bg-[#FF4A93] hover:bg-[#E03A7C] text-white">
                + Nuevo proveedor
              </Button>
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8">
          {/* Columna izquierda - Formulario principal */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="ej, Madera S.A"
                value={formData.nombre}
                onChange={handleInputChange}
                className="mt-1"
              />
            </div>

            <div className="space-y-4">
              <Label>Dirección</Label>
              <div className="space-y-4">
                <Input
                  name="calle1"
                  placeholder="Calle 1..."
                  value={formData.calle1}
                  onChange={handleInputChange}
                />
                <Input
                  name="calle2"
                  placeholder="Calle 2..."
                  value={formData.calle2}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <Input
                  name="ciudad"
                  placeholder="Ciudad"
                  value={formData.ciudad}
                  onChange={handleInputChange}
                />
                <Input
                  name="estado"
                  placeholder="Estado"
                  value={formData.estado}
                  onChange={handleInputChange}
                />
                <Input
                  name="codigoPostal"
                  placeholder="Código postal"
                  value={formData.codigoPostal}
                  onChange={handleInputChange}
                />
              </div>
              <Select name="pais" onValueChange={(value) => handleInputChange({ target: { name: 'pais', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="País" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mexico">México</SelectItem>
                  <SelectItem value="espana">España</SelectItem>
                  <SelectItem value="argentina">Argentina</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Teléfono</Label>
                <Input
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Condiciones de compra</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar condiciones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contado">Contado</SelectItem>
                  <SelectItem value="credito">Crédito</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white">
              Añadir
            </Button>
          </div>

          {/* Columna central - Subir imagen */}
          <div className="flex items-start justify-center pt-8">
            <div className="w-32 h-32 border-2 border-dashed border-pink-200 rounded-lg flex flex-col items-center justify-center bg-pink-50 hover:border-[#FF4A93] transition-colors cursor-pointer">
              <Camera className="h-6 w-6 text-gray-400 mb-1" />
            </div>
          </div>

          {/* Columna derecha - Historial de materiales */}
          <div className="border border-[#E0E0E0] rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-4">Historial de materiales</h2>
            <p className="text-gray-400 text-sm">
              No hay materiales asociados por el momento
            </p>
          </div>
        </div>
      </form>
    </div>
  )
}

export default RegistroProveedor

