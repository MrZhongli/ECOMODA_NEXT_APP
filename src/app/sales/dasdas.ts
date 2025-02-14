"use client"
import { useState, useEffect } from "react";

interface Product {
    id: number;
    name: string;
    price: number;
}

interface Customer {
    idCard: string;
    name: string;
    lastname: string;
}

interface SaleDetail {
    productId: number;
    quantity: number;
    unitPrice: number;
}

interface NewSale {
    description: string;
    customerId: string;
    saleDetail: SaleDetail[];
}

const NuevoPresupuesto = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string>("");
    const [saleDetails, setSaleDetails] = useState<SaleDetail[]>([]);
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetch("http://localhost:8000/customers")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setCustomers(data);
                } else {
                    console.error("Unexpected data format for customers:", data);
                    setCustomers([]); // Evita el error
                }
            })
            .catch((error) => {
                console.error("Error loading customers", error);
                setCustomers([]); // Asegura que el estado no sea undefined
            });
    
        fetch("http://localhost:8000/products")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error("Unexpected data format for products:", data);
                    setProducts([]);
                }
            })
            .catch((error) => {
                console.error("Error loading products", error);
                setProducts([]);
            });
    }, []);
    

    // Modificar cantidad de un producto en la venta
    const updateProductQuantity = (index: number, quantity: number) => {
        const updatedDetails = [...saleDetails];
        updatedDetails[index].quantity = quantity;
        setSaleDetails(updatedDetails);
    };

    // Enviar la venta al backend
    const submitSale = () => {
        if (!selectedCustomer || saleDetails.length === 0 || !description) {
            toast.error("Please complete all fields before submitting.");
            return;
        }

        const newSale: NewSale = {
            description,
            customerId: selectedCustomer,
            saleDetail: saleDetails,
        };

        fetch("http://localhost:8000/sales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSale),
        })
            .then((res) => res.json())
            .then(() => {
                toast.success("Sale successfully created!");
                setSelectedCustomer("");
                setSaleDetails([]);
                setDescription("");
            })
            .catch(() => toast.error("Error submitting sale."));
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md">
            <h2 className="text-lg font-bold mb-4">New Sale</h2>

            {/* Selección de Cliente */}
            <label className="block mb-2">Customer:</label>
            <select
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            >
                <option value="">Select a customer</option>
                {customers.map((c) => (
                    <option key={c.idCard} value={c.idCard}>
                        {c.name} {c.lastname}
                    </option>
                ))}
            </select>

            {/* Descripción */}
            <label className="block mb-2">Description:</label>
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full mb-4"
            />

            {/* Selección de Productos */}
            <label className="block mb-2">Products:</label>
            <select
                onChange={(e) => addProductToSale(Number(e.target.value))}
                className="border p-2 rounded w-full mb-4"
            >
                <option value="">Select a product</option>
                {products.map((p) => (
                    <option key={p.id} value={p.id}>
                        {p.name} - ${p.price}
                    </option>
                ))}
            </select>

            {/* Tabla de productos seleccionados */}
            <h3 className="font-bold mt-4 mb-2">Sale Details</h3>
            {saleDetails.length === 0 ? (
                <p>No products added.</p>
            ) : (
                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2">Product ID</th>
                            <th className="p-2">Quantity</th>
                            <th className="p-2">Unit Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleDetails.map((detail, index) => (
                            <tr key={index} className="border-t">
                                <td className="p-2">{detail.productId}</td>
                                <td className="p-2">
                                    <input
                                        type="number"
                                        value={detail.quantity}
                                        onChange={(e) =>
                                            updateProductQuantity(index, Number(e.target.value))
                                        }
                                        className="border p-1 w-16"
                                    />
                                </td>
                                <td className="p-2">${detail.unitPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Botón para guardar */}
            <button
                onClick={submitSale}
                className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
            >
                Save Sale
            </button>
        </div>
    );
};

export default NuevoPresupuesto;
