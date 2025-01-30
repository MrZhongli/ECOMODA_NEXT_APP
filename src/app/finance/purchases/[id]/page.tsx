"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, User, MapPin, Phone, Mail, CreditCard, Package, Store, Receipt, Calendar } from "lucide-react"

export default function PurchaseDetail() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Sample data - would come from your database
  const purchaseDetails = {
    id: "CMP-2024-001",
    date: "2024-01-26",
    provider: {
      rif: "J-12345678-9",
      name: "Botones Express",
      email: "info@botonesexpress.com",
      phone: "+58 212 555 1234",
      address: "Av. Principal 123, Zona Industrial",
    },
    branch: {
      name: "Sucursal Central",
      address: "Plaza Mayor 456",
      phone: "+58 212 987 6543",
    },
    payment: {
      method: "Transferencia Bancaria",
      ref: "TRF-123456",
      status: "Pendiente",
    },
    items: [
      {
        id: 1,
        name: "Botones Dorados",
        brand: "GoldenFast",
        measurement_unit: "Docena",
        quantity: 100,
        unit_price: 12.99,
        total: 1299.0,
      },
      {
        id: 2,
        name: "Cierres Metálicos",
        brand: "ZipperPro",
        measurement_unit: "Unidad",
        quantity: 500,
        unit_price: 1.5,
        total: 750.0,
      },
    ],
  }

  const totalAmount = purchaseDetails.items.reduce((sum, item) => sum + item.total, 0)

  return (
    <div className="min-h-screen w-full bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#4d619d] mb-2">
              Detalle de Compra #{purchaseDetails.id}
            </h1>
            <p className="text-gray-500 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Fecha: {purchaseDetails.date}
            </p>
          </div>

          {/* Large Clock Display */}
          <Card className="w-full md:w-[300px] bg-[#4d619d] text-white">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <Clock className="h-8 w-8 md:h-12 md:w-12 mb-2" />
                <div className="text-2xl md:text-4xl font-bold tabular-nums">
                  {time.toLocaleTimeString("es-VE", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </div>
                <div className="text-xs md:text-sm opacity-80 mt-1">
                  {time.toLocaleDateString("es-VE", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Provider Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#4d619d] flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Proveedor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Badge variant="outline">{purchaseDetails.provider.rif}</Badge>
                  <span className="font-semibold">{purchaseDetails.provider.name}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="h-4 w-4" />
                  {purchaseDetails.provider.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Phone className="h-4 w-4" />
                  {purchaseDetails.provider.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {purchaseDetails.provider.address}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Branch and Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#4d619d] flex items-center gap-2">
                <Store className="h-5 w-5" />
                Información de la Compra
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Sucursal</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div>{purchaseDetails.branch.name}</div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      {purchaseDetails.branch.address}
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {purchaseDetails.branch.phone}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Pago</h3>
                  <div className="text-sm text-gray-500 space-y-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      {purchaseDetails.payment.method}
                    </div>
                    <div className="flex items-center gap-2">
                      <Receipt className="h-4 w-4" />
                      Ref: {purchaseDetails.payment.ref}
                    </div>
                    <Badge
                      className={
                        purchaseDetails.payment.status === "Completado"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {purchaseDetails.payment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Materials Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-[#4d619d] flex items-center gap-2">
              <Package className="h-5 w-5" />
              Materiales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead>Marca</TableHead>
                  <TableHead>Unidad de Medida</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Precio Unitario</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseDetails.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.brand}</TableCell>
                    <TableCell>{item.measurement_unit}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.unit_price.toLocaleString("es-VE")}</TableCell>
                    <TableCell className="text-right">${item.total.toLocaleString("es-VE")}</TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell colSpan={5} className="text-right font-bold">
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold text-[#4d619d]">
                    ${totalAmount.toLocaleString("es-VE")}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col md:flex-row justify-end gap-4">
          <Button variant="outline" className="w-full md:w-auto">
            Imprimir Orden de Compra
          </Button>
          <Button className="bg-[#4d619d] hover:bg-[#3d4f7d] w-full md:w-auto">Registrar Recepción</Button>
        </div>
      </div>
    </div>
  )
}

