"use client";
import NavbarLoggedIn from "@/components/NavbarLoggedIn";
import NavbarLoggedOut from "@/components/NavbarLoggedOut";
import { useAuthStore } from "@/store/Auth";
import React from "react";

function Header() {
	const { session } = useAuthStore();

	return <div>{session ? <NavbarLoggedIn /> : <NavbarLoggedOut />}</div>;
}

export default Header;
