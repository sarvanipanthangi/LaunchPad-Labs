"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, TrendingUp, Users } from 'lucide-react';

interface RoleProps {
    title: string;
    skills: string[];
    demand: "High" | "Medium" | "Low" | "Very High";
    companies: string[];
    onClick: () => void;
}

export default function RoleCard({ title, skills, demand, companies, onClick }: RoleProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            onClick={onClick}
            className="bg-zinc-900/40 p-6 rounded-[2rem] border border-white/10 backdrop-blur-md cursor-pointer group relative overflow-hidden hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,245,212,0.1)] transition-all duration-300 h-full flex flex-col justify-between"
        >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 space-y-6">
                <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-neon-cyan transition-colors leading-tight">{title}</h3>
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-neon-cyan group-hover:text-black transition-colors">
                        <ArrowUpRight className="w-5 h-5 transition-colors" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs font-mono text-zinc-400 group-hover:text-white border border-transparent group-hover:border-white/20 transition-all">
                            {skill}
                        </span>
                    ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-neon-green text-xs font-bold uppercase tracking-wider">
                        <TrendingUp className="w-4 h-4" />
                        {demand} Demand
                    </div>
                </div>

                {/* Hover Tooltip Overlay (Companies) */}
                <div className="absolute inset-x-0 bottom-0 bg-black/95 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 border-t border-white/10 flex flex-col gap-2">
                    <p className="text-[10px] uppercase tracking-widest text-muted flex items-center gap-2">
                        <Users className="w-3 h-3" /> Hiring At
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {companies.slice(0, 3).map((c, i) => (
                            <span key={i} className="text-xs text-white font-bold bg-white/10 px-2 py-1 rounded-md">{c}</span>
                        ))}
                        {companies.length > 3 && <span className="text-xs text-muted">+{companies.length - 3}</span>}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
