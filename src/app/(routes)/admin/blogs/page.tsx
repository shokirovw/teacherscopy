import { Article, Document, Presentation, Video } from "../../blog/page";
import { MongoClient, ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';

async function getAllBlogsForAdmin () {
    const client = new MongoClient(process.env.MONGODBADDR!, {
        
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<Document>('Blogs'); // Choose a name for your collection

    let a = await collection.find({  }).toArray();

    return a;
}

function ArticleAdmin ({ article }: { article: Article }) {
    return (
        <div>
            <p>THis is an article displayed in Admin page</p>
            <p>TItle: {article.title}</p>
            <Link href={"/admin/blogs/delete/" + article._id.toString()}>Delete</Link>
            <Link href={"/admin/blogs/edit/" + article._id.toString()}>Edit</Link>
        </div>
    )
}

function VideoAdmin ({ video }: { video: Video }) {
    return (
        <div>
            <p>THis is a video displayed in Admin page</p>
            <p>TItle: {video.title}</p>
            <Link href={"/admin/blogs/delete/" + video._id.toString()}>Delete</Link>
            <Link href={"/admin/blogs/edit/" + video._id.toString()}>Edit</Link>
        </div>
    )
}

function PresentationAdmin ({ presentation }: { presentation: Presentation }) {
    return (
        <div>
            <p>THis is an presentation displayed in Admin page</p>
            <p>TItle: {presentation.title}</p>
            <Link href={"/admin/blogs/delete/" + presentation._id.toString()}>Delete</Link>
            <Link href={"/admin/blogs/edit/" + presentation._id.toString()}>Edit</Link>
        </div>
    )
}

export default async function Page () {
    let blogs = await getAllBlogsForAdmin();

    return (
        <div>
            <h2>Blogs admin control</h2>
            <Link href={"/admin/blog/createnew/article"}>Add new article</Link>
            <Link href={"/admin/blog/createnew/video"}>Add new video</Link>
            <Link href={"/admin/blog/createnew/presentation"}>Add new presentation</Link>
            {blogs.map((blog: Document, i: number) => {
                if (blog.type == "article") {
                    return <ArticleAdmin article={blog} />
                } else if (blog.type == "presentation") {
                    return <PresentationAdmin presentation={blog} />
                } else {
                    return <VideoAdmin video={blog} />
                }  
            })}
        </div>
        
    )
}