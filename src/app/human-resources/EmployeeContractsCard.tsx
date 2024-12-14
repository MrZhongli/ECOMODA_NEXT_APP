'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

interface Employee {
    idCard: string
    name: string
    lastname: string
    birthdate: string
    gender: string
    email: string
    phone: string
    position: string
    department: string
    startDate: string
}

interface EmployeeContractsCardProps {
    employeesData: Employee[]
}

export default function EmployeeContractsCard({ employeesData }: EmployeeContractsCardProps) {
    return (
        <div>
            <h2 className="text-2xl font-semibold text-black mb-4">Empleados y Contratos</h2>
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-left">Cédula</TableHead>
                            <TableHead className="text-left">Nombre</TableHead>
                            <TableHead className="text-left">Apellido</TableHead>
                            <TableHead className="text-left">Fecha de Nacimiento</TableHead>
                            <TableHead className="text-left">Género</TableHead>
                            <TableHead className="text-left">Email</TableHead>
                            <TableHead className="text-left">Teléfono</TableHead>
                            <TableHead className="text-left">Puesto</TableHead>
                            <TableHead className="text-left">Departamento</TableHead>
                            <TableHead className="text-left">Fecha de Inicio</TableHead>
                            <TableHead className="text-left">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {employeesData.map((employee, index) => (
                            <TableRow key={employee.idCard} className={index % 2 === 0 ? 'bg-white' : 'bg-pink-50 hover:bg-pink-100'}>
                                <TableCell className="font-medium">{employee.idCard}</TableCell>
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.lastname}</TableCell>
                                <TableCell>{new Date(employee.birthdate).toLocaleDateString()}</TableCell>
                                <TableCell>{employee.gender}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.phone}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>{employee.startDate}</TableCell>
                                <TableCell>
                                    <a href="#" className="text-[#FF77AA] underline hover:text-[#FF5588]">
                                        Ver detalles
                                    </a>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="mt-6 flex justify-end">
                <Button className="bg-[#007BFF] text-white hover:bg-[#0056b3]">
                    Agregar empleado
                </Button>
            </div>
        </div>
    )
}
