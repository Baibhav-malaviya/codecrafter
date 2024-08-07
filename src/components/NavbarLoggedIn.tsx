"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/Auth";

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
						: "text-gray-300 hover:bg-primary/10 hover:text-black" // Hover state styling
				}`}
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
			>
				{item}
			</motion.div>
		</Link>
	);
};

const NavbarLoggedIn: React.FC = () => {
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();
	const { logout } = useAuthStore();
	const [isLoading, setIsLoading] = useState(false);

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

	const handleLogout = async () => {
		try {
			setIsLoading(true);
			await logout();
			alert("logout successfully");
		} catch (error) {
			console.log("Error in logout handler");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<motion.header
			className={`fixed top-0 left-0 border-b-[1px] border-gray-400 right-0 z-50 flex justify-between items-center py-4 px-6 transition-all duration-300 ease-in-out ${
				scrolled ? "bg-white " : "bg-transparent"
			}`}
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ type: "spring", stiffness: 300, damping: 30 }}
		>
			<nav className="flex items-center space-x-4">
				{menuItems.map((item) => (
					<MenuItem
						key={item.name}
						item={item.name}
						href={item.href}
						isActive={pathname === item.href}
					/>
				))}
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<div className="flex items-center cursor-pointer">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>
				</SheetTrigger>
				<SheetContent className="w-48 p-4 space-y-4 bg-white shadow-md">
					<h3 className="text-lg font-bold">User Menu</h3>
					<div className="space-y-2">
						<MenuItem
							item="Profile"
							href="/profile"
							isActive={pathname === "/profile"}
						/>
						<MenuItem
							item="Settings"
							href="/settings"
							isActive={pathname === "/settings"}
						/>
						<MenuItem
							item="Help"
							href="/help"
							isActive={pathname === "/help"}
						/>
						<Button
							variant="destructive"
							onClick={handleLogout}
							className="w-full mt-4"
						>
							{isLoading ? "Logout..." : "Logout"}
						</Button>
					</div>
				</SheetContent>
			</Sheet>
		</motion.header>
	);
};

export default NavbarLoggedIn;
