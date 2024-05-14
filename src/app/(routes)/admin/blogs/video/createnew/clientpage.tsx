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

export default function VideoCreateClient ({ authors, accessToken, expiresIn }: { authors: { pictureUrl: string; name: string; surname: string; _id: ObjectId; }[], accessToken: string; expiresIn: number; }) {
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

        console.log(videoProperties);

        if (!videoProperties || !videoProperties.youtubeVideoId || videoProperties.youtubeVideoId == "") {
            errorList.push("Problem with video");
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


        formData.append("youtubeVideoId", videoProperties.youtubeVideoId);
        formData.append("language", language);
        formData.append("authorIds", ids);
        formData.append("hashtags", Object.keys(hashtags).join("|"));

        setWaiting(true);

        formData.forEach((v, k) => {
            console.log(k, v);
        });

        let res = await fetch(`${process.env.SELFADDR}/admin/blogs/video/createnew/api`, {
            method: "POST",
            body: formData
        });

        setWaiting(false);

        if (res.ok) {
            let resjson = await res.json();

            if (resjson.message == "Success") {
                router.push("/admin/blogs?message='Podcast added successfully'");
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
    const [videoProperties, setVideoProperties] = useState<null | object>(null);

    
    return (
        <div className="p-5 pt-14 max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold tracking-tight">Create new video</h3>
            <p className="text-sm text-muted-foreground">Video will be shown in the blog page.</p>
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
                    <Label>Select a video</Label>
                    <div>
                        <VideoSelection accessToken={accessToken} expiresIn={expiresIn} videoProperties={videoProperties} setVideoProperties={setVideoProperties} />
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

function PreviewYoutubeVideo ({ video_id }: { video_id: string }) {
    return (
        <Dialog>
        <DialogTrigger asChild>
            <Badge className="ml-1 group-hover:bg-stone-800 group-hover:text-white cursor-pointer hover:bg-stone-700 hover:text-white" onClick={() => {  }} variant={"secondary"}>Preview</Badge>
        </DialogTrigger>
        <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
                <DialogTitle>Video preview</DialogTitle>
            </DialogHeader>
            <iframe className="w-full rounded-xl" height="380" src={"https://www.youtube.com/embed/" + video_id} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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

function VideoSelection ({ accessToken, expiresIn, videoProperties, setVideoProperties }: { accessToken: string; expiresIn: number; videoProperties: { youtubeVideoId: string; thumbnailUrl: string; }; setVideoProperties: any }) {
    const [videosFromServer, setVideosFromServer] = useState<any>([]);
    const [showOptions, setShowOptions] = useState<{ showType: "showServerVideos" | "showLoadingSkeleton" | "showInputFoundVideo"; inputFoundVideo?: null | { youtubeVideoID: string; thumbnailUrl: string; title: string; duration?: number; channelTitle: string; publishedAt: string; thumbnailWidth: number; thumbnailHeight: number;  } }>({
        showType: "showLoadingSkeleton",
    });
    const [videoUploadOptions, setVideoUploadOptions] = useState<{ showType: "noUpload" | "uploadSettings" | "uploadProgress"; videoFile?: File; progressText?: string; videoTitle?: string; progressNum?: number; }>({
        showType: "noUpload"
    });

    const [rendered, setRendered] = useState<any>();
    const [imageProperties, setImageProperties] = useState<null | { type: "local" | "global"; src: string; fileOptions?: File; }>(null);

    const dateTimeFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    let hiddenCloseButton = useRef<HTMLButtonElement>();

    function handleVideoClick (idx: number) {
        if (showOptions.showType == "showServerVideos") {
            setVideoProperties({ youtubeVideoId: videosFromServer[idx].youtubeId, thumbnailUrl: videosFromServer[idx].thumbnailUrl })
        } else {
            setVideoProperties({ youtubeVideoId: showOptions.inputFoundVideo?.youtubeVideoID, thumbnailUrl: showOptions.inputFoundVideo?.thumbnailUrl })
        }

        hiddenCloseButton.current?.click();
    }

    useEffect(() => {
        if (showOptions.showType == "showLoadingSkeleton") {

            setRendered(<>
                <Skeleton className="h-24 w-full p-1.5 rounded-xl" />
                <Skeleton className="h-24 w-full p-1.5 rounded-xl" />
            </>);

        } else if (showOptions.showType == "showServerVideos") {
            setRendered(
                <>
                    {videosFromServer.map((video, i) => (
                        <div onClick={e => { if (!e.isPropagationStopped()) {handleVideoClick(i);} }} className="flex flex-row p-1.5 gap-x-3 h-24 w-full cursor-pointer rounded-xl group hover:bg-stone-100">
                            <div className="relative min-w-fit h-full rounded-md overflow-hidden">
                                <img src={video.thumbnailUrl} alt="" className="w-full aspect-video rounded-md h-full object-cover" width={100} height={100}  />
                            </div>
                            <div>
                            <h3 className="text-md font-semibold tracking-tight">
                                {video.title}
                            </h3>
                            <div className="text-sm text-muted-foreground mt-2">{video.duration} • {video.createdAt} <PreviewYoutubeVideo video_id={video.youtubeId} /> </div>
                            </div>
                        </div>
                    ))}
                </>
            );


        } else if (showOptions.showType == "showInputFoundVideo") {
            if (showOptions.inputFoundVideo) {
                let foundVideo = showOptions.inputFoundVideo;

                setRendered(
                    <div onClick={() => {handleVideoClick(0);} } className="flex flex-row p-1.5 gap-x-3 h-24 w-full cursor-pointer rounded-xl group hover:bg-stone-100">
                        <div className="relative min-w-fit h-full rounded-md overflow-hidden">
                            <img src={showOptions.inputFoundVideo?.thumbnailUrl} alt="" className="w-full aspect-video rounded-md h-full object-cover" width={foundVideo.thumbnailWidth} height={foundVideo.thumbnailHeight}  />
                        </div>
                        <div>
                        <h3 className="text-md font-semibold tracking-tight">
                            {foundVideo.title}
                        </h3>
                        <div className="text-sm text-muted-foreground mt-2">{foundVideo.channelTitle} • {foundVideo.publishedAt} <Badge className="ml-1 group-hover:bg-stone-800 group-hover:text-white cursor-pointer hover:bg-stone-700 hover:text-white" onClick={() => { alert("Previewing: " + foundVideo.youtubeVideoID) }} variant={"secondary"}>Preview</Badge> </div>
                        </div>
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

        const timeoutId = setTimeout(async () => {
            const gapi = (await import('gapi-script')).gapi;

            gapi.client.load("youtube", "v3", () => {
                gapi.client.init({});

                gapi.auth.setToken({
                    access_token: accessToken,
                    expires_in: expiresIn.toString(),
                    state: "https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/meetings.space.readonly https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/meetings.space.created https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube",
                    error: ""
                });
            });
        }, 2000);

        const fetchVideos = async () => {
            const request = await fetch('/admin/files/getVideosList?count=all&service_name=video_blog_upload');

            if (request.ok) {
                let json = await request.json();

                if (json.message == "Success") {
                    let videos = json.videos;

                    videos.map((video) => {
                        video.duration = "2min 32s";
                        video.thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`
                        video.createdAt = moment.duration(video.createdAt).humanize();
                    });

                    console.log(videos);

                    setVideosFromServer(videos);
                }
            }
        }

        // setVideosFromServer([
        //     {
        //         title: "Taylor Swift is coming to Uzbekistan",
        //         thumbnailUrl: "/author.webp",
        //         createdAt: dateTimeFormat.format(new Date("2001-01-31T19:00:00.000+00:00")),
        //         youtubeId: "iwPCZh7X1sU",
        //         duration: moment.duration(31536000).humanize()
        //     }
        // ]);

        fetchVideos().then(() => {
            setShowOptions({ showType: "showServerVideos" });
        })

        return () => clearTimeout(timeoutId);
    }, []);

    const [inputTimeout, setInputTimeout] = useState<Timeout>(null);

    function doSearch(evt){
        var searchText = evt.target.value as string;
    
        if(inputTimeout) {clearTimeout(inputTimeout); setInputTimeout(null); }
    
        setInputTimeout(setTimeout(async () => {
            if (searchText == "") {
                setShowOptions({ showType: "showServerVideos" });
            } else {
                if (typeof window !== "undefined") {
                    let p1 = searchText.split("?v=");

                    let id: string;

                    if (p1[1]) {
                        let p2 = p1[1].split("&");

                        if (p2[0] && p2[0].length == 11) {
                            console.log("enters here");
                            id = p2[0];
                        } else {
                            setShowOptions({ showType: "showInputFoundVideo", inputFoundVideo: null });
                            return;
                        }

                    } else {
                        setShowOptions({ showType: "showInputFoundVideo", inputFoundVideo: null });
                        return;
                    }

                setTimeout(async () => {
                    let response = await gapi.client.youtube.videos.list({
                        part: "id,snippet",
                        access_token: accessToken,
                        id: id
                    });

                    let data = response.result.items;

                    if (data!.length > 0) {
                        let videoMeta = data[0];

                        const date = new Date(videoMeta.snippet!.publishedAt);

                        setShowOptions({
                            showType: "showInputFoundVideo",
                            inputFoundVideo: {
                                channelTitle: videoMeta.snippet!.channelTitle,
                                publishedAt: dateTimeFormat.format(date),
                                thumbnailUrl: videoMeta.snippet!.thumbnails!.high?.url,
                                thumbnailWidth: videoMeta.snippet!.thumbnails!.high?.width,
                                thumbnailHeight: videoMeta.snippet!.thumbnails!.high?.height,
                                title: videoMeta.snippet!.title,
                                youtubeVideoID: videoMeta.id,
                            }
                        })
                    } else {
                        setShowOptions({
                            showType: "showInputFoundVideo",
                            inputFoundVideo: null
                        })
                    }

                    
        
                    console.log(response);
                }, 0);
                }
            }
        }, 1000));
    }

    function handleVideoUpload1 (e) {
        if (e.target.files[0]) {
            setVideoUploadOptions({
                showType: "uploadSettings",
                videoFile: e.target.files[0]
            });
        }
    }

    const img = createRef<HTMLImageElement>();

    function handleVideoUpload2 () {
        if (typeof window !== "undefined") {
            setTimeout(async () => {
                // imageProperties
                // videoUploadOptions.videoFile
                // youtubeVideoTitleInputRef.current?.value

                if (!videoUploadOptions.videoFile) {
                    setStatusString("d|Video is not uploaded"); return;
                }

                if (videoUploadOptions.videoFile?.size > 2000000000) {
                    setStatusString("d|Video size is too big"); return;
                }

                if (!imageProperties) {
                    setStatusString("d|Image is not specified"); return;
                }

                if (youtubeVideoTitleInputRef.current?.value == "") {
                    setStatusString("d|Title is not specified"); return;
                }

                let imageProperties2 = imageProperties;

                if (imageProperties2.type == "global") {
                    const response = await fetch(imageProperties2.src);

                    const blob = await response.blob();

                    const filenamee = imageProperties2.src.split('/').pop();
                    const extensionn = filenamee.split('.').pop().toLowerCase();
                    let mimeTypee;

                    switch (extensionn) {
                        case 'png':
                        mimeTypee = 'image/png';
                        break;
                        case 'jpg':
                        case 'jpeg':
                        mimeTypee = 'image/jpeg';
                        break;
                        case 'gif':
                        mimeTypee = 'image/gif';
                        break;
                        default:
                        mimeTypee = 'unknown';
                    }

                    console.log("ENteretd here");

                    const imageFileee = new File([blob], filenamee, { type: mimeTypee });

                    imageProperties2 = { type: "local", src: imageProperties2.src, fileOptions: imageFileee }

                    setImageProperties({ type: "local", src: imageProperties2.src, fileOptions: imageFileee });
                }

                if (imageProperties.fileOptions?.size > 2097152) {
                    setStatusString("d|Image is too large"); return;
                }

                let localImage = imageProperties2.type == "local";

                setVideoUploadOptions({
                    videoFile: videoUploadOptions.videoFile,
                    showType: "uploadProgress",
                    progressText: "Initializing",
                    videoTitle: youtubeVideoTitleInputRef.current?.value,
                    progressNum: 0
                })

                let videoTitle = youtubeVideoTitleInputRef.current?.value;

                let video_duration: number;

                var video = document.createElement('video');
                video.preload = 'metadata';

                video.onloadedmetadata = function() {
                    window.URL.revokeObjectURL(video.src);
                    video_duration = video.duration;
                }
                
                video.src = URL.createObjectURL(videoUploadOptions.videoFile);

                setStatusString("");

                let request = new XMLHttpRequest();

                let contents = new Uint8Array(await (videoUploadOptions.videoFile as File).arrayBuffer());

                function Uint8ToString(u8a){
                    var CHUNK_SZ = 0x8000;
                    var c = [];
                    for (var i=0; i < u8a.length; i+=CHUNK_SZ) {
                        c.push(String.fromCharCode.apply(null, u8a.subarray(i, i+CHUNK_SZ)));
                    }
                    return c.join("");
                }

                request.upload.addEventListener('progress', function(event) {
                    if (event.lengthComputable) {
                        const percentComplete = (event.loaded / event.total) * 100;
                        setVideoUploadOptions((prevValue) => { return { ...prevValue, progressNum: percentComplete, progressText: `Loading a video: ${percentComplete.toFixed(2)}%` } })
                    }
                });
        
                // Upload completed
                request.addEventListener('load', async function() {
                    console.log("Upload complete");

                    if (request.status >= 200 && request.status < 300) {
                        const responseData = JSON.parse(request.responseText);
                        console.log('Upload successful. Response:', responseData);
                        setStatusString("s|" + 'Video Upload successful.');

                        let video_id = responseData.id;

                        /// set Thumbnail

                        if (localImage) {
                            let request2 = new XMLHttpRequest();

                            let image_contents = new Uint8Array(await (imageProperties2.fileOptions as File).arrayBuffer());
    
                            request2.upload.addEventListener('progress', function(event) {
                                if (event.lengthComputable) {
                                    const percentComplete = (event.loaded / event.total) * 100;
                                    setVideoUploadOptions((prevValue) => { return { ...prevValue, progressNum: percentComplete, progressText: `Loading a thumbnail: ${percentComplete.toFixed(2)}%` } })
                                }
                            });
    
                            request2.addEventListener('error', function() {
                                setStatusString("d|" + 'Error uploading a thumbnail: ' + request2.status);
                                setVideoUploadOptions({
                                    ...videoUploadOptions,
                                    showType: "uploadSettings"
                                });
                            });
    
                            request2.upload.addEventListener('load', async function () {
                                if (request2.status >= 200 && request2.status < 300) {
                                    const responseData2 = JSON.parse(request2.responseText);
                                    console.log('Upload successful. Response:', responseData2);
                                    setStatusString("s|" + 'Thumbnail Upload successful.');
    
                                    let thumbnailUrl = responseData2.items["high"].url;
    
                                    let formData = new FormData();
    
                                    alert(video_duration);
    
                                    formData.append("youtubeVideoId", video_id);
                                    formData.append("title", videoTitle);
                                    formData.append("duration", video_duration.toString());
    
                                    const request3 = await fetch("/admin/files/uploadVideoToServer?service_name=video_blog_upload", {
                                        method: "POST",
                                        body: formData
                                    });
    
                                    if (request3.ok) {
                                        const json = await request3.json();
    
                                        if (json.message == "Success") {
    
                                            setVideosFromServer([
                                                {
                                                    title: videoUploadOptions.videoTitle,
                                                    thumbnailUrl: thumbnailUrl,
                                                    createdAt: dateTimeFormat.format(Date.now()),
                                                    youtubeId: video_id,
                                                    duration: moment.duration(video_duration).humanize()
                                                },
                                                ...videosFromServer
                                            ]);
    
                                            setVideoUploadOptions({
                                                showType: "noUpload"
                                            });
    
                                        } else {
                                            setStatusString("d|" + 'Error: ' + request3.status);
                                        }
    
                                    } else {
                                        setStatusString("d|" + 'Everything went nice but only our server error: ' + request3.status);
                                    }
    
                                    
    
    
    
                                } else {
                                    setStatusString("d|" + 'Error uploading thumbnail: ' + request2.status);
                                    setVideoUploadOptions({
                                        ...videoUploadOptions,
                                        showType: "uploadSettings"
                                    });
                                }
                            });


    
    
                            request2.open('POST', 'https://www.googleapis.com/upload/youtube/v3/thumbnails/set?alt=json&uploadType=multipart');
                            request2.setRequestHeader('Authorization', 'Bearer ' + accessToken); // Don't forget to replace YOUR_ACCESS_TOKEN_HERE with your actual access token
                            request2.setRequestHeader('Content-Type', 'multipart/related; boundary="random123"');
                            request2.send(
                                '--random123\nContent-Type: application/json\nMIME-Version: 1.0\n\n' + JSON.stringify({
                                    videoId: video_id
                                }) + '\n--random123\nContent-Type: ' + imageProperties2.fileOptions?.type.toString() + '\nMIME-Version: 1.0\nContent-Transfer-Encoding: base64\n\n' + btoa(Uint8ToString(image_contents)) + '\n--random123--\n'
                            );
                        } else {
    
                                    let formData = new FormData();
    
                                    alert(video_duration);
    
                                    formData.append("youtubeVideoId", video_id);
                                    formData.append("title", videoTitle);
                                    formData.append("duration", video_duration.toString());
    
                                    const request3 = await fetch("/admin/files/uploadVideoToServer?service_name=video_blog_upload", {
                                        method: "POST",
                                        body: formData
                                    });
    
                                    if (request3.ok) {
                                        const json = await request3.json();
    
                                        if (json.message == "Success") {
    
                                            setVideosFromServer([
                                                {
                                                    title: videoUploadOptions.videoTitle,
                                                    thumbnailUrl: `img.youtube.com/vi/${video_id}/hqdefault.jpg`,
                                                    createdAt: dateTimeFormat.format(Date.now()),
                                                    youtubeId: video_id,
                                                    duration: moment.duration(video_duration).humanize()
                                                },
                                                ...videosFromServer
                                            ]);
    
                                            setVideoUploadOptions({
                                                showType: "noUpload"
                                            });
    
                                        } else {
                                            setStatusString("d|" + 'Error: ' + request3.status);
                                        }
    
                                    } else {
                                        setStatusString("d|" + 'Everything went nice but only our server error: ' + request3.status);
                                    }
                        }



                    } else {
                        console.error('Error uploading video. Status:', request.status);
                        setStatusString("d|" + 'Error uploading video: ' + request.status);
                        setVideoUploadOptions({
                            ...videoUploadOptions,
                            showType: "uploadSettings"
                        });
                    }

                });
        
                // Handle errors
                request.addEventListener('error', function() {
                    setStatusString("d|" + 'Error uploading video: ' + request.status);
                    setVideoUploadOptions({
                        ...videoUploadOptions,
                        showType: "uploadSettings"
                    });
                });

                let snippetObj;

                if (localImage) {
                    snippetObj = {
                        title: videoTitle,
                        description: ""
                    }
                } else {
                    snippetObj = {
                        title: videoTitle,
                        description: "",
                        thumbnails: {
                            default: {
                                url: imageProperties2.src,
                                width: 120,
                                height: 90
                            }
                        }
                    }
                }

                

                request.open('POST', 'https://www.googleapis.com/upload/youtube/v3/videos?part=id,snippet,status&alt=json&uploadType=multipart');
                request.setRequestHeader('Authorization', 'Bearer ' + accessToken); // Don't forget to replace YOUR_ACCESS_TOKEN_HERE with your actual access token
                request.setRequestHeader('Content-Type', 'multipart/related; boundary="random123"');
                request.send(
                    '--random123\nContent-Type: application/json\nMIME-Version: 1.0\n\n' + JSON.stringify({
                        snippet: snippetObj,
                        status: {
                            privacyStatus: 'unlisted'
                        },

                    }) + '\n--random123\nContent-Type: video/mp4\nMIME-Version: 1.0\nContent-Transfer-Encoding: base64\n\n' + btoa(Uint8ToString(contents)) + '\n--random123--\n'
                );
            }, 10);
        }
    }

    let inputRef = createRef<HTMLInputElement>();

    let youtubeVideoTitleInputRef = createRef<HTMLInputElement>();

    const [statusString, setStatusString] = useState("s|Some text");
    
    return (
        <Dialog>
      <DialogTrigger asChild>
        <div>
            { (videoProperties && videoProperties.youtubeVideoId) && (
                <iframe width="560" height="315" className="mb-5 rounded-xl" src={"https://www.youtube.com/embed/" + videoProperties.youtubeVideoId} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            ) }
            <Button type="button" variant="outline">Select video</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Select video</DialogTitle>
          {statusString != "" && (<DialogDescription className={statusString[0] == "d" ? "text-red-500" : ""}>{statusString.split("|")[1]}</DialogDescription>)}
        </DialogHeader>
        <div className="w-full flex flex-row gap-x-3">
            <label htmlFor="youtube_video_upload" className={"w-full bg-slate-100 py-3 cursor-pointer rounded-md" + (videoUploadOptions.showType == "uploadProgress" ? " pointer-events-none bg-muted text-muted-foreground" : " ")}>
                <div className="flex flex-row items-center gap-x-3 mx-auto w-fit">
                    <FaUpload className="text-sm cursor-pointer" />
                    <small className="text-sm cursor-pointer font-medium leading-none">Upload local video</small>
                    <input type="file" className="hidden" accept=".mp4" id="youtube_video_upload" onChange={e => handleVideoUpload1(e)} />
                </div>
            </label>
            { videoUploadOptions.showType == "uploadSettings" && (
                <div onClick={() => { setVideoUploadOptions({ showType: "noUpload" }) }} className="w-1/4 flex flex-row items-center cursor-pointer gap-x-2 rounded-md justify-center bg-destructive text-destructive-foreground">
                    <FaTrash className="text-sm cursor-pointer" />
                    <small className="text-sm cursor-pointer font-medium leading-none">Clear</small>
                </div>
            ) }
        </div>
        { videoUploadOptions.showType != "noUpload" && (
            videoUploadOptions.showType == "uploadSettings" ? (
                <div className="space-y-3">
                    <small className="text-sm text-muted-foreground cursor-pointer font-medium leading-none">Filename: {videoUploadOptions.videoFile?.name}</small>
                    <div>
                        <p className="text-sm font-medium mb-2">Video title (For youtube only)</p>
                        <Input type="text" ref={youtubeVideoTitleInputRef} placeholder="Enter video title" />
                    </div>
                    <div className="space-y-2">
                        <Label>Select a video thumbnail</Label>
                        <div>
                            <ImageSelection allowLocalImages imageProperties={imageProperties} setImageProperties={setImageProperties} />
                        </div>
                    </div>
                    <Button type="button" onClick={() => { handleVideoUpload2(); }} className="w-full">Upload video</Button>
                </div>
            ) : (
                <div className="flex flex-row p-1.5 gap-x-3 h-24 w-full cursor-pointer rounded-xl group hover:bg-stone-100">
                    <div className="flex flex-row items-center px-4 justify-center relative w-36 h-full rounded-md overflow-hidden">
                        <img src={imageProperties.src} alt="" className="z-20 absolute brightness-50 w-full aspect-video rounded-md h-full object-cover" width={200} height={200}  />
                        <Progress className="z-30 bg-stone-800/60" value={videoUploadOptions.progressNum} />
                    </div>
                    <div>
                    <h3 className="text-md font-semibold tracking-tight">
                        {videoUploadOptions.videoTitle}
                    </h3>
                    <div className="text-sm text-muted-foreground mt-2">Uploaded Just now <Badge className="ml-1 group-hover:bg-stone-800 group-hover:text-white cursor-pointer hover:bg-stone-700 hover:text-white" variant={"secondary"}>{videoUploadOptions.progressText}</Badge> </div>
                    </div>
                </div>
            )
        ) }
        { videoUploadOptions.showType == "noUpload" && (
            <>
            <ScrollArea className="h-64 w-full rounded-md">
                <div className="space-y-3">
            
                {rendered}
            
                </div>
            </ScrollArea>
            <Input ref={inputRef} onChange={evt => doSearch(evt)} type="text" placeholder="Or paste video url" />
            </>
        ) }
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" ref={hiddenCloseButton}>Close</Button>
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

function LanguageSelection ({ language, setLanguage }: { language: any; setLanguage: any }) {
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

function HashtagSpecification ({ hashtags, setHashtags }) {
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
                <Button type="button" onClick={() => handleHashtagAdd()}>Add</Button>
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

function AuthorsSelection ({ authors, selectedTeachers, setSelectedTeachers }: { authors: { pictureUrl: string; name: string; surname: string; _id: ObjectId; }[]; selectedTeachers: any; setSelectedTeachers: any }) {
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
            <div className="w-full flex flex-row gap-x-3 flex-wrap mt-4 py-1 rounded-lg">
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
import { render } from "react-dom";
import { Skeleton } from "@/components/ui/skeleton";
import moment from "moment";
import { imageOptimizer } from "next/dist/server/image-optimizer";

export function ImageSelection({ imageProperties, setImageProperties, allowLocalImages = true, showPreviewImage = true }: { imageProperties: null | { type: "local" | "global"; src: string; fileOptions?: File; }, setImageProperties: any, allowLocalImages?: boolean; showPreviewImage?: boolean; }) {
  const [selectedImageIdx, setSelectedImageIdx] = useState<null | number>(null);
  const [imagesList, setImagesList] = useState<string[]>([]);
  const inputRef = createRef<HTMLInputElement>();
  const [infoString, setInfoString] = useState<null | string>(null);

  useEffect(() => {
    const fetchImages = async () => {
        try {
            const response = await fetch("/admin/files/getImagesList?service_name=video_blog_upload&count=all");
            const json = await response.json();

            setImagesList(json.images);
        } catch (error) {
            console.error(error);
        }
    }

    fetchImages();
  }, []);

  function handleImageClick (idx: number) {
    setSelectedImageIdx(idx == selectedImageIdx ? null : idx);
  }

  function aboutToClose () {
    if (searchUrl == "") {
        if (selectedImageIdx == null) {
            setImageProperties(null);
        } else {
            setImageProperties({
                type: "global",
                src: `${process.env.SELFADDR}/assets/images/` + imagesList[selectedImageIdx]
            });
        }
    } else {
        setImageProperties({
            type: "global",
            src: searchUrl
        })
    }
  }

  const [inputTimeout, setInputTimeout] = useState(null);

  function doSearch(evt){
    var searchText = evt.target.value;

    if(inputTimeout) {clearTimeout(inputTimeout); setInputTimeout(null); }

    setInputTimeout(setTimeout(() => {
        setSearchUrl(searchText);
    }, 300));
  }

  const [fileLoading, setFileLoading] = useState({
    loading: false,
    progress: 0,
    src: ""
  })

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

  function handleImageUpload (e) {
    let f = e.target.files[0]; 

    if (f) {
        if (allowLocalImages == true) {
            setImageProperties({
                type: "local",
                src: URL.createObjectURL(f),
                fileOptions: f
            });

            closeButtonRef.current?.click();
        } else {
            uploadFileToServer(f);
        }
        
    }
  }

  const [searchUrl, setSearchUrl] = useState("");

  const closeButtonRef = createRef<HTMLButtonElement>();

  return (
    <Dialog>
        {/* {imageProperties != null && (<small className="mr-6 text-sm leading-none">File: {imageProperties.src.replace(/^.*[\\/]/, '')}</small>)} */}
      <DialogTrigger asChild>
        <div className="gap-x-3">
            { (imageProperties != null && showPreviewImage) && (<img src={imageProperties.src} className="mb-3 rounded-md border-2" alt="" width={200} height={100} />) }
            <Button type="button" variant="outline">{imageProperties != null ? "Change image" : "Select image"}</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{imageProperties != null ? "Update image" : "Select image"}</DialogTitle>
          { infoString != null && ( <DialogDescription className={infoString[0] == "d" ? "text-destructive" : ""}>{infoString.split("|")[1]}</DialogDescription> ) }
        </DialogHeader>
        <div className="w-full">
            <div className="flex flex-row flex-wrap gap-x-3 gap-y-3">
                <label htmlFor="fileinput" className={"image-wrap px-2 relative flex flex-col gap-y-1 cursor-pointer hover:bg-slate-200 bg-slate-100 items-center justify-center w-28 h-20 rounded-xl overflow-hidden border-2 transition-all border-transparent " }>
                    <FaPlus className="w-6 h-6" />
                    <small className="text-[10px] leading-none text-center">{ allowLocalImages ? "Select local image" : "Upload a new image" }</small>
                </label>
                <input id="fileinput" type="file" accept=".jpg, .png, .webp" className="hidden" onChange={e => { handleImageUpload(e); }} />
                {fileLoading.loading && (
                    <div className={"image-wrap relative flex flex-col items-center justify-center w-28 h-20 rounded-xl overflow-hidden border-2 transition-all border-transparent " }>
                        <Image src={fileLoading.src} className="z-20 brightness-50 absolute w-full h-full object-cover rounded-xl" alt="" width={100} height={100} /> 
                        <Progress indicatorColor="bg-white" value={fileLoading.progress} className="w-[60%] z-40 bg-stone-900/80 border-white" />
                    </div>
                )}

                { searchUrl == "" ? 

                (
                    <>
                    { (imageProperties?.type == "local" && selectedImageIdx == null)  && (
                        <div onClick={() => { setSelectedImageIdx(null); setImageProperties(null); }} className={"image-wrap relative w-28 h-20 rounded-xl overflow-hidden border-2 transition-all border-transparent border-slate-700 p-0.5"}>
                            <Image src={imageProperties.src} alt="" className="w-full h-full object-cover rounded-xl" width={100} height={100} /> 
                        </div>
                    ) }
                    {imagesList.map((imageUrl, i) => (
                        <div key={i} onClick={() => { handleImageClick(i) }} className={"image-wrap relative w-28 h-20 rounded-xl overflow-hidden border-2 transition-all border-transparent " + (i == selectedImageIdx ? "border-slate-700 p-0.5" : "") }>
                            <Image src={"/assets/images/" + imageUrl} className="w-full h-full object-cover rounded-xl" alt={imageUrl} width={100} height={100} /> 
                        </div>
                    ))}
                    </>
                )

                : (
                    <div onClick={() => { handleImageClick(0) }} className={"image-wrap relative w-28 h-20 rounded-xl overflow-hidden border-2 transition-all border-transparent " + (0 == selectedImageIdx ? "border-slate-700 p-0.5" : "") }>
                        <img src={searchUrl} className="w-full h-full object-cover rounded-xl" alt="" width={100} height={100} /> 
                    </div>
                ) }
            </div>
            {selectedImageIdx != null ? (<Input disabled ref={inputRef} defaultValue={imageProperties ? imageProperties.src : ""} className="mt-4" type="email" placeholder="You can paste image URL here" />) : (<Input ref={inputRef} defaultValue={imageProperties ? imageProperties.src : ""} onChange={evt => doSearch(evt)} className="mt-4" type="email" placeholder="You can paste image URL here" />)}
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <div>
                    <Button ref={closeButtonRef} type="button" className="hidden">Close without fires</Button>
                    <Button type="button" onClick={() => aboutToClose()}>Select a file</Button>
                </div>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

