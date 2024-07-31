// components/Features.js

const Features = () => {
	return (
		<section className="py-20">
			<div className="container mx-auto px-4 text-center">
				<h3 className="text-3xl font-bold mb-12">Why Choose CodeCrafter?</h3>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div className="p-4 shadow-lg rounded bg-gray-100">
						<h4 className="text-xl font-semibold mb-4">Ask Questions</h4>
						<p>Get answers to your toughest coding questions.</p>
					</div>
					<div className="p-4 shadow-lg rounded bg-gray-100">
						<h4 className="text-xl font-semibold mb-4">Share Knowledge</h4>
						<p>Help others by sharing your expertise.</p>
					</div>
					<div className="p-4 shadow-lg rounded bg-gray-100">
						<h4 className="text-xl font-semibold mb-4">Join the Community</h4>
						<p>Connect with fellow developers and grow together.</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Features;
