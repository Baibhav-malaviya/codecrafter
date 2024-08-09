// components/IntroSection.js
import React from "react";
import { Mail } from "lucide-react"; // Example Lucide icon

interface IntroSectionProps {
	title: string;
	description: string;
	bgColor?: string;
	borderColor?: string;
	textColor?: string;
}

const IntroSection: React.FC<IntroSectionProps> = ({
	title,
	description,
	bgColor = "bg-blue-50",
	borderColor = "border-blue-300",
	textColor = "text-blue-800",
}) => {
	return (
		<div
			className={`${bgColor} border-l-4 ${borderColor} p-6 mb-8 rounded-lg shadow-lg flex items-start space-x-4`}
		>
			<div>
				<p className={`text-lg font-semibold ${textColor} mb-2`}>{title}</p>
				<p className="text-base text-gray-700">{description}</p>
			</div>
		</div>
	);
};

export default IntroSection;
