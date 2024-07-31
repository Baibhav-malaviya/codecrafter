"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";

function Login() {
	const { login } = useAuthStore();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");

		try {
			const formData = new FormData(e.currentTarget);
			const email = formData.get("email");
			const password = formData.get("password");

			if (!email || !password) {
				setError("Please fill in all fields");
				return;
			}

			const loginResponse = await login(email.toString(), password.toString());
			// Handle successful login here (e.g., redirect)
			if (loginResponse.success) redirect("/");
			// setError(loginResponse.error?.message);
			setError("check your credential");
			console.log(loginResponse.error?.message);
			console.log("Login successful", loginResponse);
		} catch (error) {
			console.log("Error in login handler: ", error);
			setError("Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<h2 className="text-2xl font-bold mb-6 text-center">Log In</h2>
				<form onSubmit={handleLogin} className="space-y-6">
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
							placeholder="Enter your password"
							required
						/>
					</div>
					{error && <p className="text-red-500 text-sm">{error}</p>}
					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
						disabled={isLoading}
					>
						{isLoading ? "Logging in..." : "Log in"}
					</button>
				</form>
			</div>
		</div>
	);
}

export default Login;
