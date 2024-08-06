import Link from "next/link";
import ShinyButton from "./magicui/shiny-button";
import DotPattern from "./magicui/dot-pattern";
import { cn } from "@/lib/utils";
import SparklesText from "./magicui/sparkles-text";
import { Github } from "lucide-react";
import { Button } from "./ui/button";
const Hero = () => {
	return (
		<section className=" py-20 relative w-full">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-4xl font-bold mb-4">
					<SparklesText text="Welcome to CodeCrafter" />
				</h2>
				<p className="text-lg mb-8">
					Your go-to platform for coding questions and answers.
				</p>
				<div className="flex row justify-center gap-3">
					<Link href="/question" passHref>
						<Button className=" backdrop-blur-lg">Explore Questions</Button>
					</Link>
					<a
						href="https://github.com/Baibhav-malaviya/codecrafter"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button className="backdrop-blur-lg flex items-center gap-2">
							<Github size={18} />
							GitHub
						</Button>
					</a>
				</div>
			</div>
			<DotPattern
				className={cn(
					"[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
				)}
			/>
		</section>
	);
};

export default Hero;
