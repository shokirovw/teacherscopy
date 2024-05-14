'use client';

import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";

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

export default function VideoCreateClient ({ authors, accessToken }: { authors: { pictureUrl: string; name: string; surname: string; _id: ObjectId; }[], accessToken: string }) {
    const [selectedTeachers, setSelectedTeachers] = useState<{ [key: number]: boolean | null }>({});
    const [error, setError] = useState<string[]>([]);
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

        if (formData.get("description")?.toString().trim() == "") {
            errorList.push("Empty subtitle is disallowed");
        }

        let lang = formData.get("language");

        if (!(lang == "uz" || lang == "en" || lang == "ru")) {
            errorList.push(dictionary.nolanguage);
        }
        
        let fileType = (formData.get("presentation") as File).type;

        if (!(fileType == "application/pdf" || fileType == "application/vnd.openxmlformats-officedocument.presentationml.presentation" || fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            errorList.push("Filetype is not allowed");
        }

        if ((formData.get("presentation") as File).size > 30000000) {
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
        formData.append("hashtags", hashtags.join("|"));

        setWaiting(true);

        let res = await fetch(`${process.env.SELFADDR}/admin/blogs/createnew/video/api`, {
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

    const [fileLocalSrc, setFileLocalSrc] = useState();
    const [fileProperties, setFileProperties] = useState();

    let inputRef = useRef<HTMLInputElement>();

    function handleChange (e) {
        if (e.target.files.length == 1) {
            setFileLocalSrc(URL.createObjectURL(e.target.files[0]));
            setFileProperties(e.target.files[0]);
        } else {
            setFileLocalSrc(undefined);
            setFileProperties(undefined);
        }
    }

    const [hashtags, setHashtags] = useState<string[]>([]);

    function handleHashtagClick () {
        let inputValue = inputRef.current!.value;
        setHashtags(prevArray => [...prevArray, inputValue]);
        inputRef.current!.value = "";
    }

    let router = useRouter();
    
    return (
        <div>
            <h1>Create a new video</h1>
            <form onSubmit={handleSubmit}>
                {waiting && (<p>Waiting a fetch</p>)}
                <input type="text" name="title" placeholder="Enter a title" />
                <input type="text" name="subtitle" placeholder="Enter a subtitle" />
                <p>Select a language</p>
                <input type="radio" name="language" value="uz" />uz
                <input type="radio" name="language" value="ru" />ru
                <input type="radio" name="language" value="en" />en
                <p>Select authors</p>
                <div>
                    {authors.map((author, i) => (
                        <div key={i} className={"" + (ifHighlight(i) ? "bg-blue-200" : "")} onClick={() => teacherPressed(i)}>
                            <p>Author name: {author.name}</p>
                            <p>{author.surname}</p>
                        </div>
                    ))}
                </div>
                <p>Specify hashtags</p>
                <input type="text" ref={inputRef}  />
                <Button type="button" onClick={() => handleHashtagClick()}>Add</Button>
                <div>
                    <p>Here are hashtags</p>
                    {hashtags.map((hashtag) => (
                        <p>{hashtag}</p>
                    ))}
                </div>
                <p>Preentation upload</p>
                <input type="file" onChange={handleChange} accept=".pdf, .pptx, .docx" name="presentation" />
                {fileLocalSrc && ( <iframe src={fileLocalSrc}></iframe> )}
                <button type="submit">Submit</button>
                {error?.length != 0 && error?.map((err, i) => (
                    <p key={i}>An error {err}</p>
                ))}
            </form>
        </div>
    )
}