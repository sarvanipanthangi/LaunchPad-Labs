"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { adaptRoadmap } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, RefreshCcw, Sparkles, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function AdaptPage() {
    const router = useRouter();
    const [progress, setProgress] = useState(40);
    const [adaptation, setAdaptation] = useState<any>(null);
    const [isAdapting, setIsAdapting] = useState(false);

    const handleProgressChange = async (value: number) => {
        setProgress(value);
        setIsAdapting(true);

        // Debounce the API call
        setTimeout(async () => {
            const result = await adaptRoadmap(value);
            setAdaptation(result);
            setIsAdapting(false);
        }, 800);
    };

    const getProgressColor = () => {
        if (progress < 50) return "from-neon-pink to-red-500";
        if (progress < 80) return "from-neon-yellow to-orange-500";
        return "from-neon-green to-emerald-500";
    };

    const getProgressMessage = () => {
        if (progress < 50) return "Below target. Reinforcing foundations.";
        if (progress < 80) return "Good pace. Maintaining current trajectory.";
        return "Excellent! Accelerating to advanced topics.";
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

            <div className="z-10 max-w-5xl mx-auto space-y-16 relative mt-12">
                <Link href="/roadmap" className="absolute left-0 top-0 text-muted hover:text-white transition-colors flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-6 pt-10"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan text-xs font-mono tracking-widest uppercase mb-4 animate-pulse">
                        <RefreshCcw className="w-3 h-3 animate-spin" /> Adaptive Planning
                    </div>
                    <h1 className="text-4xl md:text-7xl font-serif font-bold tracking-tight bg-gradient-to-br from-white via-white to-gray-500 bg-clip-text text-transparent">
                        Simulate Your Progress
                    </h1>
                    <p className="text-muted font-mono text-lg max-w-2xl mx-auto">
                        Move the slider to see how the AI adapts your roadmap based on completion rate.
                    </p>
                </motion.div>

                {/* Progress Slider */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-zinc-900/40 p-12 rounded-[2rem] border border-white/10 backdrop-blur-md shadow-2xl space-y-10"
                >
                    {/* Current Progress Display */}
                    <div className="text-center space-y-4">
                        <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-zinc-900 to-black border-4 border-white/10 relative">
                            <motion.div
                                key={progress}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-5xl font-bold font-mono"
                            >
                                {progress}%
                            </motion.div>
                            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-neon-cyan animate-spin" style={{ animationDuration: "3s" }} />
                        </div>
                        <p className="text-sm text-muted font-mono uppercase tracking-widest">Completion Rate</p>
                    </div>

                    {/* Slider */}
                    <div className="space-y-4">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={(e) => handleProgressChange(Number(e.target.value))}
                            className="w-full h-3 bg-zinc-800 rounded-full appearance-none cursor-pointer slider-thumb"
                            style={{
                                background: `linear-gradient(to right, 
                  ${progress < 50 ? '#ff4d6d' : progress < 80 ? '#ffd60a' : '#39ff14'} 0%, 
                  ${progress < 50 ? '#ff4d6d' : progress < 80 ? '#ffd60a' : '#39ff14'} ${progress}%, 
                  #1a1a1a ${progress}%, 
                  #1a1a1a 100%)`
                            }}
                        />
                        <div className="flex justify-between text-xs font-mono text-muted">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>

                    {/* AI Reaction Box */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={progress}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={`p-6 rounded-2xl border bg-gradient-to-br ${progress < 50
                                    ? "border-neon-pink/30 from-neon-pink/10 to-transparent"
                                    : progress < 80
                                        ? "border-neon-yellow/30 from-neon-yellow/10 to-transparent"
                                        : "border-neon-green/30 from-neon-green/10 to-transparent"
                                }`}
                        >
                            <div className="flex items-start gap-4">
                                <div className={`p-2 rounded-lg ${progress < 50 ? "bg-neon-pink/20" : progress < 80 ? "bg-neon-yellow/20" : "bg-neon-green/20"
                                    }`}>
                                    {progress < 50 ? (
                                        <AlertCircle className="w-5 h-5 text-neon-pink" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 text-neon-cyan" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                                        AI Analysis
                                        {isAdapting && <RefreshCcw className="w-4 h-4 animate-spin text-neon-cyan" />}
                                    </h3>
                                    <p className="text-sm font-mono text-muted leading-relaxed">
                                        {getProgressMessage()}
                                    </p>
                                    {adaptation && (
                                        <div className="mt-4 p-3 bg-black/40 rounded-lg border border-white/5">
                                            <p className="text-xs font-mono text-white">
                                                <span className="text-neon-cyan">Strategy:</span> {adaptation.strategy}
                                            </p>
                                            <p className="text-xs font-mono text-muted mt-1">{adaptation.reason}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* CTA */}
                <div className="flex justify-center pt-8">
                    <button
                        onClick={() => router.push("/dashboard")}
                        className="group relative px-12 py-6 rounded-full bg-white text-black font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(0,245,212,0.4)] overflow-hidden flex items-center gap-3"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700 pointer-events-none" />
                        <span>View My Co-Pilot Dashboard</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </div>

            <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
          transition: all 0.2s;
        }
        .slider-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 30px rgba(0, 245, 212, 0.8);
        }
        .slider-thumb::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }
      `}</style>
        </div>
    );
}
