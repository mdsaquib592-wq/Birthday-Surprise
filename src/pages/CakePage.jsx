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
  const [cutStep, setCutStep] = useState(0); // 0: idle, 1: first cut, 2: second cut
  const [cakeCut, setCakeCut] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wishText, setWishText] = useState("");
  const [wishSealed, setWishSealed] = useState(false);

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);

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
    setCutStep(1); // Start 1st Cut

    // Crumb burst during 1st cut
    setTimeout(() => {
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.55 },
        colors: ["#9f1239", "#fda4af", "#fef08a"],
        scalar: 0.55,
      });
    }, 800);

    // Switch to 2nd Cut (diagonal V-cut)
    setTimeout(() => {
      setCutStep(2);
    }, 1700);

    // Crumb burst during 2nd cut
    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.55 },
        colors: ["#9f1239", "#fda4af", "#fef08a"],
        scalar: 0.6,
      });
    }, 2400);

    // Finish both cuts and pull out the slice
    setTimeout(() => {
      setCakeCut(true);
      setIsCutting(false);
      setCutStep(0);

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
    }, 3400);
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
        /* MULTI-LAYER REALISTIC CANDLE FLAME */
        @keyframes outerFlameWind {
          0% { transform: scaleX(1) scaleY(1) rotate(-2deg) skewX(-2deg); }
          25% { transform: scaleX(0.92) scaleY(1.06) rotate(3deg) skewX(3deg); }
          50% { transform: scaleX(1.05) scaleY(0.95) rotate(-4deg) skewX(-3deg); }
          75% { transform: scaleX(0.96) scaleY(1.04) rotate(2deg) skewX(1deg); }
          100% { transform: scaleX(1.02) scaleY(0.98) rotate(-1deg) skewX(-1deg); }
        }
        @keyframes haloPulse {
          0%, 100% { transform: scale(1); opacity: 0.55; }
          50% { transform: scale(1.3); opacity: 0.85; }
        }
        @keyframes smokeCurl {
          0% { transform: translateY(0) scale(0.4) rotate(0deg); opacity: 0.9; }
          50% { transform: translateY(-22px) translateX(6px) scale(1.2) rotate(12deg); opacity: 0.5; }
          100% { transform: translateY(-50px) translateX(-8px) scale(2.2) rotate(-15deg); opacity: 0; }
        }

        /* TWO-STEP REALISTIC CAKE CUTTING (1st Cut -> Lift & Reposition -> 2nd Cut) */
        @keyframes realisticTwoStepKnife {
          /* --- FIRST CUT (Left Wedge Line) --- */
          0% {
            transform: translate(55px, -150px) rotate(-35deg) scale(0.92);
            opacity: 0;
          }
          8% {
            transform: translate(-12px, -85px) rotate(-18deg) scale(1);
            opacity: 1;
          }
          16% {
            transform: translate(-28px, -30px) rotate(-8deg);
          }
          24% {
            transform: translate(-4px, 25px) rotate(-15deg);
          }
          32% {
            transform: translate(-26px, 80px) rotate(-6deg);
          }
          42% {
            transform: translate(-12px, 120px) rotate(-2deg);
          }
          /* --- LIFT KNIFE OUT & SHIFT FOR 2ND CUT --- */
          50% {
            transform: translate(35px, -95px) rotate(-28deg) scale(1.03);
          }
          /* --- SECOND CUT (Right Angled Wedge Line) --- */
          58% {
            transform: translate(26px, -65px) rotate(-12deg) scale(1);
          }
          67% {
            transform: translate(6px, -15px) rotate(-4deg);
          }
          76% {
            transform: translate(30px, 40px) rotate(-11deg);
          }
          85% {
            transform: translate(10px, 95px) rotate(-3deg);
          }
          93% {
            transform: translate(22px, 125px) rotate(2deg);
            opacity: 1;
          }
          100% {
            transform: translate(65px, 155px) rotate(15deg) scale(0.95);
            opacity: 0;
          }
        }

        @keyframes firstCutLineAnim {
          0% { height: 0%; opacity: 0; }
          10% { opacity: 1; }
          42% { height: 100%; opacity: 1; }
          100% { height: 100%; opacity: 0.9; }
        }
        @keyframes secondCutLineAnim {
          0%, 52% { height: 0%; opacity: 0; }
          58% { opacity: 1; }
          92% { height: 100%; opacity: 1; }
          100% { height: 100%; opacity: 0.9; }
        }

        @keyframes cakeSubtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes cakeCutShake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-1.5px) rotate(-0.3deg); }
          50% { transform: translateX(1.5px) rotate(0.3deg); }
          75% { transform: translateX(-1px); }
        }
        @keyframes wedgeSlideOut {
          0% {
            transform: translateY(-30px) scale(0.55);
            opacity: 0;
          }
          60% {
            transform: translateY(6px) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
        }

        .flame-svg {
          transform-origin: 50% 90%;
          animation: outerFlameWind 0.45s infinite ease-in-out alternate;
        }
        .flame-halo {
          animation: haloPulse 1.2s infinite ease-in-out;
        }
        .smoke-trail {
          animation: smokeCurl 1.6s ease-out forwards;
        }
        .knife-two-cut-animate {
          animation: realisticTwoStepKnife 3.4s cubic-bezier(0.35, 0, 0.25, 1) forwards;
        }
        .first-cut-seam {
          animation: firstCutLineAnim 3.4s ease-in-out forwards;
        }
        .second-cut-seam {
          animation: secondCutLineAnim 3.4s ease-in-out forwards;
        }
        .cake-idle-float {
          animation: cakeSubtleFloat 4s ease-in-out infinite;
        }
        .cake-sawing-vibration {
          animation: cakeCutShake 0.22s infinite;
        }
        .wedge-serve-anim {
          animation: wedgeSlideOut 0.85s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .tier-3d-lighting {
          box-shadow: 
            inset 16px 0 25px -10px rgba(255, 255, 255, 0.45),
            inset -22px 0 30px -10px rgba(88, 12, 31, 0.65),
            0 18px 35px -8px rgba(0, 0, 0, 0.75);
        }
        .ganache-drip {
          background: linear-gradient(180deg, #2a0810 0%, #4c0519 60%, #881337 100%);
          box-shadow: inset 1px -2px 4px rgba(255,255,255,0.25), 0 4px 6px rgba(0,0,0,0.45);
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
              ? "🎶 Happy Birthday song is playing! Tap below to cut your cake in 2 slices!"
              : "🎉 Yay! Happy Birthday Queen Neha! Your freshly cut slice is ready ❤️"}
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
      <div className="glass-card p-6 sm:p-12 rounded-3xl border border-pink-400/30 bg-slate-950/85 backdrop-blur-xl shadow-2xl space-y-8 relative overflow-hidden">
        {/* Ambient Romantic Backlight */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />
        {candlesLit.some(Boolean) && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 w-72 h-40 bg-amber-400/15 rounded-full blur-3xl pointer-events-none transition-opacity duration-700" />
        )}

        {/* STAGE: Ultra-Realistic 3D Bakery Cake */}
        <div
          className={`relative pt-14 pb-12 flex flex-col items-center justify-center min-h-[440px] ${
            isCutting
              ? "cake-sawing-vibration"
              : !cakeCut
                ? "cake-idle-float"
                : ""
          }`}
        >
          {/* REALISTIC SVG CHEF'S KNIFE WITH 2-CUT MOTION */}
          {isCutting && (
            <div className="knife-two-cut-animate absolute left-1/2 top-28 z-50 pointer-events-none -ml-28">
              <div className="relative flex flex-col items-center">
                <svg
                  width="240"
                  height="80"
                  viewBox="0 0 240 80"
                  className="drop-shadow-[0_18px_16px_rgba(0,0,0,0.85)]"
                >
                  <defs>
                    <linearGradient
                      id="steelBlade"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#f8fafc" />
                      <stop offset="40%" stopColor="#cbd5e1" />
                      <stop offset="55%" stopColor="#ffffff" />
                      <stop offset="85%" stopColor="#94a3b8" />
                      <stop offset="100%" stopColor="#e2e8f0" />
                    </linearGradient>
                    <linearGradient
                      id="edgeGlint"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="50%" stopColor="#fde047" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                    <linearGradient
                      id="woodHandle"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#78350f" />
                      <stop offset="50%" stopColor="#451a03" />
                      <stop offset="100%" stopColor="#270e02" />
                    </linearGradient>
                  </defs>
                  {/* Chef Knife Curved Steel Blade */}
                  <path
                    d="M15 35 L155 20 L155 54 Q85 62 15 35 Z"
                    fill="url(#steelBlade)"
                    stroke="#64748b"
                    strokeWidth="1"
                  />
                  {/* Sharp Bottom Cutting Edge Glint */}
                  <path
                    d="M15 35 Q85 61 155 54"
                    fill="none"
                    stroke="url(#edgeGlint)"
                    strokeWidth="2.5"
                  />
                  {/* Gold Bolster */}
                  <rect
                    x="153"
                    y="19"
                    width="9"
                    height="36"
                    rx="2"
                    fill="#fbbf24"
                  />
                  {/* Ergonomic Rosewood Handle */}
                  <path
                    d="M161 20 L225 17 Q236 17 236 30 L236 42 Q236 53 224 50 L161 52 Z"
                    fill="url(#woodHandle)"
                    stroke="#f59e0b"
                    strokeWidth="1"
                  />
                  {/* Brass Rivets */}
                  <circle cx="176" cy="35" r="3" fill="#fde047" />
                  <circle cx="198" cy="34" r="3" fill="#fde047" />
                  <circle cx="218" cy="33" r="3" fill="#fde047" />
                </svg>
                <span className="px-3.5 py-0.5 rounded-full bg-amber-400/25 border border-amber-300/60 text-xs text-amber-200 font-bold tracking-wider shadow-lg">
                  {cutStep === 1
                    ? "🔪 1st Cut..."
                    : "🔪 2nd Cut (Taking Out Slice)..."}
                </span>
              </div>
            </div>
          )}

          {/* CANDLES ROW — ADJUSTED TO SIT SNUGLY INSIDE THE TOP FROSTING */}
          <div
            className={`flex justify-center items-end gap-4 sm:gap-6 z-30 -mb-3.5 transition-all duration-700 ${
              cakeCut
                ? "opacity-0 scale-75 pointer-events-none h-0 mb-0"
                : "opacity-100"
            }`}
          >
            {candlesLit.map((lit, i) => {
              // Slight arc height variation so candles look naturally placed on a round cake
              const heightClass =
                i === 2 ? "h-16" : i === 1 || i === 3 ? "h-15" : "h-14";
              return (
                <div
                  key={i}
                  onClick={() => blowCandle(i)}
                  className="cursor-pointer flex flex-col items-center group relative"
                  title="Tap to blow out!"
                >
                  {/* Realistic SVG Flame & Smoke */}
                  <div className="h-12 w-9 flex items-center justify-center relative -mb-1">
                    {lit ? (
                      <div
                        className="relative flex items-center justify-center group-hover:scale-125 transition-transform"
                        style={{ animationDelay: `${i * 0.12}s` }}
                      >
                        <div className="w-9 h-9 rounded-full bg-amber-400/40 blur-md absolute -top-1 flame-halo" />
                        <svg
                          width="26"
                          height="40"
                          viewBox="0 0 28 42"
                          className="flame-svg relative z-10 overflow-visible"
                          style={{ animationDelay: `${i * 0.09}s` }}
                        >
                          <defs>
                            <radialGradient
                              id={`flameGrad-${i}`}
                              cx="50%"
                              cy="78%"
                              r="65%"
                            >
                              <stop offset="0%" stopColor="#ffffff" />
                              <stop offset="22%" stopColor="#fef08a" />
                              <stop offset="55%" stopColor="#f97316" />
                              <stop
                                offset="90%"
                                stopColor="#dc2626"
                                stopOpacity="0.9"
                              />
                              <stop
                                offset="100%"
                                stopColor="#991b1b"
                                stopOpacity="0"
                              />
                            </radialGradient>
                          </defs>
                          <path
                            d="M14 2 C14 2 25 16 25 27 C25 35 20 40 14 40 C8 40 3 35 3 27 C3 16 14 2 14 2 Z"
                            fill={`url(#flameGrad-${i})`}
                          />
                          <path
                            d="M14 13 C14 13 20 22 20 29 C20 34 17 38 14 38 C11 38 8 34 8 29 C8 22 14 13 14 13 Z"
                            fill="#fef9c3"
                            opacity="0.9"
                          />
                          <ellipse
                            cx="14"
                            cy="37.5"
                            rx="4.5"
                            ry="2.5"
                            fill="#38bdf8"
                            opacity="0.85"
                          />
                        </svg>
                      </div>
                    ) : (
                      <svg
                        width="28"
                        height="46"
                        viewBox="0 0 30 50"
                        className="smoke-trail overflow-visible"
                      >
                        <path
                          d="M15 45 Q8 35 16 25 T14 5"
                          fill="none"
                          stroke="rgba(226,232,240,0.75)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Wick */}
                  <div className="w-0.5 h-1.5 bg-gradient-to-b from-amber-500 to-slate-950 rounded-full" />

                  {/* 3D Cylindrical Striped Wax Candle */}
                  <div
                    className={`w-3.5 sm:w-4 ${heightClass} rounded-t-md relative overflow-hidden border border-white/60 shadow-[inset_-3px_0_6px_rgba(0,0,0,0.35),0_4px_10px_rgba(0,0,0,0.5)]`}
                    style={{
                      background:
                        "repeating-linear-gradient(-35deg, #fff1f2, #fff1f2 5px, #e11d48 5px, #e11d48 10px)",
                    }}
                  >
                    <div className="w-1.5 h-3.5 bg-white/90 rounded-b-full absolute top-0 left-0.5 shadow-sm" />
                    <div className="w-full h-2 bg-gradient-to-r from-amber-600 via-yellow-200 to-amber-600 bottom-0 absolute border-t border-amber-300" />
                  </div>

                  {/* Cream Rosette Ring at Base of Each Candle (Anchors candle into the cake) */}
                  <div className="w-6 h-2.5 -mt-1 rounded-full bg-gradient-to-b from-white via-pink-50 to-pink-200 shadow-md border border-pink-200/80 z-10" />
                </div>
              );
            })}
          </div>

          {/* CAKE CONTAINER */}
          <div className="relative flex flex-col items-center w-full max-w-lg mx-auto">
            <div className="relative w-full flex justify-center items-end">
              {/* TWO V-SHAPED CUT SEAMS DURING SLICING */}
              {isCutting && (
                <>
                  {/* 1st Cut Line */}
                  <div className="first-cut-seam absolute left-1/2 -ml-3 top-2 w-1 bg-gradient-to-b from-white via-amber-300 to-rose-600 z-40 shadow-[0_0_12px_#fbbf24] origin-top -rotate-2" />
                  {/* 2nd Cut Line (Forms a V-Wedge) */}
                  <div className="second-cut-seam absolute left-1/2 ml-4 top-2 w-1 bg-gradient-to-b from-white via-amber-300 to-rose-600 z-40 shadow-[0_0_12px_#fbbf24] origin-top rotate-6" />
                </>
              )}

              {/* ================= LEFT HALF OF CAKE ================= */}
              <div
                className={`flex flex-col items-end transition-all duration-1000 ease-out ${
                  cakeCut
                    ? "-translate-x-8 sm:-translate-x-12 -rotate-2"
                    : "translate-x-0 rotate-0"
                }`}
              >
                {/* Top Strawberries & Cream Rosettes (Left) */}
                <div className="flex justify-between items-end w-28 sm:w-36 px-3 -mb-1.5 z-10">
                  <div className="w-5 h-6 bg-gradient-to-b from-red-500 to-rose-800 rounded-b-full rounded-t-md relative shadow-md -rotate-12">
                    <div className="w-4 h-1.5 bg-emerald-500 rounded-full absolute -top-1 left-0.5" />
                  </div>
                  <div className="w-5 h-3.5 rounded-full bg-gradient-to-b from-white to-pink-100 shadow border border-pink-200" />
                </div>

                {/* TOP TIER (Left) */}
                <div className="w-32 sm:w-44 h-24 bg-gradient-to-b from-pink-200 via-pink-300 to-rose-400 rounded-tl-[2rem] relative tier-3d-lighting border-t-4 border-l border-white/70 overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-around items-start">
                    <div className="w-5 h-7 ganache-drip rounded-b-full" />
                    <div className="w-4 h-11 ganache-drip rounded-b-full" />
                    <div className="w-6 h-8 ganache-drip rounded-b-full" />
                    <div className="w-4 h-12 ganache-drip rounded-b-full" />
                    <div className="w-5 h-6 ganache-drip rounded-b-full" />
                  </div>

                  <div className="pr-4 pb-3 text-right font-romantic text-xl sm:text-2xl text-rose-950 font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                    Happy B&apos;day
                  </div>

                  {/* Exposed Inner Red Velvet Sponge Wall */}
                  {cakeCut && (
                    <div
                      className="absolute right-0 top-0 bottom-0 w-5 border-l border-rose-300 shadow-inner"
                      style={{
                        background:
                          "repeating-linear-gradient(180deg, #881337 0px, #881337 12px, #fff1f2 12px, #fff1f2 18px)",
                      }}
                    />
                  )}
                </div>

                {/* BOTTOM TIER (Left) */}
                <div className="w-44 sm:w-56 h-28 bg-gradient-to-b from-rose-400 via-rose-600 to-rose-800 rounded-tl-2xl rounded-bl-xl relative tier-3d-lighting border-t-4 border-l border-pink-200/80 overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-evenly -mt-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div
                        key={n}
                        className="w-7 h-4.5 bg-gradient-to-b from-white via-pink-50 to-pink-200 rounded-b-full shadow-md"
                      />
                    ))}
                  </div>

                  <div className="pr-4 text-right text-xs sm:text-sm font-extrabold tracking-widest text-amber-200 drop-shadow">
                    05 Nov
                  </div>

                  <div className="flex justify-around pb-1.5 px-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <div
                        key={n}
                        className="w-3 h-3 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-200 to-white shadow-md"
                      />
                    ))}
                  </div>

                  {cakeCut && (
                    <div
                      className="absolute right-0 top-0 bottom-0 w-5 border-l border-rose-300 shadow-inner"
                      style={{
                        background:
                          "repeating-linear-gradient(180deg, #7f1d1d 0px, #7f1d1d 14px, #fef2f2 14px, #fef2f2 21px)",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* ================= RIGHT HALF OF CAKE ================= */}
              <div
                className={`flex flex-col items-start transition-all duration-1000 ease-out ${
                  cakeCut
                    ? "translate-x-8 sm:translate-x-12 rotate-2"
                    : "translate-x-0 rotate-0"
                }`}
              >
                {/* Top Strawberries & Cream Rosettes (Right) */}
                <div className="flex justify-between items-end w-28 sm:w-36 px-3 -mb-1.5 z-10">
                  <div className="w-5 h-3.5 rounded-full bg-gradient-to-b from-white to-pink-100 shadow border border-pink-200" />
                  <div className="w-5 h-6 bg-gradient-to-b from-red-500 to-rose-800 rounded-b-full rounded-t-md relative shadow-md rotate-12">
                    <div className="w-4 h-1.5 bg-emerald-500 rounded-full absolute -top-1 left-0.5" />
                  </div>
                </div>

                {/* TOP TIER (Right) */}
                <div className="w-32 sm:w-44 h-24 bg-gradient-to-b from-pink-200 via-pink-300 to-rose-400 rounded-tr-[2rem] relative tier-3d-lighting border-t-4 border-r border-white/70 overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-around items-start">
                    <div className="w-5 h-9 ganache-drip rounded-b-full" />
                    <div className="w-6 h-7 ganache-drip rounded-b-full" />
                    <div className="w-4 h-11 ganache-drip rounded-b-full" />
                    <div className="w-5 h-8 ganache-drip rounded-b-full" />
                    <div className="w-4 h-6 ganache-drip rounded-b-full" />
                  </div>

                  <div className="pl-4 pb-3 text-left font-romantic text-xl sm:text-2xl text-rose-950 font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                    Neha ❤️
                  </div>

                  {cakeCut && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-5 border-r border-rose-300 shadow-inner"
                      style={{
                        background:
                          "repeating-linear-gradient(180deg, #881337 0px, #881337 12px, #fff1f2 12px, #fff1f2 18px)",
                      }}
                    />
                  )}
                </div>

                {/* BOTTOM TIER (Right) */}
                <div className="w-44 sm:w-56 h-28 bg-gradient-to-b from-rose-400 via-rose-600 to-rose-800 rounded-tr-2xl rounded-br-xl relative tier-3d-lighting border-t-4 border-r border-pink-200/80 overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-evenly -mt-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <div
                        key={n}
                        className="w-7 h-4.5 bg-gradient-to-b from-white via-pink-50 to-pink-200 rounded-b-full shadow-md"
                      />
                    ))}
                  </div>

                  <div className="pl-4 text-left text-xs sm:text-sm font-extrabold tracking-widest text-amber-200 drop-shadow">
                    2002 ✨
                  </div>

                  <div className="flex justify-around pb-1.5 px-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                      <div
                        key={n}
                        className="w-3 h-3 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-200 to-white shadow-md"
                      />
                    ))}
                  </div>

                  {cakeCut && (
                    <div
                      className="absolute left-0 top-0 bottom-0 w-5 border-r border-rose-300 shadow-inner"
                      style={{
                        background:
                          "repeating-linear-gradient(180deg, #7f1d1d 0px, #7f1d1d 14px, #fef2f2 14px, #fef2f2 21px)",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* REALISTIC 3D CUT CAKE WEDGE SLICE ON PORCELAIN PLATE */}
              {cakeCut && (
                <div className="wedge-serve-anim absolute -bottom-8 z-40 flex flex-col items-center">
                  <div className="px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 text-slate-950 font-extrabold text-xs shadow-xl border border-white mb-1 animate-bounce">
                    🍰 Freshly Cut Slice For Queen Neha!
                  </div>

                  {/* Isometric 3D Triangular Cake Wedge SVG */}
                  <svg
                    width="150"
                    height="115"
                    viewBox="0 0 150 115"
                    className="drop-shadow-[0_14px_20px_rgba(0,0,0,0.85)] overflow-visible"
                  >
                    <defs>
                      <linearGradient
                        id="plateRim"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#fde68a" />
                        <stop offset="50%" stopColor="#ffffff" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                      <linearGradient
                        id="topFrosting"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor="#ffe4e6" />
                        <stop offset="50%" stopColor="#fda4af" />
                        <stop offset="100%" stopColor="#fb7185" />
                      </linearGradient>
                    </defs>

                    {/* Luxury Gold-Rimmed Dessert Plate */}
                    <ellipse
                      cx="75"
                      cy="96"
                      rx="66"
                      ry="15"
                      fill="url(#plateRim)"
                      stroke="#d97706"
                      strokeWidth="2"
                    />
                    <ellipse cx="75" cy="94" rx="54" ry="11" fill="#fff1f2" />

                    {/* Back Outer Curved Crust of the Wedge */}
                    <path
                      d="M 105 32 Q 122 38 124 44 L 124 86 Q 114 82 105 76 Z"
                      fill="#be123c"
                    />

                    {/* Left Angled Cut Face (Red Velvet & Cream Layers) */}
                    {/* Layer 1: Red Velvet Sponge */}
                    <polygon
                      points="30,54 105,32 105,43 30,65"
                      fill="#881337"
                    />
                    {/* Layer 2: Cream Cheese Filling */}
                    <polygon
                      points="30,65 105,43 105,48 30,70"
                      fill="#fff1f2"
                    />
                    {/* Layer 3: Red Velvet Sponge */}
                    <polygon
                      points="30,70 105,48 105,59 30,81"
                      fill="#9f1239"
                    />
                    {/* Layer 4: Cream Cheese Filling */}
                    <polygon
                      points="30,81 105,59 105,64 30,86"
                      fill="#fff1f2"
                    />
                    {/* Layer 5: Bottom Red Velvet Sponge */}
                    <polygon
                      points="30,86 105,64 105,76 30,98"
                      fill="#881337"
                    />

                    {/* Right Angled Cut Face (3D Perspective Shading) */}
                    <polygon
                      points="30,54 124,44 124,55 30,65"
                      fill="#6b0f2b"
                    />
                    <polygon
                      points="30,65 124,55 124,60 30,70"
                      fill="#ffe4e6"
                    />
                    <polygon
                      points="30,70 124,60 124,71 30,81"
                      fill="#7f1d1d"
                    />
                    <polygon
                      points="30,81 124,71 124,76 30,86"
                      fill="#ffe4e6"
                    />
                    <polygon
                      points="30,86 124,76 124,86 30,98"
                      fill="#6b0f2b"
                    />

                    {/* Triangular Top Pink Frosting Surface */}
                    <path
                      d="M 30 54 L 105 32 Q 118 37 124 44 Z"
                      fill="url(#topFrosting)"
                      stroke="#fff1f2"
                      strokeWidth="1"
                    />

                    {/* Chocolate Ganache Drips on Wedge */}
                    <path
                      d="M 55 47 Q 57 56 59 46 M 80 40 Q 82 52 85 39"
                      stroke="#4c0519"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      fill="none"
                    />

                    {/* Whipped Cream Swirl & Fresh Strawberry on Top of Slice */}
                    <ellipse cx="88" cy="36" rx="11" ry="6" fill="#ffffff" />
                    <path
                      d="M 88 20 C 80 20 79 34 88 37 C 97 34 96 20 88 20 Z"
                      fill="#e11d48"
                    />
                    <ellipse cx="88" cy="20" rx="6" ry="2" fill="#10b981" />

                    {/* Red Velvet Crumbs on the Plate */}
                    <circle cx="48" cy="99" r="2" fill="#9f1239" />
                    <circle cx="55" cy="101" r="1.4" fill="#be123c" />
                    <circle cx="96" cy="96" r="1.8" fill="#881337" />
                    <circle cx="68" cy="100" r="1.2" fill="#fbbf24" />
                  </svg>
                </div>
              )}
            </div>

            {/* 3D METALLIC ROYAL GOLD CAKE STAND */}
            <div className="w-80 sm:w-[470px] h-6 bg-gradient-to-r from-amber-700 via-yellow-200 to-amber-700 rounded-full shadow-[0_18px_35px_rgba(0,0,0,0.85)] border border-amber-100 relative z-20" />
            <div className="w-36 h-7 bg-gradient-to-b from-amber-500 via-amber-700 to-amber-950 rounded-b-3xl shadow-2xl border-x border-amber-300/40" />
            <div className="w-48 h-2.5 bg-gradient-to-r from-amber-800 via-yellow-400 to-amber-800 rounded-full shadow-xl" />
          </div>
        </div>

        {/* CUT THE CAKE BUTTON */}
        {allBlown && !cakeCut && (
          <div className="pt-3 animate-fadeIn">
            <button
              onClick={handleCutCake}
              disabled={isCutting}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-600 text-white font-bold text-base sm:text-lg shadow-[0_0_30px_rgba(244,63,94,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 mx-auto cursor-pointer disabled:opacity-75"
            >
              <span>🔪</span>
              <span>
                {isCutting
                  ? cutStep === 1
                    ? "Making 1st Cut, Neha..."
                    : "Making 2nd Cut & Serving Slice..."
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
                    Aaj <strong>05 November</strong> hai — wo sabse khoobsurat
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
