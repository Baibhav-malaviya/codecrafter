import { databases } from "@/models/client/config";
import {
	answerCollection,
	db,
	questionCollection,
	voteCollection,
} from "@/models/name";
import axios from "axios";
import { Query } from "node-appwrite";

export async function getQuestion(pageNumber: number, pageSize: number) {
	const offset = (pageNumber - 1) * pageSize;
	try {
		const questionsResponse = await databases.listDocuments(
			db,
			questionCollection,
			[Query.limit(pageSize), Query.offset(offset)]
		);

		const questionsWithStatsAndAuthor = await Promise.all(
			questionsResponse.documents.map(async (question) => {
				const [votesCount, answersCount, authorDetails] = await Promise.all([
					getVotesCount(question.$id),
					getAnswersCount(question.$id),
					getAuthorDetails(question.authorId),
				]);
				return {
					...question,
					votesCount,
					answersCount,
					author: authorDetails,
				};
			})
		);

		return questionsWithStatsAndAuthor;
	} catch (error) {
		console.error("Error in getQuestion function:", error);
		return [];
	}
}

async function getVotesCount(questionId: string): Promise<number> {
	try {
		const votesResponse = await databases.listDocuments(db, voteCollection, [
			Query.equal("postId", questionId),
		]);
		return votesResponse.total;
	} catch (error) {
		console.error("Error fetching votes count:", error);
		return 0;
	}
}

async function getAnswersCount(questionId: string): Promise<number> {
	try {
		const answersResponse = await databases.listDocuments(
			db,
			answerCollection,
			[Query.equal("questionId", questionId)]
		);
		return answersResponse.total;
	} catch (error) {
		console.error("Error fetching answers count:", error);
		return 0;
	}
}

async function getAuthorDetails(authorId: string) {
	try {
		const { data } = await axios.get(`/api/user/${authorId}`);
		const authorResponse = data.user;

		return {
			id: authorResponse.$id,
			name: authorResponse.name,
			email: authorResponse.email,
		};
	} catch (error) {
		console.error("Error in fetching author details:", error);
		return {
			id: authorId,
			name: "Unknown",
			email: "unknown@example.com",
		};
	}
}
