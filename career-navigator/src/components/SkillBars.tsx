"use client";
import React from "react";
import { motion } from "framer-motion";

interface Skill {
    name: string;
    level: number; // 0-10
    category: string;
}

export default function SkillBars({ skills }: { skills: Skill[] }) {
    const getColor = (level: number) => {
        if (level < 4) return "bg-neon-pink";
        if (level < 7) return "bg-neon-yellow";
        return "bg-neon-green";
    };

    return (
        <div className="space-y-6 font-mono text-sm w-full">
            {skills.map((skill, index) => (
                <div key={index} className="group relative">
                    <div className="flex justify-between mb-2 text-xs uppercase tracking-wider text-muted font-bold">
                        <span className="group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${getColor(skill.level)}`}></span>
                            {skill.name}
                        </span>
                        <span className="text-zinc-500">{skill.level}/10</span>
                    </div>

                    <div className="h-3 w-full bg-zinc-900/50 border border-white/5 rounded-full overflow-hidden relative backdrop-blur-sm">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level * 10}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: "easeOut", delay: index * 0.1 }}
                            className={`h-full ${getColor(skill.level)} rounded-full shadow-[0_0_15px_currentColor] relative overflow-hidden`}
                        >
                            {/* Shimmer Effect */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    );
}
