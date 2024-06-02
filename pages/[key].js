import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Key() {
    const router = useRouter();
    const { key } = router.query

    const [text, setText] = useState("Redirecting ...")

    useEffect(() => {
        fetch("/api/url" + "?" + new URLSearchParams({
            short: key
        }))
            .then(res => res.json())
            .then(data => {
                if(data.url) {
                    router.push(data.url);
                } else {
                    setText("Error while trying to redirect: This key has no corresponding URL.")
                }
            })
    })

    return(
        <p className='text-2xl ml-4'>{text}</p>
    )
}