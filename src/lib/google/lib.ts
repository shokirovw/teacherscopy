import { writeFile, readFile } from 'fs/promises'
import path from "path";

const clientID = "803481970178-d943dbvc7skcv7o0ukh7u74elt7khnqr.apps.googleusercontent.com"
const clientSecret = "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"

import { google } from 'googleapis';

import { v2 as meet } from '@google-apps/meet';

export async function getGoogleCredentials () : Promise<{ 
    access_token: string; refresh_token: string; scope: string; token_type: string; 
    id_token: string; expiry_date: number; 
}> {
    let credentials = (await readFile(path.join(process.cwd(), "src/lib/google/credentialsTest.json"))).toString();

    let regenerate;

    if (credentials) {
        credentials = JSON.parse(credentials);

        if (credentials.expiry_date < Date.now()) {
            regenerate = true;
        } else {
            regenerate = false;
        }
    } else {
        regenerate = true;
    }

    if (regenerate) {
        // token has expired

        const res = await fetch("https://www.googleapis.com/oauth2/v4/token", {
            method: "POST",
            body: `grant_type=refresh_token&refresh_token=${credentials.refresh_token}&client_id=${clientID}&client_secret=${clientSecret}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            return credentials; // fallback invalid credentials sent
        }
        
        const response = await res.json();

        let newTokenInfo = {
            access_token: response.access_token,
            refresh_token: credentials.refresh_token,
            scope: credentials.scope,
            token_type: credentials.token_type,
            id_token: response.id_token,
            expiry_date: Date.now() + response.expires_in * 1000,
        }

        await writeFile(
            path.join(process.cwd(), "src/lib/google/credentialsTest.json"),
            JSON.stringify(newTokenInfo)
        );

        return newTokenInfo;
    } else {
        return credentials;
    }
}

export async function getAuthClient () {
    let authclient = new google.auth.OAuth2({
        credentials: await getGoogleCredentials()
    });

    return authclient;
}

type Meeting = { live: boolean; name: string; meetingUri: string; meetingCode: string; config: { accessType: string; entryPointAccess: string }; activeConference: any }

export async function createGoogleMeeting () : 
    Promise<Meeting | null>
{
    let meeting = await getMeetingInfo();

    if (meeting == null) {
        ///////
        const meetClient = new meet.SpacesServiceClient({
            authClient: await getAuthClient()
        });
    
        const response = await meetClient.createSpace(
            {
      
            },
            {
              
            }
        );
        ////////

        let meetingObj = {
            live: true,
            ...response[0]
        }
    
        await writeFile(
            path.join(process.cwd(), "src/lib/google/meeting.json"),
            JSON.stringify(meetingObj)
        );
    
        return meetingObj;
    } else {
        return meeting;
    }
}

export async function endGoogleMeeting (): Promise<boolean> {
    if (await getMeetingInfo() != null) {
        let newMeetObj = { live: false };

        await writeFile(
            path.join(process.cwd(), "src/lib/google/meeting.json"),
            JSON.stringify(newMeetObj)
        );
    }

    return true;
}

export async function getMeetingInfo () {

    let contents = await readFile(path.join(process.cwd(), "src/lib/google/meeting.json"));

    if (contents) {
        let data = JSON.parse(contents.toString());

        if (data.live == true) {
            return data;
        } else {
            return null;
        }

    } else {
        return null;
    }
}