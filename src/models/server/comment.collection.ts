import { Permission } from "node-appwrite";
import { commentCollections, db } from "../name";
import { databases } from "./config";

export default async function createCommentCollection() {
	// create comment collection
	await databases.createCollection(db, commentCollections, commentCollections, [
		Permission.read("any"),
		Permission.create("users"),
		Permission.read("users"),
		Permission.update("users"),
		Permission.delete("users"),
	]);

	console.log("Comment collection created");

	// creating comment attributes

	await Promise.all([
		databases.createStringAttribute(
			db,
			commentCollections,
			"content",
			10000,
			true
		),
		databases.createStringAttribute(
			db,
			commentCollections,
			"authorId",
			50,
			true
		),
		databases.createEnumAttribute(
			db,
			commentCollections,
			"postType", // comment for answer or question
			["answer", "question"],
			true
		),
		databases.createStringAttribute(db, commentCollections, "postId", 50, true), // the id of the post it may be either answer or question
	]);

	console.log("Comment attribute created.");
}
