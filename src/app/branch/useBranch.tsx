import { useBranchContext } from "./BranchProvider";

export const useBranch = () => {
    const { branch, setBranch } = useBranchContext();

    // Función para cambiar sucursal
    const changeBranch = (newBranch: Branch | null) => {
        setBranch(newBranch);
    };

    return { branch, changeBranch };
};
