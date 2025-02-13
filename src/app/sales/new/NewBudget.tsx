"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCustomers } from "@/api/customers";
import { getProducts } from "@/api/products";

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
    branchId: number;
    brandId: number;
    saleDetail: SaleDetail[];
}

const NewBudget = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState<string>("");
    const [saleDetails, setSaleDetails] = useState<SaleDetail[]>([]);
    const [description, setDescription] = useState("");
    const [branchId, setBranchId] = useState<number | null>(null);
    const [brandId, setBrandId] = useState<number | null>(null);

    useEffect(() => {
        getCustomers().then((response) => {
            if (response && Array.isArray(response.customers)) {
                setCustomers(response.customers);
            } else {
                console.error("Invalid customers response format:", response);
            }
        });

        getProducts().then(setProducts);
    }, []);

    const addProductToSale = (productId: number) => {
        if (!productId) return;
        const product = products.find((p) => p.id === productId);
        if (!product) return;

        setSaleDetails((prevDetails) => {
            const existingIndex = prevDetails.findIndex((detail) => detail.productId === productId);
            if (existingIndex !== -1) {
                const updatedDetails = [...prevDetails];
                updatedDetails[existingIndex].quantity += 1;
                return updatedDetails;
            } else {
                return [...prevDetails, { productId, quantity: 1, unitPrice: product.price }];
            }
        });
    };

    const updateProductQuantity = (index: number, quantity: number) => {
        if (quantity < 1) return;
        setSaleDetails((prevDetails) => {
            const updatedDetails = [...prevDetails];
            updatedDetails[index].quantity = quantity;
            return updatedDetails;
        });
    };

    const removeProductFromSale = (index: number) => {
        setSaleDetails((prevDetails) => prevDetails.filter((_, i) => i !== index));
    };

    const submitSale = () => {
        if (!selectedCustomer || saleDetails.length === 0 || !description || branchId === null || brandId === null) {
            console.error("Please complete all fields before submitting.");
            return;
        }

        const newSale: NewSale = {
            description,
            customerId: selectedCustomer,
            branchId,
            brandId,
            saleDetail: saleDetails,
        };

        fetch("http://localhost:8000/sales", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSale),
        })
            .then((res) => res.json())
            .then(() => {
                console.log("Sale successfully created!");
                setSelectedCustomer("");
                setSaleDetails([]);
                setDescription("");
                setBranchId(null);
                setBrandId(null);
            })
            .catch(() => console.error("Error submitting sale."));
    };

    return (
        <div className="p-4 bg-white rounded-md shadow-md grid grid-cols-2 gap-4">
            <div>
                <h2 className="text-lg font-bold mb-4">New Sale</h2>

                <label className="block mb-2">Customer:</label>
                <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                    <SelectTrigger className="w-full mb-4">
                        <SelectValue placeholder="Select a customer" />
                    </SelectTrigger>
                    <SelectContent>
                        {customers.map((c) => (
                            <SelectItem key={c.idCard} value={c.idCard}>
                                {c.name} {c.lastname}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <label className="block mb-2">Branch:</label>
                <Input
                    type="number"
                    value={branchId ?? ""}
                    onChange={(e) => setBranchId(Number(e.target.value))}
                    className="mb-4"
                />

                <label className="block mb-2">Brand:</label>
                <Input
                    type="number"
                    value={brandId ?? ""}
                    onChange={(e) => setBrandId(Number(e.target.value))}
                    className="mb-4"
                />

                <label className="block mb-2">Description:</label>
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-4"
                />
            </div>

            <div>
                <label className="block mb-2">Products:</label>
                <Select onValueChange={(value) => addProductToSale(Number(value))}>
                    <SelectTrigger className="w-full mb-4">
                        <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                        {products.map((p) => (
                            <SelectItem key={p.id} value={p.id.toString()}>
                                {p.name} - ${p.price}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <h3 className="font-bold mt-4 mb-2">Sale Details</h3>
                {saleDetails.length === 0 ? (
                    <p>No products added.</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Product</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Unit Price</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {saleDetails.map((detail, index) => {
                                const product = products.find((p) => p.id === detail.productId);
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{product ? product.name : "Unknown"}</TableCell>
                                        <TableCell>
                                            <Input
                                                type="number"
                                                value={detail.quantity}
                                                min={1}
                                                onChange={(e) =>
                                                    updateProductQuantity(index, Number(e.target.value))
                                                }
                                                className="w-16"
                                            />
                                        </TableCell>
                                        <TableCell>${detail.unitPrice}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="destructive"
                                                onClick={() => removeProductFromSale(index)}
                                                size="sm"
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                )}

                <Button onClick={submitSale} className="mt-4 w-full">
                    Save Sale
                </Button>
            </div>
        </div>
    );
};

export default NewBudget;
