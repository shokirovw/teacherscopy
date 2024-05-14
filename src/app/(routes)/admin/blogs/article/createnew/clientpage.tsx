'use client';

import { useEffect, useRef, useState, createRef } from "react";
import EditorJS from "@editorjs/editorjs";
const Header = require("@editorjs/header");
const List = require("@editorjs/list");
const Table = require("@editorjs/table");
const Paragraph = require("@editorjs/paragraph");
const Checklist = require("@editorjs/checklist");
const Code = require("@editorjs/code");
const Delimeter = require("@editorjs/delimiter");
const Embed = require("@editorjs/embed");
const LinkEditorJS = require("@editorjs/link");
const Raw = require("@editorjs/raw");
const Quote = require("@editorjs/quote");
const Warning = require("@editorjs/warning");
const ToggleBlock = require("editorjs-toggle-block")
const Alert = require("editorjs-alert")
const SimpleImage = require("simple-image-editorjs")
const Latex = require("editorjs-latex");
const Mermaid = require("editorjs-mermaid");
const Marker = require("@editorjs/marker");
const TextColorPlugin = require("editorjs-text-color-plugin");

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AuthorsSelection, HashtagSpecification, LanguageSelection } from "../../presentation/createnew/clientpage2";
import { ImageSelection } from "../../video/createnew/clientpage";
import { ObjectId } from "mongodb";
import { Button } from "@/components/ui/button";
import { IoImageOutline } from "react-icons/io5";

import Image from "next/image";
import ReactDOM from "react-dom";

const DEFAULT_INITIAL_DATA =  {
      "time": new Date().getTime(),
      "blocks": [
        {
          "type": "header",
          "data": {
            "text": "This is my awesome editor!",
            "level": 1
          }
        },
      ]
}

// Define the toolbox property outside of the component
class ImageForEditorJS {
  static get toolbox() {
    return {
      title: 'Image',
      icon: '<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><rect width="416" height="352" x="48" y="80" fill="none" stroke-linejoin="round" stroke-width="32" rx="48" ry="48"></rect><circle cx="336" cy="176" r="32" fill="none" stroke-miterlimit="10" stroke-width="32"></circle><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="m304 335.79-90.66-90.49a32 32 0 0 0-43.87-1.3L48 352m176 80 123.34-123.34a32 32 0 0 1 43.11-2L464 368"></path></svg>'
    };
  }

  render() {
    const container = document.createElement('div')
    ReactDOM.render(
      <RenderComponent />,
      container
    )

    return container
  }

  save(blockContent) {
    return {
      url: blockContent.querySelector("img.pick").src || ""
    }
  }
}

function RenderComponent() {
  const [imageProperties, setImageProperties] = useState<null | { type: "local" | "global"; src: string; fileOptions?: File; }>(null);

  if (imageProperties?.src && imageProperties.src != "") {
    return (<img src={imageProperties.src} alt="" className="w-full h-auto pick my-3" />)
  } else {
    return (<ImageSelection showPreviewImage={false} imageProperties={imageProperties} setImageProperties={setImageProperties} />);
  }
}

export function EditorComponent ({ articleProperties, setArticleProperties }) {
    const ejInstance = useRef();

    const initEditor = () => {
       const editor = new EditorJS({
          holder: 'editorjs',
          onReady: () => {
            ejInstance.current = editor;
          },
          onChange: async () => {
            let content = await editor.saver.save();

            setArticleProperties({ jsonContentPayload: content });
          },
          inlineToolbar: true,

          placeholder: 'Let`s write an awesome story!',
          tools: { 
            header: Header,
            list: { 
                class: List, 
                inlineToolbar: true 
            },
            table: Table,
            simplestAA: ImageForEditorJS,
            checklist: Checklist,
            Color: {
              class: TextColorPlugin, // if load from CDN, please try: window.ColorPlugin
              config: {
                 colorCollections: ['#EC7878','#9C27B0','#673AB7','#3F51B5','#0070FF','#03A9F4','#00BCD4','#4CAF50','#8BC34A','#CDDC39', '#FFF'],
                 defaultColor: '#FF1300',
                 type: 'text', 
                 customPicker: true // add a button to allow selecting any colour  
              }    
            },
            Marker: {
              class: TextColorPlugin, // if load from CDN, please try: window.ColorPlugin
              config: {
                 defaultColor: '#FFBF00',
                 type: 'marker',
                 icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`
                }       
            },
            quote: Quote,
            code: Code,
            embed: {
              class: Embed,
              config: {
                services: {
                  youtube: true,
                  coub: true
                }
              },
            }
          },
        });
    };

      // This will run only once
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

    return  <><div id='editorjs' className="someclass articleObj mx-auto"></div></>;
}

export default function Page ({ authors }: { authors: { pictureUrl: string; name: string; surname: string; _id: ObjectId; }[]; }) {
    const [selectedTeachers, setSelectedTeachers] = useState<{ [key: number]: boolean | null }>({});
    const [hashtags, setHashtags] = useState<{ [key: string]: boolean }>({});
    const [language, setLanguage] = useState<null | "uz" | "ru" | "en">(null);
    const [imageProperties, setImageProperties] = useState<null | { type: "local" | "global"; src: string; fileOptions?: File; }>(null);
    const [articleProperties, setArticleProperties] = useState<{ contentJSONPayload: Object }>({ contentJSONPayload: {} });

    function handleSubmit (e) {
      e.preventDefault();
      console.log("Sunmitted", articleProperties);
    }

    const textareaRef = createRef<HTMLTextAreaElement>();

    return (
      <form onSubmit={handleSubmit}>
        <div className="relative w-full h-[460px] flex flex-col justify-end items-start border-b">
          {(imageProperties?.src && imageProperties.src != "") ? (
            <>
              <Image src={imageProperties.src} alt={""} className="-z-30 absolute w-full h-full object-cover object-center" width={1920} height={1080} quality={100} />
              <div className='-z-20 absolute w-full h-full bg-gradient-to-b from-transparent from-50% to-black/80'></div>
              <div className="absolute bottom-10 right-10"><ImageSelection showPreviewImage={false} imageProperties={imageProperties} setImageProperties={setImageProperties} /></div>
            </>
          ) : (
            <div className="absolute bottom-10 right-10"><ImageSelection showPreviewImage={false} imageProperties={imageProperties} setImageProperties={setImageProperties} /></div>
          )}
          
          <div className="mb-10 w-7/12 ml-8">
            <textarea name="title" ref={textareaRef} onInput={() => { textareaRef.current.style.height = textareaRef.current?.scrollHeight + "px"; }} className={((imageProperties?.src && imageProperties.src != "") ? "placeholder:text-white/70 text-white " : "placeholder:text-black/20 text-black ") + "w-full  outline-none resize-none h-12 border-none focus:border-none shadow-none border-transparent focus:outline-none bg-transparent text-[40px] leading-snug font-extrabold tracking-tight"} placeholder="Write your title here" />
            {/* <h1 className="text-[40px] leading-snug text-white font-extrabold tracking-tight text-center">
                New Developments in Uzbekistan are breaking the ground
            </h1> */}
          </div>
        </div>
        <div className="max-w-7xl mt-8 mx-auto px-4">
          <EditorComponent articleProperties={articleProperties} setArticleProperties={setArticleProperties} />
          

          <div className="w-full pt-4 space-y-4">
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
                <Button className="w-full" variant={"default"} type="submit">Submit</Button>
            </div>
        </div>
    </form>
)
}