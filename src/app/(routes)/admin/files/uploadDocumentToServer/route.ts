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
    const file = formData.get("file_document") as File;
    const title = formData.get("title") as string;

    if (!title || title == "") {
        return NextResponse.json({ message: "Failed" }, {
            status: 500
        });
    }

    if (!file) {
        return NextResponse.json({ message: "Failed" }, {
            status: 500
        });
    }

    if (file.size > 100000000) {
        /// "Too big file size"
        return NextResponse.json({ message: "Failed" }, {
            status: 500
        });
    }

    let rawtype = file.type;
    let filetype;

    if (rawtype == "application/pdf") {
        filetype = "pdf";
    } else if (rawtype == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
        filetype = "docx";
    } else if (rawtype == "application/vnd.openxmlformats-officedocument.presentationml.presentation") {
        filetype = "pptx";
    } else {
        return NextResponse.json({ message: "Failed" }, {
            status: 500
        });
    }

    const client = new MongoClient(process.env.MONGODBADDR!, {});

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection('Documents'); // Choose a name for your collection

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + file.name.replaceAll(" ", "_");

    try {
        await writeFile(
            path.join(process.cwd(), "public/assets/documents/" + filename),
            buffer
        );

        let a = await collection.insertOne({
            _id: new ObjectId(),
            filename: filename,
            title: title,
            createdAt: Date.now(),
            filetype: filetype
        });

        return NextResponse.json({ message: "Success", url: `${process.env.SELFADDR}/assets/documents/${filename}`, filetype: filetype }, { status: 201 });
    } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ message: "Failed", reason: "Server error" }, {
            status: 500
        });
    }
}