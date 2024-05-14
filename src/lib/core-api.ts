import { ProcessedEmailString, ProcessedPasswordString } from "./input_sanitizers";

type SignInAPIResReason = "scarce_credentials" | "email_syntax_error" | "password_syntax_error" | "wrong_credentials";

type SignInAPIRes = {
    error?: {
        reason: SignInAPIResReason;
        affects: ("email" | "password")[];
    };
    redirect_uri?: string;
}

type SignInLibResponse = {
    action: 'error' | 'redirect',
    error?: {
        text: string;
        affected_fields: ('email' | 'password')[]
    },
    redirect?: {
        url: string;
    }
}

function reasonToText (reason: SignInAPIResReason) {
    let text;

    switch (reason) {
        case "email_syntax_error": text = "Invalid credentials entered"; break;
        case "password_syntax_error": text = "Invalid credentials entered"; break;
        case "scarce_credentials": text = "Please fill the required fields"; break;
        case "wrong_credentials": text = "Username and password are not found"; break;
    }

    return text;
}

export const coreapi = {

    async signinUser(options: { email: ProcessedEmailString, password: ProcessedPasswordString, callbackUrl: string }) : Promise<SignInLibResponse> {
        const res = await fetch(`http://localhost:4000/signin?callback_url=${options.callbackUrl}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': 'http://localhost:4000'
            },
            credentials: "include",
            body: new URLSearchParams({
                email: options.email,
                password: options.password
            }),
            next: { revalidate: 0 }
        });

        if (!res.ok) {
            return {
                action: "error",
                error: {
                    text: "Internal server error, please try again later",
                    affected_fields: []
                }
            }
        } else {
            let data = (await res.json()) as SignInAPIRes;

            if (!data.error && !data.redirect_uri) {
                return {
                    action: "error",
                    error: {
                        text: "Internal server error, please try again later",
                        affected_fields: []
                    }
                }
            }

            if (data.error != null) {
                return {
                    action: "error",
                    error: {
                        text: reasonToText(data.error.reason),
                        affected_fields: data.error.affects
                    }
                }
            } 

            if (data.redirect_uri != null) {
                return {
                    action: "redirect",
                    redirect: {
                        url: data.redirect_uri
                    }
                }
            }

            return {
                action: "error",
                error: {
                    text: "Internal server error, please try again later",
                    affected_fields: []
                }
            }
        }
    }  
}