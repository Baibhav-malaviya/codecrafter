// components/QuestionDisplaySkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const QuestionDisplaySkeleton: React.FC = () => {
	return (
		<article className="max-w-3xl mx-auto my-4 p-4 bg-white shadow-md rounded-lg">
			<header className="mb-2 border-b pb-2">
				<Skeleton className="h-6 w-3/4 mb-2" />
				<Skeleton className="h-4 w-1/2" />
			</header>
			<section className="mb-4">
				<Skeleton className="h-6 w-full mb-2" />
				<Skeleton className="h-6 w-full mb-2" />
				<Skeleton className="h-6 w-full mb-2" />
			</section>
			<footer className="flex flex-wrap justify-between items-center">
				<div className="flex items-center space-x-2">
					<Skeleton className="h-8 w-8 rounded-full" />
					<Skeleton className="h-8 w-8 rounded-full" />
				</div>
				<div className="flex items-center space-x-1 mt-2 md:mt-0">
					<Skeleton className="h-6 w-16" />
					<Skeleton className="h-6 w-16" />
				</div>
				<Skeleton className="h-4 w-1/4" />
			</footer>
		</article>
	);
};

export default QuestionDisplaySkeleton;
