import React, { useState, useEffect } from "react";
import { Clock, Heart, Star, Sparkles } from "lucide-react";

export default function TimelinePage() {
  const [loveTime, setLoveTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
  });
  const [birthStats, setBirthStats] = useState({
    totalDaysAlive: 0,
    nextBdayDays: 0,
  });

  useEffect(() => {
    const startLove = new Date("2019-07-28T00:00:00");
    const birthDate = new Date("2002-09-05T00:00:00");

    const updateClocks = () => {
      const now = new Date();
      const diffLove = now - startLove;
      const totalDays = Math.floor(diffLove / (1000 * 60 * 60 * 24));

      let years = now.getFullYear() - startLove.getFullYear();
      let months = now.getMonth() - startLove.getMonth();
      let days = now.getDate() - startLove.getDate();

      if (days < 0) {
        months -= 1;
        days += 30;
      }
      if (months < 0) {
        years -= 1;
        months += 12;
      }

      setLoveTime({
        years,
        months,
        days,
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        totalDays,
      });

      const totalDaysAlive = Math.floor(
        (now - birthDate) / (1000 * 60 * 60 * 24),
      );
      let nextBday = new Date(now.getFullYear(), 8, 5);
      if (now > nextBday) {
        nextBday = new Date(now.getFullYear() + 1, 8, 5);
      }
      const nextBdayDays = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24));

      setBirthStats({ totalDaysAlive, nextBdayDays });
    };

    updateClocks();
    const timer = setInterval(updateClocks, 1000);
    return () => clearInterval(timer);
  }, []);

  const milestones = [
    {
      date: "05 September 2002",
      title: "My Queen Entered the World",
      desc: "The day Neha Praveen was born — destined to become the love of my life.",
      badge: `${birthStats.totalDaysAlive.toLocaleString()} Days of Grace`,
    },
    {
      date: "28 July 2019",
      title: "The Day Our Love Story Began",
      desc: "The unforgettable day you became my girlfriend and my heart found its home.",
      badge: `${loveTime.totalDays.toLocaleString()} Days Together`,
    },
    {
      date: "Right Now • Every Single Day",
      title: "My Girlfriend Today, Wife in My Heart",
      desc: "Standing by each other through thick and thin, loving you deeper with every passing year.",
      badge: "Unbreakable Loyalty",
    },
    {
      date: "Our Future • InshaAllah",
      title: "When Your Parents Say Yes 💍",
      desc: "The day your parents happily bless our bond and I officially make you my wife forever.",
      badge: "Our Dream Destination",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <div className="text-center space-y-2">
        <h2 className="font-romantic text-4xl sm:text-5xl text-rose-400">
          Our Journey in Seconds
        </h2>
        <p className="text-slate-400 text-sm">
          Since 28 July 2019, every second with you has been a blessing
        </p>
      </div>

      {/* Live Love Counter Grid */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl neon-pink-glow border border-rose-500/30">
        <div className="flex items-center justify-center gap-2 text-rose-300 mb-6 text-sm font-medium">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-ping" />
          <span>TIME SPENT LOVING NEHA PRAVEEN (SINCE 28 JULY 2019)</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
          {[
            { label: "Years", val: loveTime.years },
            { label: "Months", val: loveTime.months },
            { label: "Days", val: loveTime.days },
            { label: "Hours", val: loveTime.hours },
            { label: "Minutes", val: loveTime.minutes },
            { label: "Seconds", val: loveTime.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-900/90 border border-white/10 rounded-2xl p-4"
            >
              <div className="text-2xl sm:text-4xl font-bold text-cyan-400">
                {item.val}
              </div>
              <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Timeline Cards */}
      <div className="space-y-4">
        {milestones.map((m, i) => (
          <div
            key={i}
            className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                {m.date}
              </span>
              <h3 className="text-xl font-bold text-white">{m.title}</h3>
              <p className="text-sm text-slate-300">{m.desc}</p>
            </div>
            <div className="shrink-0">
              <span className="inline-block px-4 py-2 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold">
                {m.badge}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
