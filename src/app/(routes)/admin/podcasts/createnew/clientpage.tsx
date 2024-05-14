'use client';

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

export default function ClientCreateNew ({ authors }: { authors: { pictureUrl: string; name: string; surname: string; _id: ObjectId; }[] }) {
    const [selectedTeachers, setSelectedTeachers] = useState<{ [key: number]: boolean | null }>({});
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

        console.log(formData.get("audio"));

        if ((formData.get("audio") as File).type != "audio/mpeg") {
            errorList.push(dictionary.uploadAudioOnly);
        }

        if ((formData.get("audio") as File).size > 30000000) {
            errorList.push(dictionary.fileSizeTooBig);
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

        let res = await fetch(`${process.env.SELFADDR}/admin/podcasts/createnew/api`, {
            method: "POST",
            body: formData
        });

        setWaiting(false);

        if (res.ok) {
            let resjson = await res.json();

            if (resjson.Message == "Success") {
                router.push("/admin/podcasts?message='Podcast added successfully'");
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
                <input type="text" name="title" placeholder="Enter a title" />
                <input type="text" name="subtitle" placeholder="Enter a subtitle" />
                <p>Select a language</p>
                <input type="radio" name="language" value="uz" />uz
                <input type="radio" name="language" value="ru" />ru
                <input type="radio" name="language" value="en" />en
                <p>Select an audio</p>
                <input type="file" onChange={handleChange} accept="audio/mp3" name="audio" />
                {file && ( <audio ref={audioRef} src={file} controls></audio> )}
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
                {error?.length != 0 && error?.map((err) => (
                    <p>An error {err}</p>
                ))}
            </form>
        </div>
    )
}