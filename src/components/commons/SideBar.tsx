"use client";

// import Link from "next/link";
// import Image from "next/image";

// import {
// 	ShoppingCart,
// 	House,
// 	Users,
// 	Truck,
// 	Scissors,
// 	BarChart2,
// 	// LogOut
// 	Shirt,
// } from "lucide-react";
// import { usePathname } from "next/navigation";
// import LogoLarge from "@assets/LOGO-ECOMODA-LARGE.png";
// import Logo from "@assets/LOGO-ECOMODA.png";

// import { useState } from "react";

// type Department = {
// 	name: string;
// 	icon: React.ElementType;
// 	route: string; // Ruta asociada al departamento
// };

// const departments: Department[] = [
// 	{ name: "Inicio", icon: House, route: "/dashboard" },
// 	{ name: "Ventas", icon: ShoppingCart, route: "/sales" },
// 	{ name: "Recursos Humanos", icon: Users, route: "/human-resources" },
// 	{ name: "Compras", icon: Truck, route: "/purchases" },
// 	{ name: "Producción", icon: Scissors, route: "/inventory" },
// 	{ name: "Diseño", icon: Shirt, route: "/design" },
// 	{ name: "Contabilidad y Finanzas", icon: BarChart2, route: "/finance" },
// ];

// export function Sidebar() {
// 	const [expandSidebar, setExpandSidebar] = useState(false);

// 	const pathName = usePathname();

// 	return (
// 		<aside
// 			className={`${
// 				expandSidebar ? "w-80" : "w-16"
// 			} bg-primary p-3 flex flex-col gap-3 transition-all duration-300`}
// 		>
// 			<header className="bg-primary-600 rounded">
// 				<Image src={expandSidebar ? LogoLarge : Logo} alt="ECOMODA Logo" />
// 			</header>
// 			<nav>
// 				<ul className="border-y border-black/25 flex flex-col gap-3 py-3 text-white">
// 					{departments.map((department) => (
// 						<li key={department.name}>
// 							<Link
// 								href={department.route}
// 								className={`relative flex justify-center p-2 rounded group transition-colors duration-300 hover:bg-white ${
// 									pathName === department.route ? "bg-white" : ""
// 								}`}
// 							>
// 								<department.icon
// 									className={`size-6 ${
// 										pathName === department.route
// 											? "text-[#F0627E]"
// 											: "group-hover:text-[#F0627E]"
// 									}`}
// 								/>
// 								<span className="absolute left-full ml-2 px-2 py-1 bg-white text-black text-sm rounded hidden group-hover:block whitespace-nowrap">
// 									{department.name}
// 								</span>
// 							</Link>
// 						</li>
// 					))}
// 				</ul>
// 			</nav>

// 			<button onClick={() => setExpandSidebar(!expandSidebar)}>Cerrar</button>
// 		</aside>
// 	);
// }

import { useState } from "react";
import Image from "next/image";
import {
	ShoppingCart,
	House,
	Users,
	Truck,
	Scissors,
	BarChart2,
	LogOut,
	Shirt,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import logo from "../../../assets/logo-removebg-preview.png";

type Department = {
	name: string;
	icon: React.ElementType;
	route: string;
};

const departments: Department[] = [
	{ name: "Inicio", icon: House, route: "/dashboard" },
	{ name: "Ventas", icon: ShoppingCart, route: "/sales" },
	{ name: "Recursos Humanos", icon: Users, route: "/human-resources" },
	{ name: "Compras", icon: Truck, route: "/purchases" },
	{ name: "Sucursales", icon: Truck, route: "/branch" },
	{ name: "Producción", icon: Scissors, route: "/inventory" },
	{ name: "Diseño", icon: Shirt, route: "/design" },
	{ name: "Contabilidad y Finanzas", icon: BarChart2, route: "/finance" },
];

export default function Sidebar() {
	const [currentDepartment, setCurrentDepartment] = useState<string>("");
	const router = useRouter();
	const pathname = usePathname();

	// Páginas donde no quieres mostrar el sidebar
	const hiddenRoutes = ["/login", "/register"];

	if (hiddenRoutes.includes(pathname)) return null;

	const handleSetDepartment = (name: string, route: string) => {
		setCurrentDepartment(name);
		router.push(route);
	};

	return (
		<div className="w-16 bg-[#F0627E] text-white shadow-md flex flex-col h-screen">
			{/* Logo */}
			<div className="p-4 flex justify-center">
				<Image src={logo} alt="Logo" width={100} height={100} />
			</div>

			{/* Navegación */}
			<nav className="flex-grow">
				{departments.map((dept) => (
					<div
						key={dept.name}
						onClick={() => handleSetDepartment(dept.name, dept.route)}
						className={`relative flex justify-center py-4 cursor-pointer group transition-colors duration-300 ${
							currentDepartment === dept.name ? "bg-white" : ""
						}`}
					>
						<dept.icon
							className={`w-6 h-6 ${
								currentDepartment === dept.name
									? "text-[#F0627E]"
									: "group-hover:text-[#F0627E]"
							}`}
						/>
						<span className="absolute left-full ml-2 px-2 py-1 bg-white text-black text-sm rounded hidden group-hover:block whitespace-nowrap">
							{dept.name}
						</span>
					</div>
				))}
			</nav>

			{/* Cerrar sesión */}
			<div
				className="relative p-4 flex justify-center cursor-pointer hover:bg-white group transition-colors duration-300"
				onClick={() => {
					setCurrentDepartment("");
					router.push("/logout");
				}}
			>
				<LogOut className="w-6 h-6 group-hover:text-[#F0627E]" />
				<span className="absolute left-full ml-2 px-2 py-1 bg-white text-black text-sm rounded hidden group-hover:block whitespace-nowrap">
					Cerrar Sesión
				</span>
			</div>
		</div>
	);
}
