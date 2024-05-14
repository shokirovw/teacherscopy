import path from "path";
import { writeFile, unlink } from "fs/promises";
import { NextResponse } from "next/server";
import { Podcast } from "@/app/(routes)/podcasts/page";
import { MongoClient, ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function POST(request: Request, { params }: { params: { podcastid: string; } }) {
    const formData = await request.formData()
    const title = formData.get("title");
    const changed = formData.get("audiochanged") == "1" ? true : false;
    const subtitle = formData.get("subtitle");
    const file = formData.get('audio') as File;
    const authorIds = formData.get("authorIds")!.toString().split("|");
    const fileDuration = formData.get("audioDuration");
    const language = formData.get("language");

    const client = new MongoClient(process.env.MONGODBADDR!, {});

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<Podcast>('Podcasts'); // Choose a name for your collection

    const authorIdsReady = authorIds.map((authorId) => new ObjectId(authorId));

    if (changed) {
        let lastAudioPathname = "";

        let lastpodcast = await collection.findOne({ _id: new ObjectId(params.podcastid) }, { projection: { audioUrl: 1 } });

        if (lastpodcast?.audioUrl) {
            await unlink(path.join(process.cwd(), "public/assets/podcasts/" + lastpodcast.audioUrl))
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const filename = Date.now() + file.name.replaceAll(" ", "_");

        try {
            await writeFile(
                path.join(process.cwd(), "public/assets/podcasts/" + filename),
                buffer
            );
            let a = await collection.updateOne({ _id: new ObjectId(params.podcastid) }, {
                $set: {
                    authorsIds: authorIdsReady,
                    durationInSeconds: Number(fileDuration?.toString()),
                    language: language?.toString() as "uz" | "ru" | "en",
                    title: title!.toString(),
                    subtitle: subtitle!.toString(),
                    audioUrl: filename
                }
            })
    
            return NextResponse.json({ Message: "Success", status: 201 });

            revalidatePath('/admin/faq');
        } catch (error) {
            console.log("Error occured ", error);
            return NextResponse.json({ Message: "Failed", status: 500 });
        }
    } else {
        await collection.updateOne({ _id: new ObjectId(params.podcastid) }, {
            $set: {
                authorsIds: authorIdsReady,
                language: language?.toString() as "uz" | "ru" | "en",
                title: title!.toString(),
                subtitle: subtitle!.toString()
            }
        })

        revalidatePath('/admin/faq');

        return NextResponse.json({ Message: "Success", status: 201 });
    }
}