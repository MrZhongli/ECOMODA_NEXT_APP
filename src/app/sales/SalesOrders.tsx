'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importa el hook useRouter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Search, Clock, Star, Bell, Plus, Eye, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Datos de ejemplo para los pedidos
const pedidosEjemplo = [
    { id: 1, cliente: 'Empresa A', fecha: '2024-03-15', total: 1500, estado: 'Pendiente' },
    { id: 2, cliente: 'Empresa B', fecha: '2024-03-16', total: 2000, estado: 'En proceso' },
    { id: 3, cliente: 'Empresa C', fecha: '2024-03-17', total: 1800, estado: 'Completado' },
    { id: 4, cliente: 'Empresa D', fecha: '2024-03-18', total: 3000, estado: 'Pendiente' },
    { id: 5, cliente: 'Empresa E', fecha: '2024-03-19', total: 2500, estado: 'En proceso' },
];

export default function SalesOrders() {
    const [pedidos, setPedidos] = useState(pedidosEjemplo);
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const router = useRouter(); // Inicializa el router

    const filtrarPedidos = () => {
        return pedidos.filter((pedido) =>
            (pedido.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
                pedido.id.toString().includes(busqueda)) &&
            (filtroEstado === 'todos' || pedido.estado === filtroEstado)
        );
    };

    const getEstadoColor = (estado: string) => {
        switch (estado) {
            case 'Pendiente': return 'bg-yellow-200 text-yellow-800';
            case 'En proceso': return 'bg-blue-200 text-blue-800';
            case 'Completado': return 'bg-green-200 text-green-800';
            default: return 'bg-gray-200 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <main className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-[#4d619d]">Pedidos</h1>
                    <Button
                        className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white"
                        onClick={() => router.push('sales/new')} // Navega a /new al hacer clic
                    >
                        <Plus className="mr-2 h-4 w-4" /> Nuevo Pedido
                    </Button>
                </div>

                {/* Tarjetas de Resumen */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Pedidos</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{pedidos.length}</div>
                            <p className="text-xs text-muted-foreground">+2 desde ayer</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                ${pedidos.reduce((sum, pedido) => sum + pedido.total, 0).toLocaleString()}
                            </div>
                            <p className="text-xs text-muted-foreground">+10% desde el mes pasado</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pedidos Pendientes</CardTitle>
                            <Bell className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {pedidos.filter((pedido) => pedido.estado === 'Pendiente').length}
                            </div>
                            <p className="text-xs text-muted-foreground">-2 desde ayer</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Barra de Búsqueda y Filtros */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Buscar pedidos..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full"
                        />
                    </div>
                    <Select value={filtroEstado} onValueChange={setFiltroEstado}>
                        <SelectTrigger className="w-full md:w-[180px]">
                            <SelectValue placeholder="Filtrar por estado" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="todos">Todos los estados</SelectItem>
                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                            <SelectItem value="En proceso">En proceso</SelectItem>
                            <SelectItem value="Completado">Completado</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Tabla de Pedidos */}
                <Card>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Cliente</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Total</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filtrarPedidos().map((pedido) => (
                                    <TableRow key={pedido.id}>
                                        <TableCell>{pedido.id}</TableCell>
                                        <TableCell>{pedido.cliente}</TableCell>
                                        <TableCell>{pedido.fecha}</TableCell>
                                        <TableCell>${pedido.total.toLocaleString()}</TableCell>
                                        <TableCell>
                                            <Badge className={getEstadoColor(pedido.estado)}>
                                                {pedido.estado}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                    <DropdownMenuItem>
                                                        <Eye className="mr-2 h-4 w-4" /> Ver detalles
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Edit className="mr-2 h-4 w-4" /> Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
