import { MongoClient, ObjectId } from "mongodb";
import ClientPresentationCreate from "./clientpage";
import { Author } from "../../../podcasts/createnew/page";

import { getAuthorsList } from "../../presentation/createnew/page";

import "./articleStyles.css"

export default async function Page () {
    const authors = await getAuthorsList();
     
    return (
        <ClientPresentationCreate authors={authors} />
    )
}