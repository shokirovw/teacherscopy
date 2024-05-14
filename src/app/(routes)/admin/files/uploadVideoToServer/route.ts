import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { type NextRequest } from 'next/server'

export async function POST(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('service_name');

    if (!query) {
        return NextResponse.json({ message: "Failed" }, {
            status: 500
        });
    }

    if (query != "video_blog_upload") {
        return NextResponse.json({ message: "Failed" }, {
            status: 500
        });
    }

    const formData = await request.formData()
    const title = formData.get("title");
    const duration = formData.get("duration");
    const youtubeVideoId = formData.get("youtubeVideoId");

    const client = new MongoClient(process.env.MONGODBADDR!, {});

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection('Videos'); // Choose a name for your collection

    let a = await collection.insertOne({
        _id: new ObjectId(),
        title: title,
        duration: Number(duration?.toString()),
        createdAt: new Date(),
        youtubeId: youtubeVideoId
    });

    return NextResponse.json({ message: "Success", url: `${process.env.SELFADDR}/assets/documents/${filename}`, filetype: filetype }, { status: 201 });
}