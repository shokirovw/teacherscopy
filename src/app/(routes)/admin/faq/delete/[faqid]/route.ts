import { MongoClient, ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import type { FAQ } from "@/app/(routes)/faq/page";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest, { params }: { params: { faqid: string } }) {
    const { searchParams } = new URL(req.url);
    console.log(searchParams.get("search"));

    const client = new MongoClient(process.env.MONGODBADDR!, {
    
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<FAQ>('Faqs'); // Choose a name for your collection

    await collection.deleteOne({ _id: new ObjectId(params.faqid) });

    revalidatePath('/admin/faq');

    return NextResponse.redirect(`${process.env.SELFADDR}/admin/faq`);
  }