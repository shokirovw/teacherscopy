'use client';

import { useRouter  } from 'next/navigation'

import { SigninPage, useSigninPageStatus } from '@/components/signinpage'

import { processEmailString, processPasswordString } from '@/lib/input_sanitizers'
import { coreapi } from '@/lib/core-api';

export default function Signin() {
    const router = useRouter();

    const { status, showError } = useSigninPageStatus();

    const handleSigninSubmit = async (formData: { email: string; password: string; }): Promise<void> => {
        let email = formData.email;
        let password = formData.password;

        let email_processed = processEmailString(email);

        if (email_processed.error) {
            showError(email_processed.error, ["email"]); return;
        }

        let password_processed = processPasswordString(password);

        if (password_processed.error) {
            showError(password_processed.error, ["password"]); return;
        }

        let formdata = new FormData();

        formdata.append("email", email_processed.email!);
        formdata.append("password", password_processed.password!);

        let req = await fetch("/signin/api", {
            method: "POST",
            credentials: "include",
            body: formdata,
            next: { revalidate: 0 }
        });

        let res = await req.json();

        if (res.message == "Success") {
            window.location.replace("/");
        } else {
            showError("Server error", []); return;
        }
    }

    return (
        <SigninPage status={status} submitHandler={handleSigninSubmit}  />
    )
}


