import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TitleInputProps {
	title: string;
	setTitle: (title: string) => void;
}

const TitleInput: React.FC<TitleInputProps> = ({ title, setTitle }) => (
	<div className="space-y-2">
		<Label htmlFor="title">Title</Label>
		<Input
			id="title"
			value={title}
			onChange={(e) => setTitle(e.target.value)}
			placeholder="Enter the question title"
			required
		/>
	</div>
);

export default TitleInput;
