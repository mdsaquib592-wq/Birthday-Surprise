import React, { useState, useEffect } from "react";
import { Heart, Sparkles, Trophy, RotateCcw, Download } from "lucide-react";
import confetti from "canvas-confetti";

export default function GamePage() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [items, setItems] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setGameWon(false);
    setItems([]);
  };

  useEffect(() => {
    if (!isPlaying) return;

    if (timeLeft <= 0) {
      setIsPlaying(false);
      if (score >= 10) {
        setGameWon(true);
        confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft, score]);

  useEffect(() => {
    if (!isPlaying) return;

    const spawner = setInterval(() => {
      const newItem = {
        id: Math.random(),
        left: Math.floor(Math.random() * 82) + 6,
        symbol: ["❤️", "💍", "✨", "💖", "🌹"][Math.floor(Math.random() * 5)],
        speed: Math.floor(Math.random() * 2) + 3,
      };
      setItems((prev) => [...prev.slice(-12), newItem]);
    }, 750);

    return () => clearInterval(spawner);
  }, [isPlaying]);

  const catchItem = (id) => {
    setScore((prev) => {
      const updated = prev + 1;
      if (updated === 10) {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
      }
      return updated;
    });
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Generate & Download High-Resolution JPG Love Note Signed by Md Saquib Alam
  const downloadLoveNoteJPG = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1420;
    const ctx = canvas.getContext("2d");

    // Romantic Dark Gradient Background
    const grad = ctx.createLinearGradient(0, 0, 1080, 1420);
    grad.addColorStop(0, "#090a14");
    grad.addColorStop(0.5, "#230b24");
    grad.addColorStop(1, "#090d16");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1080, 1420);

    // Outer Rose Border
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 8;
    ctx.strokeRect(45, 45, 990, 1330);

    // Inner Neon Cyan Border
    ctx.strokeStyle = "#22d3ee";
    ctx.lineWidth = 3;
    ctx.strokeRect(65, 65, 950, 1290);

    // Top Badge
    ctx.fillStyle = "#22d3ee";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "✨ OFFICIAL LOVE NOTE • SCORE: " + score + " HEARTS CAUGHT ✨",
      540,
      140,
    );

    // Main Title
    ctx.fillStyle = "#fb7185";
    ctx.font = "bold italic 64px Georgia, serif";
    ctx.fillText("My Dearest Neha Praveen", 540, 235);

    // Subtitle Dates
    ctx.fillStyle = "#fde047";
    ctx.font = "bold 25px sans-serif";
    ctx.fillText(
      "Born: 05 Sep 2002   |   Saquib & Neha Since: 28 July 2019",
      540,
      295,
    );

    // Decorative Divider
    ctx.strokeStyle = "rgba(244, 63, 94, 0.5)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(180, 335);
    ctx.lineTo(900, 335);
    ctx.stroke();

    // Romantic Note Lines
    ctx.fillStyle = "#f8fafc";
    ctx.font = "italic 35px Georgia, serif";
    const noteLines = [
      '"Just like you effortlessly caught all these hearts,',
      "you caught my soul on 28 July 2019 and never let go.",
      "",
      "You are the most precious blessing in my life—",
      "my sweetest girlfriend today, and the girl I pray",
      "to make my wife the moment your parents agree.",
      "",
      "Every smile of yours is my peace, every tear of yours",
      "is my responsibility, and every birthday of yours",
      "is my favorite celebration on earth.",
      "",
      "Wait for me just a little longer, my Queen...",
      'Our forever together is coming soon, InshaAllah."',
    ];

    let yPos = 415;
    noteLines.forEach((line) => {
      ctx.fillText(line, 540, yPos);
      yPos += 54;
    });

    // Dedicated Signature Block
    ctx.fillStyle = "#fde047";
    ctx.font = "bold italic 42px Georgia, serif";
    ctx.fillText("Forever & Always Yours,", 540, 1145);

    ctx.fillStyle = "#22d3ee";
    ctx.font = "bold italic 54px Georgia, serif";
    ctx.fillText("Md Saquib Alam ❤️", 540, 1210);

    // Footer Box
    ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
    ctx.fillRect(140, 1250, 800, 80);
    ctx.strokeStyle = "#f43f5e";
    ctx.lineWidth = 2;
    ctx.strokeRect(140, 1250, 800, 80);

    ctx.fillStyle = "#f8fafc";
    ctx.font = "bold 24px sans-serif";
    ctx.fillText(
      "Saquib ❤️ Neha  •  28 July 2019 to Infinity (InshaAllah)",
      540,
      1300,
    );

    // Export as JPG
    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    const link = document.createElement("a");
    link.download = "Love_Note_From_Saquib_To_Neha.jpg";
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8 text-center">
      <div className="space-y-2">
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-400">
          Catch Saquib's Love, Neha! ❤️
        </h2>
        <p className="text-slate-300 text-sm">
          Tap falling hearts and rings! Score{" "}
          <strong className="text-cyan-400">10 or more</strong> to unlock a
          personal Love Note Card signed by{" "}
          <strong className="text-rose-400">Saquib</strong> in `.jpg` format!
        </p>
      </div>

      {/* Game Arena Box */}
      <div className="relative glass-card w-full h-[470px] rounded-3xl border border-rose-500/30 overflow-hidden flex flex-col items-center justify-between p-6 neon-pink-glow">
        {/* Top Score & Timer Bar */}
        <div className="w-full flex justify-between items-center bg-slate-900/80 px-6 py-3 rounded-2xl border border-white/10 z-10">
          <div className="flex items-center gap-2 text-rose-300 font-semibold">
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            <span>
              Score: {score} {score >= 10 && "✨ (Note Unlocked!)"}
            </span>
          </div>
          <div className="text-cyan-300 font-semibold text-sm">
            ⏳ Time Left: {timeLeft}s
          </div>
        </div>

        {/* Initial Start Overlay */}
        {!isPlaying && !gameWon && timeLeft === 30 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-20 space-y-4">
            <Sparkles className="w-12 h-12 text-rose-400 animate-bounce" />
            <h3 className="font-romantic text-3xl text-white">
              Ready to Catch My Love, Neha?
            </h3>
            <button
              onClick={startGame}
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold shadow-lg shadow-rose-500/30 hover:scale-105 transition"
            >
              Start Game ✨
            </button>
          </div>
        )}

        {/* Try Again Overlay (< 10 points) */}
        {!isPlaying && !gameWon && timeLeft <= 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/75 backdrop-blur-sm z-20 space-y-4 p-4">
            <h3 className="font-romantic text-3xl text-amber-300">
              So Close, My Love! ({score} points)
            </h3>
            <p className="text-slate-200 text-sm">
              Catch at least 10 hearts to unlock your signed JPG Love Note from
              Saquib.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold flex items-center gap-2 shadow-lg hover:scale-105 transition"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again ❤️
            </button>
          </div>
        )}

        {/* Winner Overlay (Score >= 10) with JPG Download */}
        {gameWon && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md z-20 space-y-4 p-6 animate-fadeIn">
            <Trophy className="w-10 h-10 text-amber-400 animate-bounce" />
            <h3 className="font-romantic text-3xl sm:text-4xl text-rose-300">
              Special Love Note Unlocked! ({score} Points)
            </h3>

            {/* On-screen Preview of the Note */}
            <div className="max-w-md bg-slate-900/90 border border-rose-500/40 rounded-2xl p-4 text-xs sm:text-sm text-slate-200 italic leading-relaxed space-y-2">
              <p className="text-cyan-300 font-semibold not-italic">
                To My Queen Neha Praveen (05.09.2002):
              </p>
              <p>
                "Just like you caught all these hearts, you caught my soul on 28
                July 2019. You are my sweetest girlfriend today, and the girl I
                pray to make my wife the moment your parents agree. Happy
                Birthday, my forever love!"
              </p>
              <p className="text-rose-400 font-bold not-italic text-right">
                — Forever Yours, Md Saquib Alam ❤️
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                onClick={downloadLoveNoteJPG}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-sm inline-flex items-center gap-2 shadow-lg shadow-rose-500/30 hover:scale-105 transition"
              >
                <Download className="w-4 h-4" />
                Download Signed Love Note (.JPG) 💖
              </button>

              <button
                onClick={startGame}
                className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 font-medium text-xs inline-flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Falling Interactive Elements */}
        {isPlaying &&
          items.map((item) => (
            <button
              key={item.id}
              onClick={() => catchItem(item.id)}
              style={{
                left: `${item.left}%`,
                animationDuration: `${item.speed}s`,
              }}
              className="absolute top-0 text-3xl sm:text-4xl animate-fall cursor-pointer hover:scale-125 transition select-none"
            >
              {item.symbol}
            </button>
          ))}

        {!isPlaying && timeLeft === 30 && (
          <div className="text-slate-400 text-sm italic">
            Click 'Start Game' above and tap falling hearts as they drop!
          </div>
        )}
      </div>

      <style>{`
        @keyframes fall {
          0% { transform: translateY(-20px); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(410px); opacity: 0; }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}
