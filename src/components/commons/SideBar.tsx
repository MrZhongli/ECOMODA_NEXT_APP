"use client";

import Link from "next/link";
import "@fontsource/bebas-neue";

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
import { usePathname } from "next/navigation";

import { useState } from "react";
import { Logo } from "../icons/Logo";
import { ExpandSidebarIcon } from "../icons/ExpandSidebarIcon";
import { CollapseSidebarIcon } from "../icons/CollapseSidebarIcon";

type Department = {
	name: string;
	icon: React.ElementType;
	route: string; // Ruta asociada al departamento
};

const departments: Department[] = [
	{ name: "Inicio", icon: House, route: "/dashboard" },
	{ name: "Ventas", icon: ShoppingCart, route: "/sales" },
	{ name: "Recursos Humanos", icon: Users, route: "/human-resources" },
	{ name: "Compras", icon: Truck, route: "/purchases" },
	{ name: "Producción", icon: Scissors, route: "/inventory" },
	{ name: "Diseño", icon: Shirt, route: "/design" },
	{ name: "Contabilidad y Finanzas", icon: BarChart2, route: "/finance" },
];

export function Sidebar() {
	const [isExpandedSidebar, setIsExpandedSidebar] = useState(false);

	const pathName = usePathname();

	if (["/login", "/register"].includes(pathName)) return null;

	return (
		<aside
			className={`${
				isExpandedSidebar
					? "w-80 [&>nav>ul]:items-stretch [&>nav>*]:w-full"
					: "w-20"
			} bg-primary p-3 flex flex-col gap-3 transition-all duration-300 text-white`}
		>
			<header className="bg-primary-600 flex flex-wrap gap-x-1 justify-center items-center rounded font-['Bebas_Neue'] text-[#3C2248]">
				<Logo className={isExpandedSidebar ? "size-16" : "size-10"} />

				<div>
					<h1 className={`leading-none ${isExpandedSidebar ? "text-2xl" : ""}`}>
						<span className={`text-[#E85F88]`}>ECO</span>MODA
					</h1>
					{isExpandedSidebar && (
						<p className="text-xs leading-none capitalize">
							Diseños a la medida de tus sueños
						</p>
					)}
				</div>
			</header>
			<nav className="flex-grow">
				<ul className="border-y border-black/25 flex flex-col gap-3 items-center p-3 text-white">
					{departments.map((department) => (
						<li key={department.name}>
							<Link
								href={department.route}
								className={`relative flex items-center gap-2 p-2 rounded group font-medium transition-colors duration-300 hover:bg-white hover:text-primary ${
									pathName === department.route ? "bg-white text-primary" : ""
								}`}
							>
								<department.icon className={`size-6`} />
								{isExpandedSidebar ? (
									<>{department.name}</>
								) : (
									<span className="absolute left-full inset-y-0 -ml-[5px] p-2 bg-white text-primary rounded hidden group-hover:block whitespace-nowrap">
										{department.name}
									</span>
								)}
							</Link>
						</li>
					))}
				</ul>
			</nav>

			<nav className="flex flex-col items-center gap-3 pt-3 border-t border-black/25">
				<Link
					href="/logout"
					className={`relative flex justify-center items-center gap-2 p-2 rounded group font-medium transition-colors duration-300 hover:bg-white hover:text-primary`}
				>
					<LogOut className={`size-6`} />
					{isExpandedSidebar ? (
						<>Cerrar Sesión</>
					) : (
						<span className="absolute left-full inset-y-0 -ml-[5px] p-2 bg-white text-primary rounded hidden group-hover:block whitespace-nowrap">
							Cerrar Sesión
						</span>
					)}
				</Link>

				<button
					className={`
						flex gap-2 justify-center items-center font-medium p-2 rounded group transition-colors duration-300 hover:bg-white hover:text-primary
						${isExpandedSidebar ? "bg-white text-primary" : ""}
					`}
					onClick={() => setIsExpandedSidebar(!isExpandedSidebar)}
				>
					{isExpandedSidebar ? (
						<>
							<CollapseSidebarIcon /> Contraer
						</>
					) : (
						<ExpandSidebarIcon />
					)}
				</button>
			</nav>
		</aside>
	);
}
