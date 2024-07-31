import { IndexType, Permission } from "node-appwrite";
import { answerCollection, db } from "../name";
import { databases } from "./config";

export default async function createAnswerCollection() {
	// create collection
	await databases.createCollection(db, answerCollection, answerCollection, [
		Permission.read("any"),
		Permission.create("users"),
		Permission.read("users"),
		Permission.update("users"),
		Permission.delete("users"),
	]);
	console.log("Answer database created");

	// creating attributes
	await Promise.all([
		databases.createStringAttribute(
			db,
			answerCollection,
			"content",
			10000,
			true
		),
		databases.createStringAttribute(
			db,
			answerCollection,
			"questionId",
			50,
			true
		),
		databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
		databases.createStringAttribute(
			db,
			answerCollection,
			"attachmentId",
			50,
			false
		),
		databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
		databases.createBooleanAttribute(
			db,
			answerCollection,
			"isAccepted",
			false,
			false
		),
	]);
	console.log("Answer attribute created");

	// create index

	await databases.createIndex(
		db,
		answerCollection,
		"questionId",
		IndexType.Key,
		["questionId"],
		["asc"]
	);

	await databases.createIndex(
		db,
		answerCollection,
		"authorId",
		IndexType.Key,
		["authorId"],
		["asc"]
	);
	console.log("Index created");
}
