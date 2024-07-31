"use client";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
import React from "react";
import MDEditor from "@uiw/react-md-editor/nohighlight";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface QuestionDisplayProps {
	title: string;
	question: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
	title,
	question,
}) => {
	return (
		<Card className="w-full max-w-2xl bg-card text-card-foreground">
			<Link href={"/question/ask"}>Ask Question</Link>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<MDEditor.Markdown
					source={question}
					style={{ whiteSpace: "pre-wrap" }}
				/>
			</CardContent>
		</Card>
	);
};

export default QuestionDisplay;
