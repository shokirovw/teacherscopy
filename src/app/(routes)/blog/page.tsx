import { MongoClient, ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';

async function getAllBlogsPreview () {
    const client = new MongoClient(process.env.MONGODBADDR!, {
        
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<Document>('Blogs'); // Choose a name for your collection

    let a = await collection.find({  }).limit(20).sort({ createdAt: 1 }).toArray();

    return a;
}

export type Document = Article | Presentation | Video;

export type Article = {
    _id: ObjectId;
    authorsIds: ObjectId[];
    createdAt: Date;
    hashtags: string[];
    language: "uz" | "ru" | "en";
    title: string;
    subtitle: string;
    thumbnailUrl: string;
    body: string;
    type: "article";
}

export type Presentation = {
    _id: ObjectId;
    authorsIds: ObjectId[];
    createdAt: Date;
    hashtags: string[];
    language: "uz" | "ru" | "en";
    presentationUrl: string;
    type: "presentation"
    title: string;
}

export type Video = {
    _id: ObjectId;
    authorsIds: ObjectId[];
    createdAt: Date;
    hashtags: string[];
    language: "uz" | "ru" | "en";
    videoYoutubeId: string;
    type: "video";
    title: string;
} 



function ArticlePreview ({ article }: { article: Article }) {
    return (
        <div>
            <p>This is an article</p>
            <p>Title: {article.title}</p>
            <Image src={article.thumbnailUrl} alt='' width={200} height={1} />
            <Link href={"/blog/" + article._id.toString() + "/article"}>Linnk</Link>
        </div>
    ) 
}

function VideoPreview ({ video }: { video: Video }) {
    return (
        <div>
            <p>This is a video</p>
            <p>Title: {video.title}</p>
            <p>{video.videoYoutubeId}</p>
            <Link href={"/blog/" + video._id.toString() + "/video"}>Linnk</Link>
        </div>
    ) 
}

function PresentationPreview ({ presentation }: { presentation: Presentation }) {
    return (
        <div>
            <p>This is a presentation</p>
            <p>Title: {presentation.title}</p>
            <Link href={"/blog/" + presentation._id.toString() + "/presentation"}>Linnk</Link>
        </div>
    ) 
}

import { IoReorderFourSharp } from "react-icons/io5";

export default async function Page () {
    const blogs = await getAllBlogsPreview();

    return (
        <div className='max-w-6xl mx-auto pt-12'>
            <h1 className="text-center text-4xl font-extrabold text-blue-900 tracking-tight lg:text-5xl">
                Teacher's Blog
            </h1>
            <div className='grid grid-cols-2 lg:grid-cols-3 mt-14 gap-x-3 gap-y-3 lg:gap-x-10 lg:gap-y-10 xl:gap-x-16 xl:gap-y-16 px-7'>
                <Link href={"https://google.com"} className='relative flex flex-col justify-end overflow-hidden cursor-pointer col-span-2 group min-h-[400px]'>
                    <Image className='z-10 transition-transform ease-out duration-200 group-hover:scale-110 absolute w-full h-full object-cover' width={1920} height={1080} quality={100} src={"https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg"} alt="" />
                    <div className='z-10 absolute w-full h-full bg-gradient-to-b from-transparent from-50% to-black/70'></div>
                    <div className='text-white z-20 px-10 pb-5'>
                        <p className='tracking-wider mb-1.5 font-light text-white/95'>PDF Document</p>
                        <h1 className="text-4xl font-extrabold tracking-tight">
                            Travel Turkey and savor every moment of your stay
                        </h1>
                        <div className='flex flex-row gap-x-3 items-center mt-5'>
                            <IoReorderFourSharp />
                            <p className='text-sm tracking-wider font-bold'>READ</p>
                        </div>
                    </div>
                </Link>
                <Link href={"https://google.com"} className='md:min-h-[300px] md:max-h-[500px] max-h-[220px] col-span-2 md:col-span-1 cursor-pointer border flex flex-row md:flex-col group'>
                    <div className='relative overflow-hidden aspect-video'>
                        <Image className='group-hover:scale-110 transition-transform ease-out duration-200 w-full h-full object-cover' width={1920} height={1080} quality={100} src={"https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg"} alt="" />
                    </div>
                    <div className='text-black z-20 px-6 py-6 flex flex-col justify-between flex-grow'>
                        <div>
                            <p className='tracking-wider font-light mb-1.5'>PDF Document</p>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Travel Turkey and savor every moment of your stay
                            </h1>
                        </div>
                        <div className='flex flex-row gap-y-3 gap-x-3 mt-5'>
                            <IoReorderFourSharp />
                            <p className='text-sm tracking-wider font-bold'>READ</p>
                        </div>
                    </div>
                </Link>
                <Link href={"https://google.com"} className='md:min-h-[300px] md:max-h-[500px] max-h-[220px] col-span-2 md:col-span-1 cursor-pointer border flex flex-row md:flex-col group'>
                    <div className='relative overflow-hidden aspect-video'>
                        <Image className='group-hover:scale-110 transition-transform ease-out duration-200 w-full h-full object-cover' width={1920} height={1080} quality={100} src={"https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg"} alt="" />
                    </div>
                    <div className='text-black z-20 px-6 py-6 flex flex-col justify-between flex-grow'>
                        <div>
                            <p className='tracking-wider font-light mb-1.5'>PDF Document</p>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Travel Turkey and savor every moment of your stay
                            </h1>
                        </div>
                        <div className='flex flex-row gap-y-3 gap-x-3 mt-5'>
                            <IoReorderFourSharp />
                            <p className='text-sm tracking-wider font-bold'>READ</p>
                        </div>
                    </div>
                </Link>
                <Link href={"https://google.com"} className='md:min-h-[300px] md:max-h-[500px] max-h-[220px] col-span-2 md:col-span-1 cursor-pointer border flex flex-row md:flex-col group'>
                    <div className='relative overflow-hidden aspect-video'>
                        <Image className='group-hover:scale-110 transition-transform ease-out duration-200 w-full h-full object-cover' width={1920} height={1080} quality={100} src={"https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg"} alt="" />
                    </div>
                    <div className='text-black z-20 px-6 py-6 flex flex-col justify-between flex-grow'>
                        <div>
                            <p className='tracking-wider font-light mb-1.5'>PDF Document</p>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Travel Turkey and savor every moment of your stay
                            </h1>
                        </div>
                        <div className='flex flex-row gap-y-3 gap-x-3 mt-5'>
                            <IoReorderFourSharp />
                            <p className='text-sm tracking-wider font-bold'>READ</p>
                        </div>
                    </div>
                </Link>
                <Link href={"https://google.com"} className='min-h-[160px] max-h-[300px] col-span-2 md:col-span-3 cursor-pointer border flex flex-row group'>
                    <div className='relative overflow-hidden aspect-video max-h-[300px]'>
                        <Image className='group-hover:scale-110 transition-transform ease-out duration-200 w-full h-full object-cover' width={1920} height={1080} quality={100} src={"https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg"} alt="" />
                    </div>
                    <div className='text-black z-20 px-6 py-6 flex flex-col justify-between flex-grow'>
                        <div>
                            <p className='tracking-wider font-light mb-1.5'>PDF Document</p>
                            <h1 className="text-2xl font-bold tracking-tight">
                                Travel Turkey and savor every moment of your stay hydrated and everuthign shall be very and very nice
                            </h1>
                        </div>
                        <div className='flex flex-row gap-y-3 gap-x-3 mt-5'>
                            <IoReorderFourSharp />
                            <p className='text-sm tracking-wider font-bold'>READ</p>
                        </div>
                    </div>
                </Link>
            </div>
            {/* <h2>All blogs</h2>
            {blogs.map((blog: Document) => {
                if (blog.type == "article") {
                    return <ArticlePreview article={blog} />
                } else if (blog.type == "video") {
                    return <VideoPreview video={blog} />
                } else {
                    return <PresentationPreview presentation={blog} />
                }
            })} */}
        </div>
    )
}