"use client";
import React from "react";
import UnicornWrapper from "@/components/UnicornWrapper";
import Link from "next/link";
import PipelineAnimation from "@/components/PipelineAnimation";
// Wait, Lucide icons might be missing, checking installation earlier... yes installed.
import { MoveRight, Brain, Zap, Compass, RefreshCcw } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white selection:bg-neon-cyan selection:text-black">

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Unicorn WebGL Background */}
        <UnicornWrapper projectId="frlxxzEumADfc0u0bTgV" altText="Floating AI nodes visualization" />

        {/* Content Overlay */}
        <div className="z-10 text-center space-y-8 px-4 max-w-5xl mx-auto relative pointer-events-none">
          {/* Pointer events none for container, auto for children to allow clicking through to canvas if needed, but buttons need events */}
          <h1 className="text-5xl md:text-8xl font-serif font-bold tracking-tight text-white leading-tight drop-shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-1000">
            Your career doesn’t need advice.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple animate-pulse-slow">
              It needs a co-pilot.
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-muted font-mono max-w-3xl mx-auto opacity-80 animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">
            LaunchPad Labs inputs your aspirations and outputs a deterministic plan.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8 pointer-events-auto animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500">
            <Link
              href="#how-it-works"
              className="px-8 py-4 rounded-full border border-white/20 hover:border-white/60 text-white font-sans font-medium transition-all hover:bg-white/5 backdrop-blur-md flex items-center gap-2 group"
            >
              <Brain className="w-5 h-5 text-neon-purple group-hover:text-white transition-colors" />
              Know how it works
            </Link>
            <Link
              href="/try"
              className="px-10 py-4 rounded-full bg-neon-cyan text-black font-sans font-bold hover:bg-neon-green transition-all shadow-[0_0_20px_rgba(0,245,212,0.4)] hover:shadow-[0_0_40px_rgba(57,255,20,0.6)] hover:scale-105 flex items-center gap-2 group"
            >
              <Zap className="w-5 h-5 fill-black group-hover:fill-current" />
              Try LaunchPad
              <MoveRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-xs font-mono tracking-widest text-muted">SCROLL TO INITIALIZE</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative w-full min-h-screen bg-[#050505] py-24 flex flex-col items-center border-t border-white/5">
        {/* Background Unicorn Scene B */}
        <div className="absolute inset-0 opacity-20 pointer-events-none w-full h-full overflow-hidden">
          <UnicornWrapper projectId="Gkn8qUQBcS9jCxd5yJOj" altText="Logic node connections" />
        </div>

        <div className="z-10 container mx-auto px-4 space-y-20 relative">
          <div className="text-center space-y-6">
            <div className="inline-block px-4 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/10 text-neon-purple text-xs font-mono tracking-wider mb-4">
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-white">
              We don't chat. <span className="text-neon-purple">We reason.</span>
            </h2>
            <p className="text-muted text-xl max-w-2xl mx-auto leading-relaxed">
              A multi-agent system that analyzes your profile against real-time market data to build a gap-bridging roadmap.
            </p>
          </div>

          {/* Pipeline Visualization */}
          <div className="w-full py-10 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm shadow-2xl">
            <PipelineAnimation />
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Compass, title: "Analyze", desc: "Extracts deep patterns from your unstructured profile data.", color: "text-neon-cyan" },
              { icon: Brain, title: "Reason", desc: "Compares your skills against 10M+ job postings.", color: "text-neon-purple" },
              { icon: Zap, title: "Plan", desc: "Generates a week-by-week execution roadmap.", color: "text-neon-yellow" },
              { icon: RefreshCcw, title: "Adapt", desc: "Refines the path as you complete tasks.", color: "text-neon-pink" },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/30 transition-all group hover:-translate-y-1 duration-300">
                <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-muted leading-relaxed font-mono">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center pt-16 pb-10">
            <Link
              href="/try"
              className="inline-flex items-center gap-3 px-12 py-6 rounded-full bg-white text-black font-bold text-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)]"
            >
              Start Your Journey
              <MoveRight className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
