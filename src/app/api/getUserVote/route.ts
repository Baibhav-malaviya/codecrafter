// pages/api/getUserVote.ts

import { db, voteCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const postId = searchParams.get("postId");
		const voterId = searchParams.get("voterId");
		console.log("postId: ", postId, "\nvoterId: ", voterId);

		if (!postId || !voterId) {
			return NextResponse.json(
				{ success: false, message: "Missing postId or voterId parameter" },
				{ status: 400 }
			);
		}

		const voteResult = await databases.listDocuments(db, voteCollection, [
			Query.equal("postId", postId),
			Query.equal("voterId", voterId),
		]);

		if (voteResult.documents.length > 0) {
			return NextResponse.json(
				{
					success: true,
					userVote: voteResult.documents[0].voteType,
				},
				{ status: 200 }
			);
		} else {
			return NextResponse.json(
				{
					success: true,
					userVote: null,
				},
				{ status: 200 }
			);
		}
	} catch (error) {
		console.error("Error in getUserVote API route:", error);
		return NextResponse.json(
			{ success: false, message: "Error fetching user vote" },
			{ status: 500 }
		);
	}
}
