import { Podcast } from "@/app/(routes)/podcasts/page";
import { MongoClient, ObjectId } from "mongodb";
import ClientUpdatePage from "./clientpage";

export type PodcastAuthors = {
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

    let a = await collection.find<PodcastAuthors>({ role: "Teacher" }, { projection: { _id: 1, name: 1, surname: 1, pictureUrl: 1 } }).toArray();

    return a;
}

async function getPodcast (podcastid: string) {
    const client = new MongoClient(process.env.MONGODBADDR!, {
        
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<Podcast>('Podcasts'); // Choose a name for your collection

    let a = await collection.findOne({ _id: new ObjectId(podcastid) });

    return a;
}


export default async function Page ({ params }: { params: { podcastid: string; } }) {
    const authors = await getAuthorsList();

    const podcast = await getPodcast(params.podcastid);

    if (podcast) {
        return (
            <ClientUpdatePage authors={authors} originalData={podcast} />
            
        )
    } else {
        return (<p>Could not find podcast</p>)
    }
    
    
}