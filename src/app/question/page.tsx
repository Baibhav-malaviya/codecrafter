"use client";
import React, { useEffect, useState } from "react";
import { getQuestion } from "@/lib/appwrite/question";
import QuestionDisplay from "./components/QuestionDisplay"; // Ensure this path is correct
import { Question } from "./components/QuestionDisplay";
import QuestionDisplaySkeleton from "./components/QuestionDisplaySkelton";
import AskButton from "./components/AskButton";

const Page: React.FC = () => {
	const [questions, setQuestions] = useState<Question[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const fetchedQuestions = await getQuestion(1, 11);
				setQuestions(fetchedQuestions as Question[]); // Ensure proper casting
				setIsLoading(false);
			} catch (error) {
				setError("Error fetching questions");
				setIsLoading(false);
			}
		};

		fetchQuestions();
	}, []);

	if (isLoading)
		return (
			<>
				<QuestionDisplaySkeleton />
				<QuestionDisplaySkeleton />
				<QuestionDisplaySkeleton />
			</>
		);

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Latest Questions</h1>
				<AskButton />
			</div>
			{error && <p>{error}</p>}
			<div className="space-y-4">
				{questions.map((question) => (
					<QuestionDisplay key={question.$id} question={question} />
				))}
			</div>
		</div>
	);
};

export default Page;
