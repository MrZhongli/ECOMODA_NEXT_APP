'use client';

import React from 'react';
import NavbarFinance from './NavbarFinance';

export default function FinanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full w-full">
            <NavbarFinance />
            <main className="flex-grow p-4">{children}</main>
            <footer className="p-4 text-center bg-gray-100 text-gray-500">
                © {new Date().getFullYear()} Mi Empresa - Todos los derechos reservados
            </footer>
        </div>
    );
}