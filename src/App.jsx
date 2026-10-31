import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TimelinePage from "./pages/TimelinePage";
import MemoriesPage from "./pages/MemoriesPage";
import PromisePage from "./pages/PromisePage";
import GamePage from "./pages/GamePage";
import LoveJarPage from "./pages/LoveJarPage";
import CakePage from "./pages/CakePage";
import LettersPage from "./pages/LettersPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div className="min-h-screen flex flex-col bg-[#090a10] text-slate-100">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-1">
        {currentPage === "home" && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === "timeline" && <TimelinePage />}
        {currentPage === "memories" && <MemoriesPage />}
        {currentPage === "promise" && <PromisePage />}
        {currentPage === "game" && <GamePage />}
        {currentPage === "jar" && <LoveJarPage />}
        {currentPage === "cake" && <CakePage />}
        {currentPage === "letters" && <LettersPage />}
      </main>

      <footer className="text-center py-6 border-t border-white/5 text-xs text-slate-500">
        Made with endless love for Neha Praveen • My Girlfriend Since 28 July
        2019 & My Future Wife InshaAllah ❤️
      </footer>
    </div>
  );
}
