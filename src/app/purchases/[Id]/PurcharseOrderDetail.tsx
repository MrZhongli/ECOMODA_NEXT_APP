// components/PurchaseOrderDetail.tsx
"use client"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// Interfaces definidas en el componente
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

interface PurchaseOrderDetailProps {
  order: PurchaseOrder;
}

const calculateSubtotal = (item: any) => {
  return Number.parseFloat(item.unitPrice) * item.quantity
}

export default function PurchaseOrderDetail({ order }: PurchaseOrderDetailProps) {
    if (!order) {
      return <div>No se encontraron detalles de la orden.</div>;
    }
  
    return (
      <div className="min-h-screen bg-white">
        {/* Breadcrumb Bar */}
        <div className="bg-white border-b p-4">
          <div className="container mx-auto">
            <span className="text-[#4d619d]">Compras / Detalle / {order.id}</span>
          </div>
        </div>
  
        {/* Action Bar */}
        <div className="bg-white border-b p-4">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="space-x-2">
                <Button className="bg-[#f0627e] hover:bg-[#e05270] text-white">Guardar Cambios</Button>
                <Button variant="outline">Cancelar</Button>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="link" className="text-[#4d619d]">
                Enviar por correo electrónico
              </Button>
              <Button variant="link" className="text-[#4d619d]">
                Imprimir
              </Button>
              <Button variant="outline">Confirmar</Button>
              <Button variant="outline">Editar</Button>
            </div>
          </div>
        </div>
  
        {/* Main Content */}
        <main className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-[#4d619d] mb-6">Detalle de Orden de Compra</h1>
  
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Proveedor</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Nombre:</strong> {order.provider?.name || "No disponible"}
                </p>
                <p>
                  <strong>RIF:</strong> {order.provider?.rif || "No disponible"}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Información del Empleado</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <strong>Nombre:</strong> {order.employee?.name || "No disponible"}
                </p>
                <p>
                  <strong>Cédula:</strong> {order.employee?.idCard || "No disponible"}
                </p>
              </CardContent>
            </Card>
          </div>
  
          <Card>
            <CardHeader>
              <CardTitle>Líneas de la Orden</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID del Material</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Precio unitario</TableHead>
                    <TableHead>Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.purchaseOrderDetails?.map((item) => (
                    <TableRow key={item.materialId}>
                      <TableCell>{item.materialId}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>${item.unitPrice}</TableCell>
                      <TableCell>${calculateSubtotal(item)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }
