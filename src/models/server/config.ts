import env from "@/app/env";
import { Client, Databases, Storage, Users, Avatars } from "node-appwrite";

let client = new Client();

client
	.setEndpoint(env.endpoint) // Your API Endpoint
	.setProject(env.projectId) // Your project ID
	.setKey(env.apiKey); // Your secret API key

// export const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

export { client, avatars, databases, storage, users };
