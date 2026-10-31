import React, { useState } from "react";
import { Mail, Heart, X } from "lucide-react";

export default function LettersPage() {
  const letters = [
    {
      title: "Open Today on Your Birthday (05 Sep)",
      tag: "Birthday Queen Special",
      body: "Happy Birthday, myjaan Neha Praveen! On 05 September 2002, the love of my life was born. You are the best girlfriend anyone could ever pray for, and my heart already treats you as my wife. May this year bring you closer to all your dreams—and bring us closer to our forever.",
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-400">
          Secret Wax-Sealed Letters
        </h2>
        <p className="text-slate-400 text-sm">
          Click any envelope to break the seal and read your private letter
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {letters.map((l, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(l)}
            className="glass-card p-6 rounded-3xl border border-white/10 hover:border-rose-400/50 cursor-pointer transition group space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                {l.tag}
              </span>
              <Mail className="w-5 h-5 text-rose-400 group-hover:scale-110 transition" />
            </div>
            <h3 className="text-xl font-bold text-white">{l.title}</h3>
            <p className="text-xs text-slate-400">
              Tap to break the wax seal & read...
            </p>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-8 rounded-3xl border border-rose-500/40 relative space-y-4">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-semibold uppercase tracking-widest">
              <Heart className="w-4 h-4 fill-rose-500" />
              <span>{selected.tag}</span>
            </div>
            <h3 className="font-romantic text-3xl text-white">
              {selected.title}
            </h3>
            <p className="text-slate-200 leading-relaxed text-sm sm:text-base border-t border-white/10 pt-4">
              {selected.body}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
