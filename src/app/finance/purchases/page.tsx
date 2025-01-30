"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BarChart, DollarSign, ShoppingBag, Store, Package2 } from "lucide-react"
import Link from "next/link"

export default function PurchaseDashboard() {
  const [selectedBranch, setSelectedBranch] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample data - In a real app, this would come from your API
  const purchaseStats = {
    totalPurchases: 45750.0,
    pendingPayments: 8500.0,
    totalProviders: 24,
    distinctMaterials: 156,
  }

  const recentPurchases = [
    {
      id: 1,
      date: "2024-01-25",
      provider: "Botones Express",
      amount: 2500.0,
      paymentMethod: "Transferencia",
      status: "Completado",
      branch: "Central",
    },
    {
      id: 2,
      date: "2024-01-24",
      provider: "Accesorios Moda",
      amount: 1800.0,
      paymentMethod: "Efectivo",
      status: "Pendiente",
      branch: "Norte",
    },
    // More purchases...
  ]

  return (
    <div className="w-full flex flex-col gap-6 p-8 justify-center">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#4d619d]">Módulo de Compras</h1>
        <div className="flex gap-4">
          <Select value={selectedBranch} onValueChange={setSelectedBranch}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar Sucursal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Sucursales</SelectItem>
              <SelectItem value="central">Sucursal Central</SelectItem>
              <SelectItem value="norte">Sucursal Norte</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Categorías</SelectItem>
              <SelectItem value="buttons">Botones</SelectItem>
              <SelectItem value="fabrics">Telas</SelectItem>
              <SelectItem value="accessories">Accesorios</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Compras Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-[#4d619d]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#4d619d]">
              ${purchaseStats.totalPurchases.toLocaleString("es-MX")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pagos Pendientes</CardTitle>
            <ShoppingBag className="h-4 w-4 text-[#f0627e]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#f0627e]">
              ${purchaseStats.pendingPayments.toLocaleString("es-MX")}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Proveedores Totales</CardTitle>
            <Store className="h-4 w-4 text-[#4d619d]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchaseStats.totalProviders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Materiales Distintos</CardTitle>
            <Package2 className="h-4 w-4 text-[#4d619d]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{purchaseStats.distinctMaterials}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="purchases" className="w-full">
        <TabsList>
          <TabsTrigger value="purchases">Compras Recientes</TabsTrigger>
          <TabsTrigger value="providers">Proveedores</TabsTrigger>
          <TabsTrigger value="reports">Reportes</TabsTrigger>
        </TabsList>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Compras</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Proveedor</TableHead>
                    <TableHead>Monto</TableHead>
                    <TableHead>Método de Pago</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPurchases.map((purchase) => (
                    <TableRow key={purchase.id}>
                      <TableCell>{purchase.date}</TableCell>
                      <TableCell>{purchase.provider}</TableCell>
                      <TableCell>${purchase.amount.toLocaleString("es-MX")}</TableCell>
                      <TableCell>{purchase.paymentMethod}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${purchase.status === "Completado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                        >
                          {purchase.status}
                        </span>
                      </TableCell>
                      <TableCell>{purchase.branch}</TableCell>
                      <TableCell>
                        <Link href={`/finance/purchases/${purchase.id}`}>
                          <Button variant="ghost" size="sm">
                            Ver Detalles
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="providers">
          <Card>
            <CardHeader>
              <CardTitle>Proveedores</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Proveedores Activos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{purchaseStats.totalProviders}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Cuentas por Pagar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-[#f0627e]">
                      ${purchaseStats.pendingPayments.toLocaleString("es-MX")}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reportes y Análisis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Reporte de Compras por Sucursal
                </Button>
                <Button className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Reporte de Compras por Categoría
                </Button>
                <Button className="flex items-center gap-2">
                  <BarChart className="h-4 w-4" />
                  Análisis de Proveedores
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

