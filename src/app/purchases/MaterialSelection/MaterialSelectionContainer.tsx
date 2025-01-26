// components/MaterialsContainer.tsx
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import './modal.css';
// Define el tipo para los materiales
interface Material {
    id: number;
    name: string;
    description: string;
    brandId: number;
    qualityId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

// Define las props para el componente
interface MaterialsContainerProps {
    materials: Material[];
    openModal: (material: Material | null) => void; // Función para abrir el modal
}

export default function MaterialsContainer({ materials, openModal }: MaterialsContainerProps) {
    const handleDelete = async (id: number) => {
        await fetch(`http://localhost:8000/materials/${id}`, {
            method: "DELETE",
        });
        // Actualiza la lista de materiales
        const response = await fetch("http://localhost:8000/materials");
        const updatedMaterials = await response.json();
        setMaterials(updatedMaterials.materials);
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-[#4d619d] mb-6">Gestionar Materiales</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {materials.map((material) => (
                    <Card key={material.id} className="hover:shadow-lg hover:scale-105 transition-all duration-300">
                        <CardHeader>
                            <CardTitle className="text-[#4d619d]">{material.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center mb-2">
                                <Info className="mr-2 h-4 w-4 text-[#f0627e]" />
                                <span>{material.description}</span>
                            </div>
                            <button className="edit-button" onClick={() => openModal(material)}>Editar</button>
                            <button  className="delete-button" onClick={() => handleDelete(material.id)}>Eliminar</button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}