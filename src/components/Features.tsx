"use client";
import { motion } from "framer-motion";
import { Lightbulb, MessageCircleQuestion, User } from "lucide-react";
// import { IconQuestionMark, IconBulb, IconUser } from "tabler-icons-react";
import { FC } from "react";
import DotPattern from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";

interface Feature {
	icon: JSX.Element;
	title: string;
	description: string;
	delay?: number;
}

interface FeatureCardProps {
	icon: JSX.Element;
	title: string;
	description: string;
	delay: number;
}

const FeatureCard: FC<FeatureCardProps> = ({
	icon,
	title,
	description,
	delay,
}) => (
	<motion.div
		initial={{ opacity: 0, y: 20 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.5, delay }}
		className="p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 relative"
	>
		<div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-full flex items-center justify-center text-white">
			{icon}
		</div>
		<h4 className="text-xl font-bold mb-3 text-gray-800">{title}</h4>
		<p className="text-gray-600">{description}</p>
		<DotPattern
			className={cn(
				"[mask-image:radial-gradient(200px_circle_at_center,white,transparent)]"
			)}
		/>
	</motion.div>
);

const Features: FC = () => {
	const features: Feature[] = [
		{
			// icon: <IconQuestionCircle size={32} />,
			icon: <Lightbulb />,
			title: "Ask & Learn",
			description:
				"Get expert answers to your most challenging coding questions and accelerate your learning journey.",
		},
		{
			icon: <MessageCircleQuestion />,
			title: "Share Insights",
			description:
				"Contribute your knowledge, earn reputation, and help shape the future of coding practices.",
		},
		{
			icon: <User />,
			title: "Grow Together",
			description:
				"Join a thriving community of developers, form connections, and collaborate on exciting projects.",
		},
	];

	return (
		<section className="py-24 bg-gradient-to-b from-gray-50 to-white">
			<div className="container mx-auto px-4">
				<motion.h2
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-4xl font-extrabold mb-12 text-center text-gray-900"
				>
					Why Developers Choose CodeCrafter
				</motion.h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 ">
					{features.map((feature, index) => (
						<FeatureCard key={index} {...feature} delay={index * 0.2} />
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
