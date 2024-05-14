import Link from "next/link";
import { Podcast } from "../../podcasts/page";
import { revalidatePath } from "next/cache";
import { MongoClient, ObjectId } from "mongodb";
import Image from "next/image";
import { unlink } from "fs/promises";
import path from "path";


async function getAllPodcastsForAdmin () {
    const client = new MongoClient(process.env.MONGODBADDR!, {
        
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<Podcast>('Podcasts'); // Choose a name for your collection

    let a = await collection.find({  }).toArray();

    return a;
}


export default async function Page () {
    async function deletePodcast (formData: FormData) {
        'use server';

        const client = new MongoClient(process.env.MONGODBADDR!, {
    
        });

        await client.connect();

        const database = client.db('Teachers'); // Choose a name for your database

        const collection = database.collection<Podcast>('Podcasts'); // Choose a name for your collection

        let podcast = await collection.findOneAndDelete({ _id: new ObjectId(formData.get("podcastid") as string) }, { projection: { audioUrl: 1 } });

        await unlink(path.join(process.cwd(), "public/assets/podcasts/" + podcast?.audioUrl));

        revalidatePath('/admin/faq');
    }

    let podcasts = await getAllPodcastsForAdmin();

    return (
        <div>
            <h1>Admin podcasts control</h1>
            <Link href={"/admin/podcasts/createnew"}>Create new podcast</Link>
            {podcasts.map((podcast: Podcast, i) => (
                <div>
                    <p>This is a podcast displayed in admin page</p>
                    <p>{podcast.title}</p>
                    <audio controls>
                        <source src={'/assets/podcasts/' + podcast.audioUrl} type='audio/ogg' />
                    </audio>
                    <Link href={"/admin/podcasts/edit/" + podcast._id.toString()}>Edit podcast</Link>
                    <form action={deletePodcast}>
                        <input type="hidden" value={podcast._id.toString()} name="podcastid" />
                        <button type="submit">Delete</button>
                    </form>
                </div>
            ))}
        </div>
    )
}