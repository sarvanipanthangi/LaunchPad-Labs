"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";
import { generateRoadmap } from "@/lib/api";
import RoadmapTimeline from "@/components/RoadmapTimeline";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Zap } from "lucide-react";
import Link from "next/link";

export default function RoadmapPage() {
    const router = useRouter();
    const [roadmap, setRoadmap] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadRoadmap = async () => {
            const session = getSession();
            if (session.roadmap) {
                setRoadmap(session.roadmap);
                setLoading(false);
            } else {
                // Generate roadmap
                const result = await generateRoadmap(1.5);
                setRoadmap(result);
                setLoading(false);
            }
        };
        loadRoadmap();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
                <div className="flex items-center gap-3 font-mono text-neon-cyan animate-pulse">
                    <Zap className="w-6 h-6 animate-spin" />
                    <span>Generating Personalized Roadmap...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-neon-yellow/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

            <div className="z-10 max-w-6xl mx-auto space-y-16 relative mt-12">
                <Link href="/gap" className="absolute left-0 top-0 text-muted hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 pt-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-neon-yellow/30 bg-neon-yellow/10 text-neon-yellow text-xs font-mono tracking-widest uppercase mb-4 animate-pulse">
                        <Calendar className="w-3 h-3" /> Personalized Plan
                    </div>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
                        Your 30-Day Learning Tree
                    </h1>
                    <p className="text-muted font-mono text-lg max-w-2xl mx-auto">
                        A week-by-week execution plan tailored to bridge your skill gaps.
                    </p>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <RoadmapTimeline weeks={roadmap.weeks} />
                </motion.div>

                {/* Info Box */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-zinc-900/40 p-6 rounded-2xl border border-white/10 backdrop-blur-md max-w-2xl mx-auto"
                >
                    <p className="text-sm text-muted font-mono text-center leading-relaxed">
                        💡 <span className="text-white font-bold">Pro Tip:</span> This roadmap adapts based on your progress.
                        Complete tasks to unlock advanced modules and receive real-time adjustments.
                    </p>
                </motion.div>

                {/* CTA */}
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => router.push("/adapt")}
                        className="group relative px-12 py-6 rounded-full bg-white text-black font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,214,10,0.4)] overflow-hidden flex items-center gap-3"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-yellow/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
                        <span>Simulate My Progress</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}
