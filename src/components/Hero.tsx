import Link from "next/link";
import ShinyButton from "./magicui/shiny-button";
const Hero = () => {
	return (
		<section className=" py-20">
			<div className="container mx-auto px-4 text-center">
				<h2 className="text-4xl font-bold mb-4">Welcome to CodeCrafter</h2>
				<p className="text-lg mb-8">
					Your go-to platform for coding questions and answers.
				</p>
				<Link href="/questions" className="">
					<ShinyButton
						text="Explore Questions"
						className="bg-blue-300/25 backdrop-blur-lg"
					/>
				</Link>
			</div>
		</section>
	);
};

export default Hero;
