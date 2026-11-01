import React, { useState } from "react";
import { Sparkles, Heart, RefreshCw } from "lucide-react";
import confetti from "canvas-confetti";

export default function LoveJarPage() {
  const reasons = [
    "Because since 28 July 2019, not a single day has passed where I haven't thanked Allah for bringing you into my life.",
    "Because you are my sweetest girlfriend today, and in my heart and prayers, you are already my future wife.",
    "Because I am willing to wait, work hard, and win your parents' blessings with all my respect just to call you mine forever.",
    "Because on 05 November 2002, the universe created the prettiest, kindest soul just for me.",
    "Because one smile from you, Neha, can heal my worst days in a single second.",
    "Because our love has stayed strong since 2019, proving that we are meant for a lifetime of marriage.",
    "Because imagining the day your parents agree and I see you as my bride makes my heart skip a beat.",
    "Because no matter what happens in this world, my loyalty, my eyes, and my future belong only to Neha Praveen.",
  ];

  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const pickNextReason = () => {
    setAnimating(true);
    confetti({
      particleCount: 35,
      spread: 55,
      origin: { y: 0.65 },
      colors: ["#f43f5e", "#22d3ee", "#fde047"],
    });
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % reasons.length);
      setAnimating(false);
    }, 220);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-8">
      <div className="space-y-2">
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-400">
          The Jar of Endless Love 🏺✨
        </h2>
        <p className="text-slate-400 text-sm">
          Tap the jar whenever you want to know why I am so crazy about you
        </p>
      </div>

      <div className="glass-card p-8 sm:p-12 rounded-3xl neon-cyan-glow border border-cyan-400/30 space-y-6">
        <div
          onClick={pickNextReason}
          className={`w-20 h-20 mx-auto rounded-full bg-rose-500/20 border border-rose-400/40 flex items-center justify-center cursor-pointer transition-transform ${
            animating ? "scale-125 rotate-12" : "hover:scale-110"
          }`}
        >
          <Sparkles
            className="w-10 h-10 text-rose-400 animate-spin"
            style={{ animationDuration: "6s" }}
          />
        </div>

        <div className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
          Love Note #{index + 1} of {reasons.length}
        </div>

        <p
          className={`font-romantic text-3xl sm:text-4xl text-white leading-relaxed min-h-[110px] flex items-center justify-center transition-all duration-200 ${
            animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          &ldquo;{reasons[index]}&rdquo;
        </p>

        <button
          onClick={pickNextReason}
          className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold inline-flex items-center gap-2 shadow-lg shadow-rose-500/30 hover:scale-105 transition cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${animating ? "animate-spin" : ""}`} />
          Pull Another Love Note 💖
        </button>
      </div>
    </div>
  );
}
