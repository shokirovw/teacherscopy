import Image from "next/image";
import { Suspense } from "react";
import ClientPage from "./clientpage";
import pic from "./starwars.jpg";
import Script from "next/script";
import { headers } from "next/headers";

export default function Page ({ params: { usernumber } }: { params: { usernumber: string } }) {
    let a = JSON.parse(headers().get("agentinfo")!);

    console.log(a);

    return (
        <>
            <Suspense fallback={<p>Loading feed...</p>}>
                <p>Usernumber: {usernumber}</p>
                {/* @ts-expect-error */}
                <SomeComp /> 
            </Suspense>
            <ClientPage />
            <div style={{ position: 'relative', height: '400px', width: '800px' }}>
                <Image src={pic} alt="" placeholder="blur" priority fill
                    sizes="(min-width: 808px) 50vw, 100vw"
                    style={{
                        objectFit: 'cover', // cover, contain, none
                    }} 
                    quality={75}
                    //onLoadingComplete={() => removeBlur} only available in client components 
                 />
            </div>
            <div dangerouslySetInnerHTML={{ __html: "<div><b id='some'>Hello From Pure HTML</b></div>" }}></div>
            <img
                src="https://cloudfront-us-east-2.images.arcpublishing.com/reuters/OTTAGNSV5JJPTI6B77EV4BIGOA.jpg"
                alt="Picture of the author"
                width={800}
                height={500}
                loading="lazy" // loading lazy takes precedence over fetchPriority
                fetchPriority="high"
            />
            <Script id="show-banner">
                {`document.getElementById('some').style.color = 'green';`}
            </Script>
        </>
    )
}

async function SomeComp () {
    await fetch("https://satuzbekistan.vercel.app", { next: { revalidate: 0 } });

    return (
        <p>A message</p>
    )
}