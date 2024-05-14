import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
var jose = require('jose');

export async function middleware(request: NextRequest) {
    let token = request.cookies.get("token")?.value;

    const res = NextResponse.next();

    if (request.url == process.env.SELFADDR + "/") {
        res.headers.set('x-middleware-cache', 'no-cache');
    }

    if (token) {
        let decoded;
        try {
            decoded = await jose.jwtVerify(token, new TextEncoder().encode('some-secret-key'));
        } catch {
            decoded = null;
        }

        if (decoded) {
            let payload = decoded.payload;

            res.headers.set("userinfo", JSON.stringify({
                role: payload.role,
                email: payload.email,
                name: payload.name,
                surname: payload.surname,
                picUrl: payload.pictureUrl
            }));

            return res;
        } else {
            res.headers.set("userinfo", JSON.stringify({ role: "Guest" }));
            return res;
        }
    } else {
        res.headers.set("userinfo", JSON.stringify({ role: "Guest" }));
        return res;
    }
}