import { MongoClient, ObjectId } from 'mongodb';
import Image from 'next/image';
import { Article, Document, Presentation, Video } from "../../page";
import { redirect } from 'next/navigation';

async function getBlog (blogid: string) {
    const client = new MongoClient(process.env.MONGODBADDR!, {
        
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<Document>('Blogs'); // Choose a name for your collection

    let a = await collection.findOne({ _id: new ObjectId(blogid) });

    return a;
}

function BlogNotFound () {
    return (
        <p>Sorry but blog is not found</p>
    );
}

function VideoComplete ({ video }: { video: Video }) {
    return (
        <div>
            <p>THis is an article</p>
            <p>Title: {video.title}</p>
            <p>{video.createdAt.toDateString()}</p>
        </div>
    )
}

export default async function Page ({ params: { blogid } }: { params: { blogid: string; } }) {
    const blog = await getBlog(blogid);

    if (!blog) return (<BlogNotFound />);
    else if (blog.type != 'video') {
        redirect("/blog/" + blogid + "/" + blog.type);
    } else {
        return (<VideoComplete video={blog} />)
    }
}