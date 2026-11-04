import React, { useState, useRef, useEffect } from "react";
import {
  Heart,
  X,
  ZoomIn,
  Sparkles,
  Volume2,
  VolumeX,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Pin,
  Feather,
  Lock,
} from "lucide-react";

// ============================================================================
// 1. OUTER SCRAPBOOK PHOTOS (ONLY 10 PHOTOS — SHOWN ON THE MAIN PAGE)
// ============================================================================
const OUTER_HIGHLIGHTS = [
  {
    id: 1,
    src: "/images/photo1.jpg",
    fallback:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
    date: "28 July 2019",
    category: "First Dates",
    caption: "The day my heart found its forever home in you.",
    stickyNote: "Humari Shuruwat ❤️",
    rotate: "-rotate-2",
    tapeColor: "bg-rose-400/50",
  },
  {
    id: 2,
    src: "/images/photo2.jpg",
    fallback:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
    date: "05 November",
    category: "Birthdays",
    caption: "Celebrating the queen who rules my heart.",
    stickyNote: "Birthday Queen 👑",
    rotate: "rotate-1",
    tapeColor: "bg-amber-300/50",
  },
  {
    id: 3,
    src: "/images/photo3.jpg",
    fallback:
      "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?auto=format&fit=crop&w=600&q=80",
    date: "Favorite Smile",
    category: "Sweet Moments",
    caption: "One look at your smile and all my worries vanish.",
    stickyNote: "Teri Muskurahat ✨",
    rotate: "-rotate-1",
    tapeColor: "bg-cyan-400/50",
  },
  {
    id: 4,
    src: "/images/photo4.jpg",
    fallback:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
    date: "Future Wife",
    category: "Sweet Moments",
    caption: "Loving you today and waiting for our wedding day.",
    stickyNote: "InshaAllah Forever 💍",
    rotate: "rotate-2",
    tapeColor: "bg-pink-400/50",
  },
  {
    id: 5,
    src: "/images/photo5.jpg",
    fallback:
      "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=600&q=80",
    date: "Magical Outing",
    category: "Trips & Outings",
    caption: "Every ordinary moment becomes magical when you are beside me.",
    stickyNote: "Best Day Out 🌸",
    rotate: "-rotate-2",
    tapeColor: "bg-emerald-400/50",
  },
  {
    id: 6,
    src: "/images/photo6.jpg",
    fallback:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
    date: "Forever & Always",
    category: "First Dates",
    caption: "Growing old with you is my favorite dream come true.",
    stickyNote: "Meri Duniya 🌍",
    rotate: "rotate-1",
    tapeColor: "bg-purple-400/50",
  },
  {
    id: 7,
    src: "/images/photo7.jpg",
    fallback:
      "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?auto=format&fit=crop&w=600&q=80",
    date: "Golden Hour",
    category: "Trips & Outings",
    caption: "Sunset views look even prettier when I am looking at you.",
    stickyNote: "Shaam Aur Tum 🌅",
    rotate: "-rotate-1",
    tapeColor: "bg-amber-400/50",
  },
  {
    id: 8,
    src: "/images/photo8.jpg",
    fallback:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=600&q=80",
    date: "Birthday Glow",
    category: "Birthdays",
    caption: "Another year of blessing the world with your kindness.",
    stickyNote: "Cake & Laughs 🎂",
    rotate: "rotate-2",
    tapeColor: "bg-rose-400/50",
  },
  {
    id: 9,
    src: "/images/photo9.jpg",
    fallback:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80",
    date: "Endless Talks",
    category: "First Dates",
    caption: "Hours feel like seconds when we are talking together.",
    stickyNote: "Dil Ki Baatein ☕",
    rotate: "-rotate-2",
    tapeColor: "bg-cyan-400/50",
  },
  {
    id: 10,
    src: "/images/photo10.jpg",
    fallback:
      "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=600&q=80",
    date: "My Safe Place",
    category: "Sweet Moments",
    caption: "In your arms, I found the peace I was searching for all my life.",
    stickyNote: "Sukoon ❤️",
    rotate: "rotate-1",
    tapeColor: "bg-pink-400/50",
  },
];

