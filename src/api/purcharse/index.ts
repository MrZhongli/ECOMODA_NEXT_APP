export interface PurchaseOrder {
    id: number;
    providerRif: string;
    employeeIdCard: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  
    provider: {
      rif: string;
      name: string;
      email: string;
      phone: string;
      address: string;
    };
    employee: {
      idCard: string;
      name: string;
      lastname: string;
    };
  
    purchaseOrderDetails: {
      purchase_order_Id: number;
      materialId: number;
      quantity: number;
      unitPrice: number;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    }[];
  }

  export async function getPurchase(PurchaseId: string): Promise<PurchaseOrder | null> {
    try {
        console.log("PurchaseId:", PurchaseId);
        const res = await fetch(`http://localhost:8000/purchase-orders/${PurchaseId}`, { cache: "no-store" });

        if (!res.ok) throw new Error("Failed to fetch purchase");

        const responseData = await res.json();
        console.log("API Response Data:", responseData); // Depuración

        // Extraer el objeto real de la orden de compra
        return responseData?.data?.purchaseOrder || null;
    } catch (error) {
        console.error("Error fetching purchase:", error);
        return null;
    }

}