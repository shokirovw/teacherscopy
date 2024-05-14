import { MongoClient, ObjectId } from 'mongodb';

export type FAQ = {
    _id: ObjectId;
    question: string;
    answer: string;
}

async function getAllFaqs () {
    const client = new MongoClient(process.env.MONGODBADDR!, {
        
    });

    await client.connect();

    const database = client.db('Teachers'); // Choose a name for your database

    const collection = database.collection<FAQ>('Faqs'); // Choose a name for your collection

    let a = await collection.find({  }).toArray();

    return a;
}

export default async function Page () {
    const faqs = await getAllFaqs();

    return (
        <div className='max-w-6xl mx-auto pt-12 px-6'>
            <h1 className="text-center text-4xl font-extrabold text-blue-900 tracking-tight lg:text-5xl">
                FAQ
            </h1>
            <AccordionDemo />
        </div>
        // <div>
        //     <h2>All faqs</h2>
        //     {faqs.map((faq: FAQ, i) => (
        //         <div>
        //             <p>Faq number {i + 1}</p>
        //             <p>Question: {faq.question}</p>
        //             <p>Answer: {faq.answer}</p>
        //         </div>
        //     ))}
        // </div>
    )
}

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
  export function AccordionDemo() {
    return (
      <Accordion type="single" collapsible className="w-full">
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
    )
  }
  