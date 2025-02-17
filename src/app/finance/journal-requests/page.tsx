'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PlusCircle, Search } from 'lucide-react'

// Tipos y enums basados en la estructura de datos proporcionada
type RequestStatus = "EN PROCESO" | "CANCELADO" | "TERMINADO" | "EN ESPERA"

interface RequestType {
    id: number
    name: string
    automatized: boolean
}

interface Request {
    id: number
    description: string
    amount: number
    status: RequestStatus
    requestTypeId: number
    createdAt: string
    updatedAt: string
}

const JournalRequestManagement: React.FC = () => {
    const [requests, setRequests] = useState<Request[]>([])
    const [requestTypes, setRequestTypes] = useState<RequestType[]>([])
    const [newRequest, setNewRequest] = useState<Partial<Request>>({
        description: '',
        amount: 0,
        status: "EN PROCESO",
        requestTypeId: 0,
    })
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        // Aquí normalmente harías una llamada a la API para obtener los datos
        // Por ahora, usaremos datos de ejemplo
        setRequests([
            { id: 1, description: "Compra de suministros", amount: 500, status: "EN PROCESO", requestTypeId: 1, createdAt: "2025-02-10T10:00:00Z", updatedAt: "2025-02-10T10:00:00Z" },
            { id: 2, description: "Pago de nómina", amount: 5000, status: "TERMINADO", requestTypeId: 2, createdAt: "2025-02-09T09:00:00Z", updatedAt: "2025-02-09T15:00:00Z" },
        ])
        setRequestTypes([
            { id: 1, name: "Compra", automatized: false },
            { id: 2, name: "Nómina", automatized: true },
        ])
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setNewRequest(prev => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (name: string, value: string) => {
        setNewRequest(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Aquí normalmente enviarías la nueva solicitud a la API
        const newId = requests.length + 1
        const newRequestWithId = {
            ...newRequest,
            id: newId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        } as Request
        setRequests(prev => [...prev, newRequestWithId])
        setNewRequest({ description: '', amount: 0, status: "EN PROCESO", requestTypeId: 0 })
    }

    const filteredRequests = requests.filter(request =>
        request.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.id.toString().includes(searchQuery)
    )

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-[#4d619d]">Gestión de Solicitudes para Libro Diario</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    value={newRequest.description}
                                    onChange={handleInputChange}
                                    placeholder="Descripción de la solicitud"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Monto</label>
                                <Input
                                    type="number"
                                    id="amount"
                                    name="amount"
                                    value={newRequest.amount}
                                    onChange={handleInputChange}
                                    placeholder="Monto"
                                    className="w-full"
                                />
                            </div>
                            <div>
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                                <Select name="status" onValueChange={(value) => handleSelectChange("status", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar estado" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="EN PROCESO">En Proceso</SelectItem>
                                        <SelectItem value="CANCELADO">Cancelado</SelectItem>
                                        <SelectItem value="TERMINADO">Terminado</SelectItem>
                                        <SelectItem value="EN ESPERA">En Espera</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label htmlFor="requestTypeId" className="block text-sm font-medium text-gray-700 mb-1">Tipo de Solicitud</label>
                                <Select name="requestTypeId" onValueChange={(value) => handleSelectChange("requestTypeId", value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccionar tipo" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {requestTypes.map(type => (
                                            <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <Button type="submit" className="w-full bg-[#f0627e] hover:bg-[#e05270] text-white">
                            <PlusCircle className="w-4 h-4 mr-2" />
                            Crear Nueva Solicitud
                        </Button>
                    </form>

                    <div className="mb-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <Input
                                type="text"
                                placeholder="Buscar solicitudes..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Descripción</TableHead>
                                <TableHead>Monto</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead>Tipo</TableHead>
                                <TableHead>Fecha de Creación</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>{request.id}</TableCell>
                                    <TableCell>{request.description}</TableCell>
                                    <TableCell>{request.amount.toLocaleString('es-ES', { style: 'currency', currency: 'EUR' })}</TableCell>
                                    <TableCell>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                      ${request.status === "TERMINADO" ? 'bg-green-100 text-green-800' :
                                                request.status === "EN PROCESO" ? 'bg-yellow-100 text-yellow-800' :
                                                    request.status === "CANCELADO" ? 'bg-red-100 text-red-800' :
                                                        'bg-blue-100 text-blue-800'}`}>
                                            {request.status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{requestTypes.find(type => type.id === request.requestTypeId)?.name}</TableCell>
                                    <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default JournalRequestManagement