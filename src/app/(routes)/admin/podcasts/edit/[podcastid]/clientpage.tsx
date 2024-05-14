'use client';

import { Podcast } from "@/app/(routes)/podcasts/page";
import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

const dictionary = {
    "fillintitle" : "Please fill in title",
    "fillinsubtitle": "Please fill in subtitle",
    "nolanguage": "No language selected",
    "uploadAudioOnly": "Please upload only audio",
    "fileSizeTooBig": "Audio size limit exceeded",
    "teacherIndexOutOfRange": "Teachers index out of range",
    "error": "Error happened",
    "wrongApiParams": "Wrong data entered, please rectify"
}

export default function ClientUpdatePage ({ originalData, authors }: { originalData: Podcast; authors: { pictureUrl: string; name: string; surname: string; _id: ObjectId; }[] }) {
    let authorsIndexes: {[key: number]: boolean | null} = {};

    for (let i = 0; i < originalData.authorsIds.length; ++i) {
        for (let j = 0; j < authors.length; ++j) {
            if (originalData.authorsIds[i] == authors[j]._id) {
                authorsIndexes[j] = true;
                break;
            }
        }
    }

    const [selectedTeachers, setSelectedTeachers] = useState<{ [key: number]: boolean | null }>(authorsIndexes);
    const [error, setError] = useState<string[]>();
    const [waiting, setWaiting] = useState<boolean>(false);

    const teacherPressed = (index: number) => {
        if (selectedTeachers[index] === true) {
            setSelectedTeachers({ ...selectedTeachers, [index]: null });
        } else {
            setSelectedTeachers({ ...selectedTeachers, [index]: true });
        }
    }

    const ifHighlight = (index: number) => {
        if (selectedTeachers[index] === true) {
            return true;
        } else return false;
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        let errorList = [];

        if (formData.get("title")?.toString().trim() == "") {
            errorList.push(dictionary.fillintitle);
        }

        if (formData.get("subtitle")?.toString().trim() == "") {
            errorList.push(dictionary.fillinsubtitle);
        }

        let lang = formData.get("language");

        if (!(lang == "uz" || lang == "en" || lang == "ru")) {
            errorList.push(dictionary.nolanguage);
        }

        if (file) {
            console.log("Changed");

            if ((formData.get("audio") as File).type != "audio/mpeg") {
                errorList.push(dictionary.uploadAudioOnly);
            }
    
            if ((formData.get("audio") as File).size > 30000000) {
                errorList.push(dictionary.fileSizeTooBig);
            }

            formData.append("audiochanged", "1");
        } else {
            console.log("Hasnot changed");
            formData.append("audiochanged", "0");
        }

        

        if (errorList.length != 0) {
            setError(errorList);
            return;
        }

        let ids = "";

        let added = false;

        for (let key in selectedTeachers) {
            if (selectedTeachers[key] === true) {
                if (!added && (Number(key) < 0 || Number(key) > authors.length)) {
                    errorList.push(dictionary.teacherIndexOutOfRange);
                }

                added = true;
                ids = "|" + authors[key]._id;
            }
        }

        if (errorList.length != 0) {
            setError(errorList);
            return;
        }

        if (added) {
            ids = ids.substring(1);
        }

        formData.append("authorIds", ids);
        formData.append("audioDuration", audioRef.current!.duration.toString());

        setWaiting(true);

        let res = await fetch(`${process.env.SELFADDR}/admin/podcasts/edit/` + originalData._id.toString() + "/api", {
            method: "POST",
            body: formData
        });

        setWaiting(false);

        if (res.ok) {
            let resjson = await res.json();

            if (resjson.Message == "Success") {
                router.push("/admin/podcasts?message='Podcast updated successfully'");
            } else {
                setError([dictionary.wrongApiParams]); return;
            }
        } else {
            setError([dictionary.error]); return;
        }
    }

    const [file, setFile] = useState();

    function handleChange (e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    const audioRef = useRef<HTMLAudioElement>();

    let router = useRouter();
    
    return (
        <div>
            <h1>Create a new podcast</h1>
            <form onSubmit={handleSubmit}>
                {waiting && (<p>Waiting a fetch</p>)}
                <input type="hidden" name="podcastid" defaultValue={originalData._id.toString()}  />
                <input type="text" name="title" defaultValue={originalData.title} placeholder="Enter a title" />
                <input type="text" name="subtitle" defaultValue={originalData.subtitle} placeholder="Enter a subtitle" />
                <p>Select a language</p>
                {["uz", "ru", "en"].map((langstr, i) => {
                    if (langstr == originalData.language) {
                        return (<span key={i}><input type="radio" name="language" value={langstr} defaultChecked /><span>{langstr}</span></span>);
                    } else {
                        return (<span key={i}><input type="radio" name="language" value={langstr} /><span>{langstr}</span></span>);
                    }
                })}
                <p>Select an audio</p>
                <input type="file" onChange={handleChange} accept="audio/mp3" name="audio" />
                <audio ref={audioRef} src={(file ? file : `/assets/podcasts/${originalData.audioUrl}`)} controls></audio>
                <p>Select authors</p>
                <div>
                    {authors.map((author, i) => (
                        <div key={i} className={"" + (ifHighlight(i) ? "bg-blue-200" : "")} onClick={() => teacherPressed(i)}>
                            <p>Author name: {author.name}</p>
                            <p>{author.surname}</p>
                        </div>
                    ))}
                </div>
                <button type="submit">Submit</button>
                {error?.length != 0 && error?.map((err, i) => (
                    <p key={i}>An error {err}</p>
                ))}
            </form>
        </div>
    )
}