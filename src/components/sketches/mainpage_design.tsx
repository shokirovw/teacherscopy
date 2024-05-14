'use client';

import Image from "next/image";
import { Popover } from '@headlessui/react'
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";
import { Decor } from "./layout_design";

export default function MainpageDesign ({ username }: { username: string }) {
    return (
        <>
            <OpeningScreen />

            <div className="mt-16"></div>

            <TeachersBlock />

            <div className="mt-20"></div>

            <Targets />

            <div className="mt-16"></div>

            <BlogIntro />

            <div className="mt-10"></div>

            <PodcastIntro />
        </>
    );
        
}

function TeachersBlock () {
    return (
        <div className="max-w-6xl px-6 mx-auto flex flex-col gap-y-5 lg:flex-row items-start gap-x-8">
            <div className="w-12/12 lg:w-5/12 h-auto">
                <Image src={"/teachers1.jpg"} width={1000} height={1000} quality={100} alt="" className="rounded-md w-full h-full object-cover" />
            </div>
            <div className="w-12/12 lg:w-7/12">
                <h1 className="text-5xl font-bold text-blue-900">Bizning jamoamiz</h1>
                <p className="mt-2.5">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae qui, nulla ut assumenda fugiat nobis quas voluptas ipsam, unde atque blanditiis quaerat quo ratione sit, tempora dolores consectetur rem? Ipsam odit id eligendi corrupti atque, molestiae quia voluptatem quis exercitationem nobis. Quisquam debitis saepe laboriosam deserunt porro totam sunt optio, cumque dolor temporibus tempora consectetur eum voluptates iure quasi ex.</p>
            </div>
        </div>
    )
}

import { PiTarget } from "react-icons/pi";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoMdPerson } from "react-icons/io";

function Targets () {
    return (
        <div className="max-w-6xl px-6 mx-auto gap-x-8">
            <h1 className="text-5xl text-center font-bold text-blue-900">Bizning afzalliklarimiz</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-7 w-full gap-x-4 mt-12">
                <div className="col-span-1 p-3 py-6 px-6 flex flex-col justify-center items-center rounded-md bg-slate-100">
                    <PiTarget className="w-24 h-24 text-slate-800" />
                    <h3 className="text-2xl font-bold mt-1">Birdamlik</h3>
                    <p className="text-sm font-medium text-center mt-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis nam, illo atque voluptates corrupti pariatur voluptate laboriosam necessitatibus illum dolores!</p>
                </div>
                <div className="col-span-1 p-3 py-6 px-6 flex flex-col justify-center items-center rounded-md bg-slate-100">
                    <AiFillThunderbolt className="w-24 h-24 text-slate-800" />
                    <h3 className="text-2xl font-bold mt-1">Birdamlik</h3>
                    <p className="text-sm font-medium text-center mt-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis nam, illo atque voluptates corrupti pariatur voluptate laboriosam necessitatibus illum dolores!</p>
                </div>
                <div className="col-span-1 p-3 py-6 px-6 flex flex-col justify-center items-center rounded-md bg-slate-100">
                    <IoMdPerson className="w-24 h-24 text-slate-800" />
                    <h3 className="text-2xl font-bold mt-1">Birdamlik</h3>
                    <p className="text-sm font-medium text-center mt-1">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis nam, illo atque voluptates corrupti pariatur voluptate laboriosam necessitatibus illum dolores!</p>
                </div>
            </div>
        </div>
    );
}

