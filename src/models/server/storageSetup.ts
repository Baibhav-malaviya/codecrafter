import { Permission } from "node-appwrite";
import { attachmentBucket } from "../name";
import { storage } from "./config";

export default async function getOrCreateBucket() {
	try {
		await storage.getBucket(attachmentBucket);
		console.log("storage connected.");
	} catch (error) {
		try {
			await storage.createBucket(
				attachmentBucket,
				attachmentBucket,
				[
					Permission.read("any"),
					Permission.create("users"),
					Permission.read("users"),
					Permission.update("users"),
					Permission.delete("users"),
				],
				false,
				undefined,
				undefined, //eg for 5MB 5 * 1024 * 1024
				["jpg", "png", "gif", "jpeg", "webp", "heic"]
			);
			console.log("Storage created");
			console.log("storage connected");
		} catch (error) {
			console.log("Error in creating storage: ", error);
		}
	}
}
