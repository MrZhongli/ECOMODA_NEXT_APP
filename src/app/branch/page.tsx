"use server"
import { fetchAPI } from "@/api/config/api";
import BranchContainer from "./BranchContainer";

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

export default async function BranchPage() {
    let branches: Branch[] = [];

    // Llamada a la API para obtener sucursales
    try {
        const response = await fetchAPI<{
            message: string;
            data: { branches: Branch[] };
        }>("/branches");
        console.log("API Response:", response);
        branches = response.data.branches;
    } catch (error) {
        console.error("Error fetching branches:", error);
    }

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Sucursales</h2>
            <BranchContainer branches={branches} />
        </section>
    );
}
