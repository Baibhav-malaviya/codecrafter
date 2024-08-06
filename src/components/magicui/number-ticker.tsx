"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface NumberTickerProps {
	value: number;
	direction?: "up" | "down";
	className?: string;
	delay?: number; // delay in seconds
}

const NumberTicker: React.FC<NumberTickerProps> = ({
	value,
	direction = "up",
	className,
	delay = 0,
}) => {
	const ref = useRef<HTMLSpanElement>(null);
	const motionValue = useMotionValue(direction === "down" ? value : 0);
	const springValue = useSpring(motionValue, {
		damping: 60,
		stiffness: 100,
	});
	const isInView = useInView(ref, { once: true, margin: "0px" });

	useEffect(() => {
		if (isInView) {
			const timeout = setTimeout(() => {
				motionValue.set(direction === "down" ? 0 : value);
			}, delay * 1000);
			return () => clearTimeout(timeout);
		}
	}, [motionValue, isInView, delay, value, direction]);

	useEffect(() => {
		const unsubscribe = springValue.on("change", (latest) => {
			if (ref.current) {
				ref.current.textContent = Intl.NumberFormat("en-US").format(
					Math.round(latest)
				);
			}
		});
		return () => unsubscribe();
	}, [springValue]);

	return (
		<span
			className={cn(
				"inline-block tabular-nums text-black dark:text-white tracking-wider",
				className
			)}
			ref={ref}
		/>
	);
};

export default NumberTicker;
