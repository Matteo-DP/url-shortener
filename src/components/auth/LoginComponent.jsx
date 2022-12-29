import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

// What is useRef?
// TODO: styling
// TODO: error notification styling

export default function LoginComponent() {

    const router = useRouter();

    const emailRef = useRef();
    const passwordRef = useRef();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const { login } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            router.push("/dashboard"); // Redirect on successful login
        } catch {
            setError("Incorrect email or password");
        }

        setLoading(false);
    }
    
    return(
        <div className="flex justify-center items-center h-[60vh]">
            <div>
                {error && 
                    <div className="text-center w-full text-lg bg-accentred px-4 py-2 mb-4">
                        {error}
                    </div>
                }
                <h1 className="text-3xl text-center mb-1">Almost there!</h1>
                <h1 className="text-4xl">
                    Please
                    <strong className="font-normal text-accentpurple px-2">
                        login
                    </strong>
                    to continue
                </h1>

                <p className="text-textdark mt-4 text-center">Login to generate unlimited short URLs</p>

                <form onSubmit={handleSubmit} className="mx-auto">

                    <div className="mx-auto w-full mt-12">
                        <div className="mb-4">
                            <label htmlFor="email" className="text-lg">Email</label>
                            <input type="email" id="email" className="w-full mt-2 px-4 py-2 rounded-lg" placeholder="email@example.com" ref={emailRef} required />
                        </div>

                        <div className="mb-16">
                            <label htmlFor="password" className="text-lg">Password</label>
                            <input type="password" id="password"className="w-full mt-2 px-4 py-2 rounded-lg bg-accentpurple" placeholder="Type your password ..." ref={passwordRef} required />
                        </div>
                    </div>

                    <div className="flex flex-row justify-around items-center">
                        <input disabled={loading} type="submit" value="Login" className="px-4 py-2 rounded-lg bg-accentpurple cursor-pointer" />
                        <p className="text-textdark">or</p>
                        <Link href="/auth/signup" className="text-accentpurple">
                            Create new account
                            <i className="ml-2 fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}