'use client'

import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Building2, FileText, Settings, BarChart2, Clock, Plus } from 'lucide-react'

interface DashboardCardProps {
    title: string
    description: string
    icon: React.ReactNode
    actionText: string
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, description, icon, actionText }) => (
    <Card className="flex flex-col h-full">
        <CardHeader>
            <CardTitle className="flex items-center text-[#4d619d]">
                {icon}
                <span className="ml-2">{title}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-gray-600">{description}</p>
        </CardContent>
        <CardFooter>
            <Button className="w-full bg-[#f0627e] hover:bg-[#e05270] text-white">
                {actionText}
            </Button>
        </CardFooter>
    </Card>
)

interface ActionCardProps {
    title: string
    icon: React.ReactNode
    actionText: string
}

const ActionCard: React.FC<ActionCardProps> = ({ title, icon, actionText }) => (
    <Card className="flex flex-col h-full">
        <CardHeader>
            <CardTitle className="flex items-center text-[#4d619d]">
                {icon}
                <span className="ml-2">{title}</span>
            </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow bg-[#e6eaf4] rounded-md"></CardContent>
        <CardFooter>
            <Button className="w-full bg-[#f0627e] hover:bg-[#e05270] text-white">
                {actionText}
            </Button>
        </CardFooter>
    </Card>
)

export default function DashboardFinance() {
    const actionCards = [
        {
            title: "Facturas de clientes",
            icon: <BarChart2 className="h-6 w-6 text-[#f0627e]" />,
            actionText: "Nueva factura"
        },
        {
            title: "Facturas de proveedores",
            icon: <Clock className="h-6 w-6 text-[#f0627e]" />,
            actionText: "Registrar factura"
        },
        {
            title: "Operaciones varias",
            icon: <Plus className="h-6 w-6 text-[#f0627e]" />,
            actionText: "Nueva operación"
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold text-[#4d619d] mb-6">Dashboard de Contabilidad y Finanzas</h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <DashboardCard
                        title="Periodos contables"
                        description="Gestione los periodos contables de su empresa"
                        icon={<Calendar className="h-6 w-6 text-[#f0627e]" />}
                        actionText="Configurar"
                    />
                    <DashboardCard
                        title="Cuentas bancarias"
                        description="Administre las cuentas bancarias de la empresa"
                        icon={<Building2 className="h-6 w-6 text-[#f0627e]" />}
                        actionText="Gestionar"
                    />
                    <DashboardCard
                        title="Impuestos"
                        description="Revise y gestione los impuestos aplicables"
                        icon={<FileText className="h-6 w-6 text-[#f0627e]" />}
                        actionText="Revisión"
                    />
                    <DashboardCard
                        title="Plan de cuentas"
                        description="Configure el plan de cuentas de la empresa"
                        icon={<Settings className="h-6 w-6 text-[#f0627e]" />}
                        actionText="Ajustar"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {actionCards.map((card, index) => (
                        <ActionCard
                            key={index}
                            title={card.title}
                            icon={card.icon}
                            actionText={card.actionText}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
