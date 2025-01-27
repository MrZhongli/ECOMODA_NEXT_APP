'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type HRSection = {
    name: string;
    route: string; // Ruta asociada a cada sección
};

const hrSections: HRSection[] = [
    { name: 'Empleado', route: '/human-resources' },
    { name: 'Nómina', route: '/human-resources/payroll' },
    { name: 'Asistencia', route: '/human-resources/attendance' },
];

export default function NavbarHumanResources() {
    const [activeSection, setActiveSection] = useState<string>('Empleado');
    const router = useRouter();

    const handleNavigation = (section: HRSection) => {
        setActiveSection(section.name);
        router.push(section.route); // Navega a la ruta correspondiente
    };

    return (
        <div className="bg-[#F0627E] text-white p-4 shadow-md flex justify-between items-center">
            {/* Título y Branding */}
            <div className="flex items-center space-x-4">
                <h1 className="font-bold text-xl">Recursos Humanos</h1>
            </div>

            {/* Opciones del menú */}
            <div className="flex space-x-4">
                {hrSections.map((section) => (
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
