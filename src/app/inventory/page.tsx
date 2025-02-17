import InventoryManagement from "./InventoryManagement";

import { fetchAPI } from "../../api/config/api";

async function fetchProducts() {
    try {
        const ProductsData = await fetchAPI<{ products: any[] }>("/products", "GET");
        return ProductsData;
    } catch (error) {
        console.error("Error fetching products:", error);
        return { products: [] }; // Retorna un array vacío en caso de error
    }
}

export default async function DashboardPage() {
    const ProductsData = await fetchProducts();
    console.log(ProductsData);
    return (
        <section className="w-full max-h-full p-8">
            <h2 className="text-3xl text-secondary font-bold mb-5">Inventario</h2>
            <InventoryManagement inventoryData={ProductsData.products} />
        </section>
    );
};

