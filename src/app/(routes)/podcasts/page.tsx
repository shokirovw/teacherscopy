import { MongoClient, ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlay } from 'react-icons/fa6';
import { MdKeyboardArrowRight } from 'react-icons/md';

export type Podcast = {
    _id: ObjectId;
    audioUrl: string;
    createdAt: Date;
    durationInSeconds: number;
    subtitle: string;
    title: string;
    authorsIds: ObjectId[];
    language: "uz" | "ru" | "en";
}

async function getAllPodcasts () {
    const client = new MongoClient(process.env.MONGODBADDR!, {
        
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<Podcast>('Podcasts'); // Choose a name for your collection

    let a = await collection.find({  }).limit(20).sort({ createdAt: 1 }).toArray();

    return a;
}


export default async function Page () {
    const podcasts = await getAllPodcasts();

    return (
        <>
        <div className='max-w-3xl mx-auto pt-12 px-6'>
            <h1 className="text-center text-4xl font-extrabold text-blue-900 tracking-tight lg:text-5xl">
                Podcasts
            </h1>
            <div className='space-y-10 mt-10'>
                <div className="relative bg-blue-500 ring-2 ring-blue-300/25 rounded-2xl px-8 py-5 font-poppins text-white">
                        <MdKeyboardArrowRight className="text-3xl absolute top-8 right-3 text-white" />
                        <div className="w-10/12">
                            <p className="text-xs font-montserrat text-white/90">OCT 30, 2023</p>
                            <h2 className="text-lg font-montserrat font-bold mt-0.5">Figures of Baghdad. Who was Al-Azim?</h2>
                            <p className="text-xs lg:text-sm mt-1 leading-relaxed font-publicsans tracking-[0.017em] font-extralight">Sold into slavery from a young age, this medieval rockstar Arib al’Mamuniyya went on to impress the Caliphs, and become a famed poet and musician in her own right.</p>
                            <div className="flex flex-row gap-x-5 mt-5 items-center">
                                <div className="flex flex-row py-1.5 px-5 text-[#025596] rounded-2xl gap-x-2 items-center bg-[#efeff4] ">
                                    <FaPlay className="text-xs" />
                                    <p className="text-sm font-semibold font-montserrat">PLAY</p>
                                </div>
                                <p className="text-[13px] font-montserrat text-white/90">15min 4s</p>
                            </div>
                        </div>
                </div>
                <div className="relative bg-blue-300/15 bg-blue-50 ring-blue-300/25 rounded-2xl px-8 py-5 font-poppins text-blue-900">
                    <MdKeyboardArrowRight className="text-3xl absolute top-8 right-3 text-blue-900" />
                    <div className="w-10/12">
                        <p className="text-xs font-montserrat text-blue-900">OCT 30, 2023</p>
                        <h2 className="text-lg font-montserrat font-bold mt-0.5">Figures of Baghdad. Who was Al-Azim?</h2>
                        <p className="text-xs lg:text-sm mt-1 leading-relaxed font-publicsans tracking-[0.017em] font-extralight">Sold into slavery from a young age, this medieval rockstar Arib al’Mamuniyya went on to impress the Caliphs, and become a famed poet and musician in her own right.</p>
                        <div className="flex flex-row gap-x-5 mt-5 items-center">
                            <div className="flex flex-row py-1.5 px-5  text-white bg-blue-500/90 rounded-2xl gap-x-2 items-center ">
                                <FaPlay className="text-xs" />
                                <p className="text-sm font-semibold font-montserrat ">PLAY</p>
                            </div>
                            <p className="text-[13px] font-montserrat text-blue-900">15min 4s</p>
                        </div>
                    </div>
                </div>
                <div className="relative bg-blue-300/15 bg-blue-50 ring-blue-300/25 rounded-2xl px-8 py-5 font-poppins text-blue-900">
                    <MdKeyboardArrowRight className="text-3xl absolute top-8 right-3 text-blue-900" />
                    <div className="w-10/12">
                        <p className="text-xs font-montserrat text-blue-900">OCT 30, 2023</p>
                        <h2 className="text-lg font-montserrat font-bold mt-0.5">Figures of Baghdad. Who was Al-Azim?</h2>
                        <p className="text-xs lg:text-sm mt-1 leading-relaxed font-publicsans tracking-[0.017em] font-extralight">Sold into slavery from a young age, this medieval rockstar Arib al’Mamuniyya went on to impress the Caliphs, and become a famed poet and musician in her own right.</p>
                        <div className="flex flex-row gap-x-5 mt-5 items-center">
                            <div className="flex flex-row py-1.5 px-5  text-white bg-blue-500/90 rounded-2xl gap-x-2 items-center ">
                                <FaPlay className="text-xs" />
                                <p className="text-sm font-semibold font-montserrat ">PLAY</p>
                            </div>
                            <p className="text-[13px] font-montserrat text-blue-900">15min 4s</p>
                        </div>
                    </div>
                </div>
                <div className="relative bg-blue-300/15 bg-blue-50 ring-blue-300/25 rounded-2xl px-8 py-5 font-poppins text-blue-900">
                    <MdKeyboardArrowRight className="text-3xl absolute top-8 right-3 text-blue-900" />
                    <div className="w-10/12">
                        <p className="text-xs font-montserrat text-blue-900">OCT 30, 2023</p>
                        <h2 className="text-lg font-montserrat font-bold mt-0.5">Figures of Baghdad. Who was Al-Azim?</h2>
                        <p className="text-xs lg:text-sm mt-1 leading-relaxed font-publicsans tracking-[0.017em] font-extralight">Sold into slavery from a young age, this medieval rockstar Arib al’Mamuniyya went on to impress the Caliphs, and become a famed poet and musician in her own right.</p>
                        <div className="flex flex-row gap-x-5 mt-5 items-center">
                            <div className="flex flex-row py-1.5 px-5  text-white bg-blue-500/90 rounded-2xl gap-x-2 items-center ">
                                <FaPlay className="text-xs" />
                                <p className="text-sm font-semibold font-montserrat ">PLAY</p>
                            </div>
                            <p className="text-[13px] font-montserrat text-blue-900">15min 4s</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <h2>Podcasts</h2>
        {podcasts.map((podcast) => (
            <div>
                <p>THis is a podcast</p>
                <p>{podcast.title}</p>
                <p>{podcast.subtitle}</p>
                <audio src={podcast.audioUrl} controls></audio>
                <Link href={"/podcasts/" + podcast._id.toString()}>Linnk</Link>
            </div>
        ))} */}
        </>
    )
}