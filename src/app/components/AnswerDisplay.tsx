// components/AnswerDisplay.tsx

import { FC } from "react";
import { format } from "date-fns";
import VoteButton from "@/app/components/VoteButton";
import { Badge } from "@/components/ui/badge";
import MarkdownDisplay from "@/app/components/MarkdownDisplay";
import { useAuthStore } from "@/store/Auth";

interface AnswerProps {
	id: string;
	content: string;
	author: {
		authorId: string;
		name: string;
		email: string;
	};
}

const AnswerDisplay: FC<AnswerProps> = ({ id, content, author }) => {
	const formattedDate = format(new Date(), "MMMM d, yyyy"); // Replace with actual date
	const { user } = useAuthStore();

	return (
		<article className="max-w-3xl mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
			<header className="mb-2 border-b pb-2">
				<div className="mt-1 text-gray-500 text-sm">
					By {author.name} on {formattedDate}
				</div>
			</header>
			<section className="mb-4">
				<MarkdownDisplay content={content} />
			</section>
			<footer className="flex items-center space-x-2">
				<VoteButton
					voterId={user!.$id} // replace with actual voter ID from your auth system
					postId={id}
					postType="answer"
				/>
			</footer>
		</article>
	);
};

export default AnswerDisplay;
