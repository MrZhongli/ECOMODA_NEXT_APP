"use client";

import React from "react";
import useBranchStore from "@/components/store/branchStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, User } from "lucide-react";

// Define el tipo para las sucursales
interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

// Define las props para el componente
interface BranchContainerProps {
    branches: Branch[];
}

export default function BranchContainer({ branches }: BranchContainerProps) {
    const { selectedBranch, selectBranch } = useBranchStore();

    // Maneja la selección de una sucursal
    const handleSelectBranch = (branchId: number) => {
        const branch = branches.find((b) => b.id === branchId);
        if (branch) {
            selectBranch(branch);
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-[#4d619d] mb-6">Gestionar Sucursales</h1>

            {/* Mostrar sucursal seleccionada */}
            {selectedBranch ? (
                <div className="mb-8 p-6 border rounded shadow-lg bg-white">
                    <h2 className="text-xl font-semibold text-[#4d619d] mb-4">Sucursal Seleccionada:</h2>
                    <p>
                        <strong>Nombre:</strong> {selectedBranch.name}
                    </p>
                    <p>
                        <strong>Dirección:</strong> {selectedBranch.address}
                    </p>
                    <p>
                        <strong>Teléfono:</strong> {selectedBranch.phone}
                    </p>
                </div>
            ) : (
                <p className="mb-8 text-gray-500">No hay ninguna sucursal seleccionada.</p>
            )}

            {/* Lista de sucursales */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {branches.map((branch) => (
                    <Card
                        key={branch.id}
                        className={`cursor-pointer transition-all duration-300 ${
                            selectedBranch?.id === branch.id
                                ? "bg-gray-200 shadow-md"
                                : "hover:shadow-lg hover:scale-105"
                        }`}
                        onClick={() => handleSelectBranch(branch.id)}
                    >
                        <CardHeader>
                            <CardTitle className="text-[#4d619d]">{branch.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center mb-2">
                                <MapPin className="mr-2 h-4 w-4 text-[#f0627e]" />
                                <span>{branch.address}</span>
                            </div>
                            <div className="flex items-center">
                                <User className="mr-2 h-4 w-4 text-[#f0627e]" />
                                <span>Teléfono: {branch.phone}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
