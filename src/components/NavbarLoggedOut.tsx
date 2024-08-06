"use client";
import React, { useState, useEffect } from "react";
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
						? "bg-primary text-white"
						: "text-gray-300 hover:bg-primary/30 hover:text-black"
				}`}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				{item}
			</motion.div>
		</Link>
	);
};

const NavbarLoggedOut: React.FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const menuItems = [
		{ name: "Home", href: "/" },
		{ name: "Question", href: "/question" },
		{ name: "Register", href: "/register" },
		{ name: "Login", href: "/login" },
	];

	return (
		<motion.header
			className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-colors duration-300 ease-in-out ${
				scrolled ? "bg-white shadow-lg" : "bg-transparent"
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<nav className="flex items-center space-x-4 px-4 py-2 rounded-md bg-white shadow-md backdrop-blur-sm">
				{menuItems.map((item) => (
					<MenuItem
						key={item.name}
						item={item.name}
						href={item.href}
						isActive={pathname === item.href}
					/>
				))}
			</nav>
		</motion.header>
	);
};

export default NavbarLoggedOut;
