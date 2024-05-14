import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { type NextRequest } from 'next/server'

type Image = {
    _id: ObjectId,
    filename: string;
    alt: string;
}

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
    const image = formData.get("image") as File;

    if (!image) {
        return NextResponse.json({ message: "Failed" }, {
            status: 500
        });
    }

    if (image.size > 3000000) {
        /// "Too big file size"
        return NextResponse.json({ message: "Failed" }, {
            status: 500
        });
    }

    const client = new MongoClient(process.env.MONGODBADDR!, {});

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<Image>('Images'); // Choose a name for your collection

    const buffer = Buffer.from(await image.arrayBuffer());
    const filename = Date.now() + image.name.replaceAll(" ", "_");

    try {
        await writeFile(
            path.join(process.cwd(), "public/assets/images/" + filename),
            buffer
        );

        let a = await collection.insertOne({
            _id: new ObjectId(),
            filename: filename,
            alt: "Some image description"
        });

        return NextResponse.json({ message: "Success", fileSrc: `${filename}` }, { status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ message: "Failed", reason: "Server error" }, {
            status: 500
        });
    }
}