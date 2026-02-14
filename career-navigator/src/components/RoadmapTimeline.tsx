"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Circle, Lock } from "lucide-react";

interface Task {
    id: string;
    title: string;
    completed: boolean;
}

interface Week {
    week: number;
    title: string;
    focus: string;
    tasks: Task[];
    status: "active" | "locked" | "completed";
    progress: number;
}

export default function RoadmapTimeline({ weeks }: { weeks: Week[] }) {
    const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

    return (
        <div className="space-y-6 w-full max-w-4xl mx-auto">
            {weeks.map((week, index) => {
                const isExpanded = expandedWeek === week.week;
                const isLocked = week.status === "locked";

                return (
                    <motion.div
                        key={week.week}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative bg-zinc-900/40 rounded-2xl border backdrop-blur-md overflow-hidden transition-all duration-300 ${isLocked
                                ? "border-white/5 opacity-60"
                                : isExpanded
                                    ? "border-neon-cyan/50 shadow-[0_0_30px_rgba(0,245,212,0.1)]"
                                    : "border-white/10 hover:border-white/30"
                            }`}
                    >
                        {/* Week Header */}
                        <button
                            onClick={() => !isLocked && setExpandedWeek(isExpanded ? null : week.week)}
                            disabled={isLocked}
                            className="w-full p-6 flex items-center justify-between text-left group"
                        >
                            <div className="flex items-center gap-6 flex-1">
                                {/* Week Number Badge */}
                                <div
                                    className={`w-16 h-16 rounded-xl flex items-center justify-center font-bold text-xl transition-all ${isLocked
                                            ? "bg-zinc-800 text-zinc-600"
                                            : week.status === "completed"
                                                ? "bg-neon-green text-black"
                                                : "bg-neon-cyan text-black group-hover:scale-110"
                                        }`}
                                >
                                    {isLocked ? <Lock className="w-6 h-6" /> : `W${week.week}`}
                                </div>

                                <div className="flex-1">
                                    <h3 className="text-xl font-serif font-bold text-white mb-1">{week.title}</h3>
                                    <p className="text-sm text-muted font-mono">{week.focus}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                {/* Progress */}
                                {!isLocked && (
                                    <div className="flex items-center gap-2">
                                        <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${week.progress}%` }}
                                                className="h-full bg-neon-cyan"
                                            />
                                        </div>
                                        <span className="text-xs font-mono text-muted w-12">{week.progress}%</span>
                                    </div>
                                )}

                                {/* Expand Icon */}
                                {!isLocked && (
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown className="w-5 h-5 text-muted" />
                                    </motion.div>
                                )}
                            </div>
                        </button>

                        {/* Expandable Tasks */}
                        <AnimatePresence>
                            {isExpanded && !isLocked && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden border-t border-white/10"
                                >
                                    <div className="p-6 space-y-3">
                                        {week.tasks.map((task) => (
                                            <div
                                                key={task.id}
                                                className="flex items-center gap-3 p-3 bg-black/40 rounded-xl hover:bg-black/60 transition-colors group/task"
                                            >
                                                <div className="flex-shrink-0">
                                                    {task.completed ? (
                                                        <CheckCircle2 className="w-5 h-5 text-neon-green" />
                                                    ) : (
                                                        <Circle className="w-5 h-5 text-zinc-600 group-hover/task:text-neon-cyan transition-colors" />
                                                    )}
                                                </div>
                                                <span
                                                    className={`font-mono text-sm flex-1 ${task.completed ? "line-through text-muted" : "text-white"
                                                        }`}
                                                >
                                                    {task.title}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Connecting Line */}
                        {index < weeks.length - 1 && (
                            <div className="absolute left-8 -bottom-6 w-[2px] h-6 bg-gradient-to-b from-white/20 to-transparent" />
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
