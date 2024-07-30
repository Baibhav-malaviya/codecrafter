import { Permission } from "node-appwrite";
import { db, voteCollection } from "../name";
import { databases } from "./config";

export default async function createVoteCollection() {
	// crate vote collection
	await databases.createCollection(db, voteCollection, voteCollection, [
		Permission.read("any"),
		Permission.create("users"),
		Permission.read("users"),
		Permission.update("users"),
		Permission.delete("users"),
	]);
	console.log("Vote collection created");

	// creating attributes

	await Promise.all([
		databases.createStringAttribute(db, voteCollection, "voterId", 50, true),
		databases.createStringAttribute(db, voteCollection, "postId", 50, true),
		databases.createEnumAttribute(
			db,
			voteCollection,
			"postType",
			["answer", "question"],
			true
		),
		databases.createEnumAttribute(
			db,
			voteCollection,
			"voteType",
			["upvote", "downvote"],
			true
		),
	]);
	console.log("vote attribute created");
}
