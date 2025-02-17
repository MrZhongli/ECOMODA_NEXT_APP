'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type PucharsesSection = {
    name: string;
    route: string; // Ruta asociada a cada sección
};

const PucharsesSections: PucharsesSection[] = [
    { name: 'Ordenes', route: '/purchases' },
    { name: 'Inventario', route: '../inventory' },
    { name: 'detalles de compra', route: '/purchases/details' },
];

export default function NavBarPucharses() {
    const [activeSection, setActiveSection] = useState<string>('Pedidos');
    const router = useRouter();

    const handleNavigation = (section: PucharsesSection) => {
        setActiveSection(section.name);
        router.push(section.route); // Navega a la ruta correspondiente
    };

    return (
        <div className="bg-[#F0627E] text-white p-4 shadow-md flex justify-between items-center">
            {/* Título y Branding */}
            <div className="flex items-center space-x-4">
                <span className="font-bold text-xl">Compras</span>
            </div>

            {/* Opciones del menú */}
            <div className="flex space-x-4">
                {PucharsesSections.map((section) => (
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
