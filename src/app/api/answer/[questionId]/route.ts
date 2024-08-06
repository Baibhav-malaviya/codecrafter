import { answerCollection, db, voteCollection } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET(
	request: NextRequest,
	{ params }: { params: { questionId: string } }
) {
	const questionId = params.questionId;

	try {
		// Fetch answers
		const answers = await databases.listDocuments(db, answerCollection, [
			Query.equal("questionId", questionId),
		]);

		// Fetch author details and votes for each answer
		const enrichedAnswers = await Promise.all(
			answers.documents.map(async (answer) => {
				// Fetch author details

				const author = await users.get(answer.authorId);

				// Fetch votes
				const votes = await databases.listDocuments(db, voteCollection, [
					Query.equal("postId", answer.$id),
					Query.equal("postType", "answer"),
				]);

				// Calculate total votes
				const upvotes = votes.documents.filter(
					(vote) => vote.voteType === "upvote"
				).length;
				const downvotes = votes.documents.filter(
					(vote) => vote.voteType === "downvote"
				).length;
				const totalVotes = upvotes - downvotes;

				return {
					...answer,
					author: {
						authorId: author.$id,
						name: author.name,
						email: author.email,
					},
					totalVotes,
				};
			})
		);

		return NextResponse.json({
			message: `Details for answers of question ${questionId}`,
			response: enrichedAnswers,
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				message: "Error fetching answers",
				error: error.message,
			},
			{ status: 500 }
		);
	}
}

//! Getting answer
// export async function GET(
// 	request: NextRequest,
// 	{ params }: { params: { questionId: string } }
// ) {
// 	const questionId = params.questionId;
// 	const answer = await databases.listDocuments(db, answerCollection, [
// 		Query.equal("questionId", questionId),
// 	]);
// 	// Logic to fetch a specific question
// 	return NextResponse.json({
// 		message: `Details for answer ${questionId}`,
// 		response: answer,
// 	});
// }
