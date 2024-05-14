import { Article, Document, Presentation, Video } from "../../blog/page";
import { MongoClient, ObjectId } from 'mongodb';
import Image from 'next/image';
import Link from 'next/link';
import { FAQ } from "../../faq/page";
import { revalidatePath } from "next/cache";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LanguageSelection } from "../blogs/presentation/createnew/clientpage2";
import { Button } from "@/components/ui/button";

import Clientpage from './clientpage';
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { AccordionItem, AccordionTrigger, AccordionContent, Accordion } from "@/components/ui/accordion";
import { FaTrash } from "react-icons/fa6";

async function getAllFaqsForAdmin () {
    const client = new MongoClient(process.env.MONGODBADDR!, {
        
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<FAQ>('Faqs'); // Choose a name for your collection

    let a = await collection.find({  }).toArray();

    return a;
}



export default async function Page () {
    let faqs = await getAllFaqsForAdmin();

    async function addNewFaq (formData: FormData) {
        'use server';

        const client = new MongoClient(process.env.MONGODBADDR!, {
        
        });

        await client.connect();

        const database = client.db('Teachers'); // Choose a name for your database

        const collection = database.collection<FAQ>('Faqs'); // Choose a name for your collection

        let a = await collection.insertOne({
            answer: formData.get("answer") as string,
            question: formData.get("question") as string,
            _id: new ObjectId()
        })

        revalidatePath('/admin/faq');
    }

    async function deleteFaq (formData: FormData) {
        'use server';

        const client = new MongoClient(process.env.MONGODBADDR!, {
    
        });

        await client.connect();

        const database = client.db('Teachers'); // Choose a name for your database

        const collection = database.collection<FAQ>('Faqs'); // Choose a name for your collection

        await collection.deleteOne({ _id: new ObjectId(formData.get("faqid") as string) });

        revalidatePath('/admin/faq');
    }

    async function handleSubmit () {
        'use server';

        redirect("/");
    }

    return (
        <>
        

        <div className="p-5 pt-14 max-w-5xl mx-auto">
            <h3 className="text-2xl font-semibold tracking-tight">Manage faqs</h3>
            <p className="text-sm text-muted-foreground">Questions and answers will appear in faq page.</p>
            <Clientpage handleSubmit={handleSubmit} />

            <div className="space-y-10 mt-10">
                <div className=" px-6 py-3 rounded-md bg-slate-50">
                <Badge variant={"default"}>Language: RU</Badge>
                <Accordion type="single" collapsible className="w-full mt-2">
                    <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis quisquam nobis culpa quos recusandae veritatis laborum rerum! Odit modi voluptate nesciunt mollitia reprehenderit numquam expedita inventore iste voluptatibus rerum. Recusandae, iste error. Ab modi pariatur deleniti ea autem et ducimus voluptatum! Aperiam cupiditate accusantium hic maxime impedit quidem voluptates explicabo odio obcaecati expedita iure asperiores optio, minima officiis libero blanditiis.</p>
                        <p className="text-sm font-medium text-destructive">Delete</p>
                    </AccordionContent> 
                    </AccordionItem>
                    <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable it if you
                        prefer.
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
                </div>
                <div className=" px-6 py-3 rounded-md bg-slate-50">
                <Badge variant={"default"}>Language: UZ</Badge>
                <Accordion type="single" collapsible className="w-full mt-2">
                    <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable it if you
                        prefer.
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
                </div>
                <div className=" px-6 py-3 rounded-md bg-slate-50">
                <Badge variant={"default"}>Language: EN</Badge>
                <Accordion type="single" collapsible className="w-full mt-2">
                    <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                    <AccordionTrigger>Is it styled?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It comes with default styles that matches the other
                        components&apos; aesthetic.
                    </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                    <AccordionTrigger>Is it animated?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It&apos;s animated by default, but you can disable it if you
                        prefer.
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
                </div>
            </div>

        </div>
        
        {/* <div>
            <h2>Admin faqs control</h2>

            <form action={addNewFaq}>
                <h2>Add new faq</h2>
                <input type="text" name="question" placeholder="Please write a question" />
                <input type="text" name="answer" placeholder="Please write an answer" />
                <button type="submit">Submit</button>
            </form>
            
            {faqs.map((faq: FAQ, i: number) => (
                <div>
                    <p>FAQ number: {i + 1}</p>
                    <p>{faq.question}</p>
                    <p>{faq.answer}</p>
                    <form action={deleteFaq}>
                        <input type="hidden" value={faq._id.toString()} name="faqid" />
                        <button type="submit">Delete</button>
                    </form>
                </div> 
            ))}
        </div> */}
        </>
    )
}