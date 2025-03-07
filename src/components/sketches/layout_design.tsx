"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEnvelope, FaPhone, FaLocationDot, FaPodcast  } from "react-icons/fa6";



import { FaInstagram, FaFacebook, FaXTwitter, FaYoutube  } from "react-icons/fa6";

import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type User = {

    role: "Teacher" | "Guest" | "Disciple",
    email: string,
    name: string,
    surname: string,
    picUrl: string

}


export default function LayoutDesign ({ children, user }: { children: React.ReactNode, user: User}) {
    return (
        <div className="top_most_container relative w-full">
            <GenericHeader user={user} />
            {children}
            <GenericFooter />
        </div>
        
    );
}

export function Decor () {
    return (
    <svg className={"w-full h-[4rem] fill-blue-900"} xmlns="http://www.w3.org/2000/svg" role="img"><pattern id="bars-pattern-03A-1" x="0" y="0" width="96" height="80" patternUnits="userSpaceOnUse" patternContentUnits="userSpaceOnUse" patternTransform="scale(0.5)"><g className="bars-pattern-H-03A_svg__pattern-stroke"><path fill="none" d="M0 0h96v80H0z"></path><path d="M83.65 73.27A40.27 40.27 0 0 0 87 68.14c.63-1.22 1.13-2.51 1.72-3.75a36.34 36.34 0 0 1 2.69-4.64c.82-1.21 1.69-2.4 2.52-3.56.65-.95 1.45-2 2.08-3v-8.25h-.67c-3.59-.2-7.43-.26-11.26-.28H66.14c-3.19.14-5.87-.31-8.87.19-.64-.12-5-.19-9.27-.19s-8.63.07-9.26.19c-3-.5-5.69 0-8.88-.19-3 .07-6.37.07-9.81 0h-8.12c-3.83 0-7.65.08-11.26.28H0V53c.65 1.13 1.39 2.13 2.1 3.15.82 1.2 1.69 2.39 2.52 3.57a38.89 38.89 0 0 1 2.69 4.64C7.9 65.6 8.39 66.88 9 68.1a42.33 42.33 0 0 0 3.35 5.14 10.76 10.76 0 0 0 1 1.24l.17.19-12.09.14-1.43.11V80c15.51-.72 31.25-1.1 46.79-1.36h2.45c15.49.26 31.3.64 46.76 1.35v-5.08l-1.44-.07-12.08-.14.16-.19a10.12 10.12 0 0 0 1.01-1.24zm-66.34 1.38 1.75-1.24L17.12 72l-1.27-1.34a13.59 13.59 0 0 1-1.42-2.23c-1.79-3-7.37-12.29-7.81-13-.1-.15-.44-.61-.5-.58-.55-1-2-3.29-2-3.4a1 1 0 0 0-.5.14 1.09 1.09 0 0 0 .42-.55l-.32-.2-.23.07c.33-.1 0-.78-.17-1H9l-.33.26a66.85 66.85 0 0 0 3.69 6c.84 1.2 1.7 2.39 2.52 3.57a35.55 35.55 0 0 1 2.69 4.63c.59 1.24 1.09 2.53 1.72 3.75a40.38 40.38 0 0 0 3.34 5.14 13.22 13.22 0 0 0 1 1.24l.07.07zM33 74.52h-.16c-1.12 0-2.26.11-3.39.11h-1.1l-.64-.05 1.46-1.06L27.38 72l-1.28-1.37a13.47 13.47 0 0 1-1.44-2.23c-1.8-3.05-3.13-6.37-5.12-9.3a5 5 0 0 0-.54-.68c0-.3-.75-1-.57-1.19a9.77 9.77 0 0 1-1.56-1.78.9.9 0 0 0-.37-.38c0-.1-2.11-3.49-2.09-3.61-.17 0-.14-.19-.08-.41l-.31-.2-.23.07c.34-.1 0-.78-.17-1h5.63l-.34.26a69.92 69.92 0 0 0 3.7 6c.83 1.2 1.7 2.39 2.51 3.57a35.55 35.55 0 0 1 2.69 4.63c.59 1.24 1.1 2.53 1.72 3.75a41.17 41.17 0 0 0 3.35 5.14 9.52 9.52 0 0 0 1 1.22 5.75 5.75 0 0 1-.88.03zm4.82.06L39 73l-1.32-1-1.28-1.34a13.86 13.86 0 0 1-1.47-2.23c-1.79-3.05-3.13-6.37-5.12-9.3a4.29 4.29 0 0 0-.53-.68.8.8 0 0 0-.34-.77c-.21.08-1.36-1.56-1.79-2.23a.94.94 0 0 0-.36-.38v-.28l-.17.08L24.94 52c-.11-.19-.38-.38-.49-.2a.69.69 0 0 0 .19-.33 1 1 0 0 0-.5.14 1.05 1.05 0 0 0 .42-.55l-.27-.18-.22.07c.33-.1 0-.78-.17-1h5.62l-.33.26a66.85 66.85 0 0 0 3.69 6c.83 1.2 1.7 2.39 2.52 3.57a36.34 36.34 0 0 1 2.69 4.64l.52 1.15a1.91 1.91 0 0 1 0 .89c0 .18-.08.38 0 .52s.3.16.44.25a.92.92 0 0 1 .24.31 4.35 4.35 0 0 0 .45.61 39.61 39.61 0 0 0 3.32 5.18 9.2 9.2 0 0 0 1 1.24s-5.88.02-6.22.01zm13.89-7.68-.87 1.5c-.28.5-.54.9-.84 1.35l-2 3.41L45.52 69l-.11-.18v-.06l-.21-.36c-1.79-3.05-3.12-6.37-5.11-9.3a5 5 0 0 0-.54-.68.8.8 0 0 0-.34-.77c-.21.08-.41-.27-.24-.42-.59-.54-1.79-2.11-1.92-2.19l-.12-.2c-.56-1-2-3.28-2-3.41-.17 0-.15-.19-.08-.41l-.32-.19-.21.07c.32-.11 0-.77-.17-1h27.71c-.16.23-.49.89-.16 1l-.22-.07-.33.19c.07.22.1.41-.08.41 0 .13-1.41 2.45-2 3.41L59 55c-.16.08-1.32 1.65-1.91 2.19a.26.26 0 0 1-.25.42.84.84 0 0 0-.34.77 5.89 5.89 0 0 0-.53.68 83 83 0 0 0-4.24 7.74zm7.91 3.71L58.35 72 57 73l1.14 1.58h-6.31a9.87 9.87 0 0 0 1-1.24 41.57 41.57 0 0 0 3.35-5.14c.63-1.22 1.13-2.5 1.72-3.74a36.34 36.34 0 0 1 2.69-4.64c.81-1.22 1.68-2.4 2.52-3.57a66.75 66.75 0 0 0 3.68-6l-.33-.25h5.63c-.16.23-.51.89-.17 1l-.23-.07-.32.2a1.05 1.05 0 0 0 .42.55 1 1 0 0 0-.5-.14.61.61 0 0 0 .19.33c-.11-.18-.38 0-.48.2l-1.63 2.8-.18-.08v.28a.88.88 0 0 0-.36.38c-.44.67-1.59 2.31-1.79 2.23a.82.82 0 0 0-.35.76 5.67 5.67 0 0 0-.52.69c-2 2.93-3.32 6.24-5.12 9.3a13.57 13.57 0 0 1-1.43 2.18zm10.25 0L68.6 72l-1.79 1.55 1.46 1.06a2.76 2.76 0 0 0-.64 0h-1.12c-1.13 0-2.27-.07-3.39-.12h-1a11.63 11.63 0 0 0 1-1.22 40.34 40.34 0 0 0 3.35-5.13c.62-1.23 1.12-2.51 1.72-3.75a34.12 34.12 0 0 1 2.69-4.64c.81-1.21 1.68-2.4 2.51-3.57a67 67 0 0 0 3.7-6l-.41-.18h5.62c-.15.23-.49.89-.17 1l-.21-.07-.32.19c.06.23.09.41-.08.41 0 .13-2.11 3.52-2.09 3.62a.88.88 0 0 0-.37.37 9.09 9.09 0 0 1-1.55 1.78c.17.16-.63.9-.58 1.19a4.57 4.57 0 0 0-.54.69c-2 2.92-3.32 6.24-5.11 9.3a13.81 13.81 0 0 1-1.41 2.13zm11.78-2.21a14.2 14.2 0 0 1-1.47 2.19L78.85 72l-1.91 1.48 1.8 1.24-6.39-.08.07-.07a10.76 10.76 0 0 0 1-1.24 39.75 39.75 0 0 0 3.35-5.14c.62-1.22 1.13-2.5 1.72-3.74a36.34 36.34 0 0 1 2.69-4.64c.82-1.21 1.69-2.4 2.51-3.57a67 67 0 0 0 3.7-6L87 49.9h5.63c-.17.21-.47.82-.24 1l-.18-.05-.32.19a1.05 1.05 0 0 0 .42.55 1 1 0 0 0-.5-.14c0 .13-1.41 2.45-2 3.41a2.82 2.82 0 0 0-.49.58c-.38.67-5.88 9.93-7.67 12.96zM22.64 28.45zM26.41 41a79.24 79.24 0 0 0 11.11.15c5.51 0 3 .08.45-2.63a5.08 5.08 0 0 0-.68-.46c.06-.29-.22 0-.27 0 .29-.32-.72-1-.9-.58.38-.54-1.6-1.73-1.79-1.65.07-.18-.13-.39-.2-.1 0-.19-.21-.54-.23-.2 0-.22-.25-.37-.41-.5-1.3-1-1.64-1.53-3-.21-2.31 1.86-5 3.84-7.36 5.51h.08a10 10 0 0 0-.9.63c1.41-.09 2.74.28 4.1.04zM1.7 35.75c0-.19-.2-.54-.23-.2 0-.22-.25-.37-.41-.5-.4-.28-.8-.52-1.06-.7v6.93c1.72 0 3.54-.07 5.1-.11 5.49 0 3 .07.43-2.63a4.42 4.42 0 0 0-.67-.46c.06-.29-.22 0-.27 0 .3-.32-.72-1-.9-.58.38-.54-1.6-1.73-1.79-1.65.1-.18-.12-.39-.2-.1zm56.82 5.42a79.08 79.08 0 0 0 11.1-.17c1.36.22 2.69-.15 4.07 0l-.9-.63h.09a133.12 133.12 0 0 1-7.36-5.52c-1.33-1.32-1.67-.75-3 .2-.16.14-.41.29-.4.5 0-.34-.27 0-.24.21-.08-.3-.26-.08-.19.1-.2-.08-2.18 1.11-1.8 1.65-.16-.42-1.16.26-.89.58-.06 0-.33-.3-.28 0a4.66 4.66 0 0 0-.66.43c-2.54 2.73-5.06 2.7.46 2.65zm35.87-26.83c0 .18.2.54.23.2 0 .22.25.38.4.51.41.29.71.54 1 .71V8.83c-1.71 0-3.42.08-5 .11-5.5 0-3-.07-.44 2.63a4.73 4.73 0 0 0 .66.44c0 .29.23 0 .28 0-.29.32.71 1 .9.58-.38.53 1.6 1.73 1.79 1.65-.09.18.1.39.18.1zM91 41.17c1.56 0 3.27.09 5 .11v-6.93c-.27.18-.57.43-1 .72-.13.14-.39.33-.38.5 0-.34-.27 0-.24.21-.08-.3-.26-.08-.19.1C94 35.8 92 37 92.42 37.53c-.17-.42-1.17.26-.9.58 0 0-.33-.3-.28 0a4.66 4.66 0 0 0-.66.43c-2.58 2.68-5.07 2.68.42 2.63zM37.55 8.94a81.23 81.23 0 0 0-11.14.15c-1.36-.21-2.68.15-4.06 0l.89.64h-.08c2.42 1.68 5.07 3.66 7.4 5.52 1.33 1.32 1.67.75 3-.2.16-.13.42-.29.41-.51 0 .34.27 0 .24-.2.07.29.27.08.19-.1.2.08 2.18-1.12 1.8-1.65.15.42 1.16-.26.89-.58.06 0 .33.29.27 0a3.37 3.37 0 0 0 .67-.44c2.53-2.67 5.03-2.67-.48-2.63zm32.06.17A79.08 79.08 0 0 0 58.51 9c-5.5-.06-3-.09-.43 2.61a4.73 4.73 0 0 0 .66.44c-.05.29.22 0 .28 0-.3.32.71 1 .9.58-.38.53 1.6 1.73 1.79 1.65-.07.18.11.39.2.1 0 .18.2.54.23.2 0 .22.24.38.4.51 1.3.95 1.64 1.52 3 .2 2.31-1.86 5-3.84 7.36-5.51h-.08a9.79 9.79 0 0 0 .89-.63c-1.41.08-2.71-.29-4.1-.04zM5 8.94c-1.57 0-3.3-.09-5-.11v7c.28-.18.59-.44 1-.73.16-.16.42-.29.41-.51 0 .34.27 0 .23-.2.07.29.27.08.2-.1.16.03 2.16-1.17 1.79-1.7.15.42 1.17-.26.9-.58 0 0 .33.29.27 0a4.07 4.07 0 0 0 .67-.44C8 8.9 10.53 8.9 5 8.94zm15.7 15.89c-.55-.16-.89-.53-1.21-.54.38-.2-1.31-1-1.64-1.4l-1.79-1.29c-.24-.07-.27-.6-.41-.23a7.49 7.49 0 0 0-1.88 1.22c-.43-.21-.08.31-.35.11-.12-.15-.41.52-.4.61-.25 0-1.08.2-.83.6-.12-.06-.44-.13-.26 0l-.41.26c-.06 0-.1 0-.1.07l-.61.39-.9.59.26.19.19.11a18.59 18.59 0 0 0 4 2.49c.39.21 1 .64 1.35.89 1-.89 2.69-1.73 3.16-2.47.46.14.45 0 .71-.33a7.77 7.77 0 0 0 1.42-.94c-.12-.24-.95-.16-.3-.33zM0 5.63c1.89 0 3.69 0 5.66-.11.54 0 1.23-.33 1.91-.37 3.37-.19 6.86 0 10.28-.07 1.79 0 3.7-.53 5.49-.55h7.07c3.95-.17 8 .12 11.8-.18 1.93-.11 3.87-.12 5.79 0a57.47 57.47 0 0 1 5.87.06c3.85.29 7.85 0 11.8.18 2.29.1 4.7 0 7.07 0 1.79 0 3.68.52 5.49.56 3.42.06 6.91-.14 10.3.05.67 0 1.36.33 1.9.37 2 .15 3.69.12 5.57.11V.49h-.62c-2.61-.09-5-.17-7.47-.32-1.79-.11-3.28.14-5.1.11-5.13-.16-10.4.01-15.57-.19-.39.11-.77.23-1.15.31a.33.33 0 0 0 .12-.21h-5.38c-.2 0-.06.29-.25.18V.22a9.93 9.93 0 0 0-3.22.18.73.73 0 0 0-.14-.31C55.43.5 53.69.09 52 0c-.69 0-1.8.5-2.31 0a2.25 2.25 0 0 1-.89.14V0a1.05 1.05 0 0 1-.66.18 1 1 0 0 1-.69-.18c0 .07-.05 0 0 .12a2.3 2.3 0 0 1-.9-.14c-.49.53-1.62 0-2.3 0A17.11 17.11 0 0 1 39 .09a.77.77 0 0 0-.16.31 9.85 9.85 0 0 0-3.16-.18v.15c-.2.11-.06-.18-.25-.18h-5.38c0 .14 0 .12.11.21s0 .06 0 0C29.78.32 29.39.2 29 .09c-5.17.2-10.44 0-15.57.15-1.8 0-3.33-.22-5.1-.11C5.82.28 3.47.36.87.45L0 .48zm92.19-3.1a2.09 2.09 0 0 1 .43.11h.14a.62.62 0 0 1-.26.65c-.1-.12-.31-.34-.37-.44S92 2.73 92 2.68s.12-.14.19-.15zm-6.08.38a5.15 5.15 0 0 1 1.55-.27c0-.16-.16-.38-.14-.52s.22-.2.28-.32a3.46 3.46 0 0 0 2 .78.64.64 0 0 0 0-.45h1.43a2.91 2.91 0 0 0-.59.1v.07a.54.54 0 0 0 .52.08s.13.1.14.14.12.22 0 .25a3.81 3.81 0 0 0-.9.57c-1.28-.7-3-.35-4.42-.35zm-3 0c.1 0 .1-.35.23-.35.31 0 .71.21 1 .25 0 0-.07-.28 0-.28a6 6 0 0 1 1 .13c.08 0 0 .24.09.29-.78.08-1.53-.07-2.31 0zm-.39-.33s.14.22.13.27a2.75 2.75 0 0 1-.33.23h-.08a2.69 2.69 0 0 1 .31-.53zm-1 0c.06 0 .19 0 .22.07a.93.93 0 0 1 0 .29.08.08 0 0 1-.08.07h-.22a1.13 1.13 0 0 1-.21-.35 2 2 0 0 1 .28-.11zm-7.4.1s0 .23.08.29c.31-.21.38-.45.76-.64a.83.83 0 0 1 .9.32.71.71 0 0 1-.37.15.74.74 0 0 0 .25.52v.08a2.28 2.28 0 0 1-.64 0c-.15-.07 0-.34 0-.43-.38.09-.75.21-1.12.3 0-.11-.16-.36-.14-.44s.22-.19.27-.18zm-10.25.02H65a.54.54 0 0 0 .15.38 1.64 1.64 0 0 1-1-.17c-.15 0-.15-.2-.08-.21zm-4.81.47c.06 0 .4.12.49 0s-.06-.41 0-.51.45 0 .57-.11.13-.43.24-.59c.21.16.11.44.14.68a11 11 0 0 1 1.3.08.11.11 0 0 1 .13.09v.56a2.91 2.91 0 0 0-1.27-.46.56.56 0 0 0 .21.38c-.57.33-1.12.1-1.72.24-.03-.08-.14-.31-.09-.36z"></path><path d="M94.58 22.25c-.5-.31-1-1.1-1.51-1.11-.12-.54-.46-.59-.83-.68-.1 0-.11-.29-.21-.37l-1.34-1.18c-.5-.46-1.18-.77-1.6-1.23 0 0-.32.39-.15.13.1-.9-1-.19-1-1.26-.09-.49-.66.32-.54-.43-.23-.22-.67-.05-.83-.41l-.09.2c.08-.52-.16-.66-.5-.4-1.47-2-3.79-3-5.86-4.58a19.87 19.87 0 0 1-2.37 1.85h-.06a6.25 6.25 0 0 1-1.12 1.06c-.55 0-.47.82-1.09.76-.49-.26-.41.1-.64.28.36.65-.32 0-.42.75-1 .48-1.79 1.68-2.92 2 0 .23-.23.79-.41.43v-.05c-.65 1.27-2.52 1.72-3 3a4.35 4.35 0 0 0-1.28.75l-2.48 2.1-1.13-.95a1.86 1.86 0 0 1-.26-.23c.33-.17 0-.29-.2-.36a1.78 1.78 0 0 1-.43-.18 6.14 6.14 0 0 1-.43-.45 13.88 13.88 0 0 0-1.29-1 6.53 6.53 0 0 1-.63-.55c-.18-.16-.35-.42-.6-.46s-.26 0-.37-.15a2.52 2.52 0 0 0-.21-.4 3.44 3.44 0 0 0-.64-.57c-.12-.08-1.23-.77-1.17-.89s-.31.38-.14.13c.1-.9-1-.19-1-1.26-.05-.3-.3-.11-.45-.09s-.13-.05-.09-.34c-.22-.22-.66-.05-.82-.41l-.09.2c.08-.56-.2-.65-.5-.4-1.47-1.92-3.66-3-5.79-4.53-2.09 1.46-4.3 2.61-5.75 4.53-.31-.25-.58-.16-.5.4l-.09-.2c-.16.36-.61.19-.83.41 0 .29 0 .35-.09.34s-.39-.21-.44.09c0 1.07-1.14.4-1 1.26.17.25-.15-.13-.15-.13-.63.69-1.87 1.05-2.17 2.12-.14-.19-.27-.25-.11.08-.24-.41-.32.08-.06.05.09.3-.56-.45-.12.2-.15 0-.28-.5-.19.08-.11-.1-.18-.14-.23-.14-.67.69-1.61 1.12-2.31 2-.15.3-1.37.35-.78.66a1.43 1.43 0 0 1-.26.23l-1.09.94-2.48-2.1A4.35 4.35 0 0 0 28 21c-.46-1.24-2.33-1.69-3-3-.18.36-.41-.2-.41-.43-1.15-.33-1.91-1.53-2.91-2-.1-.77-.78-.1-.43-.75-.24-.18-.15-.54-.63-.28-.62.06-.54-.76-1.09-.76a5.63 5.63 0 0 1-1.12-1.06h-.08a21.55 21.55 0 0 1-2.33-1.8c-2.07 1.54-4.39 2.61-5.86 4.58-.34-.26-.59-.12-.51.4l-.09-.2c-.16.36-.6.19-.82.41.12.75-.46-.06-.54.43 0 1.07-1.14.4-1 1.26.17.26-.14-.13-.14-.13-.42.46-1.1.77-1.61 1.23l-1.36 1.18c-.09.08-.1.35-.21.37-.37.09-.7.14-.82.68-.56 0-1 .81-1.52 1.11-.25.12-1.07.23-.45.42-.16.24-.76.34-1.07.53v4.25c3.59 2.37 9.13 7.56 12.17 9.23l.26.2c0 .2.12.17.21.16l.11.07 3.31 2.5 4-3.57h-.25a56.07 56.07 0 0 0 6.11-5.09c1.19.26 3.95-3.28 5.52-3.77 4.37 2.27 8.42 6.91 12.55 9.53l3.9 2.94h.2L52 36.7c4.15-2.62 8.21-7.26 12.55-9.53 1.57.49 4.33 4 5.52 3.77a57.16 57.16 0 0 0 6.2 5.06h-.14l4 3.57 3.31-2.5.1-.07c.1 0 .22 0 .22-.16l.26-.2c3-1.67 8.39-6.8 12-9.21v-4.22a2.91 2.91 0 0 1-1-.54c.63-.19-.19-.3-.44-.42zm-67.86 3.06h-.15c-1 .67-2.82 2.42-3.73 3v.08l-.11-.08c.08.14 0 .14-.09.1h-.08c.13.38-.1.26-.24.27-.35.09-.4.9-.9.77h-.07c0 .1.06.16.12.28a11.25 11.25 0 0 0-3.29 2.39l-2.63 2.49-2.54-2-.6-.46C.18 21.81 3.25 27.47 13.76 17.11c.46.3.9 0 .79-.68.25.31.8 0 .89-.43 2.34.9 4.58 4.22 7 5.36-.15.18.8 1 1.13.89 0 .54.61.89.81 1 .94.4 1.79 1.74 2.44 1.92-.17.1-.13.09 0 .07-.05.04-.3.04-.1.07zm30.64 1.87v.1c-2.1 1.26-4 3.57-6.16 5l-3 2.34-.25.19-.3-.19-2.92-2.39c-2.14-1.45-4.06-3.79-6.17-5.05v-.05c-1.29-1.13-2.48-1.32-2-2.2l7.74-6.33a5.86 5.86 0 0 0 1.55-1.51c.51.32.9-.11.77-.69.26.29.79 0 .9-.43h.89c.09.4.63.72.9.43-.09.58.26 1 .76.69.14.68 6 4.87 6 4.87.8.56 1.32 1.16 2.08 1.66 2.55 2.22.97 2.02-.79 3.56zm26.21 5-.6.46-2.54 2-2.63-2.46a11.55 11.55 0 0 0-3.32-2.44l.12-.28h-.08c-.46.15-.51-.67-.9-.76-.09 0-.21 0-.26-.1s0-.13 0-.18-.32-.2-.44-.27l-.39-.27c-.46-.37-.89-.77-1.34-1.15s-.63-.54-1-.8c-.15-.13-.3-.3-.47-.43a1.66 1.66 0 0 0-.33-.15s-.28-.17-.25-.19c.9-.5 1.45-1.5 2.42-1.91.2-.11.77-.45.82-1 .32.12 1.27-.72 1.12-.89 2.4-1.14 4.65-4.46 7-5.36.08.4.64.74.9.43-.09.72.32 1 .78.68 10.61 10.36 13.68 4.7 1.39 15.06z"></path><path d="M52.31 24.24s0-.06-.1-.07l-.41-.26a.42.42 0 0 0-.26 0c.25-.4-.59-.64-.84-.6 0-.09-.28-.76-.39-.61-.27.2.08-.32-.36-.11a7.49 7.49 0 0 0-1.88-1.22H48a7.32 7.32 0 0 0-1.88 1.22c-.44-.21-.09.31-.36.11-.11-.15-.41.52-.39.61-.25 0-1.09.2-.84.6-.11-.06-.44-.13-.25 0l-.42.26c-.06 0-.1 0-.1.07l-.61.39-.9.59.26.19.19.11a18.92 18.92 0 0 0 3.74 2.37c.4.21 1.25.77 1.65 1 .38-.21 1.27-.79 1.67-1a19.3 19.3 0 0 0 3.7-2.35l.18-.11.26-.19-.95-.59zm32.32 0s0-.06-.1-.07l-.42-.26c.18-.12-.15-.05-.26 0 .26-.4-.58-.64-.83-.6 0-.09-.28-.76-.39-.61-.27.2.08-.32-.36-.11a7.68 7.68 0 0 0-1.88-1.22c-.14-.37-.17.16-.42.23l-1.74 1.32c-.33.39-2 1.19-1.64 1.4-.34 0-.66.37-1.21.53.6.21-.23.09-.32.31a7.28 7.28 0 0 0 1.44.94c.25.3.24.47.7.33.5.74 2.14 1.56 3.15 2.47.39-.2 1-.63 1.36-.89a19 19 0 0 0 4-2.49l.19-.11.26-.19-.93-.59z"></path></g></pattern><rect fill="url(#bars-pattern-03A-1)" width="100%" height="4rem"></rect></svg>
    )
}

