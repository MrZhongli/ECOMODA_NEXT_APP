'use client'

import React, { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Eye } from 'lucide-react'


// Proveedores y materiales de ejemplo
const proveedores = [
    { id: 1, nombre: 'Hilos y más S.A.' },
    { id: 2, nombre: 'Textiles del Norte' },
    { id: 3, nombre: 'Insumos Textiles Express' },
]

const materiales = [
    { id: 1, nombre: 'Hilo negro', precio: 5 },
    { id: 2, nombre: 'Hilo blanco', precio: 5 },
    { id: 3, nombre: 'Tela denim', precio: 15 },
    { id: 4, nombre: 'Botones metálicos', precio: 0.5 },
]

export default function OrdenCompra() {
    const [materialesSeleccionados, setMaterialesSeleccionados] = useState([])
    const [materialActual, setMaterialActual] = useState(null)
    const [modalAbierto, setModalAbierto] = useState(false)
    const [modoModal, setModoModal] = useState('agregar') // 'agregar', 'editar', 'ver'
    const [proveedor, setProveedor] = useState(null)
    const [fechaEntregaEsperada, setFechaEntregaEsperada] = useState(null)

    const abrirModalAgregar = () => {
        setMaterialActual({ cantidad: 1 })
        setModoModal('agregar')
        setModalAbierto(true)
    }

    const abrirModalEditar = (material) => {
        setMaterialActual(material)
        setModoModal('editar')
        setModalAbierto(true)
    }

    const abrirModalVer = (material) => {
        setMaterialActual(material)
        setModoModal('ver')
        setModalAbierto(true)
    }

    const guardarMaterial = () => {
        if (modoModal === 'agregar') {
            setMaterialesSeleccionados([...materialesSeleccionados, materialActual])
        } else if (modoModal === 'editar') {
            const index = materialesSeleccionados.findIndex(m => m.id === materialActual.id)
            const nuevosMateriales = [...materialesSeleccionados]
            nuevosMateriales[index] = materialActual
            setMaterialesSeleccionados(nuevosMateriales)
        }
        setModalAbierto(false)
    }

    const calcularSubtotal = (material) => {
        return material.precio * material.cantidad
    }

    const calcularTotal = () => {
        return materialesSeleccionados.reduce((total, material) => total + calcularSubtotal(material), 0)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Migas de pan */}
            <div className="bg-white border-b p-4">
                <div className="container mx-auto">
                    <span className="text-[#4d619d]">Órdenes de Compra / Nueva</span>
                </div>
            </div>

            {/* Barra de acciones */}
            <div className="bg-white border-b p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className="space-x-2">
                            <Button className="bg-[#f0627e] hover:bg-[#e05270] text-white">Guardar</Button>
                            <Button variant="outline">Descartar</Button>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="link" className="text-[#4d619d]">Enviar por Correo</Button>
                        <Button variant="outline">Vista Previa</Button>
                        <Button variant="outline">Cancelar</Button>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-[#4d619d] mb-6">Nueva Orden de Compra</h1>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <Select onValueChange={(value) => setProveedor(proveedores.find(p => p.id.toString() === value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar Proveedor" />
                            </SelectTrigger>
                            <SelectContent>
                                {proveedores.map((proveedor) => (
                                    <SelectItem key={proveedor.id} value={proveedor.id.toString()}>
                                        {proveedor.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !fechaEntregaEsperada && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {fechaEntregaEsperada ? format(fechaEntregaEsperada, "PPP", { locale: es }) : <span>Fecha de Entrega Esperada</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={fechaEntregaEsperada}
                                    onSelect={setFechaEntregaEsperada}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <Tabs defaultValue="materiales">
                    <TabsList className="mb-4">
                        <TabsTrigger value="materiales" className="text-[#4d619d]">Materiales</TabsTrigger>
                        <TabsTrigger value="financiero" className="text-[#4d619d]">Información Financiera</TabsTrigger>
                    </TabsList>
                    <TabsContent value="materiales">
                        <div className="mb-4">
                            <Button onClick={abrirModalAgregar} className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white">
                                <Plus className="mr-2 h-4 w-4" /> Agregar Material
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Material</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Precio</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {materialesSeleccionados.map((material, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{material.nombre}</TableCell>
                                        <TableCell>{material.cantidad}</TableCell>
                                        <TableCell>${material.precio}</TableCell>
                                        <TableCell>${calcularSubtotal(material).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" onClick={() => abrirModalEditar(material)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => abrirModalVer(material)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="financiero">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold">Costo Total: ${calcularTotal().toFixed(2)}</h3>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Desglose de Pagos</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Descripción</TableHead>
                                            <TableHead>Monto</TableHead>
                                            <TableHead>Estado</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Pago Inicial (30%)</TableCell>
                                            <TableCell>${(calcularTotal() * 0.3).toFixed(2)}</TableCell>
                                            <TableCell>Pagado</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Pago Final (70%)</TableCell>
                                            <TableCell>${(calcularTotal() * 0.7).toFixed(2)}</TableCell>
                                            <TableCell>Pendiente</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Modal para agregar/editar/ver material */}
            <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {modoModal === 'agregar' ? 'Agregar Material' :
                                modoModal === 'editar' ? 'Editar Material' : 'Detalles del Material'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Select
                            disabled={modoModal === 'ver'}
                            value={materialActual?.id?.toString()}
                            onValueChange={(value) => setMaterialActual({ ...materialActual, ...materiales.find(m => m.id.toString() === value) })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar Material" />
                            </SelectTrigger>
                            <SelectContent>
                                {materiales.map((material) => (
                                    <SelectItem key={material.id} value={material.id.toString()}>
                                        {material.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            type="number"
                            placeholder="Cantidad"
                            value={materialActual?.cantidad}
                            onChange={(e) => setMaterialActual({ ...materialActual, cantidad: parseInt(e.target.value) })}
                            disabled={modoModal === 'ver'}
                        />
                        {modoModal !== 'ver' && (
                            <Button onClick={guardarMaterial} className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white">
                                {modoModal === 'agregar' ? 'Agregar' : 'Guardar Cambios'}
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

