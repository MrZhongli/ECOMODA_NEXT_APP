import React from "react";
import { useBranch } from "./useBranch";

const branches = [
    { id: 1, name: "Sucursal A", address: "Dirección A", phone: "123456789" },
    { id: 2, name: "Sucursal B", address: "Dirección B", phone: "987654321" },
];

export const BranchSelector: React.FC = () => {
    const { branch, changeBranch } = useBranch();

    const handleBranchChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedBranch = branches.find((b) => b.id === parseInt(event.target.value));
        changeBranch(selectedBranch || null);
    };

    return (
        <div>
            <label htmlFor="branch-selector">Seleccionar Sucursal:</label>
            <select id="branch-selector" onChange={handleBranchChange} value={branch?.id || ""}>
                <option value="">-- Seleccione una sucursal --</option>
                {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                        {b.name}
                    </option>
                ))}
            </select>

            {branch && (
                <div>
                    <h3>Sucursal Seleccionada:</h3>
                    <p><strong>Nombre:</strong> {branch.name}</p>
                    <p><strong>Dirección:</strong> {branch.address}</p>
                    <p><strong>Teléfono:</strong> {branch.phone}</p>
                </div>
            )}
        </div>
    );
};
