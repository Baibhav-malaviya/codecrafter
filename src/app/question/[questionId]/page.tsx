// pages/Page.tsx
"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";

import AnswerDisplay from "@/app/components/AnswerDisplay";
import VoteButton from "@/app/components/VoteButton";
import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MarkdownDisplay from "@/app/components/MarkdownDisplay";
import PageSkeleton from "../components/PageSkeleton";
import { useAuthStore } from "@/store/Auth";

interface AnswerProps {
	$id: string;
	content: string;
	votes: number;
	author: {
		authorId: string;
		name: string;
		email: string;
	};
	onUpvote: () => void;
	onDownvote: () => void;
}

interface QuestionProps {
	title: string;
	content: string;
	tags: string[];
	attachmentId?: string;
	authorId: string;
	$id: string;
	tenant: string;
	createdAt: string;
	updatedAt: string;
	permissions: string[];
	databaseId: string;
	collectionId: string;
	popularity: number;
}

const Page: FC = () => {
	const params = useParams();
	const { user } = useAuthStore();
	const [question, setQuestion] = useState<QuestionProps | null>(null);
	const [answers, setAnswers] = useState<AnswerProps[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchQuestion = async () => {
			try {
				const response = await axios.get(`/api/question/${params.questionId}`);
				setQuestion(response.data.response);
			} catch (error) {
				console.error("Error fetching question:", error);
			}
		};

		const fetchAnswers = async () => {
			try {
				const response = await axios.get(`/api/answer/${params.questionId}`);
				setAnswers(response.data.response);
				console.log("Answers: ", answers);
			} catch (error) {
				console.error("Error fetching answers:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchQuestion();
		fetchAnswers();
	}, [params.questionId]);

	if (loading) {
		return (
			<div className="space-y-4">
				<PageSkeleton />
			</div>
		);
	}

	return (
		<div className="container mx-auto p-4">
			{question ? (
				<>
					<div className="mb-4">
						<h1 className="text-2xl font-bold">{question.title}</h1>
					</div>
					<MarkdownDisplay content={question.content} />
					{question.tags.length > 0 && (
						<div className="mb-6 space-x-1">
							{question.tags.map((tag) => (
								<Badge key={tag}>{tag}</Badge>
							))}
						</div>
					)}
					<div className="flex items-center mb-6 mt-4 space-x-4">
						<VoteButton
							voterId={user!.$id} // replace with actual voter ID from your auth system
							postId={question.$id}
							postType="question"
						/>
						<span>{question.popularity}</span>
					</div>
					<div className="mb-6">
						<Textarea
							placeholder="Write your answer here..."
							className="w-full mb-2"
						/>
						<Button>Submit Answer</Button>
					</div>
					<div>
						<h2 className="text-xl font-bold mb-4">Comments</h2>
						<div className="mb-4">
							<Input placeholder="Write a comment..." className="w-full mb-2" />
							<Button>Submit Comment</Button>
						</div>
						{answers.length === 0 ? (
							<div className="flex items-center justify-center py-2">
								<div>
									<svg
										className="w-52 h-52 text-gray-500/20 mx-auto mb-4"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 17h5l-1.403-4.209A2 2 0 0016.65 11H9.35a2 2 0 00-1.947 1.791L6 17h5m3 0v-6m-3 6h.01"
										></path>
									</svg>
									<p className="text-center text-gray-700/30 font-bold text-3xl">
										No answers yet. Be the first to answer!
									</p>
								</div>
							</div>
						) : (
							answers.map((answer: any, index) => {
								// console.log("Particular answer: ", answer.$id);
								return (
									<AnswerDisplay
										key={index}
										id={answer.$id}
										content={answer.content}
										author={answer.author}
									/>
								);
							})
						)}
					</div>
				</>
			) : (
				<p className="text-gray-500">Question not found.</p>
			)}
		</div>
	);
};

export default Page;
