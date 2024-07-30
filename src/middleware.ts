import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import getOrCreateBucket from "./models/server/storageSetup";
import getOrCreateDatabase from "./models/server/dbSetup";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
	await getOrCreateDatabase();
	await getOrCreateBucket();
	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};
