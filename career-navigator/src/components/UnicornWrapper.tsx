"use client";
import React, { useEffect } from "react";
import Script from "next/script";

declare global {
    interface Window {
        UnicornStudio: {
            init: () => void;
        };
    }
}

export default function UnicornWrapper({ projectId, altText }: { projectId: string; altText: string }) {

    useEffect(() => {
        // Re-init when component mounts if script is already loaded
        if (typeof window !== "undefined" && window.UnicornStudio) {
            window.UnicornStudio.init();
        }
    }, []);

    return (
        <>
            <Script
                src="https://cdn.unicorn.studio/v1.1.1/unicornStudio.umd.js"
                strategy="lazyOnload"
                onLoad={() => {
                    console.log("Unicorn Studio Loaded");
                    window.UnicornStudio?.init();
                }}
            />
            <div
                data-us-project={projectId}
                className="w-full h-full absolute top-0 left-0 z-0"
                style={{ overflow: 'hidden' }}
            ></div>
        </>
    );
}
