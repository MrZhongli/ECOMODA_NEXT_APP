'use client';

import { useState } from 'react';
import { ShoppingCart, Users, Truck, Scissors, BarChart2, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Department = {
    name: string;
    icon: React.ElementType;
    route: string; // Ruta asociada al departamento
};

const departments: Department[] = [
    { name: 'Ventas', icon: ShoppingCart, route: '/sales' },
    { name: 'Recursos Humanos', icon: Users, route: '/human-resources' },
    { name: 'Compras', icon: Truck, route: '/purchases' },
    { name: 'Producción', icon: Scissors, route: '/production' },
    { name: 'Diseño', icon: Scissors, route: '/design' },
    { name: 'Contabilidad y Finanzas', icon: BarChart2, route: '/finance' },
];

export default function Sidebar() {
    const [currentDepartment, setCurrentDepartment] = useState<string>('');
    const router = useRouter();

    const handleSetDepartment = (name: string, route: string) => {
        setCurrentDepartment(name);
        router.push(route); // Navega a la ruta correspondiente
    };

    return (
        <div className="w-16 fixed bg-[#F0627E] text-white shadow-md flex flex-col h-screen">
            <div className="p-4 flex justify-center">
                <h1 className="text-2xl font-bold">ERP</h1>
            </div>
            <nav className="flex-grow">
                {departments.map((dept) => (
                    <div
                        key={dept.name}
                        onClick={() => handleSetDepartment(dept.name, dept.route)}
                        className={`relative flex justify-center py-4 cursor-pointer group transition-colors duration-300 ${currentDepartment === dept.name ? 'bg-white' : ''
                            }`}
                    >
                        <dept.icon
                            className={`w-6 h-6 ${currentDepartment === dept.name
                                    ? 'text-[#F0627E]'
                                    : 'group-hover:text-[#F0627E]'
                                }`}
                        />
                        <span className="absolute left-full ml-2 px-2 py-1 bg-white text-black text-sm rounded hidden group-hover:block whitespace-nowrap">
                            {dept.name}
                        </span>
                    </div>
                ))}
            </nav>
            <div
                className="relative p-4 flex justify-center cursor-pointer hover:bg-white group transition-colors duration-300"
                onClick={() => {
                    setCurrentDepartment('');
                    router.push('/logout'); // Ruta de logout (puedes cambiarla si es necesario)
                }}
            >
                <LogOut className="w-6 h-6 group-hover:text-[#F0627E]" />
                <span className="absolute left-full ml-2 px-2 py-1 bg-white text-black text-sm rounded hidden group-hover:block whitespace-nowrap">
                    Cerrar Sesión
                </span>
            </div>
        </div>
    );
}
