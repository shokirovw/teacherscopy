import path from "path";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { Podcast } from "@/app/(routes)/podcasts/page";
import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import jwt from 'jsonwebtoken'
import { cookies } from "next/headers";
var { SignJWT } = require('jose');

export async function POST(request: Request, response: NextResponse) {
    const formData = await request.formData()
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email) {
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }

    if (!password) {
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }

    const client = new MongoClient(process.env.MONGODBADDR!, {});

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection('Users'); // Choose a name for your collection

    let a = await collection.findOne({ email: email, password: password });

    if (a) {

        const tok = await new SignJWT(a)
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('30m')
            .sign(new TextEncoder().encode('some-secret-key'))
        
        // const token = jwt.sign(a, 'some-secret-key', {
        //     expiresIn: '10h',
        // });

        cookies().set("token", tok, {
            
        })

        return NextResponse.json({ message: "Success" }, { status: 201 });
    } else {
        return NextResponse.json({ message: "Failed" }, { status: 500 });
    }
}