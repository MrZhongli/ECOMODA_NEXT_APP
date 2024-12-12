"use client"

import React, { useState } from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ArrowUpIcon, ArrowDownIcon, BarChartIcon, SettingsIcon } from 'lucide-react'

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
        color: "#F0627E",
    },
    egresos: {
        label: "Egresos",
        color: "#4D610D",
    },
} satisfies ChartConfig

export function FinancialStatsDashboard() {
    const [viewType, setViewType] = useState<'Mensual' | 'Anual'>('Mensual')

    const totalIngresos = chartData.reduce((sum, data) => sum + data.ingresos, 0)
    const totalEgresos = chartData.reduce((sum, data) => sum + data.egresos, 0)
    const ingresosPorcentaje = ((chartData[5].ingresos - chartData[0].ingresos) / chartData[0].ingresos) * 100
    const egresosPorcentaje = ((chartData[5].egresos - chartData[0].egresos) / chartData[0].egresos) * 100

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#F0627E] text-white p-2 rounded shadow">
                    <p className="font-bold">{`${label}`}</p>
                    <p>{`Ingresos: $${payload[0].value.toLocaleString()}`}</p>
                    <p>{`Egresos: $${payload[1].value.toLocaleString()}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <Card className="w-full max-w-4xl mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-white flex justify-between items-center p-6">
                <div className="flex items-center">
                    <BarChartIcon className="w-6 h-6 text-[#D3D3D3] mr-2" />
                    <CardTitle className="text-2xl font-bold text-[#4B4B4B]">Estadísticas</CardTitle>
                </div>
                <div className="flex items-center space-x-4">
                    <Button
                        variant="outline"
                        className="bg-[#FFE4E1] text-[#FF69B4] hover:bg-[#FFC0CB]"
                        onClick={() => setViewType(viewType === 'Mensual' ? 'Anual' : 'Mensual')}
                    >
                        {viewType}
                    </Button>
                    <SettingsIcon className="w-6 h-6 text-[#D3D3D3]" />
                </div>
            </CardHeader>
            <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-6 mb-8">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-[#4B4B4B] mb-2">Ingresos</h3>
                        <p className="text-3xl font-bold text-[#F0627E]">${totalIngresos.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                            {ingresosPorcentaje > 0 ? (
                                <ArrowUpIcon className="w-4 h-4 text-[#90EE90] mr-1" />
                            ) : (
                                <ArrowDownIcon className="w-4 h-4 text-[#FFA07A] mr-1" />
                            )}
                            <span className={ingresosPorcentaje > 0 ? "text-[#90EE90]" : "text-[#FFA07A]"}>
                                {Math.abs(ingresosPorcentaje).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h3 className="text-lg font-semibold text-[#4B4B4B] mb-2">Egresos</h3>
                        <p className="text-3xl font-bold text-[#4D610D]">${totalEgresos.toLocaleString()}</p>
                        <div className="flex items-center mt-2">
                            {egresosPorcentaje > 0 ? (
                                <ArrowUpIcon className="w-4 h-4 text-[#FFA07A] mr-1" />
                            ) : (
                                <ArrowDownIcon className="w-4 h-4 text-[#90EE90] mr-1" />
                            )}
                            <span className={egresosPorcentaje > 0 ? "text-[#FFA07A]" : "text-[#90EE90]"}>
                                {Math.abs(egresosPorcentaje).toFixed(2)}%
                            </span>
                        </div>
                    </div>
                </div>
                <ChartContainer config={chartConfig} className="h-[300px] w-full bg-[#F5F5F5] rounded-lg p-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <XAxis dataKey="month" stroke="#4B4B4B" />
                            <YAxis stroke="#4B4B4B" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="ingresos" fill="var(--color-ingresos)" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <g key={`cell-${index}`}>
                                        <rect x={`${index * (100 / chartData.length)}%`} width={`${100 / chartData.length}%`} height="100%" fill="url(#ingresosGradient)" />
                                    </g>
                                ))}
                            </Bar>
                            <Bar dataKey="egresos" fill="var(--color-egresos)" radius={[4, 4, 0, 0]}>
                                {chartData.map((entry, index) => (
                                    <g key={`cell-${index}`}>
                                        <rect x={`${index * (100 / chartData.length)}%`} width={`${100 / chartData.length}%`} height="100%" fill="url(#egresosGradient)" />
                                    </g>
                                ))}
                            </Bar>
                            <defs>
                                <linearGradient id="ingresosGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F0627E" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#F0627E" stopOpacity={0.2} />
                                </linearGradient>
                                <linearGradient id="egresosGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4D610D" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#4D610D" stopOpacity={0.2} />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}