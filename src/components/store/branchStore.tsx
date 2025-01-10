import { create } from 'zustand'; // Una sola importación

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
    clearSelectedBranch: () => void; // Función para limpiar la sucursal seleccionada
}

// Crea el store
const useBranchStore = create<BranchStore>((set) => ({
    branches: [],
    selectedBranch: JSON.parse(localStorage.getItem("selectedBranch") || "null"),
    setBranches: (branches) => set({ branches }),
    selectBranch: (branch) => {
        localStorage.setItem("selectedBranch", JSON.stringify(branch));
        set({ selectedBranch: branch });
    },
    clearSelectedBranch: () => {
        localStorage.removeItem("selectedBranch");
        set({ selectedBranch: null });
    },
}));

export default useBranchStore;
