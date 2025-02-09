
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
  

  export async function getPurchases(): Promise<PurchaseOrder[]> {
    try {
      const res = await fetch("http://localhost:8000/purchases", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch purchases");
  
      const data = await res.json();
      return Array.isArray(data.purchases) ? data.purchases : [];
    } catch (error) {
      console.error("Error fetching purchases:", error);
      return [];
    }
  }
  

  export async function deletePurchase(id: number): Promise<boolean> {
    try {
      const res = await fetch(`http://localhost:8000/purchase-orders/${id}`, {
        method: "DELETE",
      });
  
      if (!res.ok) throw new Error("Failed to delete purchase");
      return true; 
    } catch (error) {
      console.error("Error deleting purchase:", error);
      return false; 
    }
  }