import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

interface SubmitAnswerProps {
	answer: string;
	questionId: string | string[];
	authorId: string;
}

const SubmitAnswer = ({ answer, questionId, authorId }: SubmitAnswerProps) => {
	const [answerText, setAnswerText] = useState(answer || "");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async () => {
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
