'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type FinanceSection = {
    name: string;
    route: string;
};

const financeSections: FinanceSection[] = [
    { name: 'Inicio', route: '/finance/' },
    { name: 'Libro Diario', route: '/finance/journal' }
];

export default function NavbarFinance() {
    const [activeSection, setActiveSection] = useState<string>('Inicio');
    const router = useRouter();

    const handleNavigation = (section: FinanceSection) => {
        setActiveSection(section.name);
        router.push(section.route);
    };

    return (
        <div className="bg-[#4d619d] text-white p-4 shadow-md flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <span className="font-bold text-xl">Finanzas</span>
            </div>

            <div className="flex space-x-4">
                {financeSections.map((section) => (
                    <Button
                        key={section.name}
                        variant={activeSection === section.name ? 'solid' : 'ghost'}
                        onClick={() => handleNavigation(section)}
                        className={activeSection === section.name ? 'bg-white text-[#4d619d]' : ''}
                    >
                        {section.name}
                    </Button>
                ))}
            </div>
        </div>
    );
}