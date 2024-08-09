"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import IntroSection from "@/components/IntroSection";

const Page = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("Form Data Submitted:", formData);
		alert("Feature under development");
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">Contact Us</h1>
			<IntroSection
				title="We'd love to hear from you!"
				description="Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions."
				bgColor="bg-slate-50"
				borderColor="border-slate-300"
				textColor="text-slate-800"
			/>
			<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
				<div className="mb-4">
					<Label htmlFor="name">Name</Label>
					<Input
						type="text"
						id="name"
						name="name"
						className="w-full p-2 border border-gray-300 rounded-md"
						placeholder="Your name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-4">
					<Label htmlFor="email">Email</Label>
					<Input
						type="email"
						id="email"
						name="email"
						className="w-full p-2 border border-gray-300 rounded-md"
						placeholder="Your email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="mb-4">
					<Label htmlFor="message" className="block text-base font-medium mb-2">
						Message
					</Label>
					<Textarea
						id="message"
						name="message"
						className="w-full p-2 border border-gray-300 rounded-md"
						placeholder="Your message"
						rows={5}
						value={formData.message}
						onChange={handleChange}
						required
					></Textarea>
				</div>
				<Button type="submit">Submit</Button>
			</form>
		</div>
	);
};

export default Page;
