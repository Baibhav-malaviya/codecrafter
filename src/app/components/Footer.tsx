"use client";
import React from "react";
import Link from "next/link";
import Particles from "@/components/magicui/particles";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
	return (
		<footer className="relative bg-gray-900 text-white py-8">
			<Particles
				className="absolute inset-0"
				quantity={50}
				ease={80}
				color="#49a"
				refresh
			/>
			<div className="container mx-auto px-4 relative z-10">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="mb-4 md:mb-0 text-center md:text-left"
					>
						<h2 className="text-2xl font-semibold text-blue-400">
							CodeCrafter
						</h2>
						<p className="text-gray-400">
							&copy; {new Date().getFullYear()} CodeCrafter. All rights
							reserved.
						</p>
					</motion.div>
					<div>
						<ul className="flex space-x-6 text-center">
							{["About", "Contact", "Privacy Policy", "Terms of Service"].map(
								(text, index) => (
									<motion.li
										key={text}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										className="hover:text-blue-400 transition-colors duration-200"
									>
										<Link href={`/${text.toLowerCase().replace(" ", "")}`}>
											{text}
										</Link>
									</motion.li>
								)
							)}
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
