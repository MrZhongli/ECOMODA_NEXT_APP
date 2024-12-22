'use client';

import { useState } from 'react';
import Image from 'next/image'; // Importa el componente Image
import { ShoppingCart, House, Users, Truck, Scissors, BarChart2, LogOut, Shirt } from 'lucide-react';
import { useRouter } from 'next/navigation';
import logo from '../../../assets/logo-removebg-preview.png'

type Department = {
    name: string;
    icon: React.ElementType;
    route: string; // Ruta asociada al departamento
};

const departments: Department[] = [
    { name: 'Inicio', icon: House, route: '/dashboard' },
    { name: 'Ventas', icon: ShoppingCart, route: '/sales' },
    { name: 'Recursos Humanos', icon: Users, route: '/human-resources' },
    { name: 'Compras', icon: Truck, route: '/purchases' },
    { name: 'Producción', icon: Scissors, route: '/inventory' },
    { name: 'Diseño', icon: Shirt, route: '/design' },
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
        <div className="w-16 bg-[#F0627E] text-white shadow-md flex flex-col h-screen h-full">
            {/* Logo */}
            <div className="p-4 flex justify-center">
                <Image
                    src={logo} // Reemplaza con la ruta de tu logo en la carpeta public
                    alt="Logo"
                    width={100} // Define el ancho de la imagen
                    height={100} // Define la altura de la imagen
                />
            </div>

            {/* Navegación */}
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

            {/* Cerrar sesión */}
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