// ============================================================================
// 2. EXCLUSIVE DIARY PHOTOS (28 BRAND NEW PHOTOS — ONLY INSIDE THE DIARY BOOK)
// Put these in public/images/diary1.jpg to public/images/diary28.jpg
// ============================================================================
const EXCLUSIVE_DIARY_PAGES = [
  {
    pageNo: 1,
    src: "/images/diary1.jpg",
    fallback:
      "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=600&q=80",
    date: "Page 01 • Pehla Panna",
    title: "Jab Pehli Baar Dil Dhadka...",
    handwrittenNote:
      "Pyari Neha, is diary ke har panne par sirf tumhara naam likha hai. Jab pehli baar tumhe dekha tha, tabhi dil ne keh diya tha ki meri kismat me sirf tum ho.",
    mood: "✨ First Spark",
    doodle: "❤️",
  },
  {
    pageNo: 2,
    src: "/images/diary2.jpg",
    fallback:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&q=80",
    date: "Page 02 • 28 July 2019",
    title: "Wo Haseen Ikrar",
    handwrittenNote:
      "28 July ka wo din meri zindagi ka sabse khoobsurat mod tha. Tumhari haan ne meri adhoori duniya ko hamesha ke liye mukammal kar diya.",
    mood: "💍 Forever Yours",
    doodle: "🌸",
  },
  {
    pageNo: 3,
    src: "/images/diary3.jpg",
    fallback:
      "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80",
    date: "Page 03 • Teri Aankhein",
    title: "Jheel Si Gehri Aankhein",
    handwrittenNote:
      "Sach kahun toh mujhe aaine se zyada tumhari aankhon me dekhna pasand hai, kyunki wahan mujhe mere liye bepanah mohabbat dikhti hai.",
    mood: "👀 Mesmerized",
    doodle: "✨",
  },
  {
    pageNo: 4,
    src: "/images/diary4.jpg",
    fallback:
      "https://images.unsplash.com/photo-1516961642265-531546e84af2?auto=format&fit=crop&w=600&q=80",
    date: "Page 04 • Choti Si Mulakat",
    title: "Chupke Se Milna",
    handwrittenNote:
      "Thode se waqt ke liye hi sahi, par tumse milne ka jo intezaar hota tha aur milne ke baad jo sukoon milta tha, wo lafzon me bayaan nahi ho sakta.",
    mood: "💓 Racing Heart",
    doodle: "🦋",
  },
  {
    pageNo: 5,
    src: "/images/diary5.jpg",
    fallback:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    date: "Page 05 • Meri Shehzadi",
    title: "Sabse Alag, Sabse Pyari",
    handwrittenNote:
      "Duniya me bohot log dekhe, par tumhari masoomiyat aur saadgi ka koi muqabla nahi. Tum sach me mere dil ki Queen ho.",
    mood: "👑 Royalty",
    doodle: "💖",
  },
  {
    pageNo: 6,
    src: "/images/diary6.jpg",
    fallback:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    date: "Page 06 • Humara Safar",
    title: "Sath Chalne Ka Waada",
    handwrittenNote:
      "Ye tasveer mujhe yaad dilati hai ki rasta chahe kaisa bhi ho, agar humsafar tum ho toh manzil khud-ba-khud khoobsurat ban jati hai.",
    mood: "🛵 Together",
    doodle: "🍃",
  },
  {
    pageNo: 7,
    src: "/images/diary7.jpg",
    fallback:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80",
    date: "Page 07 • Teri Hansi",
    title: "Mere Dil Ki Dawa",
    handwrittenNote:
      "Jab main pareshan hota hoon aur tum bas ek baar muskura deti ho, toh lagta hai jaise saari mushkilein chutkiyon me gayab ho gayi.",
    mood: "😊 Pure Joy",
    doodle: "🌷",
  },
  {
    pageNo: 8,
    src: "/images/diary8.jpg",
    fallback:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=600&q=80",
    date: "Page 08 • 5 November",
    title: "Meri Jaan Ka Janamdin",
    handwrittenNote:
      "5 November ka din mere liye sabse khaas hai. Allah ka lakh-lakh shukr hai ki usne is din tumhe mere liye is duniya me bheja.",
    mood: "🎂 Birthday Girl",
    doodle: "🎈",
  },
  {
    pageNo: 9,
    src: "/images/diary9.jpg",
    fallback:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=600&q=80",
    date: "Page 09 • Pakka Irada",
    title: "Har Haal Me Tumhara Sath",
    handwrittenNote:
      "Waqt badla, saal badle, par tumhare liye mera pyaar har guzarte din ke sath aur gehra hota chala gaya.",
    mood: "🤝 Unbreakable",
    doodle: "💫",
  },
  {
    pageNo: 10,
    src: "/images/diary10.jpg",
    fallback:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
    date: "Page 10 • Hawa Ka Jhonka",
    title: "Zulfon Ki Chhaon",
    handwrittenNote:
      "Jab hawa se tumhare baal chehre par aate hain aur tum unhe kaan ke peeche karti ho—kasam se, waqt wahin tham jata hai.",
    mood: "🍃 Magical",
    doodle: "💕",
  },
  {
    pageNo: 11,
    src: "/images/diary11.jpg",
    fallback:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80",
    date: "Page 11 • Rab Ki Rehmat",
    title: "Duaon Ka Asar",
    handwrittenNote:
      "Maine jab bhi haath utha kar dua maangi hai, har dua me sirf tumhari khushi aur humara hamesha ka sath maanga hai.",
    mood: "🤲 Blessed",
    doodle: "🌙",
  },
  {
    pageNo: 12,
    src: "/images/diary12.jpg",
    fallback:
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=600&q=80",
    date: "Page 12 • Meethi Nok-Jhok",
    title: "Roothna Aur Manana",
    handwrittenNote:
      "Tumhara choti-choti baaton par nakhre dikhana aur fir mere manane par maan jana, mujhe tumse aur zyada pyaar karne par majboor kar deta hai.",
    mood: "😘 Cute Fights",
    doodle: "💌",
  },
  {
    pageNo: 13,
    src: "/images/diary13.jpg",
    fallback:
      "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=600&q=80",
    date: "Page 13 • Humari Selfie",
    title: "Ek Frame Me Do Dil",
    handwrittenNote:
      "Hum dono ek sath kitne achhe lagte hain na? Kisi ki nazar na lage humari is pyari si jodi ko. MashaAllah!",
    mood: "🤳 MashaAllah",
    doodle: "🧿",
  },
  {
    pageNo: 14,
    src: "/images/diary14.jpg",
    fallback:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    date: "Page 14 • Jagmagati Raat",
    title: "Meri Zindagi Ki Roshni",
    handwrittenNote:
      "Sitaare toh aasman me chamakte hain, par meri zindagi ko roshan karne wala sitara mere bilkul samne is photo me hai.",
    mood: "🌟 My Star",
    doodle: "✨",
  },
  {
    pageNo: 15,
    src: "/images/diary15.jpg",
    fallback:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80",
    date: "Page 15 • Dil Ki Dhun",
    title: "Har Geet Tumhare Naam",
    handwrittenNote:
      "Jab bhi koi romantic gaana bajta hai, toh meri aankhon ke samne bas tumhara hi chehra ghoomne lagta hai.",
    mood: "🎶 Melody",
    doodle: "🎵",
  },
  {
    pageNo: 16,
    src: "/images/diary16.jpg",
    fallback:
      "https://images.unsplash.com/photo-1501901609772-df0848060b33?auto=format&fit=crop&w=600&q=80",
    date: "Page 16 • Kh्वाबों Ka Ghar",
    title: "Humara Aane Wala Kal",
    handwrittenNote:
      "Ek din hum apne chote se pyare se ghar me baithe honge aur is diary ko khol kar apni purani yaadon par muskura rahe honge.",
    mood: "🏡 Future Home",
    doodle: "💑",
  },
  {
    pageNo: 17,
    src: "/images/diary17.jpg",
    fallback:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80",
    date: "Page 17 • Gehra Pyaar",
    title: "Har Roz Naya Ehsaas",
    handwrittenNote:
      "Log kehte hain waqt ke sath pyaar kam ho jata hai, par mera dil toh har subah tumse pehle se bhi zyada mohabbat karta hai.",
    mood: "💖 Deeper Love",
    doodle: "🌹",
  },
  {
    pageNo: 18,
    src: "/images/diary18.jpg",
    fallback:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=600&q=80",
    date: "Page 18 • Teri Saadgi",
    title: "Bina Shringaar Bhi Haseen",
    handwrittenNote:
      "Tumhe sajne-sawarne ki zaroorat hi nahi padti Neha, tumhari saadgi hi itni qatil hai ki dil baar-baar haar jata hai.",
    mood: "🌸 Simplicity",
    doodle: "💘",
  },
  {
    pageNo: 19,
    src: "/images/diary19.jpg",
    fallback:
      "https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?auto=format&fit=crop&w=600&q=80",
    date: "Page 19 • Raat Ki Baatein",
    title: "Neend Se Pyari Baatein",
    handwrittenNote:
      "Raat der tak phone par tumhari aawaz sunte rehna aur baatein karte-karte so jana, mere din ka sabse pyara hissa hota hai.",
    mood: "🌙 Late Night",
    doodle: "📞",
  },
  {
    pageNo: 20,
    src: "/images/diary20.jpg",
    fallback:
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?auto=format&fit=crop&w=600&q=80",
    date: "Page 20 • Tera Khyal",
    title: "Har Pal Mere Sath",
    handwrittenNote:
      "Chahe main kaam me kitna bhi busy rahoon, mere dimaag ke ek kone me hamesha tumhara hi khayal chalta rehta hai.",
    mood: "💭 Always You",
    doodle: "❤️",
  },
  {
    pageNo: 21,
    src: "/images/diary21.jpg",
    fallback:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
    date: "Page 21 • Bharosa",
    title: "Aankh Band Karke Yakeen",
    handwrittenNote:
      "Humare rishte ki sabse badi taqat humara bharosa aur wafadari hai. Main hamesha tumhari izzat aur khushi ki hifazat karunga.",
    mood: "🛡️ Loyalty",
    doodle: "🤞",
  },
  {
    pageNo: 22,
    src: "/images/diary22.jpg",
    fallback:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    date: "Page 22 • Suhana Mausam",
    title: "Baarish Aur Tumhari Yaad",
    handwrittenNote:
      "Jab bhi mausam suhana hota hai ya baarish ki boondein girti hain, dil karta hai bas tumhare paas baith kar chai piyoon.",
    mood: "🌧️ Cozy Vibes",
    doodle: "☕",
  },
  {
    pageNo: 23,
    src: "/images/diary23.jpg",
    fallback:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    date: "Page 23 • Teri Parwah",
    title: "Mera Khayal Rakhne Wali",
    handwrittenNote:
      "Jis tarah tum meri choti-choti cheezon ki fikr karti ho aur mujhe samajhti ho, waisa koi aur kabhi nahi kar sakta.",
    mood: "🤗 Caring Soul",
    doodle: "💝",
  },
  {
    pageNo: 24,
    src: "/images/diary24.jpg",
    fallback:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    date: "Page 24 • Eid Aur Tyohaar",
    title: "Meri Asli Eidi",
    handwrittenNote:
      "Har tyohaar ki raunak tabhi hoti hai jab tumhari ek jhalak mil jaye. Tumhara sath hi meri sabse badi khushi hai.",
    mood: "🌙 Festive Glow",
    doodle: "✨",
  },
  {
    pageNo: 25,
    src: "/images/diary25.jpg",
    fallback:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=600&q=80",
    date: "Page 25 • Dil Ki Rani",
    title: "Hamesha Number One",
    handwrittenNote:
      "Meri priorities me tum hamesha sabse upar rahi ho aur hamesha rahogi. Tumhari jagah meri zindagi me koi nahi le sakta.",
    mood: "🥇 My Priority",
    doodle: "👑",
  },
  {
    pageNo: 26,
    src: "/images/diary26.jpg",
    fallback:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
    date: "Page 26 • Shukrana",
    title: "Thank You For Everything",
    handwrittenNote:
      "Meri zindagi me aane ke liye, mujhe samajhne ke liye aur mujhse itna sacha pyaar karne ke liye dil se shukriya meri Jaan.",
    mood: "🙏 Grateful",
    doodle: "🌺",
  },
  {
    pageNo: 27,
    src: "/images/diary27.jpg",
    fallback:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
    date: "Page 27 • Nikah Ka Khwaab",
    title: "Jab Parents Haan Kahenge",
    handwrittenNote:
      "Wo din kitna mubarak hoga jab ghar walon ki duaon ke sath main tumhe hamesha ke liye apni dulhan bana kar le aaunga, InshaAllah!",
    mood: "👰‍♀️ Dream Day",
    doodle: "💍",
  },
  {
    pageNo: 28,
    src: "/images/diary28.jpg",
    fallback:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=600&q=80",
    date: "Page 28 • Aakhri Panna",
    title: "Kahani Kabhi Khatam Nahi Hogi",
    handwrittenNote:
      "Is diary ke 28 panne poore hue, par Saquib aur Neha ki mohabbat ki kitaab zindagi bhar likhi jati rahegi. Happy Birthday Meri Jaan! ❤️",
    mood: "♾️ Saquib ❤️ Neha",
    doodle: "💖",
  },
];

