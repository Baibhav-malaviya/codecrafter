import React from "react";
import Link from "next/link";
const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-800 text-white py-6">
			<div className="container mx-auto px-4">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="mb-4 md:mb-0">
						<h2 className="text-xl font-semibold">CodeCrafter</h2>
						<p>
							&copy; {new Date().getFullYear()} CodeCrafter. All rights
							reserved.
						</p>
					</div>
					<div>
						<ul className="flex space-x-4">
							<li>
								<Link href="/about">About</Link>
							</li>
							<li>
								<Link href="/contact">Contact</Link>
							</li>
							<li>
								<Link href="/privacy">Privacy Policy</Link>
							</li>
							<li>
								<Link href="/terms">Terms of Service</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
