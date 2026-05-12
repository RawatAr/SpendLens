"use client";

import { AdvancedBackground, AmbientGlow, FloatingParticles } from "@/components/ui/advanced-backgrounds";
import { HeroHeadline } from "./HeroHeadline";
import { HeroOptimizationSimulator } from "./HeroOptimizationSimulator";
import { BrandMarquee } from "./BrandMarquee";
import { FloatingDoodle, OptimizationPath, InfrastructureSketch, FloatingMetricPill, GlowingNode } from "@/components/ui/advanced-doodles";
import { Activity, Zap, Cpu, Database, Brain, CircuitBoard, Network, Code, Terminal, Bot, TrendingDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <AdvancedBackground variant="hero">
        {/* Cinematic Environmental Graphics - Liberally added as requested */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <InfrastructureSketch complexity="complex" className="opacity-10" />
          <OptimizationPath direction="diagonal" className="opacity-20" />
          <OptimizationPath direction="horizontal" className="opacity-15 top-1/3" />
          
          <AmbientGlow position="top" />
          <AmbientGlow position="center" />
          <FloatingParticles count={15} />

          {/* Doodles & Intelligence Elements */}
          <FloatingDoodle icon={Brain} position={{ top: "15%", right: "12%" }} delay={0.5} size={48} opacity={0.1} />
          <FloatingDoodle icon={CircuitBoard} position={{ bottom: "25%", left: "8%" }} delay={1.5} size={42} opacity={0.1} />
          <FloatingDoodle icon={Zap} position={{ top: "25%", left: "5%" }} delay={0.8} size={32} opacity={0.12} />
          <FloatingDoodle icon={Bot} position={{ bottom: "15%", right: "10%" }} delay={2.2} size={54} opacity={0.08} />
          <FloatingDoodle icon={Network} position={{ top: "45%", left: "15%" }} delay={3.1} size={36} opacity={0.1} />
          <FloatingDoodle icon={Code} position={{ bottom: "45%", right: "5%" }} delay={1.2} size={30} opacity={0.15} />
          
          {/* Floating Metric Pills */}
          <FloatingMetricPill value="$11.2k" label="Saved" position={{ top: "22%", right: "20%" }} delay={1.2} />
          <FloatingMetricPill value="41%" label="Reduced" position={{ bottom: "35%", left: "15%" }} delay={2.8} />
          <FloatingMetricPill value="2min" label="Audit" position={{ top: "10%", left: "30%" }} delay={0.5} />
          
          {/* Glowing Nodes */}
          <GlowingNode position={{ top: "30%", right: "25%" }} delay={0.2} size={20} />
          <GlowingNode position={{ bottom: "40%", left: "10%" }} delay={1.5} size={24} />
          <GlowingNode position={{ top: "60%", right: "15%" }} delay={3.5} size={18} />
          <GlowingNode position={{ top: "15%", left: "15%" }} delay={2.2} size={22} />
        </div>

        <div className="pt-20 pb-16 lg:pt-28 lg:pb-24">
          <div className="max-w-[1280px] mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Side: Editorial Headline */}
              <div className="order-2 lg:order-1">
                <HeroHeadline />
              </div>

              {/* Right Side: Optimization Simulator */}
              <div className="order-1 lg:order-2">
                <HeroOptimizationSimulator />
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Marquee */}
        <BrandMarquee />
      </AdvancedBackground>
    </section>
  );
}
