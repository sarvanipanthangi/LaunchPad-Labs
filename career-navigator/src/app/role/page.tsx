"use client";
import React from "react";
import { useRouter } from "next/navigation";
import RoleCard from "@/components/RoleCard";
import { getMarketIntel } from "@/lib/api";
import { motion } from "framer-motion";

const ROLES = [
    {
        title: "AI Engineer",
        skills: ["Python", "PyTorch", "LLMs"],
        demand: "Very High",
        companies: ["OpenAI", "Anthropic", "Google", "Tesla", "Meta"],
    },
    {
        title: "Full Stack Developer",
        skills: ["React", "Node.js", "SQL"],
        demand: "High",
        companies: ["Vercel", "Stripe", "Airbnb", "Coinbase", "Shopify"],
    },
    {
        title: "Data Scientist",
        skills: ["Pandas", "SQL", "Statistics"],
        demand: "High",
        companies: ["Netflix", "Uber", "Spotify", "Pinterest", "Faire"],
    },
    {
        title: "DevOps Engineer",
        skills: ["Docker", "Kubernetes", "AWS"],
        demand: "Very High",
        companies: ["Amazon", "Microsoft", "Datadog", "HashiCorp", "Cloudflare"],
    }
];

export default function RoleSelection() {
    const router = useRouter();

    const handleSelect = async (role: string) => {
        // Mock API call to market intel
        await getMarketIntel(role);
        router.push("/market");
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden flex flex-col items-center justify-center">
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

            <div className="z-10 w-full max-w-7xl space-y-20">
                <div className="text-center space-y-6">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-10 duration-700">
                        Choose your target.
                    </h1>
                    <p className="text-muted font-mono text-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200">
                        Select a role to align your path with real-time market data.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {ROLES.map((role, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15 + 0.5, duration: 0.6 }}
                            className="h-full"
                        >
                            {/* @ts-ignore */}
                            <RoleCard {...(role as any)} onClick={() => handleSelect(role.title)} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
