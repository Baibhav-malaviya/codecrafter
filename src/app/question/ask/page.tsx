"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { storage } from "@/models/client/config";
import { attachmentBucket } from "@/models/name";
import { ID } from "node-appwrite";
import axios from "axios";
import { useAuthStore } from "@/store/Auth";

// import TitleInput from "./TitleInput";
// import QuestionInput from "./QuestionInput";
// import AttachmentInput from "./AttachmentInput";
// import TagsInput from "./TagsInput";
// import ErrorMessage from "./ErrorMessage";
import TitleInput from "../components/TitleInput";
import QuestionInput from "../components/QuestionInput";
import AttachmentInput from "../components/AttachmentInput";
import TagsInput from "../components/TagsInput";
import ErrorMessage from "../components/ErrorMessage";

const AskQuestion: React.FC = () => {
	const { user } = useAuthStore();
	const [title, setTitle] = useState("");
	const [question, setQuestion] = useState("**Enter your question here**");
	const [attachment, setAttachment] = useState<File | null>(null);
	const [tags, setTags] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleAttachmentChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files ? e.target.files[0] : null;
		setAttachment(selectedFile);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		// Validate that title and question are not empty
		if (
			!title.trim() ||
			!question.trim() ||
			question === "**Enter your question here**"
		) {
			setError("Title and question are required.");
			return;
		}

		setIsLoading(true);
		setError(null);

		try {
			let attachmentId = "";

			if (attachment) {
				const response = await storage.createFile(
					attachmentBucket,
					ID.unique(),
					attachment
				);
				attachmentId = response.$id;
			}

			const formData = {
				title,
				question,
				attachmentId,
				authorId: user?.$id, // Replace with actual user ID
				tags: tags
					.split(",")
					.map((tag) => tag.trim())
					.filter((tag) => tag !== ""), // if the input field is empty string ("")
			};

			console.log("Form data:", formData);
			// Here you would typically send the formData to your API
			const response = await axios.post("/api/question", formData);
			console.log("Axios response: ", response);

			// Reset state after successful submission
			setTitle("");
			setQuestion("**Enter your question here**");
			setAttachment(null);
			setTags("");
		} catch (error) {
			setError("Failed to submit the question. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex items-center justify-center h-auto bg-green-900 ">
			<Card className="w-full rounded-none ">
				<CardHeader>
					<CardTitle>Ask a Question</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="space-y-4">
							<TitleInput title={title} setTitle={setTitle} />
							<QuestionInput question={question} setQuestion={setQuestion} />
							<AttachmentInput
								handleAttachmentChange={handleAttachmentChange}
							/>
							<TagsInput tags={tags} setTags={setTags} />
							<ErrorMessage error={error} />
						</div>
					</form>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						className="w-full"
						onClick={handleSubmit}
						disabled={isLoading}
					>
						{isLoading ? "Submitting..." : "Submit Question"}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default AskQuestion;
