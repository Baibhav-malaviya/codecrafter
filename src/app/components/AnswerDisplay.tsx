import { FC } from "react";
import { MarkdownPreview } from "@/components/RTE";

interface AnswerDisplayProps {
	content: string;
	votes: number;
	onUpvote: () => void;
	onDownvote: () => void;
}

const AnswerDisplay: FC<AnswerDisplayProps> = ({
	content,
	votes,
	onUpvote,
	onDownvote,
}) => {
	return (
		<div className="flex items-start my-4">
			<div className="flex flex-col items-center mr-4">
				<button
					onClick={onUpvote}
					className="text-sm mb-1 p-px transition-transform transform hover:-translate-y-1"
				>
					▲
				</button>
				<span className="text-sm">{votes}</span>
				<button
					onClick={onDownvote}
					className="text-sm mt-1 p-px transition-transform transform hover:translate-y-1"
				>
					▼
				</button>
			</div>
			<div className="prose prose-lg max-w-none" data-color-mode="light">
				<MarkdownPreview
					className="rounded-xl p-4 bg-blue-100"
					source={content}
				/>
			</div>
		</div>
	);
};

export default AnswerDisplay;
