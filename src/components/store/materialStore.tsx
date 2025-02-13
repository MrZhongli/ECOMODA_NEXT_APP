// store/materialStore.tsx
import { create } from 'zustand';

// Define el tipo para los datos del material
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

// Define el tipo para el store
interface MaterialStore {
    materials: Material[]; // Lista de materiales
    selectedMaterial: Material | null; // Material seleccionado
    setMaterials: (materials: Material[]) => void; // Función para establecer los materiales
    selectMaterial: (material: Material) => void; // Función para seleccionar un material
    clearSelectedMaterial: () => void; // Función para limpiar el material seleccionado
}

// Crea el store
const useMaterialStore = create<MaterialStore>((set) => ({
    materials: [],
    selectedMaterial: JSON.parse(localStorage.getItem("selectedMaterial") || "null"),
    setMaterials: (materials) => set({ materials }),
    selectMaterial: (material) => {
        localStorage.setItem("selectedMaterial", JSON.stringify(material));
        set({ selectedMaterial: material });
    },
    clearSelectedMaterial: () => {
        localStorage.removeItem("selectedMaterial");
        set({ selectedMaterial: null });
    },
}));

export default useMaterialStore;