function BlogIntro () {
    return (
        <div className="max-w-6xl px-6 mx-auto">
                <div className="w-full">
                    <h1 className="font-sora text-[40px] text-blue-900 font-bold">Blog posts</h1>
                    <h3 className="font-sora text-slate-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, illum!</h3>
                </div>
                <div className="grid grid-cols-5 gap-4 mt-6">
                <div className="relative rounded-lg overflow-hidden col-span-5 lg:col-span-3 row-span-3 h-96 flex flex-col justify-end">
                    <Image alt="" className="-z-10 absolute w-full h-full object-cover object-center" src={"/school.jpg"} width={1920} height={1080} quality={100} />
                    <div className="w-full lg:pr-32 text-blue-100 bg-blue-700/60 backdrop-blur-lg px-6 py-3 pb-3.5">
                        <p className="font-montserrat font-light tracking-wide text-blue-100/90">FEATURED</p>
                        <h2 className="font-montserrat text-2xl font-bold">How to maintain successful career and prosperous life?</h2>
                        <p className="text-sm font-dmsans tracking-wide text-blue-100/85 mt-1">Anna Karenina - March 27 - 5min read</p>
                    </div>
                </div>
                <div className="rounded-xl col-span-5 lg:col-span-2 h-fit">
                    <div className="border-b-[1px] border-b-slate-200 p-4 flex flex-col">
                        <div className="flex flex-row gap-x-3 items-center">
                            <div className="w-5 h-5 rounded-full overflow-hidden"><Image alt=""className="w-full h-full object-cover" src={"/author.webp"} width={100} height={1} /></div>
                            <p className="font-publicsans text-xs">Anna Karenina</p>
                        </div>
                        <h2 className="text-lg font-dmsans text-blue-950 font-semibold mt-2">What makes Taylor Swift so popular?</h2>
                        <p className="text-xs font-publicsans font-light tracking-wide text-black/80 mt-2">March 27, 2024 - 5min read</p>
                    </div>
                </div>
                <div className="rounded-xl col-span-5 lg:col-span-2 h-fit">
                    <div className="border-b-[1px] border-b-slate-200 p-4 flex flex-col">
                        <div className="flex flex-row gap-x-3 items-center">
                            <div className="w-5 h-5 rounded-full overflow-hidden"><Image alt=""className="w-full h-full object-cover" src={"/author.webp"} width={100} height={1} /></div>
                            <p className="font-publicsans text-xs">Anna Karenina</p>
                        </div>
                        <h2 className="text-lg font-dmsans text-blue-950 font-semibold mt-2">What makes Taylor Swift so popular?</h2>
                        <p className="text-xs font-publicsans font-light tracking-wide text-black/80 mt-2">March 27, 2024 - 5min read</p>
                    </div>
                </div>
                <div className="rounded-xl col-span-5 lg:col-span-2 h-fit">
                    <div className="border-b-[1px] border-b-slate-200 p-4 flex flex-col">
                        <div className="flex flex-row gap-x-3 items-center">
                            <div className="w-5 h-5 rounded-full overflow-hidden"><Image alt=""className="w-full h-full object-cover" src={"/author.webp"} width={100} height={1} /></div>
                            <p className="font-publicsans text-xs">Anna Karenina</p>
                        </div>
                        <h2 className="text-lg font-dmsans text-blue-950 font-semibold mt-2">What makes Taylor Swift so popular?</h2>
                        <p className="text-xs font-publicsans font-light tracking-wide text-black/80 mt-2">March 27, 2024 - 5min read</p>
                    </div>
                </div>
            </div>
            <div className="mt-10">
                <div className="flex flex-row gap-x-3 items-center justify-end text-sm rounded-3xl text-blue-900/90 w-full font-poppins font-medium">
                    <p>See more posts</p>
                    <FaArrowRight className="text-xs" />
                </div>
            </div>
        </div>
    )
}

function NewsLetterBlock () {
    return (
        <div className="relative bg-zinc-700/80  mt-20 w-full">
                <Image className="max-w-full h-full object-center absolute -z-10 object-cover" alt="" src={"/background_raw4.png"} width={1920} height={1080}></Image>
                <div className=" w-full px-20 overflow-hidden">
                    
                    <div className=" text-white p-10 space-y-6">
                        <h1 className="text-4xl font-montserrat font-bold w-6/12">Want product news and updates? Sign up for our newsletter.</h1>
                        <div>
                        <input className="w-[450px] ring-1 ring-indigo-100/30 bg-indigo-100/15 text-white rounded-md py-2 px-4 focus:outline-none focus:shadow-outline" type="text" placeholder="Username" />
                        </div>
                        <p>We care about your data. Read our privacy policy.</p>
                    </div>
                </div>
            </div>
    );
}

