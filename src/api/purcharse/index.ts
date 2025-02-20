export const fetchPurcharse = async () => {
    try {
        const response = await fetch('http://localhost:8000/pucharse-orders');
        if (!response.ok) {
            throw new Error('Error al obtener los datos de las compras');
        }
        const data = await response.json();
        return data.purcharse; // Devuelve el array de ventas
    } catch (error) {
        console.error('Error fetching sales:', error);
        return [];
    }
};