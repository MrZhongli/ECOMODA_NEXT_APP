'use client';
import NavbarHumanResources from './NavbarHumanResources';

export default function VentasLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-full w-full">
            {/* Navbar de ventas */}
            <NavbarHumanResources />
            {/* Contenido dinámico */}
            <main className="flex-grow p-4">{children}</main>
            <footer className="p-4 text-center bg-gray-100 text-gray-500">
                © {new Date().getFullYear()} Mi Empresa - Todos los derechos reservados
            </footer>
        </div>
    );
}
