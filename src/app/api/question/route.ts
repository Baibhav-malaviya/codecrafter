import {
	db,
	questionCollection,
	voteCollection,
	answerCollection,
} from "@/models/name";
import { databases } from "@/models/server/config";
import { NextRequest, NextResponse } from "next/server";
import { ID } from "node-appwrite";
import { Models } from "node-appwrite";

// Assuming you have these types defined somewhere in your project
interface Vote extends Models.Document {
	questionId: string;
}

interface Answer extends Models.Document {
	questionId: string;
}

interface Question extends Models.Document {
	popularity?: number;
}

export async function POST(request: NextRequest) {
	try {
		// collecting data
		const data = await request.json();
		console.log("data in the question route: ", data);
		const { question, authorId, tags, attachmentId, title } = data;

		const response = await databases.createDocument(
			db,
			questionCollection,
			ID.unique(),
			{
				title,
				content: question,
				authorId,
				tags,
				attachmentId,
			}
		);
		if (!response)
			return NextResponse.json(
				{ success: false, message: "Error in creating question document" },
				{ status: 401 }
			);

		return NextResponse.json(
			{ response, success: true, message: "Question created successfully" },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error?.message || "Error CREATING question",
			},
			{ status: error?.status || error.code || 500 }
		);
	}
}

export async function GET(request: NextRequest): Promise<NextResponse> {
	//! /api/question?limit=20
	try {
		const url = new URL(request.url);
		console.log("url: ", url);
		const limit = parseInt(url.searchParams.get("limit") || "10", 10);
		// Fetch all votes
		const votesResponse = await databases.listDocuments<Vote>(
			db,
			voteCollection
		);
		const votes = votesResponse.documents;

		// Fetch all answers
		const answersResponse = await databases.listDocuments<Answer>(
			db,
			answerCollection
		);
		const answers = answersResponse.documents;

		// Aggregate votes by questionId
		const votesCount: { [key: string]: number } = votes.reduce((acc, vote) => {
			acc[vote.questionId] = (acc[vote.questionId] || 0) + 1;
			return acc;
		}, {} as { [key: string]: number });

		// Aggregate answers by questionId
		const answersCount: { [key: string]: number } = answers.reduce(
			(acc, answer) => {
				acc[answer.questionId] = (acc[answer.questionId] || 0) + 1;
				return acc;
			},
			{} as { [key: string]: number }
		);

		// Combine votes and answers count to determine popularity
		const popularity: { [key: string]: number } = {};

		for (const questionId in votesCount) {
			popularity[questionId] =
				(popularity[questionId] || 0) + votesCount[questionId];
		}

		for (const questionId in answersCount) {
			popularity[questionId] =
				(popularity[questionId] || 0) + answersCount[questionId];
		}

		// Fetch questions and add popularity score
		const questionsResponse = await databases.listDocuments<Question>(
			db,
			questionCollection
		);
		const questions = questionsResponse.documents.map((question) => ({
			...question,
			popularity: popularity[question.$id] || 0,
		}));

		// Sort questions by popularity
		const sortedQuestions = questions.sort(
			(a, b) => (b.popularity || 0) - (a.popularity || 0)
		);

		return NextResponse.json({
			message: "Successfully fetched popular question",
			success: true,
			data: sortedQuestions.slice(0, limit),
		}); // Return top 10 popular questions
	} catch (error: any) {
		return NextResponse.json(
			{
				error: error?.message || "Error CREATING question",
			},
			{ status: error?.status || error.code || 500 }
		);
	}
}
