// pages/MaterialsPage.tsx
"use client";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "@/api/config/api";
import MaterialsContainer from "./MaterialSelectionContainer";
import Modal from "./Modal"; // Asegúrate de importar el componente Modal

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

export default function MaterialsPage() {
    const [materials, setMaterials] = useState<Material[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);

    // Llamada a la API para obtener materiales
    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                const response = await fetchAPI<{
                    message: string;
                    materials: Material[];
                }>("http://localhost:8000/materials");
                console.log("API Response:", response);

                if (response.materials) {
                    setMaterials(response.materials);
                } else {
                    console.error("La respuesta de la API no contiene 'materials'");
                }
            } catch (error) {
                console.error("Error fetching materials:", error);
            }
        };

        fetchMaterials();
    }, []);

    const openModal = (material: Material | null) => {
        setCurrentMaterial(material);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentMaterial(null);
    };

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Materiales</h2>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md float-right"
                onClick={() => openModal(null)} // Abre el modal para crear un nuevo material
            >
                Agregar Material
            </button>
            <MaterialsContainer materials={materials} openModal={openModal} />
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    material={currentMaterial}
                    setMaterials={setMaterials} // Pasar la función para actualizar los materiales
                />
            )}
        </section>
    );
}