import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TagsInputProps {
	tags: string;
	setTags: (tags: string) => void;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => (
	<div className="space-y-2">
		<Label htmlFor="tags">Tags</Label>
		<Input
			id="tags"
			value={tags}
			onChange={(e) => setTags(e.target.value)}
			placeholder="Enter tags separated by commas"
		/>
	</div>
);

export default TagsInput;
