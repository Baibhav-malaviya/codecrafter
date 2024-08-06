import { db, questionCollection } from "@/models/name";
import { databases } from "@/models/server/config";
import { NextResponse } from "next/server";

//! Getting question on the basis of questionId
export async function GET(
	request: Request,
	{ params }: { params: { questionId: string } }
) {
	try {
		const questionId = params.questionId;
		const response = await databases.getDocument(
			db,
			questionCollection,
			questionId
		);

		return NextResponse.json({
			message: `Details for question ${questionId}`,
			response,
			success: true,
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				message: `Error in getting question on the basis of questionId. Error: ${error}`,
				success: false,
			},
			{ status: 500 }
		);
	}
}

//todo
export async function PUT(
	request: Request,
	{ params }: { params: { questionId: string } }
) {
	const questionId = params.questionId;
	const body = await request.json();
	// Logic to update a specific question
	return NextResponse.json({
		message: `Question ${questionId} updated`,
		data: body,
	});
}

//todo
export async function DELETE(
	request: Request,
	{ params }: { params: { questionId: string } }
) {
	const questionId = params.questionId;
	// Logic to delete a specific question
	return NextResponse.json({ message: `Question ${questionId} deleted` });
}
