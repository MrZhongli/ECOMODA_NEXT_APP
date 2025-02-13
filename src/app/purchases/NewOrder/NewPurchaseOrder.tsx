"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Provider {
    rif: string;
    name: string;
}

interface Material {
    id: number;
    name: string;
}

const CreatePurchaseOrder = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [formData, setFormData] = useState({
        providerRif: "",
        employeeIdCard: "",
        purchaseOrderDetails: [{ materialId: "", quantity: "", unitPrice: "" }],
    });

    console.log(providers);

    // Fetch providers and materials
    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await fetch("http://localhost:8000/providers");
                if (!response.ok) throw new Error("Failed to fetch providers");

                const text = await response.text(); // Obtén la respuesta en texto crudo
                console.log("Raw response:", text);

                const data = JSON.parse(text);
                console.log("Parsed response:", data);

                // Si la API devuelve un objeto con los datos dentro de una propiedad
                if (data.providers && Array.isArray(data.providers)) {
                    setProviders(data.providers);
                } else if (Array.isArray(data)) {
                    setProviders(data);
                } else {
                    console.error("Expected an array but got:", data);
                    setProviders([]);
                }
            } catch (error) {
                console.error("Error fetching providers:", error);
                setProviders([]);
            }
        };

        const fetchMaterials = async () => {
            try {
                const response = await fetch("http://localhost:8000/materials");
                if (response.ok) {
                    const data = await response.json();
                    console.log("Materials data:", data); // Log the data
                    if (data.materials && Array.isArray(data.materials)) {
                        setMaterials(data.materials);
                    } else if (Array.isArray(data)) {
                        setMaterials(data);
                    } else {
                        console.error("Expected an array but got:", data);
                        setMaterials([]);
                    }
                }
            } catch (error) {
                console.error("Error fetching materials:", error);
            }
        };

        fetchProviders();
        fetchMaterials();
    }, []);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
        const { name, value } = e.target;
        if (index !== undefined) {
            const updatedDetails = [...formData.purchaseOrderDetails];
            updatedDetails[index] = { ...updatedDetails[index], [name]: value };
            setFormData({ ...formData, purchaseOrderDetails: updatedDetails });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    // Handle provider selection
    const handleProviderChange = (value: string) => {
        setFormData({ ...formData, providerRif: value });
    };

    // Handle material selection
    const handleMaterialChange = (index: number, value: string) => {
        const updatedDetails = [...formData.purchaseOrderDetails];
        updatedDetails[index].materialId = value;
        setFormData({ ...formData, purchaseOrderDetails: updatedDetails });
    };

    // Add new purchase detail
    const addDetail = () => {
        setFormData({
            ...formData,
            purchaseOrderDetails: [...formData.purchaseOrderDetails, { materialId: "", quantity: "", unitPrice: "" }],
        });
    };

    // Create purchase order
    const createPurchaseOrder = async () => {
        try {
            const response = await fetch("http://localhost:8000/purchase-orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    purchaseOrderDetails: formData.purchaseOrderDetails.map((detail) => ({
                        ...detail,
                        materialId: Number(detail.materialId),
                        quantity: Number(detail.quantity),
                        unitPrice: parseFloat(detail.unitPrice),
                    })),
                }),
            });

            if (!response.ok) throw new Error("Failed to create purchase order");

            alert("Purchase order created successfully!");
            setFormData({
                providerRif: "",
                employeeIdCard: "",
                purchaseOrderDetails: [{ materialId: "", quantity: "", unitPrice: "" }],
            });
        } catch (error) {
            alert("Error creating purchase order");
        }
    };

    return (
        <Card className="max-w-lg mx-auto">
            <CardHeader>
                <h2 className="text-xl font-bold">Create Purchase Order</h2>
            </CardHeader>
            <CardContent>
                {/* Provider Selection */}
                <Label>Provider</Label>
                <Select onValueChange={handleProviderChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                        {providers.map((provider) => (
                            <SelectItem key={provider.rif} value={provider.rif}>
                                {provider.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Employee ID */}
                <Label className="mt-3">Employee ID</Label>
                <Input type="text" name="employeeIdCard" value={formData.employeeIdCard} onChange={handleChange} />

                {/* Order Details */}
                <h3 className="font-semibold mt-4">Order Details</h3>
                {formData.purchaseOrderDetails.map((detail, index) => (
                    <div key={index} className="border p-3 rounded-lg mt-2">
                        {/* Material Selection */}
                        <Label>Material</Label>
                        <Select onValueChange={(value) => handleMaterialChange(index, value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a material" />
                            </SelectTrigger>
                            <SelectContent>
                                {materials?.map((material) => (
                                    <SelectItem key={material.id} value={material.id.toString()}>
                                        {material.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {/* Quantity */}
                        <Label className="mt-2">Quantity</Label>
                        <Input type="number" name="quantity" value={detail.quantity} onChange={(e) => handleChange(e, index)} />

                        {/* Unit Price */}
                        <Label className="mt-2">Unit Price</Label>
                        <Input type="text" name="unitPrice" value={detail.unitPrice} onChange={(e) => handleChange(e, index)} />
                    </div>
                ))}

                {/* Buttons */}
                <Button onClick={addDetail} className="mt-4 w-full">
                    Add Detail
                </Button>
                <Button onClick={createPurchaseOrder} className="mt-2 w-full bg-green-500">
                    Create Order
                </Button>
            </CardContent>
        </Card>
    );
};

export default CreatePurchaseOrder;