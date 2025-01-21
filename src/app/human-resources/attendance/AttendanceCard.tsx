'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

const attendanceData = [
    {
        id: '1',
        employee: 'Juan Pérez',
        date: '2023-05-15',
        clockIn: '09:00',
        clockOut: '18:00',
        hoursWorked: 9,
    },
    {
        id: '2',
        employee: 'María González',
        date: '2023-05-15',
        clockIn: '08:45',
        clockOut: '17:30',
        hoursWorked: 8.75,
    },
    {
        id: '3',
        employee: 'Carlos Rodríguez',
        date: '2023-05-15',
        clockIn: '09:15',
        clockOut: '18:30',
        hoursWorked: 9.25,
    },
];

export default function AttendanceCard() {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredAttendance = attendanceData.filter(attendance =>
        attendance.employee.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const totalHoursWorked = attendanceData.reduce((sum, attendance) => sum + attendance.hoursWorked, 0)
    const averageHoursWorked = totalHoursWorked / attendanceData.length

    return (
        <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="bg-white shadow-md rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-[#007BFF]">Total Empleados</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-[#007BFF]">{attendanceData.length}</p>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-md rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-[#007BFF]">Total Horas Trabajadas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-[#007BFF]">{totalHoursWorked.toFixed(2)}</p>
                    </CardContent>
                </Card>
                <Card className="bg-white shadow-md rounded-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-[#007BFF]">Promedio Horas por Empleado</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold text-[#007BFF]">{averageHoursWorked.toFixed(2)}</p>
                    </CardContent>
                </Card>
            </div>
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-[#007BFF]">Registro de Asistencia</h2>
                <div className="relative">
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                        type="text"
                        placeholder="Buscar empleado..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 pr-4 py-2 border rounded-md"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Empleado</TableHead>
                            <TableHead className="text-left">Fecha</TableHead>
                            <TableHead className="text-center">Entrada</TableHead>
                            <TableHead className="text-center">Salida</TableHead>
                            <TableHead className="text-center">Horas Trabajadas</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAttendance.map((attendance, index) => (
                            <TableRow key={attendance.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <TableCell className="font-medium">{attendance.employee}</TableCell>
                                <TableCell>{attendance.date}</TableCell>
                                <TableCell className="text-center">{attendance.clockIn}</TableCell>
                                <TableCell className="text-center">{attendance.clockOut}</TableCell>
                                <TableCell className="text-center font-semibold">{attendance.hoursWorked}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-4 flex justify-end">
                <Button className="bg-[#FF77AA] text-white hover:bg-[#FF5588] transition-colors">
                    Exportar Reporte
                </Button>
            </div>
        </div>
    )
}
