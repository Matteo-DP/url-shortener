import React, { useRef, useState } from 'react';
import { useRouter } from "next/router";
import { useAuth } from "../../src/contexts/AuthContext";

export default function UrlInput({ refreshFunction = undefined }) {

    const urlRef = useRef();

    const { currentUser } = useAuth();
    const router = useRouter();

    const [error, setError] = useState("")

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if(!currentUser) {
            router.push("/auth/login");
        } else {
            const res = await fetch("/api/url", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    uuid: currentUser.uid,
                    url: urlRef.current.value
                }),
            })
            const data = await res.json();
            
            if(res.status == 200) {
                if(!refreshFunction) {
                    router.push("/dashboard")
                } else {
                    refreshFunction()
                }
            } else {
                setError(data.message)
            }
        }
    }

    const [hovering, setHovering] = useState(false);

    return (
        <form onSubmit={handleSubmit} className="h-[40px]">
            <input type="text" placeholder="Long URL here ..." name="url" id="url" ref={urlRef} required
                className="h-full w-[350px] rounded-l-lg px-4 text-accentpurple focus:bg-textdark focus:outline-none    "
            />
            <button type="submit" className="bg-accentpurple px-4 rounded-r-lg h-full"
                onMouseOver={() => setHovering(true)}
                onMouseOut={() => setHovering(false)}
            >
                Generate URL
                <i className={`ml-2 fa-solid fa-arrow-right ease-in-out duration-200 ${hovering && "translate-x-1"}`}></i>
            </button>

            {error && <div className="mt-4 absolute bg-accentred text-textlight text-center px-4 py-2 rounded-lg">{error}</div>}
        </form>
    )
}
