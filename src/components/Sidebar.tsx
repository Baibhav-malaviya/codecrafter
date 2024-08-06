"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface MenuItemProps {
	item: string;
	href: string;
	isActive: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, href, isActive }) => {
	return (
		<Link href={href} passHref>
			<motion.div
				className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
					isActive
						? "bg-primary text-white" // Active state styling
						: "text-gray-300 hover:bg-primary/30 hover:text-black" // Hover state styling
				}`}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				{item}
			</motion.div>
		</Link>
	);
};

const Sidebar: React.FC = () => {
	const pathname = usePathname();

	const menuItems = [
		{ name: "Dashboard", href: "/dashboard" },
		{ name: "Profile", href: "/profile" },
		{ name: "Settings", href: "/settings" },
		{ name: "Notifications", href: "/notifications" },
		{ name: "Help", href: "/help" },
	];

	return (
		<aside className="w-48 fixed top-10 left-0 bottom-32 bg-white z-30">
			<div className="flex flex-col h-full">
				<nav className="flex-1 pt-16">
					{" "}
					{/* Padding-top to accommodate Navbar height */}
					<div className="space-y-2 p-2">
						{menuItems.map((item) => (
							<MenuItem
								key={item.name}
								item={item.name}
								href={item.href}
								isActive={pathname === item.href}
							/>
						))}
					</div>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;
