"use client"
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define el tipo de datos para la sucursal
export interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
}

// Tipo del contexto
interface BranchContextType {
    branch: Branch | null;
    setBranch: (branch: Branch | null) => void;
}

// Crear contexto
const BranchContext = createContext<BranchContextType | undefined>(undefined);

// Provider
export const BranchProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [branch, setBranch] = useState<Branch | null>(null);

    return (
        <BranchContext.Provider value={{ branch, setBranch }}>
            {children}
        </BranchContext.Provider>
    );
};

// Hook personalizado para consumir el contexto
export const useBranchContext = () => {
    const context = useContext(BranchContext);
    if (!context) {
        throw new Error("useBranchContext debe usarse dentro de un BranchProvider");
    }
    return context;
};
