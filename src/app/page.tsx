import CommunityStats from "@/components/CommunityStats";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import PopularQuestions from "@/components/PopularQuestions";

export default function Home() {
	return (
		<>
			<Hero />
			<Features />
			<PopularQuestions />
			<CommunityStats />
		</>
	);
}
