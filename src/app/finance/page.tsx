import { Calendar, Building2, FileText, Settings } from 'lucide-react'
import DashboardFinance from './DashboardFinance'

export default async function financePage() {
    // Array con datos falsos
    const financeData = [
        {
            title: "Ventas",
            description: "Gestione las ventas realizadas por la empresa",
            icon: <Calendar className="h-6 w-6 text-[#f0627e]" />,
            actionText: "Ver ventas"
        },
        {
            title: "Compras",
            description: "Administre las compras de productos y servicios",
            icon: <Building2 className="h-6 w-6 text-[#f0627e]" />,
            actionText: "Gestionar compras"
        },
        {
            title: "Ingresos",
            description: "Visualice los ingresos registrados",
            icon: <FileText className="h-6 w-6 text-[#f0627e]" />,
            actionText: "Ver ingresos"
        },
        {
            title: "Egresos",
            description: "Controle los egresos y gastos empresariales",
            icon: <Settings className="h-6 w-6 text-[#f0627e]" />,
            actionText: "Revisar egresos"
        },
        {
            title: "Presupuestos",
            description: "Planifique y administre los presupuestos",
            icon: <Calendar className="h-6 w-6 text-[#f0627e]" />,
            actionText: "Configurar presupuestos"
        },
        {
            title: "Reportes financieros",
            description: "Genere reportes detallados de las finanzas",
            icon: <FileText className="h-6 w-6 text-[#f0627e]" />,
            actionText: "Generar reporte"
        }
    ]

    return (
        <section className="w-full max-h-full p-8">
            <h1 className="text-3xl font-bold text-[#4d619d] mb-6">Dashboard de Finanzas</h1>
            <DashboardFinance data={financeData} />
        </section>
    )
}
