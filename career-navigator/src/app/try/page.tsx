"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Link as LinkIcon, FileText, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { analyzeProfile } from "@/lib/api";

export default function OnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [inputMode, setInputMode] = useState("text");
    const [textInput, setTextInput] = useState("I am a React developer with 2 years of experience building modern web apps. Proficient in Next.js, Tailwind CSS, and TypeScript. Also dabble in backend with Node.js and basic PostgreSQL. Looking for Senior frontend roles.");

    const handleAnalyze = async () => {
        setLoading(true);
        // Simulate processing via mock API
        await analyzeProfile(textInput);

        // Smooth transition
        setTimeout(() => {
            router.push("/analyze");
        }, 500);
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-slow" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 w-full max-w-2xl space-y-10"
            >
                <div className="text-center space-y-4">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold tracking-tight bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">Let’s understand you.</h1>
                    <p className="text-muted text-xl font-mono">Input your background to initialize the agent.</p>
                </div>

                {/* Mode Toggle */}
                <div className="flex justify-center gap-4">
                    {[
                        { id: "text", icon: FileText, label: "Paste Text" },
                        { id: "upload", icon: Upload, label: "Resume PDF" },
                        { id: "link", icon: LinkIcon, label: "LinkedIn URL" },
                    ].map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setInputMode(mode.id)}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full border transition-all duration-300 ${inputMode === mode.id
                                    ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] scale-105"
                                    : "bg-black/50 text-muted border-white/10 hover:border-white/30 hover:bg-white/5"
                                }`}
                        >
                            {/* @ts-ignore */}
                            <mode.icon className="w-5 h-5" />
                            <span className="font-bold text-sm tracking-wide uppercase">{mode.label}</span>
                        </button>
                    ))}
                </div>

                {/* Input Area */}
                <motion.div
                    key={inputMode}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-zinc-900/40 p-1 rounded-3xl border border-white/10 backdrop-blur-xl relative group"
                >
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-purple/20 via-neon-cyan/20 to-neon-purple/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-700 animate-pulse-slow"></div>

                    <div className="relative bg-black rounded-[20px] p-6 min-h-[240px] flex flex-col justify-center">
                        {inputMode === "text" ? (
                            <textarea
                                className="w-full h-48 bg-transparent border-none focus:ring-0 text-white font-mono text-base resize-none placeholder:text-zinc-600 outline-none leading-relaxed"
                                placeholder="Paste your resume summary, bio, or skills here..."
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                autoFocus
                            />
                        ) : inputMode === "link" ? (
                            <div className="w-full">
                                <label className="text-xs text-muted font-mono mb-2 block">PROFILE URL</label>
                                <input
                                    type="url"
                                    placeholder="https://linkedin.com/in/username"
                                    className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl px-4 py-4 text-white focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan outline-none font-mono text-lg transition-all placeholder:text-zinc-600"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-zinc-800 rounded-xl hover:border-neon-purple/50 hover:bg-white/5 transition-all cursor-pointer group/upload">
                                <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-4 group-hover/upload:scale-110 transition-transform">
                                    <Upload className="w-8 h-8 text-zinc-500 group-hover/upload:text-neon-purple transition-colors" />
                                </div>
                                <span className="text-base text-zinc-400 font-mono group-hover/upload:text-white transition-colors">Drop your resume.pdf here</span>
                                <span className="text-xs text-zinc-600 mt-2">Max file size: 5MB</span>
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Action Button */}
                <button
                    onClick={handleAnalyze}
                    disabled={loading || (inputMode === "text" && !textInput)}
                    className={`w-full py-6 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden group ${loading ? "bg-zinc-800 text-zinc-400" : "bg-white text-black hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(0,245,212,0.4)]"
                        }`}
                >
                    {/* Hover Gradient Overlay */}
                    {!loading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />}

                    {loading ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="font-mono animate-pulse">Initializing Agent Pipeline...</span>
                        </>
                    ) : (
                        <>
                            Analyze My Profile
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>

                <div className="flex justify-center gap-6 opacity-40 text-[10px] font-mono tracking-widest uppercase">
                    <span>Powered by <span className="text-neon-yellow">Hugging Face</span></span>
                    <span>•</span>
                    <span>Data from <span className="text-neon-cyan">LinkedIn Job Graph</span></span>
                </div>
            </motion.div>
        </div>
    );
}
