import Image from "next/image";
import React from "react";
import './signin.css';
import Link from "next/link";

export default async function SigninDesign () {
    return (
        <div className="w-full h-screen flex flex-row">
            <div className="w-1/2 relative h-full">
                <div className="absolute w-full h-full">
                    <Image alt="" src={"/background_raw5.jpg"} className={"w-full h-full absolute object-cover object-right z-20 opacity-60"} width={1621} height={911} quality={100}></Image>
                    <div className="w-full h-full absolute bg-signature z-10"></div>
                </div>
            </div>
            <form action={"http://localhost:4000/from"} className="relative w-1/2 h-full flex flex-col items-center justify-center p-10 px-36 font-montserrat text-blue-950">
                <Image className="absolute top-5 left-10 h-12 w-auto" alt="" src={"/logomarkaz.png"} width={300} height={78}></Image>

                <h2 className="mt-20 text-3xl font-theseasons tracking-wide">Welcome to Belgium</h2>

                <div className="w-full space-y-8 mt-10">
                    <div>
                        <p className="text-sm">User name or email</p>
                        <input type="mail" name="mail" className="w-full border-b-[1px] text-stone-900 focus:outline-none mt-1 py-1 text-base" />
                    </div>
                    <div>
                        <p className="text-sm">Password</p>
                        <input type="password" name="password" className="w-full border-b-[1px] text-stone-900 focus:outline-none mt-1 py-1 text-base" />
                    </div>
                </div>
                
                <div className="w-6/12 mt-10 flex flex-col items-center">
                    <button type="submit" className="bg-slate-700 rounded-full text-white w-full py-2 text-center outline-slate-400 focus:outline-8 focus:outline-offset-1">Sign in</button>

                    <div className="divider mt-8 w-full text-xs text-slate-400/90 before:bg-slate-300 after:bg-slate-300">Or</div>

                    <Link href={"http://localhost:4000/googlesignin"} className="flex flex-row py-2.5 w-full ring-1 ring-stone-200 rounded-full items-center justify-center gap-x-4 font-publicsans font-light mt-8 text-sm text-stone-500">
                        <Image alt="" src={"/google.webp"} width={256} height={256} className="h-5 w-auto"></Image>
                        <p>Sign in with Google</p>
                    </Link>
                    
                </div>
            </form>
        </div>
    )
}