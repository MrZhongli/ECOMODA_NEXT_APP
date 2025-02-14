// types/sales.ts

export interface Customer {
    idCard: string;
    name: string;
    lastname: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface Branch {
    id: number;
    name: string;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
}

export interface SaleDetail {
    saleId: number;
    productId: number;
    quantity: number;
    unitPrice: string; // Podrías convertirlo a number si es necesario para cálculos
}

export interface Sale {
    id: number;
    description: string;
    customerId: string;
    branchId: number;
    brandId: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    customer: Customer;
    branch: Branch;
    saleDetail: SaleDetail[];
}

// La respuesta completa de la API
export interface SaleResponse {
    sale: Sale;
}
