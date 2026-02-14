"use client";
import React from "react";
import { motion } from "framer-motion";

interface GapSkill {
    name: string;
    user: number;
    target: number;
    gap: number;
}

export default function GapVector({ skills }: { skills: GapSkill[] }) {
    return (
        <div className="space-y-8 w-full">
            {skills.map((skill, index) => {
                const userPercent = (skill.user / 10) * 100;
                const targetPercent = (skill.target / 10) * 100;
                const gapPercent = (skill.gap / 10) * 100;

                return (
                    <div key={index} className="space-y-3">
                        <div className="flex justify-between items-center">
                            <h4 className="text-lg font-bold text-white font-mono">{skill.name}</h4>
                            <div className="flex items-center gap-4 text-xs font-mono">
                                <span className="text-neon-cyan">You: {skill.user}/10</span>
                                <span className="text-muted">→</span>
                                <span className="text-neon-purple">Market: {skill.target}/10</span>
                            </div>
                        </div>

                        {/* Dual Bar Visualization */}
                        <div className="relative h-16 bg-zinc-900/50 rounded-xl border border-white/5 overflow-hidden">
                            {/* User Level Bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${userPercent}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 }}
                                className="absolute top-0 left-0 h-1/2 bg-neon-cyan/80 flex items-center justify-end pr-3"
                            >
                                <span className="text-[10px] font-bold text-black">YOUR LEVEL</span>
                            </motion.div>

                            {/* Target Level Bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${targetPercent}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: "easeOut", delay: index * 0.1 + 0.2 }}
                                className="absolute bottom-0 left-0 h-1/2 bg-neon-purple/80 flex items-center justify-end pr-3"
                            >
                                <span className="text-[10px] font-bold text-white">MARKET</span>
                            </motion.div>

                            {/* Gap Highlight */}
                            {skill.gap > 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.5 }}
                                    className="absolute top-1/2 -translate-y-1/2 h-full border-l-2 border-dashed border-neon-pink/60 pointer-events-none"
                                    style={{ left: `${userPercent}%` }}
                                >
                                    <div className="absolute left-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-neon-pink/20 border border-neon-pink/40 rounded text-[10px] font-bold text-neon-pink whitespace-nowrap">
                                        GAP: {skill.gap}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
