import { NextResponse } from "next/server";
import { createGoogleMeeting, getMeetingInfo } from "@/lib/google/lib";
export const dynamic = "force-dynamic"

export async function GET(request: Request, response: NextResponse) {
    /// Agent is a teacher guranteed, otherwise middleware would have redirected

    let meeting = await getMeetingInfo();

    if (meeting == null) {
        return NextResponse.json({ message: "success", live: false }, { status: 201 });
    } else {
        return NextResponse.json({ message: "success", live: true, meetingUrl: meeting?.meetingUri }, { status: 201 });
    }
}