"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacityFade = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section ref={containerRef} className="grid grid-cols-1 xl:grid-cols-12 items-center gap-12 lg:gap-8 pt-12 pb-24 overflow-visible">
      {/* Left Typography Block */}
      <motion.div 
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="xl:col-span-6 flex flex-col gap-8 text-left z-10"
      >
        <motion.div variants={fadeInUp} className="flex items-center gap-4">
          <div className="h-[1px] w-12 bg-white/20"></div>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/60">
            Philosophy Meets Programming
          </span>
        </motion.div>
        
        <motion.h1 variants={fadeInUp} className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] text-white">
          Become an<br />
          <span className="text-zinc-400">
            AI-First Architect
          </span>
        </motion.h1>
        
        <motion.div variants={fadeInUp} className="text-sm font-mono text-white/90 tracking-[0.05em]">
          "Natural language is the new API."
        </motion.div>
        
        <motion.div variants={fadeInUp} className="relative pl-6 py-2 border-l border-white/10">
          <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed font-light italic max-w-[500px]">
            Debug the vibe. We deconstruct fuzzy model workflows into inspectable, governed structures using reasoning and logic.
          </p>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mt-4">
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="#tools-directory" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full transition-colors hover:bg-zinc-200"
          >
            Explore ToolSmith Bench
          </motion.a>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link href="/sentiments" className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full hover:bg-white/5 transition-colors">
              Enter Sentiments
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Right Image Block with Parallax */}
      <motion.div 
        style={{ y: yParallax, opacity: opacityFade }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="xl:col-span-6 flex flex-col w-full h-full justify-center relative mt-12 xl:mt-0"
      >
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl group">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            src="/images/ada-lovelace-hero.jpg" 
            alt="Hacker-Victorian Ada Lovelace" 
            className="w-full h-full object-cover opacity-90"
          />
          
          {/* Minimalist Info Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">Systems Playground</span>
                <span className="text-sm font-medium text-white tracking-wide">lovelace_cockpit.xml</span>
              </div>
              <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
