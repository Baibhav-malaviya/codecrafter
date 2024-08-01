import { MarkdownPreview } from "@/components/RTE";
import { FC } from "react";

// Sample question content
const questionContent = `
# How to display Markdown content in React?

I am using MDEditor to create my questions. How can I display the content as HTML?

- Install \`react-markdown\`
- Use \`ReactMarkdown\` component
- Enable plugins like \`remark-gfm\` for GitHub flavored Markdown support
`;

interface QuestionDisplayProps {
	content: string;
}

const QuestionDisplay: FC<QuestionDisplayProps> = ({ content }) => {
	return (
		<div className="prose prose-lg max-w-none" data-color-mode="light">
			<MarkdownPreview
				className="rounded-xl p-4 bg-green-400"
				source={content}
			/>
		</div>
	);
};

export default QuestionDisplay;
