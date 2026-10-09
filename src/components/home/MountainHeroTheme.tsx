"use client";

import React, { memo } from "react";

/**
 * MountainHeroTheme
 * Authentic real cinematic mountain landscape with 8K photographic peaks,
 * real-time soaring photographic Bald Eagle with natural 3D flight physics and wing flexing,
 * distant gliding eagles, and natural valley clouds/mist seamlessly blending into the page.
 */
export const MountainHeroTheme = memo(function MountainHeroTheme() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
    >
      {/* 1. REAL CINEMATIC PHOTOGRAPHIC MOUNTAIN LANDSCAPE */}
      <div className="absolute inset-0 w-full h-full">
        {/* Real Mountain Photography (National Geographic 8K Quality) */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat scale-[1.02] transform-gpu"
          style={{
            backgroundImage: "url('/images/mountain_bg.jpg')",
          }}
        />

        {/* Cinematic Atmospheric Color Grade Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#162231]/55 via-[#233549]/35 to-[#121c27]/75 mix-blend-multiply" />

        {/* Upper soft vignette for crystal clear text readability */}
        <div className="absolute inset-x-0 top-0 h-3/4 bg-gradient-to-b from-slate-950/75 via-slate-900/40 to-transparent" />
      </div>

      {/* 2. REAL-TIME REAL PHOTOGRAPHIC EAGLE (Primary majestic soaring eagle in the sky) */}
      <div className="absolute top-2 sm:top-5 right-2 sm:right-12 md:right-20 z-20 pointer-events-none">
        <div className="animate-real-eagle-soar w-32 sm:w-44 md:w-56 h-auto filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]">
          <img
            src="/images/eagle.png"
            alt="Real soaring eagle"
            className="w-full h-auto object-contain select-none pointer-events-none animate-real-eagle-flap"
            draggable={false}
          />
        </div>
      </div>

      {/* 3. SECONDARY HORIZON GLIDER (Gliding slowly across distant mountain peaks) */}
      <div className="absolute top-10 left-0 w-full z-15 pointer-events-none opacity-80">
        <div className="animate-horizon-eagle-traverse w-16 sm:w-24 h-auto filter drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]">
          <img
            src="/images/eagle.png"
            alt="Distant eagle"
            className="w-full h-auto object-contain select-none pointer-events-none opacity-85"
            draggable={false}
          />
        </div>
      </div>

      {/* 4. REAL-TIME ROLLING VALLEY MIST / SEA OF CLOUDS (Authentic natural blend into page) */}
      <div
        className="absolute inset-x-0 bottom-12 sm:bottom-20 h-48 sm:h-64 opacity-60 animate-mist-slow pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 80%, rgba(255, 255, 255, 0.55) 0%, rgba(240, 245, 250, 0.35) 45%, transparent 75%)",
          filter: "blur(28px)",
        }}
      />

      {/* 5. SEAMLESS ATMOSPHERIC VALLEY CLOUD DISSOLVE (No fake sawtooth/zigzag) */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 sm:h-56 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(248, 250, 252, 0.2) 25%, rgba(248, 250, 252, 0.7) 60%, rgba(248, 250, 252, 0.95) 88%, #f8fafc 100%)",
        }}
      />
    </div>
  );
});
