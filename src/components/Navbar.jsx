import React from "react";
import {
  Heart,
  Clock,
  Image,
  Sparkles,
  Cake,
  Mail,
  Gem,
  Gamepad2,
} from "lucide-react";

export default function Navbar({ currentPage, setCurrentPage }) {
  const navItems = [
    { id: "home", label: "Home", icon: Heart },
    { id: "timeline", label: "Our Clock", icon: Clock },
    { id: "cake", label: "Cake", icon: Cake },
    { id: "letters", label: "Letters", icon: Mail },
    { id: "memories", label: "Photos", icon: Image },
    { id: "promise", label: "Future Wife 💍", icon: Gem },
    { id: "game", label: "Love Game ❤️", icon: Gamepad2 },
    { id: "jar", label: "Love Jar", icon: Sparkles },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-rose-500/20 px-4 py-3">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div
          onClick={() => setCurrentPage("home")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-pulse" />
          <span className="font-romantic text-2xl bg-gradient-to-r from-rose-400 to-cyan-400 bg-clip-text text-transparent font-bold">
            Neha Praveen
          </span>
        </div>

        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                  active
                    ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/30 scale-105"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
