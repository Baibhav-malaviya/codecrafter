import { answerCollection, db } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

//! Getting answer
export async function GET(
	request: NextRequest,
	{ params }: { params: { questionId: string } }
) {
	const questionId = params.questionId;
	const answer = await databases.listDocuments(db, answerCollection, [
		Query.equal("questionId", questionId),
	]);
	// Logic to fetch a specific question
	return NextResponse.json({
		message: `Details for answer ${questionId}`,
		response: answer,
	});
}
