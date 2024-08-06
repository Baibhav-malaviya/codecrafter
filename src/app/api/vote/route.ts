// pages/api/vote.ts

import { NextRequest, NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { db, voteCollection } from "@/models/name";
import { Query } from "node-appwrite";

export async function POST(request: NextRequest) {
	try {
		// Grab the data
		const data = await request.json();
		const { postId, postType, voteType, voterId } = data;
		console.log("Grabbed data: ", data);
		if (!postId || !postType || !voteType || !voterId) {
			return NextResponse.json(
				{ success: false, message: "Missing required fields" },
				{ status: 400 }
			);
		}

		// Check if the user has already voted on this post
		const existingVote = await databases.listDocuments(db, voteCollection, [
			Query.equal("postId", postId),
			Query.equal("voterId", voterId),
			Query.equal("postType", postType),
		]);

		let voteDocument;
		if (existingVote.documents.length > 0) {
			// Update existing vote
			voteDocument = existingVote.documents[0];
			if (voteDocument.voteType === voteType) {
				// User is un-voting
				await databases.deleteDocument(db, voteCollection, voteDocument.$id);
				voteDocument = null;
			} else {
				// User is changing their vote
				await databases.updateDocument(db, voteCollection, voteDocument.$id, {
					voteType,
				});
				voteDocument.voteType = voteType;
			}
		} else {
			// Create new vote
			voteDocument = await databases.createDocument(
				db,
				voteCollection,
				"unique()",
				{ postId, postType, voteType, voterId }
			);
		}

		// Calculate new vote count
		const allVotes = await databases.listDocuments(db, voteCollection, [
			Query.equal("postId", postId),
		]);

		const newVoteCount = allVotes.documents.reduce((acc, vote) => {
			return acc + (vote.voteType === "upvote" ? 1 : -1);
		}, 0);

		return NextResponse.json(
			{
				success: true,
				newVoteCount,
				userVote: voteDocument ? voteDocument.voteType : null,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error processing vote:", error);
		return NextResponse.json(
			{ success: false, message: "Error processing vote" },
			{ status: 500 }
		);
	}
}

export async function GET(request: NextRequest) {
	try {
		// Extract the postId from the query parameters
		const { searchParams } = new URL(request.url);
		const postId = searchParams.get("postId");

		if (!postId) {
			return NextResponse.json(
				{ success: false, message: "Missing postId parameter" },
				{ status: 400 }
			);
		}

		// Query the votes collection for the specific post
		const votesResult = await databases.listDocuments(db, voteCollection, [
			Query.equal("postId", postId),
		]);

		// Calculate upvotes and downvotes
		const upvotes = votesResult.documents.filter(
			(vote) => vote.voteType === "upvote"
		).length;
		const downvotes = votesResult.documents.filter(
			(vote) => vote.voteType === "downvote"
		).length;

		// Calculate total votes and net votes
		const totalVotes = upvotes + downvotes;
		const netVotes = upvotes - downvotes;

		return NextResponse.json(
			{
				success: true,
				netVotes: netVotes,
				totalVotes: totalVotes,
				upvotes: upvotes,
				downvotes: downvotes,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.error("Error in vote API GET route:", error);
		return NextResponse.json(
			{ success: false, message: "Error in vote API GET route" },
			{ status: 500 }
		);
	}
}
