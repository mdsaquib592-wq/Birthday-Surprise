import React from "react";
import { Heart } from "lucide-react";

export default function MemoriesPage() {
  const photos = [
    {
      id: 1,
      src: "/images/photo1.jpg",
      fallback:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
      date: "28 July 2019",
      caption: "The day my heart found its forever home in you.",
    },
    {
      id: 2,
      src: "/images/photo2.jpg",
      fallback:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
      date: "05 September",
      caption: "Celebrating the queen who rules my heart.",
    },
    {
      id: 3,
      src: "/images/photo3.jpg",
      fallback:
        "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=600&q=80",
      date: "Favorite Smile",
      caption: "One look at your smile and all my worries vanish.",
    },
    {
      id: 4,
      src: "/images/photo4.jpg",
      fallback:
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
      date: "Girlfriend & Future Wife",
      caption: "Loving you today and waiting for our wedding day.",
    },
    {
      id: 5,
      src: "/images/photo5.jpg",
      fallback:
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=600&q=80",
      date: "Unforgettable Moments",
      caption: "Every ordinary moment becomes magical when you are beside me.",
    },
    {
      id: 6,
      src: "/images/photo6.jpg",
      fallback:
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
      date: "Forever & Always",
      caption: "Growing old with you is my favorite dream come true.",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="font-romantic text-4xl sm:text-5xl text-cyan-400">
          Our Polaroid Memories
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="glass-card p-4 rounded-3xl border border-white/10 hover:border-rose-500/40 transition group flex flex-col justify-between"
          >
            {/* Using object-contain and bg-black/40 so the full photo is shown without cropping */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/50 flex items-center justify-center p-1">
              <img
                src={photo.src}
                alt={photo.caption}
                onError={(e) => {
                  e.target.src = photo.fallback;
                }}
                className="w-full h-full object-contain group-hover:scale-105 transition duration-500 rounded-xl"
              />
              <span className="absolute top-3 left-3 bg-black/75 backdrop-blur-md text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-400/30 z-10">
                {photo.date}
              </span>
            </div>

            <div className="pt-4 px-1 flex items-start justify-between gap-2">
              <p className="text-sm text-slate-200 italic">"{photo.caption}"</p>
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500 shrink-0 mt-1" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
