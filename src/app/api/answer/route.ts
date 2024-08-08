import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";

//! crating answer
export async function POST(request: NextRequest) {
	try {
		// collecting data
		const data = await request.json();

		console.log("data in create answer api route: ", data);

		const { answer, questionId, attachmentId, authorId } = await data;

		// creating answer document
		const response = await databases.createDocument(
			db,
			answerCollection,
			ID.unique(),
			{
				content: answer,
				authorId,
				questionId,
				attachmentId,
				isAccepted: false,
			}
		);
		const author = await users.get(response.authorId);

		// increasing user reputation
		const prefs = await users.getPrefs(authorId);
		console.log("userPrefs: ", prefs);
		await users.updatePrefs(authorId, {
			reputation: Number(prefs.reputation) + 1,
		});

		return NextResponse.json(
			{
				success: true,
				message: "Answer created",
				response: {
					...response,
					author: {
						authorId: author.$id,
						name: author.name,
						email: author.email,
					},
				},
			},
			{ status: 201 }
		);
	} catch (error: any) {
		console.log("Error in creating answer");
		return NextResponse.json(
			{
				success: false,
				error: error?.message || "Error CREATING answer",
			},
			{ status: error?.status || error.code || 500 }
		);
	}
}

//! deleting answer
export async function DELETE(request: NextRequest) {
	try {
		// collecting data
		const { answerId } = await request.json();
		const answer = await databases.getDocument(db, answerCollection, answerId);

		// deleting the answer
		const response = await databases.deleteDocument(
			db,
			answerCollection,
			answerId
		);

		// decreasing the reputation
		const prefs = await users.getPrefs(answer.authorId);
		await users.updatePrefs(answer.authorId, {
			reputation: Number(prefs.reputation) - 1,
		});

		return NextResponse.json(
			{
				message: "Answer created",
				response,
			},
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error?.message || "Error DELETING answer",
			},
			{ status: error?.status || error.code || 500 }
		);
	}
}
