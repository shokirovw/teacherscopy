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

export async function GET(request: NextRequest, response: NextResponse) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('service_name');

    const count = searchParams.get('count');

    if (count != "all") {
        return NextResponse.json({ message: "Failed" }, {
            status: 500
        });
    }

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

    const client = new MongoClient(process.env.MONGODBADDR!, {});

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<Image>('Images'); // Choose a name for your collection

    let a = await collection.find({  }, { projection: { filename: 1 } }).toArray();

    let arr = [];

    for (let i = 0; i < a.length; ++i) {
        arr.push(a[i].filename);
    }

    return NextResponse.json({ message: "Success", images: arr }, { status: 201 });
}