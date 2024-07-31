"use client";
import React from "react";
import Link from "next/link";
import ShinyButton from "@/components/magicui/shiny-button";

function Page() {
	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Latest Questions</h1>

				<Link href={"/question/ask"}>
					<ShinyButton text="Ask Question" />
				</Link>
			</div>

			<div className="space-y-4">
				{/* Future components will be added here */}
				<div>This is the page dedicated to show the latest questions</div>
			</div>
		</div>
	);
}

export default Page;
