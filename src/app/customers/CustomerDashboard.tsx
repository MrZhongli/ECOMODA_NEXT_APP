'use client';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import GenericTable from '@/components/commons/GenericTable';

interface Customer {
    idCard: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
}

interface CustomerDashboardProps {
    customersData: Customer[];
}

export default function CustomerDashboard({ customersData }: CustomerDashboardProps) {
    console.log('Estos son los datos de los clientes:', customersData);

    const columns = [
        { key: 'idCard', header: 'Cédula' },
        { key: 'name', header: 'Nombre' },
        { key: 'lastname', header: 'Apellido' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Teléfono' },
        { key: 'address', header: 'Dirección' },
        {
            key: 'createdAt',
            header: 'Fecha de Registro',
            formatter: (value: string) => new Date(value).toLocaleDateString(),
        },
        {
            key: 'actions',
            header: 'Acciones',
            formatter: (_value: any, item: Customer) => (
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
                    <h1 className="text-4xl font-bold text-black">Dashboard de Clientes</h1>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="customers" className="w-full">
                        <TabsContent value="customers" className="bg-white rounded-lg p-6">
                            <h2 className="text-2xl font-semibold text-black mb-4">Lista de Clientes</h2>
                            <div className="overflow-x-auto">
                                <GenericTable<Customer>
                                    data={customersData}
                                    columns={columns}
                                    rowClassName={() => 'bg-blue-50 hover:bg-blue-100'}
                                />
                            </div>
                            <div className="mt-6 flex justify-end">
                                <Button className="bg-[#007BFF] text-white hover:bg-[#0056b3]">
                                    Agregar Cliente
                                </Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}
