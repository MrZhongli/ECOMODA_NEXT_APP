'use client';
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
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

interface EmployeeContractsCardProps {
    employeesData: Employee[];
}

export default function EmployeeContractsCard({ employeesData }: EmployeeContractsCardProps) {
    // Define columns for the table
    const columns = [
        { key: 'idCard', header: 'Cédula' },
        { key: 'name', header: 'Nombre' },
        { key: 'lastname', header: 'Apellido' },
        { 
            key: 'birthdate', 
            header: 'Fecha de Nacimiento', 
            formatter: (value: string) => new Date(value).toLocaleDateString()
        },
        { key: 'gender', header: 'Género' },
        { key: 'email', header: 'Email' },
        { key: 'phone', header: 'Teléfono' },
        // Uncomment if data for these columns exists in the future
        // { key: 'position', header: 'Puesto' },
        // { key: 'department', header: 'Departamento' },
        // { key: 'startDate', header: 'Fecha de Inicio' },
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
        <div>
            <h2 className="text-2xl font-semibold text-black mb-4">Empleados y Contratos</h2>
            <div className="overflow-x-auto">
                {/* Using the GenericTable component */}
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
        </div>
    );
}
