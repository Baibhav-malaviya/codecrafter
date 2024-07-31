import CommunityStats from "@/components/CommunityStats";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import PopularQuestions from "@/components/PopularQuestions";

const communityStats = {
	questions: 1200,
	answers: 3400,
	users: 900,
};

const popularQuestions = [
	{ id: 1, title: "How to integrate payment gateway in Next.js?" },
	{ id: 2, title: "Best practices for REST API in Node.js?" },
	// Add more questions as needed
];

export default function Home() {
	return (
		<>
			<Hero />
			<Features />
			<PopularQuestions questions={popularQuestions} />
			<CommunityStats stats={communityStats} />
		</>
	);
}