function PodcastIntro () {
    return (
        <div className="w-full bg-gradient-to-b from-blue-600 to-blue-700">
            <div className="max-w-3xl mx-auto">
                <div className="px-7 mx-auto py-10 pb-8 h-full flex flex-col gap-y-10">

                    <div className="text-white">
                        <h1 className="text-4xl lg:text-5xl font-poppins font-semibold text-center">Weekly Podcast</h1>
                        <p className="font-sora font-extralight leading-relaxed mt-3 text-[13px] lg:text-[15px] text-center tracking-wide text-white/85">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias dicta non vitae sint sunt consectetur consequatur, unde aliquam commodi quae? Fuga repellat accusamus consequuntur repudiandae.</p>
                    </div>

                    <div className="relative bg-blue-300/15 ring-2 ring-blue-300/25 rounded-2xl px-8 py-5 font-poppins text-white">
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

                    <div className="-mt-2">
                        <div className="flex flex-row gap-x-3 items-center justify-end text-sm rounded-3xl text-blue-50/90 w-full font-poppins font-medium">
                            <p>See more podcasts</p>
                            <FaArrowRight className="text-xs" />
                        </div>
                    </div>
                </div>
                </div>
            </div>
    );
}

function OpeningScreen () {
    return (
        <div className="relative h-screen w-full mt-[-82px]">
            <Image className="w-full h-full absolute object-cover -z-10 opacity-40 blur-[2px]" alt="" src={"/background_raw2.png"} width={1920} height={1080}></Image>
            <div className="w-full h-full absolute bg-signature -z-20"></div>

            <div className="h-screen flex flex-col justify-center">
                <div className="container max-w-7xl text-white px-6 lg:px-16 flex flex-col justify-center items-center mx-auto mt-4">
                    <div className="w-fit rounded-full items-center flex flex-row space-x-2.5 bg-indigo-300/15 ring-1 ring-indigo-200/60 pl-1.5 pr-4 py-1">
                        <div className="py-1 px-3 lg:px-4 w-fit bg-indigo-50/95 text-indigo-600 text-xs rounded-full font-medium font-sora">New</div>
                        <span className="text-xs font-sora mt-0.5">264% ROI experienced with Vercel</span>
                    </div>
                    <h1 className="text-[70px] lg:text-[120px] text-center mt-8 leading-none font-theseasons">Biz ustozlar jamoasi</h1> {/* below: montserrat, cormorant, publicsans-thin-18px  */}
                    <p className="text-white/90 text-center mt-4 w-10/12 text-[14px] lg:text-[18px] leading-[1.7] lg:leading-[1.9] tracking-wide font-thin font-publicsans">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad animi cumque minima, debitis porro, id cupiditate placeat numquam quasi consectetur enim a quaerat sint doloribus provident aspernatur explicabo aliquam eos, deserunt deleniti voluptatum quos saepe incidunt. Fugiat esse quibusdam odit.</p>
                    <div className="flex flex-row space-x-6 mt-8 font-montserrat text-lg">
                        <div className="rounded-full text-sm lg:text-base px-8 lg:px-16 py-1.5 bg-white text-signature font-medium ring-1 ring-white">Teacher</div>
                        <div className="rounded-full text-sm lg:text-base px-4 lg:px-8 py-1.5 bg-indigo-100/30 text-indigo-50 ring-2 ring-indigo-100/50">Student</div>
                    </div>
                </div>
            </div>
        </div>
    );
}




