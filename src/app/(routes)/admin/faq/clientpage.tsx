'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LanguageSelection } from "../blogs/presentation/createnew/clientpage2";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Page ({ handleSubmit }) {

    const [language, setLanguage] = useState<null | "uz" | "ru" | "en">(null);

    return (
        <form action={handleSubmit} className="w-full pt-4 space-y-4">
            <div className="w-full space-y-1">
                <Label htmlFor="title">Title</Label>
                <Input type="text" id="title" name="title" placeholder="Enter a title" />
            </div>
            <div className="w-full space-y-1">
                <Label htmlFor="description">Description</Label>
                <Input type="text" id="description" name="description" placeholder="Enter a description" />
            </div>
            <div className="space-y-2">
                <Label htmlFor="language">Select a language</Label>
                <LanguageSelection language={language} setLanguage={setLanguage} />
            </div>
            <Button className="w-full" variant={"default"} type="submit">Submit</Button>
            {/* {error?.length != 0 && error?.map((err, i) => (
                <p key={i}>An error {err}</p>
            ))} */}
        </form>
    )
}