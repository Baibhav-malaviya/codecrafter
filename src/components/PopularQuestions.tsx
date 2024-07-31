import Link from "next/link";

// components/PopularQuestions.js
const PopularQuestions = ({ questions }: { questions: any }) => {
	return (
		<section className="py-20 bg-gray-100">
			<div className="container mx-auto px-4">
				<h3 className="text-3xl font-bold mb-8">Popular Questions</h3>
				<ul>
					{questions.map((question: any) => (
						<li key={question.id} className="mb-4">
							<Link
								href={`/question/${question.id}`}
								className="text-blue-600 hover:underline"
							>
								{question.title}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default PopularQuestions;
