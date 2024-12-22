"use client"

import React, { useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ArrowUpIcon, ArrowDownIcon, BarChartIcon, SettingsIcon } from "lucide-react"

const chartData = [
    { month: "Ene", ingresos: 5000, egresos: 4200 },
    { month: "Feb", ingresos: 6200, egresos: 5100 },
    { month: "Mar", ingresos: 7800, egresos: 6300 },
    { month: "Abr", ingresos: 7200, egresos: 5800 },
    { month: "May", ingresos: 8500, egresos: 7000 },
    { month: "Jun", ingresos: 9200, egresos: 7500 },
]

const chartConfig = {
    ingresos: {
        label: "Ingresos",
        color: "var(--primary)", // Usando el color primario global
    },
    egresos: {
        label: "Egresos",
        color: "var(--secondary)", // Usando el color secundario global
    },
} satisfies ChartConfig

export function FinancialStatsDashboard() {
    const [viewType, setViewType] = useState<"Mensual" | "Anual">("Mensual")

    const totalIngresos = chartData.reduce((sum, data) => sum + data.ingresos, 0)
    const totalEgresos = chartData.reduce((sum, data) => sum + data.egresos, 0)
    const ingresosPorcentaje = ((chartData[5].ingresos - chartData[0].ingresos) / chartData[0].ingresos) * 100
    const egresosPorcentaje = ((chartData[5].egresos - chartData[0].egresos) / chartData[0].egresos) * 100

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[var(--primary-800)] text-white p-2 rounded shadow">
                    <p className="font-bold">{`${label}`}</p>
                    <p>{`Ingresos: $${payload[0].value.toLocaleString()}`}</p>
                    <p>{`Egresos: $${payload[1].value.toLocaleString()}`}</p>
                </div>
            )
        }
        return null
    }

    return (
        <Card className="w-full max-w-4xl mx-auto bg-[var(--primary-200)] shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-white flex justify-between items-center p-6">
                <div className="flex items-center">
                    <BarChartIcon className="w-6 h-6 text-[var(--secondary-600)] mr-2" />
                    <CardTitle className="text-2xl font-bold text-[var(--secondary)]">Estadísticas</CardTitle>
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        variant="outline"
                        className="bg-[var(--primary-600)] text-[var(--primary)] hover:bg-[var(--primary)]"
                        onClick={() => setViewType(viewType === "Mensual" ? "Anual" : "Mensual")}
                    >
                        {viewType}
                    </Button>
                    <SettingsIcon className="w-6 h-6 text-[var(--secondary-600)]" />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-[var(--secondary)] mb-2">Ingresos</h3>
                        <p className="text-3xl font-bold text-[var(--primary)]">${totalIngresos.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                            {ingresosPorcentaje > 0 ? (
                                <ArrowUpIcon className="w-4 h-4 text-[var(--primary)] mr-1" />
                            ) : (
                                <ArrowDownIcon className="w-4 h-4 text-[var(--primary-600)] mr-1" />
                            )}
                            <span className={ingresosPorcentaje > 0 ? "text-[var(--primary)]" : "text-[var(--primary-600)]"}>
                                {Math.abs(ingresosPorcentaje).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-[var(--secondary)] mb-2">Egresos</h3>
                        <p className="text-3xl font-bold text-[var(--secondary)]">${totalEgresos.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                            {egresosPorcentaje > 0 ? (
                                <ArrowUpIcon className="w-4 h-4 text-[var(--primary-600)] mr-1" />
                            ) : (
                                <ArrowDownIcon className="w-4 h-4 text-[var(--primary)] mr-1" />
                            )}
                            <span className={egresosPorcentaje > 0 ? "text-[var(--primary-600)]" : "text-[var(--primary)]"}>
                                {Math.abs(egresosPorcentaje).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>
                <ChartContainer config={chartConfig} className="h-[300px] w-full bg-[var(--secondary-200)] rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="month" stroke="var(--secondary)" />
                            <YAxis stroke="var(--secondary)" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="ingresos" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="egresos" fill="var(--secondary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
