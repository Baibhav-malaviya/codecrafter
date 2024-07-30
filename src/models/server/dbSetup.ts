import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import { databases } from "./config";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

async function getOrCreateDatabase() {
	try {
		await databases.get(db);
		console.log("database connected.");
	} catch (error) {
		try {
			await databases.create(db, db);
			console.log("creating databases");
			await Promise.all([
				createQuestionCollection(),
				createAnswerCollection(),
				createCommentCollection(),
				createVoteCollection(),
			]);
			console.log("Collection created");
			console.log("database connected");
		} catch (error) {
			console.log("Error in creating databases | collections", error);
		}
	}

	return databases;
}

export default getOrCreateDatabase;
