"use client";
import React, { useEffect, useState } from "react";
import { getSession } from "@/lib/session";
import { motion } from "framer-motion";
import { Target, TrendingUp, Calendar, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        const data = getSession();
        setSession(data);
    }, []);

    if (!session) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono animate-pulse">
                Loading Dashboard...
            </div>
        );
    }

    const currentRole = session.extractedSkills?.experience_level || "Intermediate";
    const targetRole = session.dreamRole || "AI Engineer";
    const gapScore = session.gapAnalysis?.overall_gap_score || 6.4;

    return (
        <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-cyan/10 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

            <div className="z-10 max-w-7xl mx-auto space-y-12 relative pt-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6"
                >
                    <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
                        Career Co-Pilot Dashboard
                    </h1>
                    <p className="text-muted font-mono text-lg">Your personalized career navigation system.</p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Current Role */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md hover:border-neon-cyan/50 transition-all group"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-neon-cyan/20 text-neon-cyan">
                                <Target className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-mono uppercase tracking-widest text-muted">Current Level</h3>
                        </div>
                        <p className="text-3xl font-bold font-serif text-white group-hover:text-neon-cyan transition-colors">{currentRole}</p>
                    </motion.div>

                    {/* Target Role */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md hover:border-neon-purple/50 transition-all group"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-neon-purple/20 text-neon-purple">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-mono uppercase tracking-widest text-muted">Target Role</h3>
                        </div>
                        <p className="text-3xl font-bold font-serif text-white group-hover:text-neon-purple transition-colors">{targetRole}</p>
                    </motion.div>

                    {/* Gap Score */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-zinc-900/40 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md hover:border-neon-pink/50 transition-all group"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-neon-pink/20 text-neon-pink">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-sm font-mono uppercase tracking-widest text-muted">Career Distance</h3>
                        </div>
                        <p className="text-3xl font-bold font-serif text-white group-hover:text-neon-pink transition-colors">{gapScore} / 10</p>
                    </motion.div>
                </div>

                {/* Active Roadmap */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-zinc-900/40 p-10 rounded-[2rem] border border-white/10 backdrop-blur-md"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-xl bg-neon-yellow/20 text-neon-yellow">
                                <Calendar className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-white">Active Roadmap</h2>
                        </div>
                        <span className="px-4 py-2 rounded-full bg-neon-green/20 text-neon-green text-xs font-bold uppercase tracking-widest border border-neon-green/30">
                            In Progress
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {["Week 1", "Week 2", "Week 3", "Week 4"].map((week, i) => (
                            <div
                                key={i}
                                className="p-6 bg-black/40 rounded-xl border border-white/5 hover:border-neon-cyan/30 transition-all group"
                            >
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-neon-cyan transition-colors">{week}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted">
                                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-neon-cyan"
                                            style={{ width: i === 0 ? "80%" : i === 1 ? "40%" : "0%" }}
                                        />
                                    </div>
                                    <span className="font-mono">{i === 0 ? "80%" : i === 1 ? "40%" : "0%"}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Today's Task */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gradient-to-br from-neon-cyan/20 to-neon-purple/20 p-10 rounded-[2rem] border border-white/20 backdrop-blur-md"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <CheckCircle2 className="w-8 h-8 text-neon-cyan" />
                        <h2 className="text-2xl font-serif font-bold text-white">Next Action</h2>
                    </div>
                    <p className="text-xl text-white font-mono mb-6">
                        Complete: <span className="text-neon-cyan font-bold">Python Data Structures Refresher</span>
                    </p>
                    <div className="flex items-center gap-4">
                        <button className="px-6 py-3 rounded-full bg-white text-black font-bold hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Mark Complete
                        </button>
                        <button className="px-6 py-3 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-all">
                            Skip for Now
                        </button>
                    </div>
                </motion.div>

                {/* Sticky Banner */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="sticky bottom-6 bg-black/90 backdrop-blur-xl p-6 rounded-2xl border border-white/10 shadow-2xl"
                >
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-mono text-muted">
                            <span className="text-white font-bold">Your career plan will evolve as you do.</span> Keep building, keep adapting.
                        </p>
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-6 py-3 rounded-full bg-neon-cyan text-black font-bold hover:bg-neon-green transition-all"
                        >
                            Restart Journey
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
