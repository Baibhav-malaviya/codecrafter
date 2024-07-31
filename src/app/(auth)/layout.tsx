"use client";

import { useAuthStore } from "@/store/Auth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
// import useAuthStore from "@/store/Auth";

function Layout({ children }: { children: React.ReactNode }) {
	const { session } = useAuthStore();
	const router = useRouter();

	useEffect(() => {
		if (session) router.push("/");
	}, [session, router]);

	if (session) return null;

	return <div>{children}</div>;
}

export default Layout;
