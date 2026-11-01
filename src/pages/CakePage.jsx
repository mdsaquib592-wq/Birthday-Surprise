import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  CheckCircle2,
  Heart,
  Gift,
  Volume2,
  VolumeX,
  Crown,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";

const SAQUIB_WHATSAPP_NUMBER = "918541078902";

export default function CakePage() {
  const [candlesLit, setCandlesLit] = useState([true, true, true, true, true]);
  const [isCutting, setIsCutting] = useState(false);
  const [cakeCut, setCakeCut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wishText, setWishText] = useState("");
  const [wishSealed, setWishSealed] = useState(false);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);

  // Stop music cleanly if Neha navigates to another page
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Realistic Music Box "Happy Birthday To You" Melody
  const playHappyBirthdayMelody = () => {
    try {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const melody = [
        { note: 261.63, dur: 0.35, delay: 0.0 },
        { note: 261.63, dur: 0.25, delay: 0.4 },
        { note: 293.66, dur: 0.6, delay: 0.7 },
        { note: 261.63, dur: 0.6, delay: 1.4 },
        { note: 349.23, dur: 0.6, delay: 2.1 },
        { note: 329.63, dur: 1.1, delay: 2.8 },

        { note: 261.63, dur: 0.35, delay: 4.1 },
        { note: 261.63, dur: 0.25, delay: 4.5 },
        { note: 293.66, dur: 0.6, delay: 4.8 },
        { note: 261.63, dur: 0.6, delay: 5.5 },
        { note: 392.0, dur: 0.6, delay: 6.2 },
        { note: 349.23, dur: 1.1, delay: 6.9 },

        { note: 261.63, dur: 0.35, delay: 8.2 },
        { note: 261.63, dur: 0.25, delay: 8.6 },
        { note: 523.25, dur: 0.6, delay: 8.9 },
        { note: 440.0, dur: 0.6, delay: 9.6 },
        { note: 349.23, dur: 0.6, delay: 10.3 },
        { note: 329.63, dur: 0.6, delay: 11.0 },
        { note: 293.66, dur: 1.0, delay: 11.7 },

        { note: 466.16, dur: 0.35, delay: 13.0 },
        { note: 466.16, dur: 0.25, delay: 13.4 },
        { note: 440.0, dur: 0.6, delay: 13.7 },
        { note: 349.23, dur: 0.6, delay: 14.4 },
        { note: 392.0, dur: 0.6, delay: 15.1 },
        { note: 349.23, dur: 1.4, delay: 15.8 },
      ];

      melody.forEach(({ note, dur, delay }) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(note, ctx.currentTime + delay);

        const subOsc = ctx.createOscillator();
        subOsc.type = "sine";
        subOsc.frequency.setValueAtTime(note * 2, ctx.currentTime + delay);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(
          0.25,
          ctx.currentTime + delay + 0.04,
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + delay + dur,
        );

        osc.connect(gain);
        subOsc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        subOsc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + dur + 0.05);
        subOsc.stop(ctx.currentTime + delay + dur + 0.05);
      });

      setIsPlaying(true);
    } catch (e) {
      console.log("Web Audio fallback error:", e);
    }
  };

  const startBirthdayMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => playHappyBirthdayMelody());
    } else {
      playHappyBirthdayMelody();
    }
  };

  const toggleMusic = () => {
    if (audioRef.current && !audioRef.current.paused) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
      setIsPlaying(false);
    } else if (
      audioCtxRef.current &&
      audioCtxRef.current.state === "suspended"
    ) {
      audioCtxRef.current.resume();
      setIsPlaying(true);
    } else {
      startBirthdayMusic();
    }
  };

  const blowCandle = (idx) => {
    if (!candlesLit[idx]) return;
    const updated = [...candlesLit];
    updated[idx] = false;
    setCandlesLit(updated);

    if (updated.every((c) => !c)) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.55 },
        colors: ["#fbbf24", "#f43f5e", "#ec4899", "#38bdf8"],
      });
      startBirthdayMusic();
    }
  };

  const handleCutCake = () => {
    if (isCutting || cakeCut) return;
    setIsCutting(true);

    setTimeout(() => {
      setCakeCut(true);
      setIsCutting(false);

      confetti({ particleCount: 180, spread: 110, origin: { y: 0.5 } });
      setTimeout(() => {
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 70,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 70,
          origin: { x: 1 },
        });
      }, 300);
    }, 1300);
  };

  const handleSealAndNotifyWhatsApp = () => {
    if (!wishText.trim()) return;
    setWishSealed(true);
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });

    const text = `🎂 *Neha's Birthday Wish!* 💖\n\n✨ *Wish:* "${wishText.trim()}"\n\n- Sent from Neha's Birthday Surprise Website ✨`;
    const waUrl = `https://wa.me/${SAQUIB_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(waUrl, "_blank");
  };

  const allBlown = candlesLit.every((c) => !c);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center space-y-8 select-none">
      <style>{`
        @keyframes flicker {
          0%, 100% { transform: scale(1) rotate(-1deg); opacity: 0.95; }
          50% { transform: scale(1.08, 0.94) rotate(2deg); opacity: 1; }
        }
        @keyframes smokeRise {
          0% { transform: translateY(0) scale(0.8); opacity: 0.8; }
          100% { transform: translateY(-28px) scale(1.6); opacity: 0; }
        }
        @keyframes knifeSlice {
          0% { transform: translate(-50%, -130px) rotate(-25deg); opacity: 0; }
          20% { transform: translate(-50%, -85px) rotate(-15deg); opacity: 1; }
          75% { transform: translate(-50%, 115px) rotate(0deg); opacity: 1; }
          100% { transform: translate(-50%, 145px) rotate(5deg); opacity: 0; }
        }
        .flame-glow {
          animation: flicker 0.4s infinite ease-in-out;
          box-shadow: 0 0 18px 6px rgba(251, 191, 36, 0.65), 0 0 32px 12px rgba(244, 63, 94, 0.35);
        }
        .smoke-puff {
          animation: smokeRise 1s ease-out forwards;
        }
        .knife-animate {
          animation: knifeSlice 1.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>

      <audio ref={audioRef} src="/birthday-song.mp3" preload="auto" loop />

      {/* Header */}
      <div className="space-y-2 relative">
        <h2 className="font-romantic text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-pink-300 to-rose-400 drop-shadow">
          Make a Birthday Wish, Neha ✨
        </h2>
        <p className="text-slate-300 text-sm">
          {!allBlown
            ? "Tap each glowing candle on the cake to blow them out!"
            : !cakeCut
              ? "🎶 Happy Birthday song is playing! Now slice your birthday cake!"
              : "🎉 Yay! Happy Birthday Queen Neha! Read your special birthday note below ❤️"}
        </p>

        {allBlown && (
          <button
            onClick={toggleMusic}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-xs font-medium hover:bg-pink-500/30 transition cursor-pointer"
          >
            {isPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse text-amber-300" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            {isPlaying
              ? "Playing Birthday Melody 🎵"
              : "Play Birthday Music 🎵"}
          </button>
        )}
      </div>

      {/* Main Glass Card */}
      <div className="glass-card p-6 sm:p-12 rounded-3xl border border-pink-400/30 bg-slate-900/70 backdrop-blur-xl shadow-2xl space-y-8 relative overflow-hidden">
        {/* STAGE: Realistic 3D Two-Tier Cake */}
        <div className="relative pt-14 pb-6 flex flex-col items-center justify-center min-h-[340px]">
          {isCutting && (
            <div className="knife-animate absolute left-1/2 top-24 z-50 pointer-events-none flex flex-col items-center">
              <div className="flex items-center shadow-2xl">
                <div className="w-16 h-5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-500 rounded-l-full border border-amber-200 shadow-md" />
                <div className="w-36 h-7 bg-gradient-to-r from-slate-100 via-white to-slate-300 rounded-r-full border-b-4 border-slate-400 shadow-xl" />
              </div>
              <span className="text-xs text-amber-300 font-semibold mt-1 drop-shadow">
                ✨ Slicing...
              </span>
            </div>
          )}

          {/* CANDLES ROW */}
          <div
            className={`flex justify-center gap-5 sm:gap-7 z-30 mb-[-6px] transition-all duration-700 ${
              cakeCut
                ? "opacity-0 scale-75 pointer-events-none h-0 mb-0"
                : "opacity-100"
            }`}
          >
            {candlesLit.map((lit, i) => (
              <div
                key={i}
                onClick={() => blowCandle(i)}
                className="cursor-pointer flex flex-col items-center group"
                title="Tap to blow out!"
              >
                <div className="h-9 flex items-center justify-center relative">
                  {lit ? (
                    <div className="relative flex items-center justify-center group-hover:scale-125 transition-transform">
                      <div className="w-4 h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-100 rounded-full rounded-t-[80%] flame-glow" />
                      <div className="w-1.5 h-3 bg-white rounded-full absolute bottom-0.5" />
                    </div>
                  ) : (
                    <span className="text-sm smoke-puff select-none">💨</span>
                  )}
                </div>
                <div className="w-0.5 h-1.5 bg-slate-800" />
                <div
                  className="w-3.5 sm:w-4 h-14 rounded-t-md shadow-md border border-white/40 relative overflow-hidden"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, #fff1f2, #fff1f2 5px, #fb7185 5px, #fb7185 10px)",
                  }}
                >
                  <div className="w-full h-2 bg-amber-300/60 bottom-0 absolute" />
                </div>
              </div>
            ))}
          </div>

          {/* CAKE CONTAINER */}
          <div className="relative flex flex-col items-center w-full max-w-md mx-auto">
            <div className="relative w-full flex justify-center items-end">
              {/* LEFT HALF */}
              <div
                className={`flex flex-col items-end transition-all duration-1000 ease-out ${
                  cakeCut
                    ? "-translate-x-5 sm:-translate-x-10 -rotate-3"
                    : "translate-x-0 rotate-0"
                }`}
              >
                <div className="w-28 sm:w-36 h-20 bg-gradient-to-b from-pink-200 via-pink-300 to-rose-300 rounded-tl-3xl relative shadow-inner border-t-4 border-l-2 border-white/60 overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-around items-start">
                    <div className="w-5 h-5 bg-rose-600 rounded-b-full" />
                    <div className="w-4 h-8 bg-rose-600 rounded-b-full" />
                    <div className="w-6 h-6 bg-rose-600 rounded-b-full" />
                    <div className="w-4 h-9 bg-rose-600 rounded-b-full" />
                  </div>
                  <div className="pr-2 pb-3 text-right font-romantic text-lg sm:text-xl text-rose-900 font-bold drop-shadow-sm">
                    Happy B&apos;day
                  </div>
                  {cakeCut && (
                    <div className="absolute right-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-rose-700 via-pink-100 to-rose-700 border-l border-rose-300" />
                  )}
                </div>

                <div className="w-36 sm:w-48 h-24 bg-gradient-to-b from-rose-400 via-rose-500 to-pink-600 rounded-tl-2xl rounded-bl-xl relative shadow-xl border-t-4 border-l-2 border-pink-200/70 overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-evenly -mt-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="w-6 h-4 bg-pink-100 rounded-b-full shadow-sm"
                      />
                    ))}
                  </div>
                  <div className="pr-2 text-right text-[11px] sm:text-xs font-extrabold tracking-widest text-amber-200 drop-shadow">
                    05 Nov
                  </div>
                  <div className="flex justify-around pb-1">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div
                        key={n}
                        className="w-2.5 h-2.5 rounded-full bg-amber-200 shadow"
                      />
                    ))}
                  </div>
                  {cakeCut && (
                    <div className="absolute right-0 top-0 bottom-0 w-3 bg-gradient-to-b from-rose-800 via-amber-100 to-rose-900" />
                  )}
                </div>
              </div>

              {/* RIGHT HALF */}
              <div
                className={`flex flex-col items-start transition-all duration-1000 ease-out ${
                  cakeCut
                    ? "translate-x-5 sm:translate-x-10 rotate-3"
                    : "translate-x-0 rotate-0"
                }`}
              >
                <div className="w-28 sm:w-36 h-20 bg-gradient-to-b from-pink-200 via-pink-300 to-rose-300 rounded-tr-3xl relative shadow-inner border-t-4 border-r-2 border-white/60 overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-around items-start">
                    <div className="w-5 h-7 bg-rose-600 rounded-b-full" />
                    <div className="w-6 h-5 bg-rose-600 rounded-b-full" />
                    <div className="w-4 h-8 bg-rose-600 rounded-b-full" />
                    <div className="w-5 h-6 bg-rose-600 rounded-b-full" />
                  </div>
                  <div className="pl-2 pb-3 text-left font-romantic text-lg sm:text-xl text-rose-900 font-bold drop-shadow-sm">
                    Neha ❤️
                  </div>
                  {cakeCut && (
                    <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-b from-rose-700 via-pink-100 to-rose-700 border-r border-rose-300" />
                  )}
                </div>

                <div className="w-36 sm:w-48 h-24 bg-gradient-to-b from-rose-400 via-rose-500 to-pink-600 rounded-tr-2xl rounded-br-xl relative shadow-xl border-t-4 border-r-2 border-pink-200/70 overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-evenly -mt-1">
                    {[1, 2, 3, 4].map((n) => (
                      <div
                        key={n}
                        className="w-6 h-4 bg-pink-100 rounded-b-full shadow-sm"
                      />
                    ))}
                  </div>
                  <div className="pl-2 text-left text-[11px] sm:text-xs font-extrabold tracking-widest text-amber-200 drop-shadow">
                    2002 ✨
                  </div>
                  <div className="flex justify-around pb-1">
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <div
                        key={n}
                        className="w-2.5 h-2.5 rounded-full bg-amber-200 shadow"
                      />
                    ))}
                  </div>
                  {cakeCut && (
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-b from-rose-800 via-amber-100 to-rose-900" />
                  )}
                </div>
              </div>

              {cakeCut && (
                <div className="absolute bottom-8 z-30 flex flex-col items-center animate-bounce">
                  <div className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-lg">
                    🍰 First Bite For You!
                  </div>
                </div>
              )}
            </div>

            {/* GOLDEN STAND */}
            <div className="w-80 sm:w-[420px] h-5 bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500 rounded-full shadow-2xl border border-amber-100 relative z-20" />
            <div className="w-32 h-5 bg-gradient-to-b from-amber-400 to-amber-700 rounded-b-2xl shadow-lg border-x border-amber-200/50" />
          </div>
        </div>

        {/* CUT THE CAKE BUTTON */}
        {allBlown && !cakeCut && (
          <div className="pt-2 animate-fadeIn">
            <button
              onClick={handleCutCake}
              disabled={isCutting}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-600 text-white font-bold text-base sm:text-lg shadow-[0_0_25px_rgba(244,63,94,0.6)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer"
            >
              <span>🔪</span>
              <span>
                {isCutting
                  ? "Cutting Your Cake, Neha..."
                  : "Cut Your Birthday Cake, Neha 🎂"}
              </span>
            </button>
          </div>
        )}

        {/* SURPRISE NOTE + WHATSAPP WISH SEAL */}
        {cakeCut && (
          <div className="pt-6 space-y-6 animate-fadeIn">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900/95 via-rose-950/60 to-slate-900/95 border-2 border-amber-400/50 shadow-[0_0_40px_rgba(251,191,36,0.2)] space-y-6 relative overflow-hidden">
              <Sparkles className="w-24 h-24 text-amber-300/10 absolute -top-4 -left-4 pointer-events-none" />
              <Heart className="w-32 h-32 fill-pink-500/10 text-pink-500/10 absolute -bottom-6 -right-6 pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-7 relative z-10">
                {/* NEHA'S POLAROID PHOTO FRAME */}
                <div className="relative group shrink-0">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition" />
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-amber-300 to-yellow-500 text-slate-950 px-3 py-1 rounded-full text-xs font-extrabold shadow-lg flex items-center gap-1 border border-white">
                    <Crown className="w-3.5 h-3.5 fill-slate-950" /> BIRTHDAY
                    QUEEN
                  </div>

                  <div className="relative bg-white p-2.5 pb-8 rounded-2xl shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-all duration-300 w-44 sm:w-48">
                    <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden relative">
                      <img
                        src="/neha-birthday.jpg"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80";
                        }}
                        alt="Birthday Girl Neha"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-rose-950/60 via-transparent to-amber-300/20 pointer-events-none" />
                      <span className="absolute top-2 right-2 bg-rose-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                        🎂 05 Nov
                      </span>
                    </div>
                    <p className="font-romantic text-rose-600 text-lg font-bold mt-2 leading-none">
                      It&apos;s Neha&apos;s Day! 💖
                    </p>
                  </div>
                </div>

                {/* ROMANTIC SURPRISE NOTE */}
                <div className="text-left space-y-3 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-semibold">
                    <Gift className="w-3.5 h-3.5" /> Special Birthday Surprise
                    Note
                  </div>

                  <h3 className="font-romantic text-3xl sm:text-4xl text-amber-200">
                    Happy Birthday, Meri Jaan Neha! ❤️
                  </h3>

                  <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                    Aaj <strong>05 September</strong> hai — wo sabse khoobsurat
                    din jab meri duniya me sabse pyaari insaan aayi. 28 July
                    2019 se lekar aaj tak, tumhari har ek muskurahat mere dil ki
                    sabse badi khushi rahi hai.
                  </p>

                  <p className="text-pink-200/90 text-xs sm:text-sm italic bg-pink-500/10 border-l-4 border-pink-400 p-3 rounded-r-xl">
                    &ldquo;Allah tumhe duniya ki har khushi de, tumhare saare
                    sapne poore hon, aur humara saath hamesha aise hi khubsurat
                    bana rahe. Happy Birthday My Queen!&rdquo; — Forever Yours,
                    Saquib ✨
                  </p>
                </div>
              </div>

              {/* SEAL BIRTHDAY WISH & SEND TO WHATSAPP */}
              <div className="pt-4 border-t border-white/15 space-y-3 relative z-10">
                <p className="text-emerald-300 text-xs sm:text-sm font-semibold">
                  🌟 Ab aankhein band karke apni Birthday Wish yahan likho:
                </p>

                {!wishSealed ? (
                  <div className="flex flex-col sm:flex-row gap-2.5 max-w-lg mx-auto">
                    <input
                      type="text"
                      value={wishText}
                      onChange={(e) => setWishText(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleSealAndNotifyWhatsApp()
                      }
                      placeholder="Write your secret birthday wish, Neha..."
                      className="flex-1 px-4 py-3 rounded-xl bg-slate-950/90 border border-pink-400/30 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400"
                    />
                    <button
                      onClick={handleSealAndNotifyWhatsApp}
                      disabled={!wishText.trim()}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-pink-500 to-rose-500 text-slate-950 font-bold text-sm hover:opacity-95 transition shadow-lg cursor-pointer inline-flex items-center justify-center gap-2 disabled:opacity-55"
                    >
                      <Send className="w-4 h-4" /> Seal &amp; Send to Saquib on
                      WhatsApp ✨
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-emerald-200 text-sm inline-flex items-center gap-2.5 shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>
                      Tumhari wish lock ho gayi hai aur WhatsApp par Saquib ko
                      bhej di gayi hai, Neha! ❤️
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
