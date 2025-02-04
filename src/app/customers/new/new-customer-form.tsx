"use client"

import { useState } from "react"
import { User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export default function CustomerProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    phone: "",
    email: "",
    location: "",
    address: "",
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: false }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = true
      }
    })
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData)
      // Here you would typically send the data to your backend
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-pink-100 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-pink-600">ECOMODA CENTRAL</h1>
          <div className="flex items-center text-gray-700">
            <User className="w-5 h-5 mr-2" />
            <span>Gerente: Betty Limón</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column */}
          <Card className="flex-1">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold mb-2">Añadir Nuevo Perfil</h1>
                <p className="text-gray-600 mb-4">Complete los datos para crear su perfil de usuario.</p>
              </div>
            </CardContent>
          </Card>

          {/* Right Column */}
          <Card className="flex-[2]">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nombre</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Ej: Juan"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? "border-red-500" : ""}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Ej: Pérez"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Ej: +1 234 567 8900"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Ej: juan.perez@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="Ej: Ciudad, País"
                    value={formData.location}
                    onChange={handleInputChange}
                    className={errors.location ? "border-red-500" : ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    name="address"
                    placeholder="Ej: Calle Principal 123, Apt 4B"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? "border-red-500" : ""}
                  />
                </div>
                <Button type="submit" className="w-full bg-[#DB2777] hover:bg-[#DB2777]/90">
                  Guardar Perfil
                </Button>
                <p className="text-sm text-gray-500 text-center">
                  Asegúrese de que todos los datos ingresados sean correctos antes de guardar.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

