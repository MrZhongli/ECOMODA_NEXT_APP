import { create } from 'zustand';

// Define el tipo para los datos de la sucursal
interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

// Define el tipo para el store
interface BranchStore {
    branches: Branch[]; // Lista de sucursales
    selectedBranch: Branch | null; // Sucursal seleccionada
    setBranches: (branches: Branch[]) => void; // Función para establecer las sucursales
    selectBranch: (branch: Branch) => void; // Función para seleccionar una sucursal
}

// Crea el store
export const useBranchStore = create<BranchStore>((set) => ({
    branches: [],
    selectedBranch: null,
    setBranches: (branches) => set(() => ({ branches })),
    selectBranch: (branch) => set(() => ({ selectedBranch: branch })),
}));
