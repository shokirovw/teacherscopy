'use client';

import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { FormEvent, createElement, createRef, useEffect, useRef, useState } from "react";
import credentials from "./credentials.json";

import { useGoogleLogin, useGoogleOAuth } from '@react-oauth/google'

import { Video } from "@/app/(routes)/blog/page";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { AlertDialog } from "@radix-ui/react-alert-dialog";
import { AlertDialogDemo } from "@/components/sampledialog";

import moment, { duration } from 'moment';


// async function some_function () {
//     const gapi = await loadGapiInsideDOM();

//     gapi.client.
// }

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

export default function VideoCreateClient ({ authors }: { authors: { pictureUrl: string; name: string; surname: string; _id: ObjectId; }[]; }) {
    const [error, setError] = useState<string[]>([]);
    const [waiting, setWaiting] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        let errorList = [];

        if (formData.get("title")?.toString().trim() == "") {
            errorList.push(dictionary.fillintitle);
        }

        if (formData.get("description")?.toString().trim() == "") {
            errorList.push("Empty description is disallowed");
        }

        let lang = language;

        if (!(lang == "uz" || lang == "en" || lang == "ru")) {
            errorList.push(dictionary.nolanguage);
        }

        if (!presentationProperties?.presentationUrl || presentationProperties.presentationUrl.trim() == "") {
            errorList.push("error with presentation");
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

        formData.append("language", language);
        formData.append("presentationUrl", presentationProperties?.presentationUrl);

        formData.append("authorIds", ids);
        formData.append("hashtags", Object.keys(hashtags).join("|"));
        formData.append("thumbnailUrl", imageProperties?.src);

        setWaiting(true);

        formData.forEach((value, key) => {
            console.log(key, value);
        });


        let res = await fetch(`${process.env.SELFADDR}/admin/blogs/presentation/createnew/api`, {
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

    let router = useRouter();

    const [selectedTeachers, setSelectedTeachers] = useState<{ [key: number]: boolean | null }>({});
    const [hashtags, setHashtags] = useState<{ [key: string]: boolean }>({});
    const [language, setLanguage] = useState<null | "uz" | "ru" | "en">(null);
    const [presentationProperties, setPresentationProperties] = useState<null | { presentationUrl: string; presnetationType: "docx" | "pdf" | "pptx"; }>(null);
    const [imageProperties, setImageProperties] = useState<null | { type: "local" | "global"; src: string; fileOptions?: File; }>(null);

    
    return (
        <div className="p-5 pt-14 max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold tracking-tight">Create new presentation</h3>
            <p className="text-sm text-muted-foreground">Presentation will be shown in the blog page.</p>
            <form onSubmit={handleSubmit} className="w-full pt-4 space-y-4">
                {waiting && (<p>Waiting a fetch</p>)}
                <div className="w-full space-y-1">
                    <Label htmlFor="title">Title</Label>
                    <Input type="text" id="title" name="title" placeholder="Enter a title" />
                </div>
                <div className="w-full space-y-1">
                    <Label htmlFor="description">Description</Label>
                    <Input type="text" id="description" name="description" placeholder="Enter a description" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="language">Select a language</Label>
                    <LanguageSelection language={language} setLanguage={setLanguage} />
                </div>
                <div className="space-y-2">
                    <Label>Select authors</Label>
                    <AuthorsSelection authors={authors} selectedTeachers={selectedTeachers} setSelectedTeachers={setSelectedTeachers}  />
                </div>
                <div className="space-y-2">
                    <Label>Specify hashtags</Label>
                    <HashtagSpecification hashtags={hashtags} setHashtags={setHashtags} />
                </div>
                <div className="space-y-2">
                    <Label>Select a presentation</Label>
                    <div>
                        <PresentationSelection presentationProperties={presentationProperties} setPresentationProperties={setPresentationProperties} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label>Select a thumbnail</Label>
                    <div>
                        <ImageSelection allowLocalImages={false} imageProperties={imageProperties} setImageProperties={setImageProperties} />
                    </div>
                </div>

                <Script async src="https://apis.google.com/js/client.js?onload=googleApiClientReady" type="text/javascript"></Script>
                <Button className="w-full" variant={"default"} type="submit">Submit</Button>
                {error?.length != 0 && error?.map((err, i) => (
                    <p key={i}>An error {err}</p>
                ))}
            </form>
        </div>
    )
}

import { FaUpload } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa6";

import { IoDocument } from "react-icons/io5";

function giveIframeOrEmbed (type, fileUrl, width = "full") {
    if (type == "pdf") {
        return <embed className={"w-full h-full"} src={"https://drive.google.com/viewerng/viewer?embedded=true&url=" + fileUrl} />;
    } else if (type == "docx") {
        return (<iframe className={"w-full h-full"} src={'https://view.officeapps.live.com/op/embed.aspx?src=' + fileUrl} frameBorder='0'>This is an embedded <a target='_blank' href='http://office.com'>Microsoft Office</a> document, powered by <a target='_blank' href='http://office.com/webapps'>Office Online</a>.</iframe>);
    } else if (type == "pptx") {
        return (<iframe className={"w-full h-full"} src={'https://view.officeapps.live.com/op/embed.aspx?src=' + fileUrl} frameBorder='0'></iframe>)
    }
}

function PresentationPreview ({ type, fileUrl }: { type: "pdf" | "docx" | "pptx"; fileUrl: string }) {

    const [rendered, setRendered] = useState(<p>No result</p>);

    useEffect(() => {
        setRendered(giveIframeOrEmbed(type, fileUrl));
    }, [fileUrl]);

    return (
        <Dialog>
        <DialogTrigger asChild>
            <Button size={"sm"} variant="default">Preview document</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
                <DialogTitle>Document preview</DialogTitle>
                <DialogDescription>
                    {fileUrl}
                </DialogDescription>
            </DialogHeader>
            <div className="h-96">
                {rendered}
            </div>
            <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
        </Dialog>
    )
}

function PresentationSelection ({ presentationProperties, setPresentationProperties }: { presentationProperties: { presentationUrl: string; presentationType: "docx" | "pdf" | "pptx" }; setPresentationProperties: any }) {
    const [presentationsFromServer, setPresentationsFromServer] = useState<{ title: string; createdAt: string; filetype: "pdf" | "docx" | "pptx"; url: string; }[]>([]);
    const [showOptions, setShowOptions] = useState<{ showType: "showServerPresentations" | "showLoadingSkeleton" | "showInputFoundPresentation"; inputFoundPresentation?: null | { url: string; type: "pdf" | "docx" | "pptx"; } }>({
        showType: "showLoadingSkeleton",
    });

    const [presentationUploadOptions, setPresentationUploadOptions] = useState<{ showType: "noUpload" | "uploadSettings" | "uploadProgress"; presentationFile?: File; progressText?: string; presentationTitle?: string; progressNum?: number; }>({
        showType: "noUpload"
    });

    const [rendered, setRendered] = useState<any>();

    const dateTimeFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    let hiddenCloseButton = useRef<HTMLButtonElement>();

    function handlePresentationClick (idx: number) {
        if (showOptions.showType == "showServerPresentations") {
            setPresentationProperties({ presentationUrl: presentationsFromServer[idx].url, presentationType: presentationsFromServer[idx].filetype })
        } else {
            setPresentationProperties({ presentationUrl: showOptions.inputFoundPresentation?.url, presentationType: showOptions.inputFoundPresentation?.type })
        }

        hiddenCloseButton.current?.click();
    }

    useEffect(() => {
        if (showOptions.showType == "showLoadingSkeleton") {

            setRendered(<>
                <Skeleton className="h-24 w-full p-1.5 rounded-xl" />
                <Skeleton className="h-24 w-full p-1.5 rounded-xl" />
            </>);

        } else if (showOptions.showType == "showServerPresentations") {
            setRendered(
                <>
                    {presentationsFromServer.map((presentation, i) => (
                        <div className="flex flex-row items-center p-1.5 px-3 w-full cursor-pointer rounded-xl group hover:bg-stone-100">
                        <div onClick={() => { handlePresentationClick(i); }} className="flex flex-row flex-grow items-center gap-x-3 w-full cursor-pointer group">
                            <IoDocument className="w-4 h-4" />
                            <div className="">
                                <p className="text-sm">{presentation.title}</p>
                                <p className="text-xs">Pdf document • {presentation.createdAt}</p>
                            </div>
                        </div>
                        <PresentationPreview type={presentation.filetype} fileUrl={presentation.url} />
                        </div>
                    ))}
                </>
            );


        } else if (showOptions.showType == "showInputFoundPresentation") {
            if (showOptions.inputFoundPresentation) {
                let foundPresentation = showOptions.inputFoundPresentation;

                setRendered(
                    <div className="flex flex-row items-center p-1.5 px-3 w-full cursor-pointer rounded-xl group hover:bg-stone-100">
                        <div onClick={() => { handlePresentationClick(0); }} className="flex flex-row flex-grow items-center gap-x-3 w-full cursor-pointer group">
                            <IoDocument className="w-4 h-4" />
                            <div className="">
                                <p className="text-sm">File from external source</p>
                                <p className="text-xs">{foundPresentation.type.toUpperCase()} document • {foundPresentation.url.replace(/^.*[\\/]/, '')}</p>
                            </div>
                        </div>
                        <PresentationPreview type={foundPresentation.type} fileUrl={foundPresentation.url} />
                    </div>
                )
            } else {
                setRendered(<p>No results</p>);
            }
        }
    }, [showOptions]);

    /// showServerVideos
    /// showLoadingSkeleton
    /// showVideoUploadProgress (showServerVideos after loading is complete)
    /// showInputFoundVideo


    useEffect(() => {
        setShowOptions({ showType: "showLoadingSkeleton" });

        const fetchDocuments = async () => {
            let req = await fetch("/admin/files/getDocumentsList?count=all&service_name=video_blog_upload");

            if (req.ok) {
                let json = await req.json();

                if (json.message == "Success") {
                    let documents = json.documents;

                    documents.map((item) => {
                        item.createdAt = duration(item.createdAt).humanize();
                        item.url = `${process.env.SELFADDR}/assets/documents/` + item.filename;
                    })
    
                    setPresentationsFromServer(documents)
                    
                    console.log(documents);
                }

                // console.log(json);

                

                // setPresentationsFromServer([
                //     {
        
                //         title: "Taylor Swift is coming to Uzbekistan",
                //         createdAt: dateTimeFormat.format(new Date("2001-01-31T19:00:00.000+00:00")),
                //         url: "https://calibre-ebook.com/downloads/demos/demo.docx",
                //         filetype: "docx"
                //     }
                // ]); 
            }
    
                
        }

        fetchDocuments().then(() => {
            setShowOptions({ showType: "showServerPresentations" });
        })
    }, []);

    const [inputTimeout, setInputTimeout] = useState<Timeout>(null);

    function get_url_extension( url ) {
        return url.split(/[#?]/)[0].split('.').pop().trim();
    }

    function doSearch(evt){
        var searchText = evt.target.value as string;
    
        if(inputTimeout) {clearTimeout(inputTimeout); setInputTimeout(null); }
    
        setInputTimeout(setTimeout(async () => {
            setShowOptions({ showType: "showLoadingSkeleton" });

            if (searchText == "") {
                setShowOptions({ showType: "showServerPresentations" });
            } else {
                if (typeof window !== "undefined") {
                    let filetype = get_url_extension(searchText);

                    if (filetype == "pdf" || filetype == "pptx" || filetype == "docx" || filetype == "doc") {
                        setShowOptions({ showType: "showInputFoundPresentation", inputFoundPresentation: { url: searchText, type: filetype } });
                    } else {
                        setShowOptions({ showType: "showInputFoundPresentation", inputFoundPresentation: null });
                    }
                }
            }
        }, 1000));
    }

    function uploadFileToServer (file: File) {
        if (file.size > 3000000) {
            setInfoString("d|File size is too big");
            return;
        }
    
        console.log("Uploading to server");
        setFileLoading({
            loading: true,
            progress: 0,
            src: URL.createObjectURL(file)
        });
    
        let request = new XMLHttpRequest();
    
        request.upload.addEventListener('progress', function(event) {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                setFileLoading((loading) => { return { ...loading, progress: percentComplete } });
            }
        });
    
        // Upload completed
        request.addEventListener('load', function() {
            console.log("Upload complete");
    
            if (request.status >= 200 && request.status < 300) {
                const responseData = JSON.parse(request.responseText);
                console.log('Upload successful. Response:', responseData);
                setInfoString("s|Upload successful");
                setFileLoading({ loading: false, progress: 0, src: "" });
                setImagesList([ responseData.fileSrc, ...imagesList ]);
            } else {
                console.error('Error uploading video. Status:', request.status);
                setInfoString("s|Error has happened");
                setFileLoading({ loading: false, progress: 0, src: "" });
            }
    
        });
    
        // Handle errors
        request.addEventListener('error', function() {
            console.error('Error uploading video:', request.status);
            setInfoString("d|Error has happened");
            setFileLoading({ loading: false, progress: 0, src: "" });
        });
    
        let formData = new FormData();
        formData.append("image", file);
    
        request.open('POST', '/admin/files/uploadImageToServer?service_name=video_blog_upload');
        request.send(formData);
      }

    function handleVideoUpload1 (e) {
        if (e.target.files[0]) {
            setPresentationUploadOptions({
                showType: "uploadSettings",
                presentationFile: e.target.files[0]
            });
        }
    }

    function handleVideoUpload2 () {
        if (typeof window !== "undefined") {
            setTimeout(async () => {
                // imageProperties
                // videoUploadOptions.videoFile
                // youtubeVideoTitleInputRef.current?.value

                if (!presentationUploadOptions.presentationFile) {
                    setStatusString("d|Presentation is not uploaded"); return;
                }

                if (presentationUploadOptions.presentationFile.size > 100000000) {
                    setStatusString("d|Presentation size is too big"); return;
                }

                if (presentationTitleInput.current?.value.trim() == "") {
                    setStatusString("d|Please include title"); return;
                } 

                setPresentationUploadOptions({
                    presentationFile: presentationUploadOptions.presentationFile,
                    showType: "uploadProgress",
                    progressText: "Initializing",
                    presentationTitle: presentationTitleInput.current?.value,
                    progressNum: 0
                })

                let doc_title = presentationTitleInput.current?.value;

                setStatusString("");

                let request = new XMLHttpRequest();

                request.upload.addEventListener('progress', function(event) {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        setPresentationUploadOptions((prevValue) => { return { ...prevValue, progressNum: percentComplete, progressText: `Loading a presentation: ${percentComplete.toFixed(2)}%` } })
                    }
                });
        
                // Upload completed
                request.addEventListener('load', async function() {
                    console.log("Upload complete");

                    if (request.status >= 200 && request.status < 300) {
                        const responseData = JSON.parse(request.responseText);
                        console.log('Upload successful. Response:', responseData);
                        setStatusString("s|" + 'Presentation Upload successful.');

                        let url = responseData.url;
                        let filetype = responseData.filetype;

                        console.log("Payload: ", {
                                    createdAt: moment.duration(Date.now()).humanize(),
                                    filetype: filetype,
                                    title: doc_title,
                                    url: url
                        });

                        setPresentationsFromServer((prevValue) => {
                            return [
                                {
                                    createdAt: moment.duration(Date.now()).humanize(),
                                    filetype: filetype,
                                    title: doc_title,
                                    url: url
                                },
                                ...prevValue
                            ]
                        });


                        setShowOptions({ showType: "showServerPresentations" });

                        setPresentationUploadOptions({
                            showType: "noUpload"
                        });

                    } else {
                        console.error('Error uploading video. Status:', request.status);
                        setStatusString("d|" + 'Error uploading video: ' + request.status);
                        setPresentationUploadOptions({
                            ...presentationUploadOptions,
                            showType: "uploadSettings"
                        });
                    }

                });
        
                // Handle errors
                request.addEventListener('error', function() {
                    setStatusString("d|" + 'Error uploading video: ' + request.status);
                    setPresentationUploadOptions({
                        ...presentationUploadOptions,
                        showType: "uploadSettings"
                    });
                });
                
                let formData = new FormData();

                formData.append("file_document", presentationUploadOptions.presentationFile);
                formData.append("title", doc_title);

                request.open('POST', '/admin/files/uploadDocumentToServer?service_name=video_blog_upload');
                request.send(formData);
            }, 10);
        }
    }

    let inputRef = createRef<HTMLInputElement>();

    let presentationTitleInput = createRef<HTMLInputElement>();

    const [statusString, setStatusString] = useState("s|Some text");
    
    return (
        <Dialog>
      <DialogTrigger asChild>
        <div>
            { (presentationProperties && presentationProperties.presentationUrl) && (
                <div className="w-1/2 h-80 mb-4">{giveIframeOrEmbed(presentationProperties.presentationType, presentationProperties.presentationUrl)}</div>
            ) }
            <Button type="button" variant="outline">Select presentation</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Select presentation</DialogTitle>
          {statusString != "" && (<DialogDescription className={statusString[0] == "d" ? "text-red-500" : ""}>{statusString.split("|")[1]}</DialogDescription>)}
        </DialogHeader>
        <div className="w-full flex flex-row gap-x-3">
            <label htmlFor="youtube_video_upload" className={"w-full bg-slate-100 py-3 cursor-pointer rounded-md" + (presentationUploadOptions.showType == "uploadProgress" ? " pointer-events-none bg-muted text-muted-foreground" : " ")}>
                <div className="flex flex-row items-center gap-x-3 mx-auto w-fit">
                    <FaUpload className="text-sm cursor-pointer" />
                    <small className="text-sm cursor-pointer font-medium leading-none">Upload local presentation</small>
                    <input type="file" className="hidden" accept=".pptx, .docx, .pdf" id="youtube_video_upload" onChange={e => handleVideoUpload1(e)} />
                </div>
            </label>
            { presentationUploadOptions.showType == "uploadSettings" && (
                <div onClick={() => { setPresentationUploadOptions({ showType: "noUpload" }) }} className="w-1/4 flex flex-row items-center cursor-pointer gap-x-2 rounded-md justify-center bg-destructive text-destructive-foreground">
                    <FaTrash className="text-sm cursor-pointer" />
                    <small className="text-sm cursor-pointer font-medium leading-none">Clear</small>
                </div>
            ) }
        </div>
        { presentationUploadOptions.showType != "noUpload" && (
            presentationUploadOptions.showType == "uploadSettings" ? (
                <div className="space-y-3">
                    <small className="text-sm text-muted-foreground cursor-pointer font-medium leading-none">Filename: {presentationUploadOptions.presentationFile?.name}</small>
                    <div>
                        <p className="text-sm font-medium mb-2">Presentation title (For server only)</p>
                        <Input type="text" ref={presentationTitleInput} placeholder="Enter presentation title" />
                    </div>
                    <Button type="button" onClick={() => { handleVideoUpload2(); }} className="w-full">Upload presentation</Button>
                </div>
            ) : (
                <>
                
                <div className="flex flex-row items-center p-1.5 px-3 w-full cursor-pointer rounded-xl group hover:bg-stone-100">
                <div className="flex flex-row items-center gap-x-3 w-full cursor-pointer group">
                    <IoDocument className="w-4 h-4" />
                    <div className="">
                        <p className="text-sm">{presentationUploadOptions.presentationTitle}</p>
                        <p className="text-xs">Uploaded Just now </p>
                    </div>
                </div>
                <div className="text-sm w-96 text-muted-foreground mt-2"><Badge className="ml-1 group-hover:bg-stone-800 group-hover:text-white cursor-pointer hover:bg-stone-700 hover:text-white" variant={"secondary"}>{presentationUploadOptions.progressText}</Badge> </div>
                </div>
                
                </>
                
                
            )
        ) }
        { presentationUploadOptions.showType == "noUpload" && (
            <>
            <ScrollArea className="h-64 w-full rounded-md">
                <div className="space-y-3">
            
                {rendered}
            
                </div>
            </ScrollArea>
            <Input ref={inputRef} onChange={evt => doSearch(evt)} type="text" placeholder="Or paste document url (supported types: pptx, pdf, docx)" />
            </>
        ) }
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" className="hidden" ref={hiddenCloseButton}>Close</Button>
            </DialogClose>
        </DialogFooter>
        </DialogContent>
    </Dialog>
    )
}

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function LanguageSelection ({ language, setLanguage }: { language: any; setLanguage: any }) {
    return (
        <Select onValueChange={(v) => { setLanguage(v); }}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Languages</SelectLabel>
                    <SelectItem value="uz">Uzbek</SelectItem>
                    <SelectItem value="ru">Russian</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

export function HashtagSpecification ({ hashtags, setHashtags }) {
    let inputRef = createRef<HTMLInputElement>();

    function handleHashtagAdd () {
        let inputValue = inputRef.current!.value;
        if (inputValue != "") {
            setHashtags({ ...hashtags, [inputValue]: true });
        }
        inputRef.current!.value = "";
    }

    function handleHashtagClear () {
        setHashtags({});
    }

    return (
        <div>
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="text" placeholder="Enter hashtag" ref={inputRef} />
                <Button type="button" variant={"default"} onClick={() => handleHashtagAdd()}>Add</Button>
                <Button variant={"outline"} type="button" onClick={() => handleHashtagClear()}>Clear</Button>
            </div>
            <div className={"w-full flex flex-row gap-x-3 flex-wrap rounded-lg " + (Object.keys(hashtags).length > 0 && "py-1 mt-4") }>
                {Object.keys(hashtags).map((hashtag: string) => (
                    <Badge>{hashtag}</Badge>
                ))}
            </div>
        </div>
    )
}

import { FaPlus, FaMinus } from "react-icons/fa6";

export function AuthorsSelection ({ authors, selectedTeachers, setSelectedTeachers }: { authors: { pictureUrl: string; name: string; surname: string; _id: ObjectId; }[]; selectedTeachers: any; setSelectedTeachers: any }) {
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

    const inputRef = createRef<HTMLInputElement>();

    return (
        <div className="max-w-sm">
            <div className="w-full flex flex-row gap-x-3 flex-wrap mt-2 py-1 rounded-lg">
                {authors.map((author, i) => (
                    <Badge key={i} onClick={() => { teacherPressed(i); }} className={"flex flex-row items-center cursor-pointer gap-x-2 " + (ifHighlight(i) ? "bg-blue-500 hover:bg-blue-500" : "bg-stone-800 hover:bg-zinc-600")}>
                        <p>{author.name} {author.surname}</p>
                        { ifHighlight(i) ? (<FaMinus className="text-white w-2 h-2" />) : (<FaPlus className="text-white w-2 h-2" />) }
                    </Badge>
                ))}
            </div>
        </div>
    )
}

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image";
import { Input } from "@/components/ui/input"
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ImageSelection } from "../../video/createnew/clientpage";

