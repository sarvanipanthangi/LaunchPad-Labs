"use client";
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

export default function SkillsRadar({ data }: { data: { name: string; level: number }[] }) {
    if (!data) return null;

    return (
        <div className="w-full h-64 relative group">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis
                        dataKey="name"
                        tick={{ fill: '#8d99ae', fontSize: 10, fontFamily: 'monospace' }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                        name="Skills"
                        dataKey="level"
                        stroke="#9d4edd"
                        strokeWidth={3}
                        fill="#9d4edd"
                        fillOpacity={0.3}
                        dot={{ r: 3, fill: "#fff" }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
