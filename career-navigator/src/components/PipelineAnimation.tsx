"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const STAGES = [
    { id: "profile", label: "PROFILE" },
    { id: "skills", label: "SKILL MAP" },
    { id: "market", label: "MARKET" },
    { id: "gap", label: "GAP" },
    { id: "plan", label: "PLAN" },
    { id: "adapt", label: "ADAPT" },
];

export default function PipelineAnimation() {
    const [activeStage, setActiveStage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStage((prev) => (prev + 1) % STAGES.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto py-12 px-4">
            <div className="flex items-center justify-between relative">
                {/* Background Track */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-900 -z-10 -translate-y-1/2 rounded-full" />

                {/* Animated Progress Line */}
                <motion.div
                    className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-neon-purple to-neon-cyan -z-10 -translate-y-1/2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(activeStage / (STAGES.length - 1)) * 100}%` }}
                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                />

                {STAGES.map((stage, index) => {
                    const isActive = index === activeStage;
                    const isPast = index < activeStage;

                    return (
                        <div key={stage.id} className="relative flex flex-col items-center group">
                            {/* Node */}
                            <motion.div
                                initial={false}
                                animate={{
                                    scale: isActive ? 1.3 : 1,
                                    backgroundColor: isActive || isPast ? "#00f5d4" : "#111",
                                    borderColor: isActive ? "#9d4edd" : isPast ? "#00f5d4" : "#333",
                                }}
                                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 transition-colors duration-300 relative`}
                            >
                                {isActive && (
                                    <motion.div
                                        className="absolute inset-0 rounded-full border-2 border-neon-cyan"
                                        initial={{ scale: 1, opacity: 1 }}
                                        animate={{ scale: 2, opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                    />
                                )}
                                <div className={`w-3 h-3 rounded-full ${isActive || isPast ? "bg-black" : "bg-gray-600"}`} />
                            </motion.div>

                            {/* Label */}
                            <motion.span
                                animate={{
                                    color: isActive ? "#00f5d4" : isPast ? "#9d4edd" : "#666",
                                    y: isActive ? 5 : 0,
                                    opacity: isActive || isPast ? 1 : 0.5
                                }}
                                className="absolute top-16 text-xs font-mono font-bold tracking-widest uppercase transition-colors"
                            >
                                {stage.label}
                            </motion.span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
