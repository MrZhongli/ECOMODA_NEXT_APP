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

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await fetch("http://localhost:8000/providers");
                if (!response.ok) throw new Error("Failed to fetch providers");

                const data = await response.json();
                setProviders(Array.isArray(data.providers) ? data.providers : []);
            } catch (error) {
                console.error("Error fetching providers:", error);
            }
        };

        const fetchMaterials = async () => {
            try {
                const response = await fetch("http://localhost:8000/materials");
                if (response.ok) {
                    const data = await response.json();
                    setMaterials(Array.isArray(data.materials) ? data.materials : []);
                }
            } catch (error) {
                console.error("Error fetching materials:", error);
            }
        };

        fetchProviders();
        fetchMaterials();
    }, []);

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

    const handleProviderChange = (value: string) => setFormData({ ...formData, providerRif: value });

    const handleMaterialChange = (index: number, value: string) => {
        const updatedDetails = [...formData.purchaseOrderDetails];
        updatedDetails[index].materialId = value;
        setFormData({ ...formData, purchaseOrderDetails: updatedDetails });
    };

    const addDetail = () => {
        setFormData({
            ...formData,
            purchaseOrderDetails: [...formData.purchaseOrderDetails, { materialId: "", quantity: "", unitPrice: "" }],
        });
    };

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
        <Card className="max-w-5xl mx-auto p-4">
            <CardHeader>
                <h2 className="text-xl font-bold">Nueva Orden de Compra</h2>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {/* Columna izquierda */}
                    <div>
                        <Label>Customer:</Label>
                        <Select onValueChange={handleProviderChange}>
                            <SelectTrigger className="w-full text-sm p-2">
                                <SelectValue placeholder="Select a customer" />
                            </SelectTrigger>
                            <SelectContent>
                                {providers.map((provider) => (
                                    <SelectItem key={provider.rif} value={provider.rif}>
                                        {provider.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Label className="mt-3">Employee ID:</Label>
                        <Input
                            type="text"
                            name="employeeIdCard"
                            value={formData.employeeIdCard}
                            onChange={handleChange}
                            className="w-full text-sm p-2"
                        />

                        <Button onClick={createPurchaseOrder} className="mt-4 w-full bg-[#f0627e] hover:bg-[#e05570] text-white p-2 text-sm">
                            Save Sale
                        </Button>

                    </div>

                    {/* Columna derecha */}
                    <div>
                        <h3 className="font-bold">Sale Details</h3>
                        {formData.purchaseOrderDetails.length === 0 ? (
                            <p className="text-gray-500 text-sm">No products added.</p>
                        ) : (
                            <div>
                                {formData.purchaseOrderDetails.map((detail, index) => (
                                    <div key={index} className="border p-2 rounded-lg mt-2">
                                        <Label>Material:</Label>
                                        <Select onValueChange={(value) => handleMaterialChange(index, value)}>
                                            <SelectTrigger className="w-full text-sm p-2">
                                                <SelectValue placeholder="Select a product" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {materials.map((material) => (
                                                    <SelectItem key={material.id} value={material.id.toString()}>
                                                        {material.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

                                        <Label className="mt-2">Quantity:</Label>
                                        <Input
                                            type="number"
                                            name="quantity"
                                            value={detail.quantity}
                                            onChange={(e) => handleChange(e, index)}
                                            className="w-full text-sm p-2"
                                        />

                                        <Label className="mt-2">Unit Price:</Label>
                                        <Input
                                            type="text"
                                            name="unitPrice"
                                            value={detail.unitPrice}
                                            onChange={(e) => handleChange(e, index)}
                                            className="w-full text-sm p-2"
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <Button onClick={addDetail} className="mt-4 w-full bg-[#4d619d] hover:bg-[#435587] text-white p-2 text-sm">
                            Add Detail
                        </Button>

                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CreatePurchaseOrder;
