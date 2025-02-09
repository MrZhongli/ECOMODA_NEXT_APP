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
import { PurchaseOrder, getPurchases, deletePurchase } from '@/api/purchases'; 

interface PurchaseDataProps {
  PurchasesData: PurchaseOrder[];
}

export default function PurchasesData({ PurchasesData }: PurchaseDataProps) {
  const [purchases, setPurchases] = useState<PurchaseOrder[]>([]);
  const [filter, setFilter] = useState('all');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [purchaseToDelete, setPurchaseToDelete] = useState<PurchaseOrder | null>(null);
  const router = useRouter();

  useEffect(() => {
    console.log("Datos recibidos:", PurchasesData);
    setPurchases(PurchasesData || []);
  }, [PurchasesData]);

  const calculateTotal = (purchase: PurchaseOrder) => {
    return purchase.purchaseOrderDetails
      .reduce((total, item) => total + item.quantity * parseFloat(item.unitPrice.toString()), 0)
      .toFixed(2);
  };

  const handleDeleteClick = (purchase: PurchaseOrder) => {
    setPurchaseToDelete(purchase);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (purchaseToDelete) {
      const success = await deletePurchase(purchaseToDelete.id); 
      if (success) {
 
        setPurchases(purchases.filter(p => p.id !== purchaseToDelete.id));
        console.log('Orden de compra eliminada:', purchaseToDelete.id);
      } else {
        console.error('Error al eliminar la orden de compra');
      }
      setIsDeleteModalOpen(false);
      setPurchaseToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setPurchaseToDelete(null);
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
                          <DropdownMenuItem onClick={() => handleDeleteClick(purchase)}>
                            Eliminar
                          </DropdownMenuItem>
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

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">¿Estás seguro de que deseas eliminar esta orden de compra?</h2>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={handleCancelDelete}>
                Cancelar
              </Button>
              <Button className="bg-red-500 hover:bg-red-600 text-white" onClick={handleConfirmDelete}>
                Eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}