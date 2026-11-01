import React from "react";
import {
  Heart,
  Sparkles,
  Calendar,
  ArrowRight,
  Gem,
  Cake,
  Scroll,
} from "lucide-react";
import confetti from "canvas-confetti";

export default function HomePage({ setCurrentPage }) {
  const triggerShower = () => {
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#f43f5e", "#22d3ee", "#fb7185", "#facc15"],
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-12">
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Deeply Romantic Message */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>05 November 2002 • The Day My Queen Was Born</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Happy Birthday, <br />
            <span className="font-romantic text-5xl sm:text-7xl bg-gradient-to-r from-rose-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Neha Praveen ❤️
            </span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed">
            To my breathtaking girlfriend and the girl I already hold in my soul
            as my future wife — ever since{" "}
            <strong className="text-cyan-400">28 July 2019</strong>, loving you
            has been the best part of being alive. Every day I pray for the
            moment your parents smile and give us their blessings so I can
            officially make you mine forever.
          </p>

          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-sm italic">
            &ldquo;Right now you are my girlfriend, in my heart you are already
            my wife, and very soon—with your parents&apos; blessings—you will be
            my forever bride.&rdquo;
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={triggerShower}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold flex items-center gap-2 shadow-lg shadow-rose-500/30 hover:scale-105 transition cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-white" />
              Shower Neha With Love
            </button>

            <button
              onClick={() => setCurrentPage("cake")}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-rose-500 text-slate-950 font-bold flex items-center gap-2 shadow-lg hover:scale-105 transition cursor-pointer"
            >
              <Cake className="w-4 h-4" />
              Cut Birthday Cake 🎂
            </button>

            <button
              onClick={() => setCurrentPage("promise")}
              className="px-6 py-3 rounded-xl glass-card border border-cyan-400/40 text-cyan-300 font-semibold flex items-center gap-2 hover:bg-cyan-500/10 transition cursor-pointer"
            >
              <Gem className="w-4 h-4" />
              Our Marriage Promise
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Dual Romantic Photo Frames */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 items-center">
          <div className="glass-card p-3 rounded-3xl border border-rose-500/30 neon-pink-glow">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900">
              <img
                src="/images/hero-couple.jpg"
                alt="Us Together"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80";
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center font-romantic text-lg text-rose-300 mt-2">
              Since 28 July 2019
            </p>
          </div>

          <div className="glass-card p-3 rounded-3xl border border-cyan-400/30 neon-cyan-glow mt-7">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900">
              <img
                src="/images/neha-solo.jpg"
                alt="Birthday Queen Neha"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                }}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-center font-romantic text-lg text-cyan-300 mt-2">
              Birthday Queen ✨
            </p>
            <p className="text-center font-romantic text-sm text-amber-300 font-bold tracking-wider">
              NEHA PRAVEEN ❤️
            </p>
          </div>
        </div>
      </div>

      {/* Quick Surprise Cards in exact flow order */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        <div
          onClick={() => setCurrentPage("timeline")}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-cyan-400/50 transition group"
        >
          <Calendar className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition" />
          <h3 className="font-semibold text-base">1. Our Live Clock ⏳</h3>
          <p className="text-xs text-slate-400 mt-1">
            Watch our love tick every second since 28 July 2019.
          </p>
        </div>

        <div
          onClick={() => setCurrentPage("cake")}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-amber-400/50 transition group"
        >
          <Cake className="w-6 h-6 text-amber-400 mb-2 group-hover:scale-110 transition" />
          <h3 className="font-semibold text-base">2. Birthday Cake 🎂</h3>
          <p className="text-xs text-slate-400 mt-1">
            Blow the candles, cut your 3D cake &amp; send your wish to Saquib!
          </p>
        </div>

        <div
          onClick={() => setCurrentPage("letters")}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-rose-400/50 transition group"
        >
          <Scroll className="w-6 h-6 text-rose-400 mb-2 group-hover:scale-110 transition" />
          <h3 className="font-semibold text-base">3. Royal Scrolls 📜</h3>
          <p className="text-xs text-slate-400 mt-1">
            Unroll royal letters written secretly for your birthday.
          </p>
        </div>

        <div
          onClick={() => setCurrentPage("game")}
          className="glass-card p-5 rounded-2xl cursor-pointer hover:border-pink-400/50 transition group"
        >
          <Heart className="w-6 h-6 text-pink-400 mb-2 group-hover:scale-110 transition" />
          <h3 className="font-semibold text-base">4. Love Catch Game ❤️</h3>
          <p className="text-xs text-slate-400 mt-1">
            Catch 10 hearts to download a signed JPG Love Note!
          </p>
        </div>
      </div>
    </div>
  );
}
