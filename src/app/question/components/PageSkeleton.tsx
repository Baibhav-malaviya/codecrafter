// components/PageSkeleton.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import QuestionDisplaySkeleton from "./QuestionDisplaySkelton";

const PageSkeleton: React.FC = () => {
	return (
		<div className="container mx-auto p-4">
			<QuestionDisplaySkeleton />
			<div className="flex items-center mb-6 mt-4 space-x-4">
				<Skeleton className="h-8 w-8" />
				<Skeleton className="h-6 w-16" />
				<Skeleton className="h-8 w-8" />
			</div>
			<div className="mb-6">
				<Skeleton className="h-32 w-full mb-2" />
				<Skeleton className="h-10 w-32" />
			</div>
			<div>
				<h2 className="text-xl font-bold mb-4">
					<Skeleton className="h-6 w-32" />
				</h2>
				<div className="mb-4">
					<Skeleton className="h-10 w-full mb-2" />
					<Skeleton className="h-10 w-32" />
				</div>
				<div className="flex items-center justify-center py-2">
					<Skeleton className="h-52 w-52" />
					<p className="text-center text-gray-700/30 font-bold text-3xl">
						<Skeleton className="h-6 w-64 mx-auto mb-2" />
						<Skeleton className="h-6 w-48 mx-auto" />
					</p>
				</div>
			</div>
		</div>
	);
};

export default PageSkeleton;
