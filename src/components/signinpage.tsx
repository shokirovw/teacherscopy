import { NightModeToggle } from "@/components/nightmode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FormEvent, RefObject, useEffect, useState } from "react";

import { useRef } from 'react';

import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type SigninPageStatus = {
    error: {
        text: string;
        affected_fields_names: string[]
    } | null
}

export function useSigninPageStatus () {
    const [status, setStatus] = useState<SigninPageStatus>({ error: null });

    return {
        status: status,
        showError (error_text: string, affected_fields: string[]) {
            setStatus({ ...status,
                error: {
                    text: error_text,
                    affected_fields_names: affected_fields
                }
            });
        },
    };
}

export function SigninPage ({ submitHandler, status } : {
    /// options
    submitHandler: (formData: { email: string; password: string; }) => Promise<void>,
    status: SigninPageStatus
}) {

    type SigninInput = {
        ref: RefObject<HTMLInputElement>,
        getValue: () => string;
        setWaitingMode: (turn: boolean) => void,
        setErrorMode: (turn: boolean) => void
    }

    const email_input: SigninInput = {
        ref: useRef<HTMLInputElement>(null),
        getValue: function () {
            return this.ref.current?.value || ""
        },
        setWaitingMode: function (turn: boolean) {
            if (turn) {
                this.ref.current?.classList.add("opacity-40");
                this.ref.current?.classList.add("pointer-events-none");
            } else {
                this.ref.current?.classList.remove("opacity-40");
                this.ref.current?.classList.remove("pointer-events-none");
            } 
        },
        setErrorMode (turn: boolean) {
            if (turn) {
                this.ref.current!.style.borderColor = "red";
            } else {
                this.ref.current!.style.borderColor = "";
            }
        }
    }

    const password_input: SigninInput = {
        ref: useRef<HTMLInputElement>(null),
        getValue: function () {
            return this.ref.current?.value || ""
        },
        setWaitingMode: function (turn: boolean) {
            if (turn) {
                this.ref.current?.classList.add("opacity-40");
                this.ref.current?.classList.add("pointer-events-none");
            } else {
                this.ref.current?.classList.remove("opacity-40");
                this.ref.current?.classList.remove("pointer-events-none");
            } 
        },
        setErrorMode (turn: boolean) {
            if (turn) {
                this.ref.current!.style.borderColor = "red";
            } else {
                this.ref.current!.style.borderColor = "";
            }
        }
    }

    const error_message_ref = useRef<HTMLParagraphElement>(null);

    useEffect(() => {
        if (status.error != null) {
            error_message_ref.current!.innerText = status.error.text;
            let affects = status.error.affected_fields_names;
            for (let i = 0; i < affects.length; ++i) {
                if (keyinputs[affects[i]]) {
                    keyinputs[affects[i]].setErrorMode(true);
                }
            }
        }
    }, [status]);

    function clearErrors () {
        error_message_ref.current!.innerText = "";
        
        Object.values(keyinputs).forEach((input) => {
            input.setErrorMode(false);
        })
    }

    let keyinputs : { [key: string]: SigninInput } = {
        email: email_input,
        password: password_input
    }
    
    const [buttonWaiting, setButtonWaiting] = useState(false);

    function startWaiting () {
        email_input.setWaitingMode(true);
        password_input.setWaitingMode(true);
        setButtonWaiting(true);
    } 

    function endWaiting () {
        email_input.setWaitingMode(false);
        password_input.setWaitingMode(false);
        setButtonWaiting(false);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        startWaiting();

        submitHandler({
            email: email_input.getValue(),
            password: password_input.getValue()
        });

        endWaiting();
    }

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-6 container max-w-3xl">
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
                    Sign in
                </h3>
                <h4 className="scroll-m-20 text-md -mt-3 font-normal tracking-tight text-center">Use your account</h4>
                <div className="flex flex-col">
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input required type="email" name="email" ref={email_input.ref} placeholder="Email" onKeyDown={() => clearErrors()} />
                    </div>
                    <div className="grid w-full items-center gap-1.5 mt-7">
                        <Label htmlFor="password">Password</Label>
                        <Input required type="password" name="password" ref={password_input.ref} min={7} max={40} placeholder="Password" onKeyDown={() => clearErrors()} />
                    </div>
                    <Link href={"/signup"} className="text-sm font-medium leading-none w-fit ml-auto mt-5 -mb-5">
                        Forgot password?
                    </Link>
                </div>
                <p className="text-sm text-destructive" ref={error_message_ref}></p>
                {buttonWaiting ? (
                    <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                    </Button>
                ) : (
                    <Button className="">
                        Submit
                    </Button>
                )}
                <Link href={"/signup"} className="text-sm font-medium leading-none w-fit mx-auto">
                    Create Account
                </Link>
            </form>
        </div>
    );
}