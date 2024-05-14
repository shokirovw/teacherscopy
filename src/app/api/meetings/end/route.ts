import { NextResponse } from "next/server";
import { endGoogleMeeting } from "@/lib/google/lib";
export const dynamic = "force-dynamic"

export async function GET(request: Request, response: NextResponse) {
    /// Agent is a teacher guranteed, otherwise middleware would have redirected

    await endGoogleMeeting();

    return NextResponse.json({
        message: "success"
    }, { status: 201 });
}