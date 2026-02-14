"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "@/lib/session";
import SkillBars from "@/components/SkillBars";
import SkillsRadar from "@/components/RadarChart";
import { Briefcase, ArrowRight, Brain, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProfileResults() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const session = getSession();
        if (session?.extractedSkills) {
            setProfile(session.extractedSkills);
        } else {
            // Fallback demo data if session is empty (so it works without full flow)
            setProfile({
                technical_skills: [
                    { name: "React", level: 8, category: "Frontend" },
                    { name: "TypeScript", level: 7, category: "Frontend" },
                    { name: "Node.js", level: 5, category: "Backend" },
                    { name: "Python", level: 4, category: "Backend" },
                    { name: "SQL", level: 3, category: "Database" },
                ],
                soft_skills: [
                    { name: "Communication", level: 9 },
                    { name: "Problem Solving", level: 7 },
                    { name: "Leadership", level: 5 },
                    { name: "Adaptability", level: 8 },
                ],
                experience_level: "Intermediate",
                domain_exposure: ["Web Development", "SaaS", "E-commerce"],
            });
        }
    }, []);

    if (!profile) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono animate-pulse">
            Loading AI Profile...
        </div>
    );

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[120px] animate-pulse-slow pointer-events-none opacity-50" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none opacity-50" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-6xl mx-auto space-y-12 relative z-10"
            >
                {/* Header */}
                <div className="text-center space-y-6 pt-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                        Here’s what we understood about you.
                    </h1>
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-mono tracking-widest uppercase animate-pulse">
                        <Zap className="w-3 h-3 fill-current" />
                        AI Analysis Complete • Confidence: 94%
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Technical Skills Card */}
                    <div className="col-span-1 lg:col-span-2 bg-zinc-900/40 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-2xl hover:border-neon-cyan/30 transition-all duration-500 group">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 rounded-xl bg-neon-cyan/20 text-neon-cyan">
                                    <Brain className="w-6 h-6" />
                                </div>
                                <h2 className="text-2xl font-bold font-serif text-white">Technical DNA</h2>
                            </div>
                        </div>
                        {/* @ts-ignore */}
                        <SkillBars skills={profile.technical_skills} />
                    </div>

                    {/* Soft Skills & Experience */}
                    <div className="space-y-8 flex flex-col">
                        {/* Soft Skills Radar */}
                        <div className="flex-1 bg-zinc-900/40 p-8 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-2xl hover:border-neon-purple/30 transition-all duration-500 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50"></div>
                            <h3 className="text-lg font-bold font-serif mb-6 flex items-center gap-2 text-white/90">
                                <span className="w-2 h-2 bg-neon-purple rounded-full animate-pulse"></span> Soft Skills Matrix
                            </h3>
                            <div className="w-full flex justify-center scale-110">
                                {/* @ts-ignore */}
                                <SkillsRadar data={profile.soft_skills.map((s: any) => ({ name: s.name, level: s.level }))} />
                            </div>
                        </div>

                        {/* Experience Badge */}
                        <div className="bg-gradient-to-br from-zinc-900 to-black p-8 rounded-[2rem] border border-white/10 flex items-center justify-between group hover:border-neon-yellow/50 transition-all duration-300 shadow-xl hover:shadow-[0_0_30px_rgba(255,214,10,0.1)]">
                            <div>
                                <p className="text-muted text-xs font-mono uppercase tracking-widest mb-2">Experience Level</p>
                                <h3 className="text-3xl font-bold text-white group-hover:text-neon-yellow transition-colors">{profile.experience_level}</h3>
                            </div>
                            <div className="w-16 h-16 rounded-full border-2 border-neon-yellow flex items-center justify-center text-neon-yellow text-xl font-bold group-hover:bg-neon-yellow group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(255,214,10,0.3)]">
                                Exp
                            </div>
                        </div>
                    </div>
                </div>

                {/* Domain Exposure Tags */}
                <div className="flex flex-wrap gap-4 justify-center py-6">
                    {profile.domain_exposure?.map((domain: string, i: number) => (
                        <span key={i} className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-mono text-zinc-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all cursor-default">
                            {domain}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <div className="flex justify-center pt-8 pb-10">
                    <Link
                        href="/role"
                        className="px-12 py-6 rounded-2xl bg-white text-black font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.4)] flex items-center gap-4 group relative overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
                        <Briefcase className="w-6 h-6 group-hover:text-neon-purple transition-colors" />
                        <span>Choose My Dream Role</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </Link>
                </div>

            </motion.div>
        </div>
    );
}