const CATEGORIES = [
  "All Memories",
  "First Dates",
  "Birthdays",
  "Trips & Outings",
  "Sweet Moments",
];

export default function MemoriesPage() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Memories");
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Real Diary States
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [isBookCoverOpened, setIsBookCoverOpened] = useState(false); // Starts as closed leather book cover
  const [diarySpreadIndex, setDiarySpreadIndex] = useState(0); // 14 spreads = 28 exclusive pages
  const [flipDirection, setFlipDirection] = useState("");

  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Subtle Paper Flip Sound Effect using Web Audio API
  const playPageTurnSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const bufferSize = ctx.sampleRate * 0.14;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.35));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = 1100;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (e) {
      // Ignore if blocked
    }
  };

  // Gentle Romantic Chime Synth Fallback if MP3 is missing
  const playSoftRomanticChimes = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const notes = [261.63, 329.63, 392.0, 523.25, 392.0, 329.63];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.6);
        gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.6);
        gain.gain.exponentialRampToValueAtTime(
          0.12,
          ctx.currentTime + i * 0.6 + 0.1,
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + i * 0.6 + 1.2,
        );
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.6);
        osc.stop(ctx.currentTime + i * 0.6 + 1.3);
      });
      setIsMusicPlaying(true);
    } catch (e) {
      console.log("Audio fallback error:", e);
    }
  };

  const toggleMemoryAudio = () => {
    if (isMusicPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if (audioCtxRef.current && audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
      }
      setIsMusicPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => setIsMusicPlaying(true))
          .catch(() => playSoftRomanticChimes());
      } else {
        playSoftRomanticChimes();
      }
    }
  };

  // Filter logic for Outer 10 Photos
  const filteredOuterPhotos =
    activeCategory === "All Memories"
      ? OUTER_HIGHLIGHTS
      : OUTER_HIGHLIGHTS.filter((p) => p.category === activeCategory);

  // Diary Spreads Calculation (28 Exclusive Photos = 14 2-Page Spreads)
  const totalSpreads = Math.ceil(EXCLUSIVE_DIARY_PAGES.length / 2);
  const leftPage = EXCLUSIVE_DIARY_PAGES[diarySpreadIndex * 2];
  const rightPage = EXCLUSIVE_DIARY_PAGES[diarySpreadIndex * 2 + 1];

  const handleNextDiaryPage = () => {
    if (diarySpreadIndex < totalSpreads - 1 && !flipDirection) {
      playPageTurnSound();
      setFlipDirection("next");
      setTimeout(() => {
        setDiarySpreadIndex((prev) => prev + 1);
        setFlipDirection("");
      }, 480);
    }
  };

  const handlePrevDiaryPage = () => {
    if (diarySpreadIndex > 0 && !flipDirection) {
      playPageTurnSound();
      setFlipDirection("prev");
      setTimeout(() => {
        setDiarySpreadIndex((prev) => prev - 1);
        setFlipDirection("");
      }, 480);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 relative overflow-hidden select-none">
      {/* Load Authentic Handwriting Font (Caveat) for Realistic Diary Pen Feel */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&display=swap');

        .font-handwriting {
          font-family: 'Caveat', cursive, sans-serif;
        }

        /* REALISTIC VINTAGE RULED DIARY PAPER */
        .vintage-diary-page-left {
          background-color: #fdf6e3;
          background-image: 
            linear-gradient(90deg, transparent 28px, rgba(225, 29, 72, 0.28) 28px, rgba(225, 29, 72, 0.28) 30px, transparent 30px),
            repeating-linear-gradient(transparent, transparent 27px, rgba(120, 53, 15, 0.14) 27px, rgba(120, 53, 15, 0.14) 28px);
          box-shadow: 
            inset -28px 0 38px -12px rgba(69, 26, 3, 0.38),
            inset 0 0 35px rgba(180, 83, 9, 0.12);
        }

        .vintage-diary-page-right {
          background-color: #fdf6e3;
          background-image: 
            linear-gradient(90deg, transparent 28px, rgba(225, 29, 72, 0.28) 28px, rgba(225, 29, 72, 0.28) 30px, transparent 30px),
            repeating-linear-gradient(transparent, transparent 27px, rgba(120, 53, 15, 0.14) 27px, rgba(120, 53, 15, 0.14) 28px);
          box-shadow: 
            inset 28px 0 38px -12px rgba(69, 26, 3, 0.38),
            inset 0 0 35px rgba(180, 83, 9, 0.12);
        }

        /* 3D PAGE CURL / FLIP ANIMATIONS */
        @keyframes turnLeafRightToLeft {
          0% {
            transform: perspective(1800px) rotateY(0deg);
            filter: brightness(1);
          }
          50% {
            transform: perspective(1800px) rotateY(-85deg) skewY(-3deg) scale(0.96);
            filter: brightness(0.75);
          }
          100% {
            transform: perspective(1800px) rotateY(0deg);
            filter: brightness(1);
          }
        }

        @keyframes turnLeafLeftToRight {
          0% {
            transform: perspective(1800px) rotateY(0deg);
            filter: brightness(1);
          }
          50% {
            transform: perspective(1800px) rotateY(85deg) skewY(3deg) scale(0.96);
            filter: brightness(0.75);
          }
          100% {
            transform: perspective(1800px) rotateY(0deg);
            filter: brightness(1);
          }
        }

        @keyframes bookOpenReveal {
          0% {
            transform: perspective(1600px) rotateY(-35deg) scale(0.85);
            opacity: 0;
          }
          100% {
            transform: perspective(1600px) rotateY(0deg) scale(1);
            opacity: 1;
          }
        }

        .flip-next-anim {
          animation: turnLeafRightToLeft 0.48s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .flip-prev-anim {
          animation: turnLeafLeftToRight 0.48s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .book-open-anim {
          animation: bookOpenReveal 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Stacked Paper Edges on Side of Book */
        .paper-stack-edges {
          background: repeating-linear-gradient(
            90deg,
            #fef3c7 0px,
            #fef3c7 2px,
            #d97706 2px,
            #d97706 3px
          );
        }
      `}</style>

      <audio ref={audioRef} src="/memories-music.mp3" preload="auto" loop />

      {/* Background Decorative Glowing Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* ================= HEADER & AUDIO PLAYER ================= */}
      <div className="text-center space-y-4 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={toggleMemoryAudio}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border shadow-lg ${
              isMusicPlaying
                ? "bg-amber-400/20 border-amber-300 text-amber-200 shadow-amber-500/20"
                : "bg-white/5 border-white/15 text-slate-300 hover:border-pink-400/50 hover:text-pink-200"
            }`}
          >
            {isMusicPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-300 animate-pulse" />
                <span>Playing Memory Melody 🎶</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-pink-400" />
                <span>Play Romantic Background Tune 🎵</span>
              </>
            )}
          </button>
        </div>

        <h2 className="font-romantic text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-pink-300 to-rose-400 drop-shadow">
          Our Polaroid Wall 📸
        </h2>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-[0_0_20px_rgba(244,63,94,0.5)] scale-105"
                  : "bg-slate-900/80 text-slate-300 border border-white/10 hover:border-rose-400/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ================= OUTER 10 POLAROID CARDS ================= */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-9 relative z-10 pt-6">
        {filteredOuterPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo)}
            className={`glass-card pt-6 px-4 pb-5 rounded-3xl border border-white/15 hover:border-rose-400/60 transition-all duration-500 hover:scale-105 hover:-translate-y-2 group flex flex-col justify-between cursor-pointer shadow-2xl bg-slate-900/85 backdrop-blur-xl relative ${photo.rotate} hover:rotate-0`}
          >
            {/* Washi Tape */}
            <div
              className={`w-28 h-6 ${photo.tapeColor} backdrop-blur-md border border-white/25 absolute -top-3 left-1/2 -translate-x-1/2 -rotate-2 shadow-md z-20 flex items-center justify-center`}
            >
              <span className="text-[10px] font-bold tracking-widest text-white/90 uppercase">
                Highlight #{photo.id}
              </span>
            </div>

            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center p-1 border border-white/10">
              <img
                src={photo.src}
                alt={photo.caption}
                onError={(e) => {
                  e.target.src = photo.fallback;
                }}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 rounded-xl"
              />
              <span className="absolute top-3 left-3 bg-slate-950/85 backdrop-blur-md text-cyan-300 text-xs px-3 py-1 rounded-full border border-cyan-400/30 shadow-lg z-10 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-cyan-400" /> {photo.date}
              </span>

              <div className="absolute bottom-3 left-3 bg-amber-200 text-slate-950 px-2.5 py-1 rounded-lg shadow-lg text-[11px] font-extrabold -rotate-3 border border-amber-400 flex items-center gap-1">
                <Pin className="w-3 h-3 text-rose-600 fill-rose-600" />
                {photo.stickyNote}
              </div>

              <div className="absolute bottom-3 right-3 bg-rose-500/85 backdrop-blur-md p-2 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>

            <div className="pt-4 px-2 flex items-start justify-between gap-3">
              <p className="text-sm text-slate-200 italic font-medium leading-relaxed">
                &ldquo;{photo.caption}&rdquo;
              </p>
              <Heart className="w-5 h-5 text-rose-500 fill-rose-500 shrink-0 mt-0.5 group-hover:scale-125 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* ================= VINTAGE DIARY INVITATION CARD ================= */}
      <div className="relative z-10 pt-8">
        <div className="p-6 sm:p-10 rounded-3xl border-2 border-amber-500/50 bg-gradient-to-r from-[#2a0810] via-[#3b0d18] to-[#230903] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative overflow-hidden">
          <div className="space-y-2 max-w-xl relative z-10">
            <h3 className="font-romantic text-3xl sm:text-5xl text-amber-200 drop-shadow">
              Saquib&apos;s Secret Leather Diary For Neha 📖✨
            </h3>
          </div>

          <button
            onClick={() => {
              setDiarySpreadIndex(0);
              setIsBookCoverOpened(false); // Show closed realistic leather cover first
              setIsDiaryModalOpen(true);
            }}
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 font-extrabold text-sm sm:text-base shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer shrink-0 border-2 border-white/60"
          >
            <BookOpen className="w-5 h-5" />
            <span>Unlock Neha&apos;s Vintage Photo Diary 📖</span>
          </button>
        </div>
      </div>

      {/* ============================================================================ */}
      {/* REALISTIC VINTAGE LEATHER PHOTO DIARY MODAL (CLOSED COVER -> OPEN SPREADS) */}
      {/* ============================================================================ */}
      {isDiaryModalOpen && (
        <div
          onClick={() => setIsDiaryModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-xl flex items-center justify-center p-2 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full relative my-auto"
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between mb-3 px-2">
              <div className="flex items-center gap-2 text-amber-200 text-xs sm:text-sm font-bold">
                <Feather className="w-4 h-4 text-amber-400" />
                <span>
                  {!isBookCoverOpened
                    ? "Closed Vintage Leather Diary • Tap Lock To Open"
                    : `Handwritten Diary • Pages ${diarySpreadIndex * 2 + 1} & ${
                        diarySpreadIndex * 2 + 2
                      } of ${EXCLUSIVE_DIARY_PAGES.length}`}
                </span>
              </div>

              <button
                onClick={() => setIsDiaryModalOpen(false)}
                className="inline-flex items-center gap-1.5 bg-rose-700 hover:bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer shadow-lg border border-rose-400/40"
              >
                <X className="w-4 h-4" /> Close Diary
              </button>
            </div>

            {/* STATE 1: CLOSED 3D HARDCOVER LEATHER DIARY WITH GOLDEN CLASP LOCK */}
            {!isBookCoverOpened ? (
              <div className="flex justify-center py-4 book-open-anim">
                <div
                  onClick={() => {
                    playPageTurnSound();
                    setIsBookCoverOpened(true);
                  }}
                  className="w-full max-w-md min-h-[500px] sm:min-h-[540px] rounded-r-3xl rounded-l-lg bg-gradient-to-br from-[#4a0e1c] via-[#310812] to-[#1a0308] p-7 sm:p-10 relative shadow-[25px_30px_60px_rgba(0,0,0,0.95),inset_4px_0_15px_rgba(255,255,255,0.15)] border-y-4 border-r-4 border-amber-500/60 cursor-pointer group flex flex-col justify-between items-center text-center transition-transform duration-500 hover:scale-[1.02]"
                >
                  {/* Realistic Left Leather Book Spine Groove */}
                  <div className="absolute left-0 top-0 bottom-0 w-9 bg-gradient-to-r from-[#160206] via-[#5c1224] to-[#22050c] rounded-l-lg border-r-2 border-amber-600/40 shadow-2xl" />

                  {/* Stacked Cream Paper Pages Edge on Right Side */}
                  <div className="absolute -right-3 top-3 bottom-3 w-3 paper-stack-edges rounded-r-sm shadow-inner" />

                  {/* Brass Corner Protectors */}
                  <div className="w-8 h-8 border-t-4 border-r-4 border-amber-400 absolute top-3 right-3 rounded-tr-lg" />
                  <div className="w-8 h-8 border-b-4 border-r-4 border-amber-400 absolute bottom-3 right-3 rounded-br-lg" />

                  {/* Embossed Gold Inner Frame */}
                  <div className="w-full flex-1 ml-4 border-2 border-dashed border-amber-400/50 rounded-2xl p-6 flex flex-col items-center justify-between bg-[#2b0710]/60 shadow-inner">
                    <div className="space-y-1">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-amber-300/80 font-bold">
                        Personal &amp; Confidential
                      </span>
                      <div className="h-0.5 w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto" />
                    </div>

                    {/* Framed Cover Photo of Neha & Saquib */}
                    <div className="relative my-2">
                      <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-full p-1.5 bg-gradient-to-tr from-amber-600 via-yellow-200 to-amber-500 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                        <img
                          src="/images/diary1.jpg"
                          onError={(e) => {
                            e.target.src =
                              "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?auto=format&fit=crop&w=600&q=80";
                          }}
                          alt="Diary Cover"
                          className="w-full h-full object-cover rounded-full border-2 border-[#310812]"
                        />
                      </div>
                      <div className=" -bottom-2 left-1/2 -translate-x-1/2 absolute bg-amber-400 text-slate-950 text-[10px] font-extrabold px-3 py-0.5 rounded-full shadow">
                        28 UNSEEN PAGES
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-romantic text-4xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow">
                        Neha&apos;s Photo Diary
                      </h3>
                      <p className="font-handwriting text-xl text-rose-200">
                        &ldquo;Har panne par meri Jaan ki tasveer aur mere dil
                        ki baat...&rdquo;
                      </p>
                      <p className="text-xs text-amber-300/75 font-semibold pt-1">
                        Written with love by Saquib ❤️
                      </p>
                    </div>

                    {/* Unlock Brass Clasp Button */}
                    <div className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-extrabold text-xs sm:text-sm shadow-[0_0_25px_rgba(251,191,36,0.6)] group-hover:scale-105 transition">
                      <Lock className="w-4 h-4" />
                      <span>Tap To Unlock &amp; Open Diary ✨</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* STATE 2: OPEN 2-PAGE REALISTIC RULED DIARY SPREAD */
              <div className="book-open-anim">
                {/* Outer Leather Cover Rim & Stacked Paper Edges */}
                <div className="bg-gradient-to-br from-[#3b0a16] via-[#24060d] to-[#170308] p-3 sm:p-6 rounded-[1.75rem] shadow-[0_30px_80px_rgba(0,0,0,0.95)] border-4 border-amber-700/60 relative">
                  {/* Red Satin Bookmark Ribbon Hanging From Top Center */}
                  <div className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 w-5 h-24 bg-gradient-to-b from-rose-700 via-red-600 to-rose-800 z-40 shadow-lg clip-ribbon pointer-events-none">
                    <div className="w-full h-full border-x border-rose-400/30" />
                  </div>

                  {/* Stacked Pages Effect on Left & Right Outer Edges */}
                  <div className="hidden sm:block absolute left-1.5 top-6 bottom-6 w-2.5 paper-stack-edges rounded-l" />
                  <div className="hidden sm:block absolute right-1.5 top-6 bottom-6 w-2.5 paper-stack-edges rounded-r" />

                  {/* TWO OPEN PAGES CONTAINER */}
                  <div
                    className={`grid md:grid-cols-2 relative rounded-xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.85)] sm:mx-2 ${
                      flipDirection === "next"
                        ? "flip-next-anim"
                        : flipDirection === "prev"
                          ? "flip-prev-anim"
                          : ""
                    }`}
                  >
                    {/* Center Deep Book Gutter Crease & Stitching (Desktop) */}
                    <div className="hidden md:flex flex-col justify-between items-center absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-10 bg-gradient-to-r from-transparent via-amber-950/60 to-transparent z-30 pointer-events-none py-8">
                      {[1, 2, 3, 4].map((stitch) => (
                        <div
                          key={stitch}
                          className="w-1 h-6 bg-amber-900/50 rounded-full"
                        />
                      ))}
                    </div>

                    {/* ==================== LEFT DIARY PAGE ==================== */}
                    {leftPage && (
                      <div className="vintage-diary-page-left p-5 sm:p-8 sm:pl-11 md:pr-10 text-slate-900 flex flex-col justify-between relative min-h-[490px] border-b-2 md:border-b-0 md:border-r border-amber-900/30">
                        {/* Top Handwritten Date Header */}
                        <div className="flex items-center justify-between border-b-2 border-amber-900/20 pb-1.5">
                          <span className="font-handwriting text-xl sm:text-2xl font-bold text-rose-900">
                            ✒️ {leftPage.date}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-amber-900/10 border border-amber-900/20 text-[11px] font-bold text-amber-950">
                            {leftPage.mood}
                          </span>
                        </div>

                        {/* Photo Mounted with 4 Vintage Black Photo-Corners */}
                        <div className="my-4 relative mx-auto max-w-[260px] sm:max-w-[280px] w-full">
                          <div
                            onClick={() =>
                              setSelectedPhoto({
                                src: leftPage.src,
                                fallback: leftPage.fallback,
                                date: leftPage.date,
                                stickyNote: leftPage.title,
                                caption: leftPage.title,
                                diaryNote: leftPage.handwrittenNote,
                              })
                            }
                            className="bg-white p-2.5 pb-4 rounded shadow-[0_8px_20px_rgba(69,26,3,0.28)] border border-amber-900/20 -rotate-1 hover:rotate-0 transition-transform cursor-pointer group relative"
                          >
                            {/* 4 Black Album Photo Corners */}
                            <div className="w-5 h-5 border-t-[6px] border-l-[6px] border-slate-900 absolute -top-1 -left-1 z-20 pointer-events-none" />
                            <div className="w-5 h-5 border-t-[6px] border-r-[6px] border-slate-900 absolute -top-1 -right-1 z-20 pointer-events-none" />
                            <div className="w-5 h-5 border-b-[6px] border-l-[6px] border-slate-900 absolute -bottom-1 -left-1 z-20 pointer-events-none" />
                            <div className="w-5 h-5 border-b-[6px] border-r-[6px] border-slate-900 absolute -bottom-1 -right-1 z-20 pointer-events-none" />

                            <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                              <img
                                src={leftPage.src}
                                alt={leftPage.title}
                                onError={(e) => {
                                  e.target.src = leftPage.fallback;
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <p className="font-handwriting text-xl font-bold text-slate-800 mt-1.5 text-center leading-none">
                              {leftPage.title} {leftPage.doodle}
                            </p>
                          </div>
                        </div>

                        {/* Fountain Pen Handwritten Entry on Ruled Lines */}
                        <div className="text-left space-y-1 relative pl-1">
                          <p className="font-handwriting text-2xl sm:text-[26px] leading-[29px] text-[#1e293b] font-semibold">
                            &ldquo;{leftPage.handwrittenNote}&rdquo;
                          </p>
                          <div className="flex items-center justify-between pt-2 text-xs font-bold text-amber-900/70">
                            <span className="font-handwriting text-lg text-rose-800">
                              — Forever Yours, Saquib ❤️
                            </span>
                            <span>Page {leftPage.pageNo}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ==================== RIGHT DIARY PAGE ==================== */}
                    {rightPage && (
                      <div className="vintage-diary-page-right p-5 sm:p-8 sm:pl-12 md:pr-8 text-slate-900 flex flex-col justify-between relative min-h-[490px]">
                        {/* Top Handwritten Date Header */}
                        <div className="flex items-center justify-between border-b-2 border-amber-900/20 pb-1.5">
                          <span className="font-handwriting text-xl sm:text-2xl font-bold text-rose-900">
                            ✒️ {rightPage.date}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-rose-900/10 border border-rose-900/20 text-[11px] font-bold text-rose-950">
                            {rightPage.mood}
                          </span>
                        </div>

                        {/* Photo Mounted with 4 Vintage Black Photo-Corners */}
                        <div className="my-4 relative mx-auto max-w-[260px] sm:max-w-[280px] w-full">
                          <div
                            onClick={() =>
                              setSelectedPhoto({
                                src: rightPage.src,
                                fallback: rightPage.fallback,
                                date: rightPage.date,
                                stickyNote: rightPage.title,
                                caption: rightPage.title,
                                diaryNote: rightPage.handwrittenNote,
                              })
                            }
                            className="bg-white p-2.5 pb-4 rounded shadow-[0_8px_20px_rgba(69,26,3,0.28)] border border-amber-900/20 rotate-1 hover:rotate-0 transition-transform cursor-pointer group relative"
                          >
                            {/* 4 Black Album Photo Corners */}
                            <div className="w-5 h-5 border-t-[6px] border-l-[6px] border-slate-900 absolute -top-1 -left-1 z-20 pointer-events-none" />
                            <div className="w-5 h-5 border-t-[6px] border-r-[6px] border-slate-900 absolute -top-1 -right-1 z-20 pointer-events-none" />
                            <div className="w-5 h-5 border-b-[6px] border-l-[6px] border-slate-900 absolute -bottom-1 -left-1 z-20 pointer-events-none" />
                            <div className="w-5 h-5 border-b-[6px] border-r-[6px] border-slate-900 absolute -bottom-1 -right-1 z-20 pointer-events-none" />

                            <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                              <img
                                src={rightPage.src}
                                alt={rightPage.title}
                                onError={(e) => {
                                  e.target.src = rightPage.fallback;
                                }}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>
                            <p className="font-handwriting text-xl font-bold text-slate-800 mt-1.5 text-center leading-none">
                              {rightPage.title} {rightPage.doodle}
                            </p>
                          </div>
                        </div>

                        {/* Fountain Pen Handwritten Entry on Ruled Lines */}
                        <div className="text-left space-y-1 relative pl-1">
                          <p className="font-handwriting text-2xl sm:text-[26px] leading-[29px] text-[#1e293b] font-semibold">
                            &ldquo;{rightPage.handwrittenNote}&rdquo;
                          </p>
                          <div className="flex items-center justify-between pt-2 text-xs font-bold text-amber-900/70">
                            <span className="font-handwriting text-lg text-rose-800">
                              — With All My Love, Saquib ✨
                            </span>
                            <span>Page {rightPage.pageNo}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BOTTOM DIARY NAVIGATION CONTROLS */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-4 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsBookCoverOpened(false)}
                        className="px-3 py-2 rounded-xl bg-amber-950/80 text-amber-300 border border-amber-500/30 text-xs font-bold hover:bg-amber-900 cursor-pointer transition"
                      >
                        📕 Cover
                      </button>

                      <button
                        onClick={handlePrevDiaryPage}
                        disabled={diarySpreadIndex === 0}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-amber-200 border border-amber-400/40 text-xs sm:text-sm font-bold hover:bg-slate-800 disabled:opacity-40 cursor-pointer transition"
                      >
                        <ChevronLeft className="w-4 h-4" /> Pichla Panna
                      </button>
                    </div>

                    {/* Page Spread Dots */}
                    <div className="hidden lg:flex items-center gap-1.5">
                      {Array.from({ length: totalSpreads }).map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            playPageTurnSound();
                            setDiarySpreadIndex(idx);
                          }}
                          className={`h-2 rounded-full transition-all cursor-pointer ${
                            diarySpreadIndex === idx
                              ? "w-6 bg-amber-400"
                              : "w-2 bg-amber-200/30 hover:bg-amber-200/60"
                          }`}
                          title={`Pages ${idx * 2 + 1} - ${idx * 2 + 2}`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={handleNextDiaryPage}
                      disabled={diarySpreadIndex === totalSpreads - 1}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 text-slate-950 text-xs sm:text-sm font-extrabold hover:opacity-95 disabled:opacity-40 cursor-pointer transition shadow-lg"
                    >
                      Agla Panna <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= FULLSCREEN PHOTO ZOOM LIGHTBOX ================= */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="glass-card max-w-2xl w-full p-6 sm:p-8 rounded-3xl border border-rose-500/50 relative space-y-5 text-center shadow-[0_0_50px_rgba(244,63,94,0.3)] bg-slate-950/95"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-rose-500/80 text-white p-2.5 rounded-full transition-all duration-300 cursor-pointer z-20 shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[60vh] rounded-2xl overflow-hidden bg-black/80 flex items-center justify-center border border-white/10 shadow-2xl">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.caption}
                onError={(e) => {
                  e.target.src = selectedPhoto.fallback;
                }}
                className="max-h-[58vh] w-auto object-contain rounded-xl"
              />
            </div>

            <div className="space-y-2 pt-1">
              <span className="inline-block text-xs font-bold text-cyan-300 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                ✨ {selectedPhoto.date} • {selectedPhoto.stickyNote} ✨
              </span>
              <p className="font-romantic text-2xl sm:text-4xl text-rose-300 drop-shadow">
                &ldquo;{selectedPhoto.caption}&rdquo;
              </p>
              {selectedPhoto.diaryNote && (
                <p className="font-handwriting text-2xl text-amber-200 max-w-lg mx-auto">
                  {selectedPhoto.diaryNote}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
