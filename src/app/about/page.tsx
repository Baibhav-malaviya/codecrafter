// pages/about.js
import React from "react";
import MissionStatement from "./components/MissionStatement";
import HowItWorks from "./components/HowItWorks";
import Team from "./components/Team";
import Technology from "./components/Technology";
import FuturePlans from "./components/FuturePlans";

const About = () => {
	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-bold mb-4">About CodeCrafter</h1>
			<MissionStatement />
			<HowItWorks />
			<Team />
			<Technology />
			<FuturePlans />
		</div>
	);
};

export default About;
