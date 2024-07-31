import React, { ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AttachmentInputProps {
	handleAttachmentChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AttachmentInput: React.FC<AttachmentInputProps> = ({
	handleAttachmentChange,
}) => (
	<div className="space-y-2">
		<Label htmlFor="attachment">Attachment</Label>
		<Input id="attachment" type="file" onChange={handleAttachmentChange} />
	</div>
);

export default AttachmentInput;
