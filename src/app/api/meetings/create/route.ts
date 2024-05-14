import { NextResponse } from "next/server";
import { createGoogleMeeting, getMeetingInfo } from "@/lib/google/lib";
export const dynamic = "force-dynamic"

export async function GET(request: Request, response: NextResponse) {
    /// Agent is a teacher guranteed, otherwise middleware would have redirected

    let meeting;

    meeting = await createGoogleMeeting();

    return NextResponse.json({ message: "success", meetingUrl: meeting?.meetingUri }, { status: 201 });
}