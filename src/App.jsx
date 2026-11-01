import React, { useState, useEffect } from "react";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import CakePage from "./pages/CakePage";
import LettersPage from "./pages/LettersPage";
import MemoriesPage from "./pages/MemoriesPage";
import PromisePage from "./pages/PromisePage";
import GamePage from "./pages/GamePage";
import LoveJarPage from "./pages/LoveJarPage";
import "./App.css";

const PAGE_ORDER = [
  { id: "home", title: "Home" },
  { id: "timeline", title: "Our Clock ⏳" },
  { id: "cake", title: "Birthday Cake 🎂" },
  { id: "letters", title: "Royal Scrolls 📜" },
  { id: "memories", title: "Our Photos 📸" },
  { id: "promise", title: "Future Wife 💍" },
  { id: "game", title: "Love Game ❤️" },
  { id: "jar", title: "Love Jar ✨" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  // Har page change par smoothly top par scroll karega
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const currentIndex = PAGE_ORDER.findIndex((p) => p.id === currentPage);
  const prevPage = currentIndex > 0 ? PAGE_ORDER[currentIndex - 1] : null;
  const nextPage =
    currentIndex < PAGE_ORDER.length - 1 ? PAGE_ORDER[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#090a10] text-slate-100 selection:bg-rose-500 selection:text-white">
      {/* Navbar with Page Switching */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area arranged in desired order */}
      <main className="flex-1">
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === "timeline" && <TimelinePage />}
        {currentPage === "cake" && <CakePage />}
        {currentPage === "letters" && <LettersPage />}
        {currentPage === "memories" && <MemoriesPage />}
        {currentPage === "promise" && <PromisePage />}
        {currentPage === "game" && <GamePage />}
        {currentPage === "jar" && <LoveJarPage />}
      </main>

      {/* Guided Next / Previous Surprise Navigation Bar */}
      <div className="max-w-4xl w-full mx-auto px-4 py-6 flex items-center justify-between gap-4 border-t border-white/5">
        {prevPage ? (
          <button
            onClick={() => setCurrentPage(prevPage.id)}
            className="px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs sm:text-sm text-slate-300 flex items-center gap-2 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back: {prevPage.title}</span>
          </button>
        ) : (
          <div />
        )}

        {nextPage ? (
          <button
            onClick={() => setCurrentPage(nextPage.id)}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-rose-500/25 hover:scale-105 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Next Surprise: {nextPage.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => setCurrentPage("home")}
            className="px-5 py-2.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 text-cyan-300 font-semibold text-xs sm:text-sm hover:bg-cyan-500/25 transition cursor-pointer"
          >
            Back to Start ❤️
          </button>
        )}
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-white/5 text-xs text-slate-500">
        Made with endless love for Neha Praveen • My Girlfriend Since 28 July
        2019 &amp; My Future Wife InshaAllah ❤️
      </footer>
    </div>
  );
}
