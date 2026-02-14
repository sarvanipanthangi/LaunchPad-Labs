"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";
import { runGapAnalysis } from "@/lib/api";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, BarChart2, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function MarketIntel() {
    const router = useRouter();
    const [role, setRole] = useState("AI Engineer");
    const [skills, setSkills] = useState<any[]>([]);

    useEffect(() => {
        const session = getSession();
        if (session.marketSkills?.requiredSkills) {
            setRole(session.marketSkills.role);
            setSkills(session.marketSkills.requiredSkills);
        } else {
            // Fallback for demo flow integrity
            setSkills([
                { name: "Python", level: 9, important: true },
                { name: "Machine Learning", level: 9, important: true },
                { name: "Deep Learning", level: 8, important: true },
                { name: "Docker", level: 6, important: false },
                { name: "Cloud Basics", level: 6, important: false },
                { name: "Linear Algebra", level: 7, important: false },
            ]);
        }
    }, []);

    const handleCompare = async () => {
        await runGapAnalysis();
        router.push("/gap");
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden flex flex-col items-center">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-neon-purple/20 to-transparent opacity-50 pointer-events-none" />

            <div className="z-10 w-full max-w-6xl mt-12 space-y-16 text-center relative">
                <Link href="/role" className="absolute left-0 top-0 text-muted hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-mono tracking-widest uppercase mb-4 animate-pulse">
                        <TrendingUp className="w-3 h-3" /> Live Market Data
                    </div>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
                        Industry Expectations for <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple">{role}</span>
                    </h1>
                    <p className="text-muted font-mono text-lg max-w-2xl mx-auto">
                        Based on 1.2M recent job postings and hiring trends.
                    </p>
                </div>

                {/* Skills Bubble Visualization */}
                <div className="relative min-h-[400px] flex items-center justify-center p-10">
                    <div className="flex flex-wrap items-center justify-center gap-8 max-w-4xl mx-auto relative z-10">
                        {skills.map((skill, i) => {
                            const size = skill.important ? "w-32 h-32 md:w-48 md:h-48 text-xl" : "w-24 h-24 md:w-32 md:h-32 text-sm";
                            const color = skill.important ? "bg-neon-purple text-white shadow-[0_0_40px_rgba(157,78,221,0.4)]" : "bg-zinc-800 text-zinc-300 border border-white/10";

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ type: "spring", stiffness: 100, damping: 10, delay: i * 0.1 }}
                                    className={`${size} rounded-full flex flex-col items-center justify-center font-bold font-mono text-center p-4 cursor-default hover:scale-110 transition-transform duration-300 relative group ${color} shadow-2xl`}
                                >
                                    <span>{skill.name}</span>
                                    <span className="text-[10px] font-normal opacity-0 group-hover:opacity-100 transition-opacity absolute bottom-4 uppercase tracking-widest">
                                        Required
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Organic Background Blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none opacity-20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/10 rounded-full animate-[spin_40s_linear_infinite_reverse] pointer-events-none opacity-30" />
                </div>

                <div className="pt-10 pb-20 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-500">
                    <button
                        onClick={handleCompare}
                        className="group relative px-12 py-6 rounded-full bg-white text-black font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,245,212,0.4)] overflow-hidden flex items-center gap-3 mx-auto"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
                        <BarChart2 className="w-6 h-6 group-hover:text-neon-purple transition-colors" />
                        <span>Compare Me to the Market</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
