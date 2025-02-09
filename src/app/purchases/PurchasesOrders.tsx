'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, MoreHorizontal, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface PurchaseOrder {
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

interface PurchaseDataProps {
  PurchasesData: PurchaseOrder[];
}

export default function PurchasesData({ PurchasesData }: PurchaseDataProps) {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [filter, setFilter] = useState('all');
  const router = useRouter();

  useEffect(() => {
    console.log("Datos recibidos:", PurchasesData);
    setPurchases(PurchasesData || []);
  }, [PurchasesData]);

  // Función para calcular el total de la orden de compra
  const calculateTotal = (purchase: PurchaseOrder) => {
    return purchase.purchaseOrderDetails
    .reduce((total, item) => total + item.quantity * parseFloat(item.unitPrice.toString()), 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">Órdenes de compra</h1>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto py-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar órdenes..."
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  Mostrar: Todas las Órdenes
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem onClick={() => setFilter('all')}>
                  Todas las Órdenes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('pending')}>
                  Pendientes
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('received')}>
                  Recibidas
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter('invoiced')}>
                  Facturadas
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button className="bg-[#f0627e] hover:bg-[#e05270] text-white gap-2" 
            onClick={() => router.push('/purchases/NewOrder')}
            >
              
              <Plus className="h-4 w-4" /> Nueva orden
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Referencia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Comprador</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead className="w-[40px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.length > 0 ? (
                purchases.map((purchase) => (
                  
                  <TableRow
                    key={purchase.id}
                    className="hover:bg-gray-50 transition-colors"
                  > 
                    <TableCell className="font-medium">{purchase.id}</TableCell>
                    <TableCell>{new Date(purchase.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{purchase.provider.name}</TableCell>
                    <TableCell>{purchase.employee.name}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          purchase.deletedAt
                            ? 'bg-red-100 text-red-800 hover:bg-red-100'
                            : 'bg-green-100 text-green-800 hover:bg-green-100'
                        }
                      >
                        {purchase.deletedAt ? 'Eliminada' : 'Activa'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${calculateTotal(purchase)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4 text-gray-500">
                    No hay órdenes de compra disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
