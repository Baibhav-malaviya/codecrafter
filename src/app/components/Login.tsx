"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		// Simple validation
		if (!email || !password) {
			setError("Please fill in all fields");
			setIsLoading(false);
			return;
		}

		// Simulate API call
		try {
			await new Promise((resolve) => setTimeout(resolve, 1500));
			console.log("Login attempt with:", { email, password });
			// Handle successful login here (e.g., redirect, set auth state)
			alert("Login successful!");
		} catch (err) {
			setError("An error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6 max-w-sm mx-auto">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<Input
					id="email"
					type="email"
					placeholder="Enter your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<Input
					id="password"
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
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
	);
}
