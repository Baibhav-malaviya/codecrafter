"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const MenuItem = ({
	item,
	href,
	isActive,
}: {
	item: any;
	href: any;
	isActive: any;
}) => {
	return (
		<Link href={href}>
			<motion.div
				className={`px-4 py-2 rounded-full transition-all duration-300 ease-in-out ${
					isActive ? "bg-white text-black" : "text-white hover:bg-white/10"
				}`}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				{item}
			</motion.div>
		</Link>
	);
};

const NavbarLoggedIn = () => {
	const [activeItem, setActiveItem] = useState("Home");
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const menuItems = [
		{ name: "Home", href: "/" },
		{ name: "About", href: "/about" },
		{ name: "Question", href: "/question" },
		{ name: "Contact", href: "/contact" },
	];

	return (
		<motion.header
			className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-4 transition-all duration-300 ease-in-out ${
				scrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<nav className="flex items-center space-x-2 px-4 py-2 rounded-full bg-black/30 backdrop-blur-sm">
				{menuItems.map((item) => (
					<MenuItem
						key={item.name}
						item={item.name}
						href={item.href}
						isActive={activeItem === item.name}
					/>
				))}
			</nav>
		</motion.header>
	);
};

export default NavbarLoggedIn;
