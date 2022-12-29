import React, { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";

// What is useRef?
// TODO: styling
// TODO: error notification styling

export default function SignupComponent() {

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault(); // What does this do?

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match");
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value)
        } catch {
            setError("Failed to create account");
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
                <h1 className="text-4xl text-center">
                    Signup
                </h1>

                <p className="text-textdark mt-4 text-center">Create an account to generate unlimited short URLs</p>

                <form onSubmit={handleSubmit} className="mx-auto">

                    <div className="mx-auto w-full mt-12">
                        <div className="mb-4">
                            <label htmlFor="email" className="text-lg">Email</label>
                            <input type="email" id="email" className="w-full mt-2 px-4 py-2 rounded-lg" placeholder="email@example.com" ref={emailRef} required />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="text-lg">Password</label>
                            <input type="password" id="password"className="w-full mt-2 px-4 py-2 rounded-lg bg-accentpurple" placeholder="Type your password ..." ref={passwordRef} required />
                        </div>

                        <div className="mb-12">
                            <label htmlFor="password" className="text-lg">Confirm password</label>
                            <input type="password" id="password"className="w-full mt-2 px-4 py-2 rounded-lg bg-accentpurple" ref={passwordConfirmRef} placeholder="Confirm your password ..." required />
                        </div>
                    </div>
                    
                    <div className="flex flex-row justify-around items-center">
                        <input disabled={loading} type="submit" value="Create account" className="px-4 py-2 rounded-lg bg-accentpurple cursor-pointer" />
                        <p className="text-textdark">or</p>
                        <Link href="/auth/login" className="text-accentpurple">
                            Login
                            <i className="ml-2 fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}