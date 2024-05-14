import MainpageDesign from '@/components/sketches/mainpage_design'
import { getAuthClient } from '@/lib/google/lib';
import { cookies, headers } from 'next/headers'

export default async function Page () {

    let a = JSON.parse(headers().get("userinfo"));

    return (
            <MainpageDesign username={a.name} />
    )
}