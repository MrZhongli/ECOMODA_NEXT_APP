'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Eye } from 'lucide-react'

// Productos de ejemplo
const productosDisponibles = [
    { id: 1, nombre: 'Producto A', precio: 100, descripcion: 'Descripción del Producto A' },
    { id: 2, nombre: 'Producto B', precio: 150, descripcion: 'Descripción del Producto B' },
    { id: 3, nombre: 'Producto C', precio: 200, descripcion: 'Descripción del Producto C' },
]

export default function NuevoPresupuesto() {
    const [productosSeleccionados, setProductosSeleccionados] = useState([])
    const [productoActual, setProductoActual] = useState(null)
    const [modalAbierto, setModalAbierto] = useState(false)
    const [modoModal, setModoModal] = useState('agregar') // 'agregar', 'modificar', 'ver'

    const abrirModalAgregar = () => {
        setProductoActual({ cantidad: 1, descuento: 0 })
        setModoModal('agregar')
        setModalAbierto(true)
    }

    const abrirModalModificar = (producto) => {
        setProductoActual(producto)
        setModoModal('modificar')
        setModalAbierto(true)
    }

    const abrirModalVer = (producto) => {
        setProductoActual(producto)
        setModoModal('ver')
        setModalAbierto(true)
    }

    const guardarProducto = () => {
        if (modoModal === 'agregar') {
            setProductosSeleccionados([...productosSeleccionados, productoActual])
        } else if (modoModal === 'modificar') {
            const index = productosSeleccionados.findIndex(p => p.id === productoActual.id)
            const nuevosProductos = [...productosSeleccionados]
            nuevosProductos[index] = productoActual
            setProductosSeleccionados(nuevosProductos)
        }
        setModalAbierto(false)
    }

    const calcularSubtotal = (producto) => {
        return producto.precio * producto.cantidad * (1 - producto.descuento / 100)
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Barra de Breadcrumb */}
            <div className="bg-white border-b p-4">
                <div className="container mx-auto">
                    <span className="text-[#4d619d]">Presupuestos / Nuevo</span>
                </div>
            </div>

            {/* Barra de Acciones */}
            <div className="bg-white border-b p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <div className="space-x-2">
                            <Button className="bg-[#f0627e] hover:bg-[#e05270] text-white">Guardar</Button>
                            <Button variant="outline">Descartar</Button>
                        </div>
                    </div>
                    <div className="flex space-x-2">
                        <Button variant="link" className="text-[#4d619d]">Enviar por correo electrónico</Button>
                        <Button variant="link" className="text-[#4d619d]">Enviar Factura PRO-FORMA</Button>
                        <Button variant="link" className="text-[#4d619d]">Imprimir</Button>
                        <Button variant="outline">Confirmar</Button>
                        <Button variant="outline">Previsualizar</Button>
                        <Button variant="outline">Cancelar</Button>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-[#4d619d] mb-6">Nuevo</h1>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="cliente1">Cliente 1</SelectItem>
                                <SelectItem value="cliente2">Cliente 2</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Dirección de factura" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="direccion1">Dirección 1</SelectItem>
                                <SelectItem value="direccion2">Dirección 2</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Dirección de entrega" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="entrega1">Entrega 1</SelectItem>
                                <SelectItem value="entrega2">Entrega 2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-4">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Validez" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30dias">30 días</SelectItem>
                                <SelectItem value="60dias">60 días</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Tarifa" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="tarifa1">Tarifa 1</SelectItem>
                                <SelectItem value="tarifa2">Tarifa 2</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Plazos de pago" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="plazo1">Plazo 1</SelectItem>
                                <SelectItem value="plazo2">Plazo 2</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Tabs defaultValue="lineas">
                    <TabsList className="mb-4">
                        <TabsTrigger value="lineas" className="text-[#4d619d]">Líneas del pedido</TabsTrigger>
                        <TabsTrigger value="opcionales" className="text-[#4d619d]">Productos opcionales</TabsTrigger>
                        <TabsTrigger value="otra" className="text-[#4d619d]">Otra información</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lineas">
                        <div className="mb-4">
                            <Button onClick={abrirModalAgregar} className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white">
                                <Plus className="mr-2 h-4 w-4" /> Agregar Producto
                            </Button>
                        </div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Producto</TableHead>
                                    <TableHead>Descripción</TableHead>
                                    <TableHead>Cantidad</TableHead>
                                    <TableHead>Precio unitario</TableHead>
                                    <TableHead>Descuento (%)</TableHead>
                                    <TableHead>Subtotal</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {productosSeleccionados.map((producto, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{producto.nombre}</TableCell>
                                        <TableCell>{producto.descripcion}</TableCell>
                                        <TableCell>{producto.cantidad}</TableCell>
                                        <TableCell>{producto.precio}</TableCell>
                                        <TableCell>{producto.descuento}</TableCell>
                                        <TableCell>{calcularSubtotal(producto).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button variant="ghost" size="sm" onClick={() => abrirModalModificar(producto)}>
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" onClick={() => abrirModalVer(producto)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="opcionales">
                        {/* Contenido para productos opcionales */}
                    </TabsContent>
                    <TabsContent value="otra">
                        {/* Contenido para otra información */}
                    </TabsContent>
                </Tabs>
            </main>

            {/* Modal para agregar/modificar/ver producto */}
            <Dialog open={modalAbierto} onOpenChange={setModalAbierto}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {modoModal === 'agregar' ? 'Agregar Producto' :
                                modoModal === 'modificar' ? 'Modificar Producto' : 'Detalles del Producto'}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Select
                            disabled={modoModal === 'ver'}
                            value={productoActual?.id?.toString()}
                            onValueChange={(value) => setProductoActual({ ...productoActual, ...productosDisponibles.find(p => p.id.toString() === value) })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Seleccionar Producto" />
                            </SelectTrigger>
                            <SelectContent>
                                {productosDisponibles.map((producto) => (
                                    <SelectItem key={producto.id} value={producto.id.toString()}>
                                        {producto.nombre}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Input
                            type="number"
                            placeholder="Cantidad"
                            value={productoActual?.cantidad}
                            onChange={(e) => setProductoActual({ ...productoActual, cantidad: parseInt(e.target.value) })}
                            disabled={modoModal === 'ver'}
                        />
                        <Input
                            type="number"
                            placeholder="Descuento (%)"
                            value={productoActual?.descuento}
                            onChange={(e) => setProductoActual({ ...productoActual, descuento: parseInt(e.target.value) })}
                            disabled={modoModal === 'ver'}
                        />
                        {modoModal !== 'ver' && (
                            <Button onClick={guardarProducto} className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white">
                                {modoModal === 'agregar' ? 'Agregar' : 'Guardar Cambios'}
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
