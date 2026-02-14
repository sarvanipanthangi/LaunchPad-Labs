"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";
import GapVector from "@/components/GapVector";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Target, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function GapAnalysis() {
    const router = useRouter();
    const [gapData, setGapData] = useState<any>(null);

    useEffect(() => {
        const session = getSession();
        if (session.gapAnalysis) {
            setGapData(session.gapAnalysis);
        } else {
            // Fallback demo data
            setGapData({
                missing_skills: ["Deep Learning", "Linear Algebra", "Docker", "Cloud Basics"],
                weak_skills: [
                    { name: "Python", user: 4, target: 9, gap: 5 },
                    { name: "Machine Learning", user: 0, target: 9, gap: 9 },
                ],
                strong_skills: ["React", "Communication", "TypeScript"],
                overall_gap_score: 6.4,
                priority_order: ["Machine Learning", "Deep Learning", "Python", "Docker"],
            });
        }
    }, []);

    if (!gapData) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono animate-pulse">
                Computing Gap Analysis...
            </div>
        );
    }

    const gapPercentage = (gapData.overall_gap_score / 10) * 100;

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-pink/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

            <div className="z-10 max-w-6xl mx-auto space-y-16 relative mt-12">
                <Link href="/market" className="absolute left-0 top-0 text-muted hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 pt-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-neon-pink/30 bg-neon-pink/10 text-neon-pink text-xs font-mono tracking-widest uppercase mb-4 animate-pulse">
                        <AlertTriangle className="w-3 h-3" /> Gap Detected
                    </div>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
                        Here's the gap between you and the role.
                    </h1>
                    <p className="text-muted font-mono text-lg max-w-2xl mx-auto">
                        AI-powered comparison of your current profile vs. market expectations.
                    </p>
                </motion.div>

                {/* Overall Gap Score */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex justify-center"
                >
                    <div className="relative w-64 h-64">
                        {/* Circular Progress */}
                        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="#1a1a1a"
                                strokeWidth="8"
                            />
                            <motion.circle
                                cx="50"
                                cy="50"
                                r="45"
                                fill="none"
                                stroke="url(#gradient)"
                                strokeWidth="8"
                                strokeLinecap="round"
                                strokeDasharray={`${2 * Math.PI * 45}`}
                                initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                                animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - gapPercentage / 100) }}
                                transition={{ duration: 2, ease: "easeOut" }}
                            />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#ff4d6d" />
                                    <stop offset="100%" stopColor="#9d4edd" />
                                </linearGradient>
                            </defs>
                        </svg>

                        {/* Center Text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold text-white font-mono">{gapData.overall_gap_score}</span>
                            <span className="text-sm text-muted font-mono">/ 10</span>
                            <span className="text-xs text-muted uppercase tracking-widest mt-2">Career Distance</span>
                        </div>
                    </div>
                </motion.div>

                {/* Gap Vector Visualization */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-zinc-900/40 p-8 md:p-12 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-2xl"
                >
                    <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
                        <Target className="w-6 h-6 text-neon-purple" />
                        Skill Gap Analysis
                    </h2>
                    <GapVector skills={gapData.weak_skills} />
                </motion.div>

                {/* Priority List & Missing Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Missing Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md"
                    >
                        <h3 className="text-xl font-serif font-bold mb-6 text-neon-pink">Missing Skills</h3>
                        <div className="space-y-3">
                            {gapData.missing_skills.map((skill: string, i: number) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-black/40 rounded-xl border border-neon-pink/20 hover:border-neon-pink/50 transition-colors">
                                    <div className="w-2 h-2 bg-neon-pink rounded-full animate-pulse" />
                                    <span className="font-mono text-sm">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Priority Order */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md"
                    >
                        <h3 className="text-xl font-serif font-bold mb-6 text-neon-purple">Learning Priority</h3>
                        <div className="space-y-3">
                            {gapData.priority_order.map((skill: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 p-3 bg-black/40 rounded-xl border border-neon-purple/20 hover:border-neon-purple/50 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center text-neon-purple font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <span className="font-mono text-sm">{skill}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* CTA */}
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => router.push("/roadmap")}
                        className="group relative px-12 py-6 rounded-full bg-white text-black font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(157,78,221,0.4)] overflow-hidden flex items-center gap-3"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
                        <span>Build My 30-Day Plan</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
