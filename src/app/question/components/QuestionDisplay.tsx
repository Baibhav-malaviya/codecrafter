// components/QuestionDisplay.tsx
import React from "react";
import { format } from "date-fns";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import MarkdownDisplay from "@/app/components/MarkdownDisplay";

export interface Question {
	$id: string;
	$collectionId: string;
	$databaseId: string;
	$createdAt: string;
	$updatedAt: string;
	$permissions: string[];
	title: string;
	author: {
		id: string;
		name: string;
		email: string;
	};
	content: string;
	tags: string[];
	votesCount: number;
	answersCount: number;
	attachmentId?: string;
}

interface QuestionProps {
	question: Question;
}

const QuestionDisplay: React.FC<QuestionProps> = ({ question }) => {
	const formattedDate = format(new Date(question.$createdAt), "MMMM d, yyyy");

	return (
		<Link href={`/question/${question.$id}`}>
			<article className="max-w-3xl mx-auto my-4 p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
				<header className="mb-2 border-b pb-2">
					<h1 className="text-2xl font-bold text-gray-800">{question.title}</h1>
					<div className="mt-1 text-gray-500 text-sm">
						By {question.author.name} on {formattedDate}
					</div>
				</header>
				<section className="mb-4">
					<MarkdownDisplay content={question.content} />
				</section>
				<footer className="flex flex-wrap justify-between items-center">
					<div className="flex items-center space-x-2">
						{question.votesCount} votes
					</div>
					<div className="flex items-center space-x-1 mt-2 md:mt-0">
						{question.tags.length > 0 &&
							question.tags.map((tag) => (
								<Badge key={tag} className="text-sm">
									{tag}
								</Badge>
							))}
					</div>
					<div className="text-gray-500 text-sm">
						{question.answersCount} answers
					</div>
				</footer>
			</article>
		</Link>
	);
};

export default QuestionDisplay;
