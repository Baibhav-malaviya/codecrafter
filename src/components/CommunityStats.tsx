import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, HelpCircle } from "lucide-react";
import NumberTicker from "@/components/magicui/number-ticker";
import DotPattern from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";

type CommunityStatsType = {
	questions: number;
	answers: number;
	users: number;
};

const CommunityStats = ({ stats }: { stats: CommunityStatsType }) => {
	return (
		<section className="py-20 bg-gradient-to-r from-purple-50 to-blue-50 ">
			<div className="container mx-auto px-4 text-center">
				<h3 className="text-3xl font-bold mb-12 text-gray-800">
					Community Stats
				</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<StatCard
						title="Questions"
						value={stats.questions}
						icon={<HelpCircle className="h-8 w-8 text-purple-500" />}
					/>
					<StatCard
						title="Answers"
						value={stats.answers}
						icon={<MessageSquare className="h-8 w-8 text-blue-500" />}
					/>
					<StatCard
						title="Users"
						value={stats.users}
						icon={<Users className="h-8 w-8 text-green-500" />}
					/>
				</div>
			</div>
		</section>
	);
};

const StatCard = ({
	title,
	value,
	icon,
}: {
	title: string;
	value: number;
	icon: React.ReactNode;
}) => (
	<Card className="transform transition-transform hover:scale-105 relative">
		<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
			<CardTitle className="text-sm font-medium text-gray-500">
				{title}
			</CardTitle>
			{icon}
		</CardHeader>
		<CardContent>
			<div className="text-4xl font-bold tracking-tighter text-black dark:text-white">
				<NumberTicker value={value} />
			</div>
		</CardContent>
		<DotPattern
			className={cn(
				"[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"
			)}
		/>
	</Card>
);

export default CommunityStats;
