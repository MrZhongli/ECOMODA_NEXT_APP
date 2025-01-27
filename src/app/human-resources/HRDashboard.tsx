'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GenericTable from '@/components/commons/GenericTable';

interface Employee {
    idCard: string;
    name: string;
    lastname: string;
    birthdate: string;
    gender: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    startDate: string;
}

interface HRDashboardProps {
    employeesData: Employee[]; // Recibe los datos desde la página principal
}

export default function HRDashboard({ employeesData }: HRDashboardProps) {
    // Define las columnas para la tabla
    console.log('estos son los datos de los empleados',employeesData)

    const columns = [
        { key: 'idCard', header: 'Cédula' },
        { key: 'name', header: 'Nombre' },
        { key: 'lastname', header: 'Apellido' },
        {
            key: 'birthdate',
            header: 'Fecha de Nacimiento',
            formatter: (value: string) => new Date(value).toLocaleDateString(),
        },
        { key: 'gender', header: 'Género' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Teléfono' },
        {
            key: 'actions',
            header: 'Acciones',
            formatter: (_value: any, item: Employee) => (
                <a href="#" className="text-[#FF77AA] underline hover:text-[#FF5588]">
                    Ver detalles
                </a>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <Card className="w-full max-w-6xl mx-auto">
                <CardHeader className="text-center">
                    <h1 className="text-4xl font-bold text-black">Dashboard de Recursos Humanos</h1>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="employees" className="w-full">
                        <TabsContent value="employees" className="bg-white rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-black mb-4">Empleados y Contratos</h2>
                            <div className="overflow-x-auto">
                                {/* Usa el componente de tabla genérico */}
                                <GenericTable<Employee>
                                    data={employeesData}
                                    columns={columns}
                                    rowClassName={(item) => (item ? 'bg-pink-50 hover:bg-pink-100' : 'bg-white')}
                                />
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button className="bg-[#007BFF] text-white hover:bg-[#0056b3]">
                                    Agregar empleado
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
