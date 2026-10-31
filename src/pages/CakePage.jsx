import React, { useState } from "react";
import { Sparkles, Flame, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function CakePage() {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [wishText, setWishText] = useState("");
  const [wishSealed, setWishSealed] = useState(false);

  const blowCandle = (idx) => {
    const updated = [...candlesLit];
    updated[idx] = false;
    setCandlesLit(updated);

    if (updated.every((c) => !c)) {
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 } });
    }
  };

  const allBlown = candlesLit.every((c) => !c);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center space-y-8">
      <div className="space-y-2">
        <h2 className="font-romantic text-4xl sm:text-5xl text-amber-300">
          Make a Birthday Wish, Neha
        </h2>
        <p className="text-slate-400 text-sm">
          Tap each glowing candle to blow them out!
        </p>
      </div>

      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-amber-400/30 space-y-8">
        {/* Candles Row */}
        <div className="flex justify-center gap-6 pt-6">
          {candlesLit.map((lit, i) => (
            <div
              key={i}
              onClick={() => blowCandle(i)}
              className="cursor-pointer flex flex-col items-center"
            >
              <div className="h-8 flex items-center justify-center">
                {lit ? (
                  <Flame className="w-7 h-7 text-amber-400 fill-amber-400 animate-bounce" />
                ) : (
                  <span className="text-xs text-slate-500">💨</span>
                )}
              </div>
              <div className="w-4 h-16 bg-gradient-to-b from-rose-300 to-rose-500 rounded-t-md border border-white/20"></div>
            </div>
          ))}
        </div>

        {/* Cake Layers */}
        <div className="max-w-xs mx-auto space-y-1">
          <div className="h-12 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 rounded-t-2xl border-b-4 border-rose-700 flex items-center justify-center font-romantic text-xl text-white">
            Happy Birthday Neha
          </div>
          <div className="h-16 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600 rounded-b-2xl shadow-lg flex items-center justify-center text-xs text-rose-100 font-semibold tracking-widest">
            05 SEPTEMBER 2002
          </div>
        </div>

        {allBlown && (
          <div className="pt-4 space-y-4 animate-fadeIn">
            <p className="text-emerald-400 font-semibold">
              🎉 Yay! All candles blown out! Type your birthday wish below:
            </p>
            {!wishSealed ? (
              <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                <input
                  type="text"
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Write your secret wish here..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => wishText && setWishSealed(true)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-sm"
                >
                  Seal My Wish ✨
                </button>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm inline-flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  Your wish is locked in the stars — and I promise to help make
                  it come true!
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
