import React from "react";
import { Label } from "@/components/ui/label";
import MDEditor from "@uiw/react-md-editor";

interface QuestionInputProps {
	question: string;
	setQuestion: (question: string) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
	question,
	setQuestion,
}) => (
	<div className="space-y-2">
		<Label htmlFor="question">Question</Label>
		<div data-color-mode="dark">
			<MDEditor
				value={question}
				onChange={(value) => setQuestion(value || "")}
			/>
		</div>
	</div>
);

export default QuestionInput;
