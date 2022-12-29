import React from "react";
import UrlInput from "../src/components/UrlInput";

export default function Index() {

    return(
        <div className="h-[60vh] flex items-center justify-center">
            <div>
                <h1 className="text-center text-3xl">
                    <strong className="mr-2 text-accentpurple">
                        Free
                    </strong>
                    permanent url shortener
                </h1>

                <p className="text-center mt-4 text-textdark">
                    Generate free permanent short URLs
                </p>

                <div className="mt-16 text-center">
                    <UrlInput />
                </div>
            </div>
        </div>
    )
}