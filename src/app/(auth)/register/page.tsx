"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

function Register() {
	const { createAccount } = useAuthStore();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
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
			// Handle successful registration here (e.g., redirect, show success message)
			console.log("Registration successful", registerResponse);
		} catch (error) {
			console.log("Error in registration handler: ", error);
			setError("Registration failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
				<form onSubmit={handleRegister} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="firstName">First Name</Label>
						<Input
							id="firstName"
							name="firstName"
							type="text"
							placeholder="Enter your first name"
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
							required
						/>
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type="password"
							placeholder="Create a password"
							required
						/>
					</div>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<button
						type="submit"
						className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isLoading}
					>
						{isLoading ? "Creating Account..." : "Create Account"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Register;
