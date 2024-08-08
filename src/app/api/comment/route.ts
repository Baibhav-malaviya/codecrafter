import { commentCollections, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID, Query } from "node-appwrite";

//! creating comment
export async function POST(request: NextRequest) {
	try {
		// collection data
		const { comment, authorId, postType, postId } = await request.json();
		console.log({ comment, authorId, postType, postId });
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

		const author = await users.get(response.authorId);

		const prefs = await users.getPrefs(authorId);
		await users.updatePrefs(authorId, {
			reputation: Number(prefs.reputation) + 1,
		});

		console.log("response: ", response);
		return NextResponse.json(
			{
				success: true,
				message: "comment created",
				response: {
					...response,
					author: {
						authorId: author.$id,
						name: author.name,
						email: author.email,
					},
				},
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

//! getting comments
export async function GET(request: NextRequest) {
	try {
		// Extract query parameters
		const { searchParams } = new URL(request.url);
		const postId = searchParams.get("postId");
		const postType = searchParams.get("postType");

		console.log({ postId, postType });

		if (!postId || !postType) {
			return NextResponse.json(
				{ error: "Missing postId or postType query parameters" },
				{ status: 400 }
			);
		}

		// Fetch comments from the database
		const response = await databases.listDocuments(db, commentCollections, [
			Query.equal("postId", postId),
			Query.equal("postType", postType),
		]);

		const author = await users.get(response.documents[0].authorId);

		const UpdatedResponse = response.documents.map((document) => {
			return {
				...document,
				author: {
					authorId: author.$id,
					name: author.name,
					email: author.email,
				},
			};
		});

		return NextResponse.json(
			{
				success: true,
				message: "comment fetched",
				response: UpdatedResponse,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error?.message || "Error fetching comments",
			},
			{ status: error?.status || error.code || 500 }
		);
	}
}
