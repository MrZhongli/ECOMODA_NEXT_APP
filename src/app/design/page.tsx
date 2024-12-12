import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react'

const collections = [
    { id: 1, name: 'Colección Primavera', image: '/placeholder.svg?height=200&width=200' },
    { id: 2, name: 'Colección Verano', image: '/placeholder.svg?height=200&width=200' },
    { id: 3, name: 'Colección Otoño', image: '/placeholder.svg?height=200&width=200' },
    { id: 4, name: 'Colección Invierno', image: '/placeholder.svg?height=200&width=200' },
]

const tasks = [
    { id: 1, task: 'Diseño de vestidos', designer: 'Ana García', deadline: '2024-05-15', status: 'En Progreso' },
    { id: 2, task: 'Selección de telas', designer: 'Carlos Ruiz', deadline: '2024-05-20', status: 'Pendiente' },
    { id: 3, task: 'Revisión de patrones', designer: 'Laura Martínez', deadline: '2024-05-10', status: 'Completada' },
    { id: 4, task: 'Prototipo de chaquetas', designer: 'Miguel Sánchez', deadline: '2024-05-25', status: 'En Progreso' },
]

const notifications = [
    { id: 1, message: 'Nuevos diseños aprobados', type: 'positive' },
    { id: 2, message: 'Retraso en entrega de materiales', type: 'negative' },
    { id: 3, message: 'Reunión de equipo mañana', type: 'positive' },
]

export default function FashionCollectionDashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
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

            <main className="container mx-auto mt-8 px-4">
                {/* Collections Grid */}
                <section className="mb-12">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Colecciones</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collections.map((collection) => (
                            <Card key={collection.id} className="overflow-hidden">
                                <img src={collection.image} alt={collection.name} className="w-full h-48 object-cover" />
                                <CardHeader>
                                    <CardTitle className="text-center">{collection.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Assigned Tasks */}
                    <section className="flex-1">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tareas Asignadas</h2>
                        <Card>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tarea</TableHead>
                                            <TableHead>Diseñador</TableHead>
                                            <TableHead>Fecha Límite</TableHead>
                                            <TableHead>Estado</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tasks.map((task) => (
                                            <TableRow key={task.id}>
                                                <TableCell>{task.task}</TableCell>
                                                <TableCell>{task.designer}</TableCell>
                                                <TableCell>{task.deadline}</TableCell>
                                                <TableCell>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold
                            ${task.status === 'Completada' ? 'bg-green-100 text-green-800' :
                                                            task.status === 'En Progreso' ? 'bg-pink-100 text-pink-800' :
                                                                'bg-yellow-100 text-yellow-800'}`}>
                                                        {task.status}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </section>

                    {/* Recent Notifications */}
                    <section className="w-full lg:w-1/3">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Notificaciones Recientes</h2>
                        <Card className="bg-pink-50">
                            <CardContent className="p-6">
                                <ul className="space-y-4">
                                    {notifications.map((notification) => (
                                        <li key={notification.id} className="flex items-center">
                                            {notification.type === 'positive' ? (
                                                <span className="text-green-500 mr-2">✔️</span>
                                            ) : (
                                                <span className="text-red-500 mr-2">❌</span>
                                            )}
                                            <span className="text-gray-700">{notification.message}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </section>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex justify-end space-x-4">
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                        Patrones
                    </Button>
                    <Button className="bg-pink-500 hover:bg-pink-600 text-white">
                        Prendas
                    </Button>
                </div>
            </main>
        </div>
    )
}