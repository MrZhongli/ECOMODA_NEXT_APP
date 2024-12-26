'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type SalesSection = {
    name: string;
    route: string; // Ruta asociada a cada sección
};

const salesSections: SalesSection[] = [
    { name: 'Pedidos', route: '/sales/orders' },
    { name: 'A Facturar', route: '/sales/invoices' },
    { name: 'Informes', route: '/sales/reports' },
    { name: 'Configuración', route: '/sales/settings' },
];

export default function NavbarSales() {
    const [activeSection, setActiveSection] = useState<string>('Pedidos');
    const router = useRouter();

    const handleNavigation = (section: SalesSection) => {
        setActiveSection(section.name);
        router.push(section.route); // Navega a la ruta correspondiente
    };

    return (
        <div className="bg-[#F0627E] text-white p-4 shadow-md flex justify-between items-center">
            {/* Título y Branding */}
            <div className="flex items-center space-x-4">
                <span className="font-bold text-xl">Ventas</span>
            </div>

            {/* Opciones del menú */}
            <div className="flex space-x-4">
                {salesSections.map((section) => (
                    <Button
                        key={section.name}
                        variant={activeSection === section.name ? 'solid' : 'ghost'}
                        onClick={() => handleNavigation(section)}
                        className={activeSection === section.name ? 'bg-white text-[#F0627E]' : ''}
                    >
                        {section.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}
