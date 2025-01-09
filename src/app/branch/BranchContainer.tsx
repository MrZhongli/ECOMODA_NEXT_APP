"use client";

import { useBranchStore } from "@/components/store/branchStore";
import React from "react";

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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Gestionar Sucursales</h1>

            {/* Mostrar sucursal seleccionada */}
            {selectedBranch ? (
                <div className="mb-4 p-4 border rounded shadow">
                    <h2 className="text-lg font-semibold">Sucursal Seleccionada:</h2>
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
                <p className="mb-4 text-gray-500">No hay ninguna sucursal seleccionada.</p>
            )}

            {/* Lista de sucursales */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Lista de Sucursales:</h2>
                <ul className="space-y-2">
                    {branches.map((b) => (
                        <li
                            key={b.id}
                            className={`p-4 border rounded cursor-pointer hover:bg-gray-100 ${selectedBranch?.id === b.id ? "bg-gray-200" : ""
                                }`}
                            onClick={() => handleSelectBranch(b.id)}
                        >
                            <p className="font-medium">{b.name}</p>
                            <p className="text-sm text-gray-600">{b.address}</p>
                            <p className="text-sm text-gray-600">{b.phone}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
