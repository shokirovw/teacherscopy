import { MongoClient, ObjectId } from "mongodb";
import ClientVideoCreate from "./clientpage";
import { Author } from "../../../podcasts/createnew/page";

import { Video } from "@/app/(routes)/blog/page";
import { getGoogleCredentials } from "@/lib/google/lib";


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

    const { access_token, expiry_date } = await getGoogleCredentials();
     
    return (
        <ClientVideoCreate authors={authors} accessToken={access_token} expiresIn={expiry_date} />
    )
}