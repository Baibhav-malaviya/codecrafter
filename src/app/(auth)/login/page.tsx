"use client";
import { useAuthStore } from "@/store/Auth";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirect } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";

function Login() {
	const { login } = useAuthStore();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [showPassword, setShowPassword] = useState(false);

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
			if (loginResponse.success) {
				redirect("/");
			} else {
				setError(loginResponse.error?.message || "Invalid credentials");
			}
		} catch (error) {
			console.error("Error in login handler: ", error);
			setError("Login failed. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-2xl font-bold mb-4 text-center">Welcome Back!</h2>
				<p className="text-gray-600 text-center mb-6">
					Please log in to your account to continue.
				</p>
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
					<div className="space-y-2 relative">
						<Label htmlFor="password">Password</Label>
						<Input
							id="password"
							name="password"
							type={showPassword ? "text" : "password"}
							placeholder="Enter your password"
							required
						/>
						<button
							type="button"
							className="absolute inset-y-0 right-0 flex items-center pr-3"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
						</button>
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
				<div className="mt-4 text-center">
					<p className="text-gray-600">
						Don&apos;t have an account?{" "}
						<Link href="/register" className="text-blue-500 hover:underline">
							Register
						</Link>
					</p>
					<p className="text-gray-600 mt-2">
						Forgot your password?{" "}
						<Link
							href="/forgot-password"
							className="text-blue-500 hover:underline"
						>
							Reset it here
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}

export default Login;
