"use client";
import { useRouter, useParams } from "next/navigation";
import React from "react";

function Page() {
	const router = useRouter();
	const params = useParams();

	return <div>Question: {params.questionId}</div>;
}

export default Page;
