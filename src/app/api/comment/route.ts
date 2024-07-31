import { commentCollections, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

//! creating comment
export async function POST(request: NextRequest) {
	try {
		// collection data
		const { comment, authorId, postType, postId } = await request.json();
		const response = await databases.createDocument(
			db,
			commentCollections,
			ID.unique(),
			{
				content: comment,
				authorId,
				postType,
				postId,
			}
		);

		const prefs = await users.getPrefs(authorId);
		await users.updatePrefs(authorId, {
			reputation: Number(prefs.reputation) + 1,
		});

		return NextResponse.json(
			{
				success: true,
				message: "comment created",
				response,
			},
			{
				status: 201,
			}
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error?.message || "Error CREATING comment",
			},
			{ status: error?.status || error.code || 500 }
		);
	}
}

//! deleting comment
export async function DELETE(request: NextRequest) {
	try {
		const { commentId } = await request.json();
		const comment = await databases.getDocument(
			db,
			commentCollections,
			commentId
		);
		const response = await databases.deleteDocument(
			db,
			commentCollections,
			commentId
		);
		// decreasing the reputation
		const prefs = await users.getPrefs(comment.authorId);
		await users.updatePrefs(comment.authorId, {
			reputation: Number(prefs.reputation) - 1,
		});

		return NextResponse.json(
			{
				message: "comment deleted",
				response,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error?.message || "Error CREATING comment",
			},
			{ status: error?.status || error.code || 500 }
		);
	}
}
