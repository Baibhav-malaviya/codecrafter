// components/MarkdownDisplay.tsx
import React from "react";
import { MarkdownPreview } from "@/components/RTE";

interface MarkdownDisplayProps {
	content: string;
}

const MarkdownDisplay: React.FC<MarkdownDisplayProps> = ({ content }) => {
	return (
		<div className="prose prose-lg max-w-none" data-color-mode="light">
			<MarkdownPreview
				className="rounded-xl p-4 bg-green-400"
				source={content}
			/>
		</div>
	);
};

export default MarkdownDisplay;
