import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "CodeCrafter",
	description: "Application for the knowledge/experience exchange ",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<div className="mt-20">
					<Header />
					<main className="min-h-screen px-2 flex flex-col">{children}</main>
					<Footer />
				</div>
			</body>
		</html>
	);
}
