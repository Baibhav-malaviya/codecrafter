"use client";
// import { useParams } from "next/navigation";
// import React from "react";

// function Page() {
// 	const params = useParams();

// 	return <div>Question: {params.questionId}</div>;
// }

// export default Page;

import QuestionDisplay from "@/app/components/QuestionDisplay";

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import AnswerDisplay from "@/app/components/AnswerDisplay";

const questionContent = `
# How to display Markdown content in React?

I am using MDEditor to create my questions. How can I display the content as HTML?

- Install \`react-markdown\`
- Use \`ReactMarkdown\` component
- Enable plugins like \`remark-gfm\` for GitHub flavored Markdown support
`;

interface QuestionProps {
	title: string;
	content: string;
	tags: string[];
	attachmentId?: string;
	authorId: string;
	id: string;
	tenant: string;
	createdAt: string;
	updatedAt: string;
	permissions: string[];
	databaseId: string;
	collectionId: string;
	popularity: number;
}

const Page: FC<QuestionProps> = ({
	title,
	content = questionContent,
	tags,
	popularity,
}) => {
	return (
		<div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
			<div className="mb-4">
				<h1 className="text-2xl font-bold">{title}</h1>
			</div>
			<div className="markdown-body mb-6">
				<QuestionDisplay content={content} />
			</div>
			{tags && (
				<div className="mb-6">
					{tags.map((tag) => (
						<span
							key={tag}
							className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2"
						>
							{tag}
						</span>
					))}
				</div>
			)}
			<div className="flex items-center mb-6">
				<Button className="flex items-center mr-2">
					<ArrowUp size={18} />
				</Button>
				<span>{popularity}</span>
				<Button className="flex items-center ml-2">
					<ArrowDown size={18} />
				</Button>
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
				{/* Display comments here */}
				<AnswerDisplay
					content={questionContent}
					votes={5}
					onDownvote={() => alert("upvoted")}
					onUpvote={() => alert("downvoted")}
				/>
			</div>
		</div>
	);
};

export default Page;
