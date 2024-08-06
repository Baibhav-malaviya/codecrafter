import { users } from "@/models/server/config";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { authorId: string } }
) {
	try {
		const authorId = params.authorId;
		console.log("Author: ", authorId);
		const user = await users.get(authorId);
		if (!user)
			return NextResponse.json(
				{ success: true, message: "user not found" },
				{ status: 200 }
			);
		console.log("user: ", user);

		return NextResponse.json(
			{ success: true, message: "user detail fetched successfully", user },
			{ status: 200 }
		);
	} catch (error) {
		console.log("Error in get api route");
		return NextResponse.json(
			{ success: false, message: "Error in get user api" },
			{ status: 500 }
		);
	}
}
