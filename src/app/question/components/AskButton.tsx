"use client";
import ShinyButton from "@/components/magicui/shiny-button";
import { useAuthStore } from "@/store/Auth";
import Link from "next/link";
import React from "react";

function AskButton() {
	const { user } = useAuthStore();
	return (
		<Link href={`${user ? "/question/ask" : "/login"}`}>
			<ShinyButton text="Ask Question" />
		</Link>
	);
}

export default AskButton;
