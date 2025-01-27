'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function PayrollCard() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna Izquierda: Resumen de Nómina */}
            <Card className="bg-white shadow-md rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-[#007BFF]">Resumen de Nómina</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        <li className="flex justify-between items-center">
                            <span className="text-black">Total de empleados:</span>
                            <span className="font-semibold">150</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-black">Salario bruto total:</span>
                            <span className="font-semibold text-[#007BFF]">$450,000</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-black">Deducciones totales:</span>
                            <span className="font-semibold text-[#007BFF]">$67,500</span>
                        </li>
                        <li className="flex justify-between items-center">
                            <span className="text-black">Salario neto total:</span>
                            <span className="font-semibold text-[#007BFF]">$382,500</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            {/* Columna Derecha: Acciones de Nómina */}
            <Card className="bg-white shadow-md rounded-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-[#007BFF]">Acciones de Nómina</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button className="w-full bg-[#007BFF] text-white hover:bg-[#0056b3] transition-colors">
                        Generar Nómina
                    </Button>
                    <Button className="w-full bg-[#FF77AA] text-white hover:bg-[#FF5588] transition-colors">
                        Ver Historial de Nómina
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
