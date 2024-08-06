"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react"; // Make sure you have lucide-react installed
import Link from "next/link";

function Register() {
	const { createAccount } = useAuthStore();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const formData = new FormData(e.currentTarget);
			const firstName = formData.get("firstName");
			const lastName = formData.get("lastName");
			const email = formData.get("email");
			const password = formData.get("password");

			if (!firstName || !lastName || !email || !password) {
				setError("Please fill in all fields");
				return;
			}

			const registerResponse = await createAccount(
				`${firstName} ${lastName}`,
				email.toString(),
				password.toString()
			);
			if (registerResponse.success) router.push("/login");
			console.log("Registration successful", registerResponse);
		} catch (error) {
			console.log("Error in registration handler: ", error);
			setError("Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-lg">
				<h2 className="text-3xl font-extrabold mb-4 text-center">
					Welcome to CodeCrafter!
				</h2>
				<p className="text-center text-gray-600 mb-8">
					Create an account to get started.
				</p>
				<form onSubmit={handleRegister} className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="firstName">First Name</Label>
						<Input
							id="firstName"
							name="firstName"
							type="text"
							placeholder="Enter your first name"
							className="border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="lastName">Last Name</Label>
						<Input
							id="lastName"
							name="lastName"
							type="text"
							placeholder="Enter your last name"
							className="border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="email">Email</Label>
						<Input
							id="email"
							name="email"
							type="email"
							placeholder="Enter your email"
							className="border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="relative space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="Create a password"
							className="border-gray-300 rounded-md pr-10"
							required
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
					</div>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isLoading}
					>
						{isLoading ? "Creating Account..." : "Create Account"}
					</button>
					<p className="text-center text-gray-600">
						Already have an account?{" "}
						<Link href="/login" className="text-green-500 hover:underline">
							Log In
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Register;
