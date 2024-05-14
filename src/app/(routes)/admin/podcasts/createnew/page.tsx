import { Podcast } from "@/app/(routes)/podcasts/page";
import { MongoClient, ObjectId } from "mongodb";
import ClientCreateNew from "./clientpage";

export type Author = {
    _id: ObjectId;
    name: string;
    surname: string;
    pictureUrl: string;
}

async function getAuthorsList () {
    const client = new MongoClient(process.env.MONGODBADDR!, {
        
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection('Users'); // Choose a name for your collection

    let a = await collection.find<Author>({ role: "Teacher" }, { projection: { _id: 1, name: 1, surname: 1, pictureUrl: 1 } }).toArray();

    return a;
}

export default async function Page () {
    const authors = await getAuthorsList();
    
    return (
        <ClientCreateNew authors={authors} />
        
    )
}