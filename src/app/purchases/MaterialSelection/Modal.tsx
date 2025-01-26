// components/Modal.tsx
"use client"
import React, { useEffect, useState } from "react";
import './modal.css'; // Asegúrate de importar el archivo CSS

interface Material {
    id?: number;
    name: string;
    description: string;
    brandId?: number; // Añadido para brandId
    qualityId?: number; // Añadido para qualityId
}

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    material: Material | null;
    setMaterials: React.Dispatch<React.SetStateAction<Material[]>>;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, material, setMaterials }) => {
    const [formData, setFormData] = useState<Material>({ name: "", description: "", brandId: undefined, qualityId: undefined });

    useEffect(() => {
        if (material) {
            setFormData(material);
        } else {
            setFormData({ name: "", description: "", brandId: undefined, qualityId: undefined });
        }
    }, [material]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const dataToSend = {
            ...formData,
            brandId: Number(formData.brandId), // Convertir a número
            qualityId: Number(formData.qualityId), // Convertir a número
        };

        console.log("Datos enviados:", dataToSend); // Log para depuración

        if (material) {
            // Actualizar material
            await fetch(`http://localhost:8000/materials/${material.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });
        } else {
            // Crear nuevo material
            const response = await fetch("http://localhost:8000/materials", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error al crear material:", errorData); // Log del error
                alert(`Error: ${errorData.message || "No se pudo crear el material."}`); // Muestra un mensaje de error
            }
        }
        // Actualiza la lista de materiales
        const response = await fetch("http://localhost:8000/materials");
        const updatedMaterials = await response.json();
        setMaterials(updatedMaterials.materials);
        onClose();
    };

    const handleDelete = async () => {
        if (material && material.id) {
            const response = await fetch(`http://localhost:8000/materials/${material.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                // Actualiza la lista de materiales después de eliminar
                const updatedMaterials = await fetch("http://localhost:8000/materials");
                const materialsData = await updatedMaterials.json();
                setMaterials(materialsData.materials);
                onClose();
            } else {
                const errorData = await response.json();
                console.error("Error al eliminar material:", errorData);
                alert(`Error: ${errorData.message || "No se pudo eliminar el material."}`);
            }
        }
    };

    return (
        <div className={`modal ${isOpen ? "is-open" : ""}`}>
            <div className="modal-content">
                <h2>{material ? "Actualizar Material" : "Agregar Material"}</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input-field" // Clase para aplicar estilos
                        />
                    </div>
                    <div>
                        <label>Descripción:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="input-field" // Clase para aplicar estilos
                        />
                    </div>
                    <div>
                        <label>ID de Marca:</label>
                        <input
                            type="number"
                            name="brandId"
                            value={formData.brandId || ""}
                            onChange={handleChange}
                            required
                            className="input-field" // Clase para aplicar estilos
                        />
                    </div>
                    <div>
                        <label>ID de Calidad:</label>
                        <input
                            type="number"
                            name="qualityId"
                            value={formData.qualityId || ""}
                            onChange={handleChange}
                            required
                            className="input-field" // Clase para aplicar estilos
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" >Guardar</button>
                        <button type="button" onClick={onClose}>Cancelar</button>
                        {material && (
                            <button type="button" onClick={handleDelete} >Eliminar</button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;