import React, { useState } from "react";
import { Mail, Heart, X, Sparkles, Scroll } from "lucide-react";
import confetti from "canvas-confetti";

export default function LettersPage() {
  const letters = [
    {
      title: "Open Today on Your Birthday (05 Nov)",
      tag: "Birthday Queen Special",
      body: "Happy Birthday, myjaan Neha Praveen! On 05 November 2002, the love of my life was born. You are the best girlfriend anyone could ever pray for, and my heart already treats you as my wife. May this year bring you closer to all your dreams—and bring us closer to our forever.",
    },
    {
      title: "Open When You Think About Our Future Wedding",
      tag: "When Your Parents Agree 💍",
      body: "I know waiting isn’t always easy, my love, but I promise you this: I will never give up on us. We have loved each other since 28 July 2019, and I will wait patiently and respectfully until the day your parents happily give us their blessings and we get married.",
    },
    {
      title: "Open When You Remember 28 July 2019",
      tag: "Where It All Started",
      body: "28 July 2019 wasn’t just the start of a relationship—it was the day my soul recognized its partner. Every year since 2019 has only made me fall deeper in love with you.",
    },
    {
      title: "Open When You Miss Me at Night",
      tag: "Always Yours",
      body: "Whenever we are apart and you miss me, just remember that soon enough, once our families bless our marriage, we won’t ever have to say goodbye at the end of the day again.",
    },
  ];

  const [selected, setSelected] = useState(null);
  const [isClosing, setIsClosing] = useState(false);

  const handleOpenLetter = (l) => {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#f43f5e", "#fbbf24"],
    });
    setSelected(l);
    setIsClosing(false);
  };

  const handleCloseLetter = () => {
    setIsClosing(true);
    setTimeout(() => {
      setSelected(null);
      setIsClosing(false);
    }, 450); // Matches closing animation duration
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8 select-none">
      <style>{`
        @keyframes scrollOpen {
          0% { transform: scaleY(0.05) scaleX(0.4); opacity: 0; filter: brightness(2); }
          50% { transform: scaleY(1.05) scaleX(0.85); opacity: 0.9; }
          100% { transform: scaleY(1) scaleX(1); opacity: 1; filter: brightness(1); }
        }
        @keyframes scrollClose {
          0% { transform: scaleY(1) scaleX(1); opacity: 1; }
          100% { transform: scaleY(0.05) scaleX(0.3); opacity: 0; }
        }
        .animate-scroll-open {
          animation: scrollOpen 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
        .animate-scroll-close {
          animation: scrollClose 0.45s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      <div className="text-center space-y-2">
        <h2 className="font-romantic text-4xl sm:text-5xl text-amber-300 drop-shadow">
          Royal Secret Scrolls 📜✨
        </h2>
        <p className="text-slate-300 text-sm">
          Click any royal envelope to unroll your secret message, Neha ✨
        </p>
      </div>

      {/* Letters Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {letters.map((l, idx) => (
          <div
            key={idx}
            onClick={() => handleOpenLetter(l)}
            className="glass-card p-6 rounded-3xl border border-amber-500/30 hover:border-amber-400 cursor-pointer transition-all duration-300 group space-y-4 relative overflow-hidden bg-gradient-to-br from-slate-900/95 via-amber-950/20 to-slate-900/95 shadow-xl hover:scale-[1.02]"
          >
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition" />

            <div className="flex items-center justify-between relative z-10">
              <span className="text-xs px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 font-medium">
                {l.tag}
              </span>

              {/* Royal Wax Seal */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-yellow-700 border-2 border-yellow-200 flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                <Scroll className="w-5 h-5 text-yellow-100" />
              </div>
            </div>

            <div className="space-y-1 relative z-10">
              <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition">
                {l.title}
              </h3>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-300" /> Tap to unroll
                the royal scroll...
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Royal Ancient Scroll Unrolling Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className={`${
              isClosing ? "animate-scroll-close" : "animate-scroll-open"
            } max-w-xl w-full p-8 sm:p-10 rounded-2xl relative space-y-6 bg-gradient-to-b from-[#fef3c7] via-[#fde68a] to-[#fef3c7] text-slate-900 border-4 border-amber-600 shadow-[0_0_60px_rgba(245,158,11,0.5)] overflow-hidden`}
            style={{
              backgroundImage:
                "radial-gradient(#d97706 0.75px, transparent 0.75px), radial-gradient(#d97706 0.75px, #fef3c7 0.75px)",
              backgroundSize: "30px 30px",
              backgroundPosition: "0 0, 15px 15px",
            }}
          >
            {/* Wooden Scroll Rods Top & Bottom Decorative Borders */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 border-b border-amber-900 shadow-md" />
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 border-t border-amber-900 shadow-md" />

            {/* Close Button */}
            <button
              onClick={handleCloseLetter}
              className="absolute top-6 right-6 text-amber-900 hover:text-black bg-amber-500/30 hover:bg-amber-500/50 p-2 rounded-full transition cursor-pointer z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scroll Header */}
            <div className="space-y-2 pt-2 text-center relative z-10">
              <div className="inline-flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-600/20 border border-amber-600/30">
                <Scroll className="w-3.5 h-3.5" />
                <span>{selected.tag}</span>
              </div>

              <h3 className="font-romantic text-3xl sm:text-4xl text-amber-950 leading-tight">
                {selected.title}
              </h3>
            </div>

            {/* Scroll Parchment Body */}
            <div className="relative z-10 bg-amber-100/80 p-6 sm:p-7 rounded-xl border-2 border-amber-500/40 shadow-inner my-4">
              <p className="text-amber-950 leading-relaxed text-sm sm:text-base font-serif tracking-wide italic text-center">
                &ldquo;{selected.body}&rdquo;
              </p>

              <div className="mt-6 pt-4 border-t border-amber-400/50 flex justify-between items-center text-xs text-amber-900 font-bold">
                <span>✨ King of Your Heart, Saquib</span>
                <span className="text-amber-800">05 Nov 💖</span>
              </div>
            </div>

            {/* Bottom Roll & Close Action */}
            <div className="text-center pt-2">
              <button
                onClick={handleCloseLetter}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 text-white font-bold text-xs shadow-lg hover:opacity-95 transition cursor-pointer border border-amber-300"
              >
                Roll & Tie Scroll 📜
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
