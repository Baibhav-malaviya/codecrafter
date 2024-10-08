"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

import { AnswerProps } from "../[questionId]/page";
import { useAuthStore } from "@/store/Auth";

interface SubmitAnswerProps {
	answer: string;
	questionId: string | string[];
	authorId?: string;
	answers: AnswerProps[];
	setAnswers: React.Dispatch<React.SetStateAction<AnswerProps[]>>;
}

const SubmitAnswer = ({
	answer,
	questionId,
	authorId,
	answers,
	setAnswers,
}: SubmitAnswerProps) => {
	const [answerText, setAnswerText] = useState(answer || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const { user } = useAuthStore();

	const handleSubmit = async () => {
		if (!user) {
			alert("log in to submit answer");
			return;
		}
		setLoading(true);
		setError(null);

		const formData = {
			answer: answerText,
			questionId: questionId,
			authorId: authorId,
		};

		try {
			const response = await axios.post("/api/answer", formData);

			if (response.status === 201) {
				console.log("Answer submitted successfully");
				// Handle successful submission (e.g., clear the form, show a success message, etc.)
				setAnswerText(""); // Clear the textarea

				// Append the new answer to the existing list of answers
				setAnswers([...answers, response.data.response]);
			} else {
				console.error("Failed to submit the answer");
				setError("Failed to submit the answer. Please try again.");
			}
		} catch (error) {
			console.error("Error submitting the answer", error);
			setError("Error submitting the answer. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mb-6">
			<Textarea
				placeholder="Write your answer here..."
				className="w-full mb-2"
				value={answerText}
				onChange={(e) => setAnswerText(e.target.value)}
				disabled={loading}
			/>
			{error && <div className="text-red-500 mb-2">{error}</div>}
			<Button onClick={handleSubmit} disabled={loading}>
				{loading ? "Submitting..." : "Submit Answer"}
			</Button>
		</div>
	);
};

export default SubmitAnswer;
