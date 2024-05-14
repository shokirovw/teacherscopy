import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { Podcast } from "@/app/(routes)/podcasts/page";
import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function POST(request: Request, response: NextResponse) {
    const formData = await request.formData()
    const title = formData.get("title");
    const description = formData.get("description");
    const authorIds = formData.get("authorIds")!.toString().split("|");
    const hashtags = formData.get("hashtags");
    const youtubeVideoId = formData.get("youtubeVideoId");
    const language = formData.get("language");

    if (!title) {
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }

    if (!youtubeVideoId) {
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }

    if (!language) {
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }

    const client = new MongoClient(process.env.MONGODBADDR!, {});

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection('Blogs'); // Choose a name for your collection

    const authorIdsReady = authorIds.map((authorId) => new ObjectId(authorId));

    let a = await collection.insertOne({
        _id: new ObjectId(),
        authorsIds: authorIdsReady,
        type: "video",
        createdAt: Date.now(),
        hashtags: hashtags.split("|"),
        language: language?.toString() as "uz" | "ru" | "en",
        title: title!.toString(),
        description: description!.toString(),
        videoYoutubeId: youtubeVideoId
    })

    return NextResponse.json({ message: "Success" }, { status: 201 });
}