import { FaStepBackward } from "react-icons/fa";
import { FaStepForward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { Slider } from "@/components/ui/slider"
import { FaVolumeUp } from "react-icons/fa";


function GenericFooter () {
    let pathname = usePathname();

    const [audioPlayer, setAudioPlayer] = useState({
        playerShow: false
    });

    return (
        <div className="mt-20">
            <div className={(audioPlayer.playerShow ? "fixed" : "hidden") + " w-full px-6 flex flex-row justify-between items-center border-t bg-white backdrop-blur-md bottom-0 py-3"}>
                <div className="h-fit w-2/3 sm:w-1/2 md:w-1/3 flex flex-row items-center gap-x-4">
                    <div className="relative h-fit aspect-square min-w-fit">
                        <Image src={"/background_raw.png"} className="rounded-md h-12 w-12 object-cover" alt="" width={200} height={200} />
                    </div>
                    <div>
                        <h3 className="text-xs sm:text-sm font-bold">Detras de las Leyenedas - EP1: Leonidas</h3>
                        <p className="text-xs">20 mins left</p>
                    </div>
                </div>
                <div className="flex flex-row w-1/3 sm:w-1/2 md:w-1/3 items-center gap-x-4 sm:gap-x-9 justify-end md:justify-center">
                    <FaStepBackward className="w-5 h-5" />
                    <FaPlay className="w-5 h-5" />
                    <FaStepForward className="w-5 h-5" />
                </div>
                <div className="w-1/3 hidden md:flex flex-row pl-10 lg:pl-20 xl:pl-36 gap-x-3">
                    <FaVolumeUp />
                    <Slider defaultValue={[33]} max={100} step={1} />
                    <Badge>1.0x</Badge>
                </div>
            </div>
            <Decor />
            <div className="mt-16"></div>
            {pathname == "/" && <div className="px-5 lg:px-20 grid grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 mb-20">
                <div className="col-span-1">
                    <Image className="h-8 lg:h-12 min-w-fit w-fit" alt="" src={"/logomarkaz.png"} width={300} height={78}></Image>
                    <div className="mt-5 text-sm font-dmsans leading-relaxed text-slate-500/70">
                        <p className="">Copyright © 2024 Saudi Tourism</p>
                        <p className="">Authority. All rights reserved</p>
                    </div>
                    
                </div>
                <div className="col-span-1">
                    <p className="font-poppins text-blue-950 font-medium text-lg">Seasons & Events</p>
                    <div className="font-dmsans my-6 text-[15px] text-slate-700/90 font-light space-y-2">
                        <div><Link href={"/"}>Riyadh Season</Link></div>
                        <div><Link href={"/"}>Jeddah Events Calendar</Link></div>
                        <div><Link href={"/"}>Diriyah Season</Link></div>
                    </div>
                </div>
                <div className="col-span-1">
                    <p className="font-poppins text-blue-950 font-medium text-lg">Discover Saudi</p>
                    <div className="font-dmsans my-6 text-[15px] text-slate-700/90 font-light space-y-2">
                        <div><Link href={"/"}>See & Do</Link></div>
                        <div><Link href={"/"}>Plan Your Trip</Link></div>
                        <div><Link href={"/"}>Travel Essentials</Link></div>
                        <div><Link href={"/"}>Saudi Rewards</Link></div>
                    </div>
                </div>
                <div className="col-span-1">
                    <p className="font-poppins text-blue-950 font-medium text-lg">Useful Information</p>
                    <div className="font-dmsans my-6 text-[15px] text-slate-700/90 font-light space-y-2">
                        <div><Link href={"/"}>About Saudi</Link></div>
                        <div><Link href={"/"}>Safety Travel Tips</Link></div>
                        <div><Link href={"/"}>Useful Contacts</Link></div>
                        <div><Link href={"/"}>Travel Guidelines</Link></div>
                    </div>
                </div>
            </div>}

            <div className="bg-blue-800 px-5 xl:px-20 pt-12">
                
                <div className="grid grid-cols-5 lg:grid-cols-8 gap-y-10 gap-x-8">
                    <div className="border-r-[1px] col-span-2 border-r-white/20">
                        <p className="text-white/85 font-dmsans text-white">Powered by</p>
                        <div className="w-32 mt-4 flex flex-col gap-y-7">
                            <Image className="w-full h-auto" alt="" src={"/uzlogo.png"} width={130} height={1} />
                            <Image className="w-full h-auto" alt="" src={"/piima.svg"} width={100} height={1} />
                        </div>
                    </div>
                    <div className="border-r-[0px] lg:border-r-[1px] col-span-3 border-r-white/20">
                            <p className="font-poppins text-white font-medium text-lg">Contact us</p>
                            <div className="font-dmsans w-fit my-6 text-[13px] xl:text-[15px] text-white font-light space-y-4">
                                <div className="flex flex-row items-center gap-x-3">
                                    <FaPhone className="w-4" /><Link href={"/"}>+998991110000</Link>
                                </div>
                                <div className="flex flex-row items-center gap-x-3">
                                    <FaEnvelope className="w-4" /><Link href={"/"}>info@markaz.uz</Link>
                                </div>
                                <div className="flex flex-row items-center gap-x-3 w-10/12">
                                    <FaLocationDot  className="w-4" /><Link href={"/"}>Toshkent shahri Yashnabod tumani Mahtumquli ko‘chasi</Link>
                                </div>
                            </div>
                    </div>
                    <div className="text-white col-span-5 lg:col-span-3">
                            <p className="font-poppins font-medium text-lg">Subscribe to our Newsletter</p>
                            <p className="leading-[1.9] font-thin font-publicsans text-xs mt-1 text-white/85">Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus magnam ad iusto quasi vitae culpa voluptatem voluptatum provident consequuntur mollitia, nihil ea aliquid fugit. Asperiores deleniti ea quaerat consectetur consequatur.</p>
                            <div className="mt-5 flex flex-row">
                                <input
                                type="text" 
                                className="bg-white w-full font-light text-slate-950 font-poppins text-sm py-2 px-4 focus:outline-none" 
                                placeholder="Email address" 
                                />
                                <div className="py-1 px-4 font-dmsans bg-signature text-white  right-0">Subscribe</div>
                            </div>
                    </div>
                </div>
                <div className="w-full flex flex-col md:flex-row gap-y-5 justify-between mt-12 py-6 border-t-[1px] border-t-white/20">
                    <div className="flex flex-row gap-x-5 lg:gap-x-8 text-white font-dmsans text-[13px] font-light">
                        <p>Cookies</p>
                        <p>Privacy Policy</p>
                    </div>
                    <div className="flex flex-row gap-x-5 lg:gap-x-8 items-center text-lg text-white font-light">
                        <p className="text-xs font-sora">Connect with us</p>
                        <FaInstagram />
                        <FaFacebook />
                        <FaXTwitter />
                        <FaYoutube />
                    </div>
                </div>
            </div>
        </div>
    )
}

function GenericHeader ({ user }: { user: User }) {
    const [showBackground, setShowBackground] = useState(true);

    const pathname = usePathname()

    const generateHandleScrollFunction = (pixels_from_top: number) => {
        return function () {
            if (window.scrollY >= pixels_from_top) {
                setShowBackground(true)
            } else {
                setShowBackground(false)
            }
        }
    }

    const [meeting, setMeeting] = useState<{ live: "active" | "loading" | "noactive"; loading?: boolean; meetingUrl?: string; }>({
        live: ( user.role == "Teacher" ? "loading" : "noactive" )
    });

    useEffect(() => {
        if (user.role != "Guest") {
            const fetchMeeting = async () => {
                let req = await fetch("/api/meetings/getInfo", {
                    method: "GET",
                    credentials: "include"
                });

                if (req.ok) {
                    let data = await req.json();

                    if (data.message == "success") {
                        if (data.live) {
                            setMeeting({ live: "active", meetingUrl: data.meetingUrl });
                        } else {
                            setMeeting({ live: "noactive" });
                        }
                    }
                }
            }

            fetchMeeting();
        }
    }, []);

    const handleMeetingStart = () => {
        setMeeting({ live: "loading" });

        setTimeout(async () => {
            if (meeting.live == "noactive") {
                let req = await fetch('/api/meetings/create', { method: "GET", credentials: "include" });

                if (req.ok) {
                    let res = await req.json();

                    if (res.message == "success") {
                        setMeeting({ live: "active", meetingUrl: res.meetingUrl });
                    }
                }
            }
        }, 0);
    }

    const handleMeetingEnd = () => {
        setMeeting({ live: "loading" });

        setTimeout(async () => {
            if (meeting.live == "active") {
                let req = await fetch('/api/meetings/end', { method: "GET", credentials: "include" });

                if (req.ok) {
                    let res = await req.json();

                    if (res.message == "success") {
                        setMeeting({ live: "noactive" });
                    }
                }
            }
        }, 0);
    }

    const handleMeetingJoin = () => {
        window.location = meeting.meetingUrl || "";
    }
  
    useEffect(() => {
        let handleScroll = generateHandleScrollFunction(pathname == "/" ? 40 : 0);

        setMobileMenu(false);

        handleScroll();
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
        }
      }, [pathname]);

      const [mobileMenu, setMobileMenu] = useState(false);

      function handleMobileMenuClick () {
        setMobileMenu(!mobileMenu);
      }

      let actionsBlock = 
        (<div className="actions flex flex-row gap-x-4 items-center">

        { meeting.live == "loading" ? (
            <div className={"flex py-2 px-5  rounded-full flex-row items-center gap-x-3 " + (showBackground || mobileMenu ? " bg-white text-slate-800 border shadow-sm" : " bg-white/20 text-white") }>
                <AiOutlineLoading3Quarters className="w-4 h-4 animate-spin" />
                <p className="text-sm">Loading</p>
            </div>
        ) : (
            <>
            {meeting.live == "active" ? (
                <div onClick={() => { handleMeetingJoin(); }} className={"flex py-2 px-5 rounded-full flex-row items-center gap-x-3 cursor-pointer " + (showBackground || mobileMenu ? " bg-white text-slate-800 border shadow-sm" : " bg-white/20 text-white") }>
                <BsFillPeopleFill className="w-4 h-4" />
                <p className="text-sm">Join</p>
                </div>
            ) : (<></>)}

            {user.role == "Teacher" && (
                meeting.live == "active" ? (
                    <div onClick={() => { handleMeetingEnd(); }} className={"flex py-2 px-5 rounded-full flex-row items-center gap-x-3 cursor-pointer text-white" + (showBackground || mobileMenu ? " bg-red-500/90" : " bg-red-500/70 ") }>
                    <MdOutlinePhoneCallback />
                    <p className="text-sm">End</p>
                    </div>
                ) : (

                    <div onClick={() => { handleMeetingStart(); }} className={"flex py-2 px-5 rounded-full flex-row items-center gap-x-3 cursor-pointer transition-colors duration-150 ease-in-out hover:bg-blue-500/100 text-white" + (showBackground || mobileMenu ? " bg-blue-500/90 shadow-lg" : " bg-blue-500/80 ") }>
                    <FaVideo />
                    <p className="text-sm">Start</p>
                    </div>

                )
            )}
            </>
        )}


        </div>)
  
    return (
        <>
        <div className={"w-full sticky top-0 z-50"}>
            <div className={"text-white z-50  transition-all duration-[170ms] flex flex-row items-center px-6 md:px-10 lg:px-16 py-4 w-full border-b-2 " + (showBackground || mobileMenu ? "bg-white/95 backdrop-blur-md border-b-black/5" : "bg-transparent border-b-transparent")}>
            <div className="flex flex-row items-center gap-x-4">
                <Link href={"/"}>{ showBackground || mobileMenu ?  <Image className="h-10 md:h-10 min-w-fit w-fit"  alt="" src={"/logomarkaz.png"} width={300} height={78} /> : <Image className="h-10 md:h-10 min-w-fit w-fit"  alt="" src={"/logomarkaz_white.png"} width={300} height={78} /> }</Link>
                <div className="text-black cursor-pointer block lg:hidden w-fit h-fit p-1 border rounded-md">
                    <IoMdMenu onClick={() => handleMobileMenuClick()} className={"w-4 h-4" + (showBackground || mobileMenu ? " text-black" : " text-white")} />
                </div>
            </div>
            <div className={"ml-12 xl:ml-20 hidden lg:block space-x-12 font-poppins tracking-normal " + (showBackground ? "text-signature" : "text-white")}> {/* poppins, sora */}
                <Link className="" href={"/"}>Home</Link>
                <Link className="" href={"/blog"}>Blog</Link>
                <Link className="" href={"/podcasts"}>Podcasts</Link>
                <Link className="" href={"/faq"}>FAQ</Link>
                {user.role == "Teacher" && (
                  <DropdownDemo />
                )}
            </div>
            {user.role == "Guest" ? (
            <div className="ml-auto">
                <Link href={"/signin"}>
                <div className={"py-1.5 px-7 rounded-full  font-poppins font-medium " + (showBackground || mobileMenu ? "bg-signature text-white" : "bg-white text-signature")}>Sign in</div>
                </Link>
            </div>
        ) : (
            <div className=" text-black ml-auto flex flex-row gap-x-6 items-center">
                <div className="hidden md:block">{actionsBlock}</div>

                <div>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <div className="flex flex-row items-center gap-x-2">
                                <Avatar>
                                    <AvatarImage src={user.picUrl} className={"object-cover"} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </div>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 mr-4">
                            <div className="flex justify-between space-x-4">
                            <Avatar className="w-14 h-14">
                                <AvatarImage src={user.picUrl} className={"object-cover object-center"} />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                                <h4 className="text-sm font-semibold">{user.name} {user.surname}</h4>
                                <p className="text-sm">
                                    {user.role} at Pedagogy center in Tashkent
                                </p>
                                <div className="flex items-center pt-2">
                                <span className="text-xs text-muted-foreground">
                                {user.email}
                                </span>
                                </div>
                            </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </div>
            </div>
        )}
            </div>

            
        {mobileMenu ? (<div className={"text-signature gap-y-5 absolute bg-white z-50 flex flex-col px-6 md:px-10 lg:px-16 py-4 w-full border-b-2 " + (showBackground || mobileMenu ? "bg-white/95 backdrop-blur-md border-b-black/5" : "bg-transparent border-b-transparent")}>
                {actionsBlock}
                <div className="flex flex-row">
                <div className="w-1/2 space-y-3">
                    <Link className="block" href={"/"}>Home</Link>
                    <Link className="block" href={"/blog"}>Blog</Link>
                    <Link className="block" href={"/podcasts"}>Podcasts</Link>
                    <Link className="block" href={"/faq"}>FAQ</Link>
                </div>
                { user.role == "Teacher" && (
                    <div className="w-1/2 rounded-xl px-4">
                        <h4 className="text-sm font-semibold">Admin</h4>
                        <div className="space-y-3 mt-3">
                            <Link className="flex flex-row items-center gap-x-2 hover:bg-slate-200 py-2 rounded-sm px-1.5 text-sm font-medium leading-none" href={"/admin/blogs"}><IoMdDocument className="h-4 w-4" /><span>Manage blogs</span></Link>
                            <Link className="flex flex-row items-center gap-x-2 hover:bg-slate-200 py-2 rounded-sm px-1.5 text-sm font-medium leading-none" href={"/admin/podcasts"}><FaPodcast className="h-4 w-4" /><span>Manage podcasts</span></Link>
                            <Link className="flex flex-row items-center gap-x-2 hover:bg-slate-200 py-2 rounded-sm px-1.5 text-sm font-medium leading-none" href={"/admin/faq"}><AiFillQuestionCircle className="h-4 w-4" /><span>Manage questions</span></Link>
                            <Link className="flex flex-row items-center gap-x-2 hover:bg-slate-200 py-2 rounded-sm px-1.5 text-sm font-medium leading-none" href={"/"}><MdManageAccounts className="h-4 w-4" /><span>Manage accounts</span></Link>
                        </div>
                    </div>
                ) }
                </div>
        </div>) : (<></>)}

        </div>
        
        </>
    )
  }

  import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
import { Button } from "../ui/button";
import { FaVideo } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdManageAccounts, MdOutlinePhoneCallback } from "react-icons/md";
import { AiFillQuestionCircle, AiOutlineLoading } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdDocument, IoMdMenu } from "react-icons/io";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "../ui/badge";

function DropdownDemo () {
  return (
    <DropdownMenu>
    <DropdownMenuTrigger className="focus:outline-none">Admin</DropdownMenuTrigger>
    <DropdownMenuContent className="w-56 mt-2">
      <DropdownMenuItem className="py-2.5">
        <IoMdDocument className="mr-2 h-4 w-4" />
        <span>Manage blogs</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="py-2.5">
        <FaPodcast className="mr-2 h-4 w-4" />
        <span>Manage podcasts</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="py-2.5">
        <AiFillQuestionCircle className="mr-2 h-4 w-4" />
        <span>Manage faqs</span>
      </DropdownMenuItem>
      <DropdownMenuItem className="py-2.5">
        <MdManageAccounts className="mr-2 h-4 w-4" />
        <span>Manage accounts</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  
  );
}
