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
import SubmitAnswer from "../components/SubmitAnswer";
import PopupModal from "@/components/PopupModal";
import { MessageCircle } from "lucide-react";
import { format } from "date-fns";

export interface AnswerProps {
	$id: string;
	content: string;
	author: {
		authorId: string;
		name: string;
		email: string;
	};
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

interface CommentProps {
	$id: string;
	content: string;
	author: {
		authorId: string;
		name: string;
		email: string;
	};
	$createdAt: string;
}

const Page: FC = () => {
	const params = useParams();
	const { user } = useAuthStore();
	const [question, setQuestion] = useState<QuestionProps | null>(null);
	const [answers, setAnswers] = useState<AnswerProps[]>([]);
	const [comments, setComments] = useState<CommentProps[]>([]);
	const [newComment, setNewComment] = useState("");
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		//! fetching questions
		const fetchQuestion = async () => {
			try {
				const response = await axios.get(`/api/question/${params.questionId}`);
				setQuestion(response.data.response);
			} catch (error) {
				console.error("Error fetching question:", error);
			}
		};

		//! fetching answers
		const fetchAnswers = async () => {
			try {
				const response = await axios.get(`/api/answer/${params.questionId}`);
				setAnswers(response.data.response);
			} catch (error) {
				console.error("Error fetching answers:", error);
			} finally {
				setLoading(false);
			}
		};

		//! fetching comments
		const fetchComments = async () => {
			try {
				const response = await axios.get(
					`/api/comment?postId=${params.questionId}&postType=question`
				);

				setComments(response.data.response);
				console.log(comments);
			} catch (error) {
				console.error("Error fetching comments:", error);
			}
		};

		fetchQuestion();
		fetchAnswers();
		fetchComments();
	}, [params.questionId]);

	//! comment submit handler
	const handleCommentSubmit = async () => {
		try {
			const response = await axios.post(`/api/comment`, {
				comment: newComment,
				postId: params.questionId,
				authorId: user?.$id,
				postType: "question",
			});
			console.log("comment Response: ", response);

			if (response.status === 201) {
				console.log("Comment submitted successfully");
				setNewComment("");

				setComments((prevComments) => [
					...prevComments,
					response.data.response,
				]);
			} else {
				console.error("Failed to submit the comment");
			}
		} catch (error) {
			console.error("Error submitting the comment", error);
		}
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

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
							voterId={user?.$id} // replace with actual voter ID from your auth system
							postId={question.$id}
							postType="question"
						/>
						<span className="text-lg font-semibold">{question.popularity}</span>
						<Button onClick={openModal}>
							<MessageCircle className="mr-2" />
							Comments
						</Button>
					</div>

					<SubmitAnswer
						answer="answer for testing purpose"
						questionId={params.questionId}
						authorId={user?.$id}
						answers={answers}
						setAnswers={setAnswers}
					/>
					{/*//! displaying the answer */}
					<div>
						{answers.length > 0 && (
							<h2 className="text-xl font-bold mb-4 text-center">Answers</h2>
						)}
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
							answers.map((answer) => (
								<AnswerDisplay
									key={answer.$id}
									id={answer.$id}
									content={answer.content}
									author={answer.author}
								/>
							))
						)}
					</div>

					<PopupModal isOpen={isModalOpen} onClose={closeModal}>
						<div className="mb-4">
							<Input
								placeholder="Write a comment..."
								className="w-full mb-2"
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
							/>
							<Button onClick={handleCommentSubmit}>Submit Comment</Button>
						</div>
						{comments.length === 0 ? (
							<p className="text-gray-500">
								No comments yet. Be the first to comment!
							</p>
						) : (
							comments.map((comment) => (
								<div
									key={comment.$id}
									className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md"
								>
									<div className="flex items-center mb-2">
										<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
											{comment.author.name[0]}
										</div>
										<div className="ml-3">
											<p className="text-gray-800 font-semibold">
												{comment.author.name}
											</p>
											<p className="text-gray-500 text-xs">
												{format(
													new Date(comment.$createdAt),
													"MMMM dd, yyyy 'at' h:mm a"
												)}
											</p>
										</div>
									</div>
									<p className="text-gray-700">{comment.content}</p>
								</div>
							))
						)}
					</PopupModal>
				</>
			) : (
				<p className="text-gray-500">Question not found.</p>
			)}
		</div>
	);
};

export default Page;
