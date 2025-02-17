"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import PurchaseOrderDetail, { PurchaseOrder } from './PurcharseOrderDetail';
import { fetchAPI } from '../../../api/config/api';

// Función para obtener los detalles de una orden específica
const fetchOrderDetails = async (orderId: string) => {
    try {
      const response = await fetchAPI<{ message: string; data: { purchaseOrder: PurchaseOrder } }>(
        `/purchase-orders/${orderId}`,
        "GET"
      );
      console.log("Respuesta de la API:", response); // Inspecciona la respuesta
      return response.data.purchaseOrder; // Extrae purchaseOrder de la respuesta
    } catch (error) {
      console.error("Error fetching order details:", error);
      return null;
    }
  };

  export default function OrderDetailPage() {
    const params = useParams();
    const id = params.Id;
    const [order, setOrder] = useState<PurchaseOrder | null>(null);
  
    useEffect(() => {
      if (id) {
        fetchOrderDetails(id as string).then((data) => setOrder(data));
      }
    }, [id]);
  
    if (!order) {
      return <div>Cargando detalles de la orden...</div>;
    }
  
    return (
      <section className="w-full max-h-full p-8">
        <h2 className="text-3xl text-secondary font-bold mb-5">Detalle de la Orden</h2>
        <PurchaseOrderDetail order={order} />
      </section>
    );
  }
