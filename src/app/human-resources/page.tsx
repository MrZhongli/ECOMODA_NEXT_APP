import { fetchAPI } from "@/api/config/api";
import HRDashboard from "./HRDashboard";

// Define el tipo para los empleados
interface Employee {
    idCard: string;
    name: string;
    lastname: string;
    birthdate: string;
    gender: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    startDate: string;
}

export default async function EmployeePage() {
    let employeesData: Employee[] = [];

    // Llamada a la API para obtener empleados
    try {
        const response = await fetchAPI<{
            message: string;
            data: { employees: Employee[] };
        }>("employees");
        employeesData = response.employees;
    } catch (error) {
        console.error("Error fetching employees:", error);
    }

    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-black font-bold mb-5">Empleados</h2>
            <HRDashboard employeesData={employeesData} />
        </section>
    );
}
