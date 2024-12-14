'use client'

import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import EmployeeContractsCard from './EmployeeContractsCard'
import { PayrollCard } from './PayrollCard'
import AttendanceCard from './AttendanceCard'

const employeesData = [
    {
        idCard: "87654321",
        name: "Ana",
        lastname: "García",
        birthdate: "1985-10-20T00:00:00.000Z",
        gender: "FEMENINO",
        email: "ana.garcia@example.com",
        phone: "555-5678",
        position: "Desarrolladora Senior",
        department: "Tecnología",
        startDate: "2022-03-15"
    },
    {
        idCard: "98765432",
        name: "María",
        lastname: "López",
        birthdate: "1988-12-03T00:00:00.000Z",
        gender: "FEMENINO",
        email: "maria.lopez@example.com",
        phone: "555-9876",
        position: "Gerente de Proyecto",
        department: "Administración",
        startDate: "2020-07-22"
    },
    {
        idCard: "23456789",
        name: "Juan",
        lastname: "Martínez",
        birthdate: "1992-08-27T00:00:00.000Z",
        gender: "MASCULINO",
        email: "juan.martinez@example.com",
        phone: "555-4321",
        position: "Analista de Datos",
        department: "Tecnología",
        startDate: "2023-01-10"
    },
    {
        idCard: "34567890",
        name: "Laura",
        lastname: "Sánchez",
        birthdate: "1987-03-18T00:00:00.000Z",
        gender: "FEMENINO",
        email: "laura.sanchez@example.com",
        phone: "555-8765",
        position: "Especialista en Marketing",
        department: "Marketing",
        startDate: "2022-09-05"
    },
    // ... otros empleados
]

export default function HRDashboard() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Card className="w-full max-w-6xl mx-auto">
                <CardHeader className="text-center">
                    {/* <CardTitle className="text-4xl font-bold text-black">Dashboard de Recursos Humanos</CardTitle> */}
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="employees" className="w-full">
                        <TabsList className="w-full justify-start mb-6">
                            <TabsTrigger
                                value="employees"
                                className="data-[state=active]:bg-[#FF77AA] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-md text-[#007BFF] hover:underline"
                            >
                                Empleados y Contratos
                            </TabsTrigger>
                            <TabsTrigger
                                value="payroll"
                                className="data-[state=active]:bg-[#FF77AA] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-md text-[#007BFF] hover:underline"
                            >
                                Nómina
                            </TabsTrigger>
                            {/* <TabsTrigger
                                value="attendance"
                                className="data-[state=active]:bg-[#FF77AA] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-md text-[#007BFF] hover:underline"
                            >
                                Asistencia
                            </TabsTrigger> */}
                            <TabsTrigger
                                value="schedules"
                                className="data-[state=active]:bg-[#FF77AA] data-[state=active]:text-white data-[state=active]:font-bold data-[state=active]:rounded-md text-[#007BFF] hover:underline"
                            >
                                Asistencia
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="employees" className="bg-white rounded-lg p-6">
                            <EmployeeContractsCard employeesData={employeesData} />
                        </TabsContent>
                        <TabsContent value="payroll" className="bg-white rounded-lg p-6">
                            <PayrollCard />
                        </TabsContent>
                        <TabsContent value="attendance" className="bg-white rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-black mb-4">Asistencia</h2>
                            <p className="text-gray-600">Contenido de la sección de asistencia...</p>
                        </TabsContent>
                        <TabsContent value="schedules" className="bg-white rounded-lg p-6">
                            {/* Integra el componente de horarios */}
                            <AttendanceCard />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
