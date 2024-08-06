"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import Particles from "@/components/magicui/particles";

interface Question {
	id: string;
	$id: string;
	title: string;
}

const PopularQuestions: React.FC = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<Error | null>(null);
	const [particleColor, setParticleColor] = useState("#49a");

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const { data } = await axios.get<{ data: Question[] }>(
					"/api/question?limit=10"
				);
				setQuestions(data.data);
				setIsLoading(false);
			} catch (error) {
				setError(
					error instanceof Error ? error : new Error("An error occurred")
				);
				setIsLoading(false);
			}
		};
		fetchQuestions();
	}, []);

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-16">
				<h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
					Popular Questions
				</h2>
				{[...Array(5)].map((_, index) => (
					<Skeleton key={index} className="w-full h-10 mb-4" />
				))}
			</div>
		);
	}

	if (error) {
		return (
			<div className="container mx-auto px-4 py-16 text-center">
				<h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">
					Oops!
				</h2>
				<p className="text-xl text-gray-600 dark:text-gray-400">
					Error loading questions. Please try again later.
				</p>
			</div>
		);
	}

	return (
		<section className="relative py-16 bg-background overflow-hidden">
			<Particles
				className="absolute inset-0"
				quantity={100}
				ease={80}
				color={particleColor}
				refresh
			/>
			<div className="container mx-auto px-4 relative z-10">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-gray-200">
						Most engaged Query
					</h2>
					<p className="text-lg text-gray-600 dark:text-gray-400">
						Find the most discussed and intriguing questions in our community.
					</p>
				</div>
				<ul className="space-y-4">
					{questions.map((question, index) => (
						<motion.li
							key={question.id}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3, delay: index * 0.1 }}
							className="mb-4 flex items-center"
						>
							<HelpCircle className="w-6 h-6 mr-3 text-blue-500 flex-shrink-0" />
							<Link
								className="text-lg md:text-xl text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
								href={`/question/${question.$id}`}
							>
								{question.title}
							</Link>
						</motion.li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default PopularQuestions;
