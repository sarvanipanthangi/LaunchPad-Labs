"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import P from "@/components/PipelineAnimation";
// PipelineAnimation should be imported
import PipelineAnimation from "@/components/PipelineAnimation";
import { Loader2, CheckCircle2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
    "Parsing unstructured resume data...",
    "Extracting technical skills (Hugging Face)...",
    "Analyzing project complexity...",
    "Mapping soft skills from experience...",
    "Structuring user profile JSON..."
];

export default function AnalyzePage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        // Sequence the steps
        const interval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev >= STEPS.length - 1) {
                    clearInterval(interval);
                    setTimeout(() => router.push("/profile"), 1500);
                    return prev;
                }
                return prev + 1;
            });
        }, 1200);

        return () => clearInterval(interval);
    }, [router]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-cyan/5 rounded-full blur-[150px] animate-pulse-slow pointer-events-none" />

            <div className="w-full max-w-5xl space-y-16 text-center z-10">
                <div className="space-y-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tight bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent animate-pulse-slow">
                        Agentic Reasoning Active
                    </h1>
                    <p className="text-muted font-mono text-sm tracking-widest uppercase">Analyzing Profile & Market Data</p>
                </div>

                <div className="scale-75 md:scale-100 origin-center transition-transform">
                    <PipelineAnimation />
                </div>

                <div className="max-w-md mx-auto bg-zinc-900/80 p-8 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] backdrop-blur-md relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-shimmer" />

                    <div className="space-y-4 font-mono text-sm">
                        {STEPS.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: index <= currentStep ? 1 : 0.3, x: 0 }}
                                className={`flex items-center gap-3 transition-colors duration-500`}
                            >
                                <AnimatePresence mode="wait">
                                    {index < currentStep ? (
                                        <motion.div
                                            key="check"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="text-neon-green"
                                        >
                                            <CheckCircle2 className="w-4 h-4" />
                                        </motion.div>
                                    ) : index === currentStep ? (
                                        <motion.div
                                            key="loader"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="text-neon-cyan"
                                        >
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        </motion.div>
                                    ) : (
                                        <div className="w-4 h-4 rounded-full border border-zinc-700" />
                                    )}
                                </AnimatePresence>

                                <span className={`${index === currentStep ? "text-neon-cyan font-bold" : index < currentStep ? "text-white/60 line-through decoration-white/20" : "text-zinc-600"}`}>
                                    {step}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
