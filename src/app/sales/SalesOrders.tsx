"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
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
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Search,
	Clock,
	Star,
	Bell,
	Plus,
	Eye,
	Edit,
	Trash2,
	MoreHorizontal,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Definir tipos para las props
interface Sale {
	id: number;
	description: string;
	customerId: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
	customer: {
		idCard: string;
		name: string;
		lastname: string;
		email: string;
		phone: string;
		address: string;
	};
	products: {
		saleId: number;
		productId: number;
		quantity: number;
		unitPrice: string;
	}[];
}

interface SalesDataProps {
	salesData: Sale[];
}

export default function SalesData({ salesData }: SalesDataProps) {
	const [sales, setSales] = useState(salesData);
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("todos");
	const router = useRouter();

	// Filtrar ventas según búsqueda y estado (si lo necesitas)
	const filteredSales = sales.filter(
		(sale) =>
			sale.customer.name.toLowerCase().includes(search.toLowerCase()) ||
			sale.customer.lastname.toLowerCase().includes(search.toLowerCase()) ||
			sale.id.toString().includes(search)
	);

	// Calcular total de cada venta
	const getSaleTotal = (sale: Sale) => {
		return sale.products.reduce(
			(total, item) => total + Number(item.unitPrice) * item.quantity,
			0
		);
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<main className="container mx-auto p-4">
				<div className="flex justify-between items-center mb-6">
					<Button
						className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white"
						onClick={() => router.push("sales/new")}
					>
						<Plus className="mr-2 h-4 w-4" /> Nueva Venta
					</Button>
				</div>

				{/* Tarjetas de Resumen */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Ventas
							</CardTitle>
							<Clock className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">{sales.length}</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Ingresos Totales
							</CardTitle>
							<Star className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								$
								{sales
									.reduce((sum, sale) => sum + getSaleTotal(sale), 0)
									.toLocaleString()}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Barra de Búsqueda */}
				<div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
					<div className="relative w-full md:w-1/3">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
						<Input
							type="text"
							placeholder="Buscar ventas..."
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							className="pl-10 pr-4 py-2 w-full"
						/>
					</div>
				</div>

				{/* Tabla de Ventas */}
				<Card>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>ID</TableHead>
									<TableHead>Cliente</TableHead>
									<TableHead>Fecha</TableHead>
									<TableHead>Total</TableHead>
									<TableHead>Acciones</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredSales.map((sale) => (
									<TableRow key={sale.id}>
										<TableCell>{sale.id}</TableCell>
										<TableCell>
											{sale.customer.name} {sale.customer.lastname}
										</TableCell>
										<TableCell>
											{new Date(sale.createdAt).toLocaleDateString()}
										</TableCell>
										<TableCell>
											${getSaleTotal(sale).toLocaleString()}
										</TableCell>
										<TableCell>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button variant="ghost" className="h-8 w-8 p-0">
														<MoreHorizontal className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>Acciones</DropdownMenuLabel>
													<DropdownMenuItem
														onClick={() => router.push(`/sales/${sale.id}`)} // Navegar a la página de detalles de la venta
													>
														<Eye className="mr-2 h-4 w-4" /> Ver detalles
													</DropdownMenuItem>
													<DropdownMenuItem>
														<Edit className="mr-2 h-4 w-4" /> Editar
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem className="text-red-600">
														<Trash2 className="mr-2 h-4 w-4" /> Eliminar
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</TableCell>
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
