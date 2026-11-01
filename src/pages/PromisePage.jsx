import React, { useState } from "react";
import {
  Heart,
  Sparkles,
  ShieldCheck,
  Stars,
  Download,
  Eye,
  X,
  Send,
  Fingerprint,
  CheckCircle2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { jsPDF } from "jspdf";

const SAQUIB_WHATSAPP_NUMBER = "918541078902";

export default function PromisePage() {
  const [promiseSigned, setPromiseSigned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [signedTime, setSignedTime] = useState("");

  // Step 1: Interactive Heart-Thumbprint Scan & Certificate Reveal
  const handleAcceptAndPreview = () => {
    if (isScanning) return;
    setIsScanning(true);

    setTimeout(() => {
      const nowStr = new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      setSignedTime(nowStr);
      setIsScanning(false);
      setPromiseSigned(true);
      setShowPreviewModal(true);

      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.6 },
        colors: ["#f43f5e", "#22d3ee", "#facc15", "#ffffff"],
      });
    }, 1100);
  };

  // Notify Saquib on WhatsApp that Neha signed the Marriage Promise Bond
  const notifySaquibOnWhatsApp = () => {
    const msg = `💍 *Official Promise Bond Signed!* ❤️\n\nHi Saquib, maine humara *"Forever Marriage Promise Bond"* accept aur sign kar diya hai! InshaAllah hum hamesha saath rahenge. 💖✨`;
    window.open(
      `https://wa.me/${SAQUIB_WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
    );
  };

  // Step 2: Generate clean, glitch-free PDF when she clicks Download
  const generatePromiseBondPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // Deep Romantic Dark Background
    doc.setFillColor(12, 14, 24);
    doc.rect(0, 0, 210, 297, "F");

    // Outer Rose Pink Border
    doc.setDrawColor(244, 63, 94);
    doc.setLineWidth(1.5);
    doc.rect(12, 12, 186, 273);

    // Inner Neon Cyan Border
    doc.setDrawColor(34, 211, 238);
    doc.setLineWidth(0.6);
    doc.rect(16, 16, 178, 265);

    // Header Badge
    doc.setTextColor(34, 211, 238);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setCharSpace(0);
    doc.text("OFFICIAL ETERNAL LOVE & MARRIAGE PROMISE BOND", 105, 34, {
      align: "center",
    });

    // Main Title
    doc.setTextColor(244, 63, 94);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(28);
    doc.text("Forever Promise Certificate", 105, 49, { align: "center" });

    // Subtitle
    doc.setTextColor(226, 232, 240);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11.5);
    doc.text(
      "Officially sealed between two souls destined for forever",
      105,
      60,
      { align: "center" },
    );

    // Couple Names Header
    doc.setTextColor(253, 224, 71);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(26);
    doc.text("Neha Praveen   &   Md Saquib Alam", 105, 77, { align: "center" });

    // Key Dates Pill
    doc.setTextColor(148, 163, 184);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(
      "Her Birthday: 05 September 2002   |   In Love Since: 28 July 2019",
      105,
      89,
      { align: "center" },
    );

    // Divider Line
    doc.setDrawColor(244, 63, 94);
    doc.setLineWidth(0.5);
    doc.line(35, 96, 175, 96);

    // Sacred Vows Text
    doc.setTextColor(241, 245, 249);
    doc.setFont("times", "italic");
    doc.setFontSize(13);
    const vowsText = [
      "I, Md Saquib Alam, solemnly promise to my beloved Neha Praveen that:",
      "",
      "1. Since 28 July 2019, you have been my sweetest girlfriend, my peace,",
      "   my best friend, and the only girl my heart beats for.",
      "",
      "2. Even before our official wedding day arrives, in my heart, my loyalty,",
      "   and my prayers, I already hold and cherish you as my future wife.",
      "",
      "3. I promise to wait patiently, work hard, and win your parents'",
      "   hearts and blessings with complete respect so they happily place",
      "   your hand into mine.",
      "",
      '4. InshaAllah, the day your parents say "Yes", I will make you my forever',
      "   bride in front of the whole world and love you endlessly for life.",
    ];
    doc.text(vowsText, 26, 112, { lineHeightFactor: 1.45 });

    // Highlight Status Box
    doc.setFillColor(30, 20, 38);
    doc.setDrawColor(244, 63, 94);
    doc.setLineWidth(0.7);
    doc.roundedRect(25, 206, 160, 28, 4, 4, "FD");

    doc.setTextColor(251, 113, 133);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setCharSpace(0);
    doc.text(
      "BOND STATUS: LOCKED FOR LIFE & HEREAFTER (INSHAALLAH)",
      105,
      217,
      { align: "center" },
    );

    doc.setTextColor(226, 232, 240);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setCharSpace(0);
    doc.text(
      "Saquib & Neha   |   Zero Expiry Date   |   Unbreakable Loyalty",
      105,
      227,
      { align: "center" },
    );

    // Dual Signatures Section
    doc.setDrawColor(148, 163, 184);
    doc.setLineWidth(0.5);
    doc.line(26, 262, 90, 262);
    doc.line(120, 262, 184, 262);

    doc.setTextColor(34, 211, 238);
    doc.setFont("times", "bolditalic");
    doc.setFontSize(15);
    doc.text("Neha Praveen", 58, 257, { align: "center" });
    doc.text("Md Saquib Alam", 152, 257, { align: "center" });

    doc.setTextColor(148, 163, 184);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Accepted By (My Future Wife)", 58, 269, { align: "center" });
    doc.text("Signed By (Yours Forever, Saquib)", 152, 269, {
      align: "center",
    });

    doc.save("Saquib_And_Neha_Promise_Bond.pdf");
  };

  const vows = [
    {
      title: "Winning Hearts With Patience & Respect",
      desc: "I promise to wait patiently, work hard, and earn your parents’ trust and blessings with full respect so they happily hand your hand into mine.",
    },
    {
      title: "From 28 July 2019 to Our Wedding Day",
      desc: "We started as boyfriend and girlfriend on 28 July 2019, and no matter how many tests or waits come our way, I am only ever marrying you.",
    },
    {
      title: "Already My Wife in My Heart",
      desc: "Even before our official day arrives, my loyalty, my prayers, and my entire future already belong solely to you, Neha.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10 select-none">
      <style>{`
        @keyframes stampPop {
          0% { transform: scale(2.4) rotate(-25deg); opacity: 0; }
          70% { transform: scale(0.9) rotate(-10deg); opacity: 1; }
          100% { transform: scale(1) rotate(-12deg); opacity: 1; }
        }
        .animate-stamp {
          animation: stampPop 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs uppercase tracking-widest">
          <Stars className="w-4 h-4" />
          <span>Md Saquib Alam ❤️ Neha Praveen • InshaAllah</span>
        </div>
        <h2 className="font-romantic text-4xl sm:text-6xl text-rose-400">
          From My Girlfriend to My Future Wife
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
          Loving you since 28 July 2019 has been the greatest gift of my life.
          My biggest dream now is the day your parents smile, give us their
          blessings, and you officially become mine forever.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left: Clean Picture Space */}
        <div className="glass-card p-4 rounded-3xl border border-rose-500/30 neon-pink-glow">
          <div className="relative aspect-[4/4] rounded-2xl overflow-hidden bg-slate-900">
            <img
              src="/images/future-wedding.jpg"
              alt="Our Future Together"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";
              }}
              className="w-full h-full object-cover hover:scale-105 transition duration-700"
            />
            <span className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-400/30">
              Saquib &amp; Neha • InshaAllah
            </span>
          </div>
          <p className="text-center font-romantic text-2xl text-cyan-300 mt-3">
            Waiting for the day I can call you my Wife in front of the whole
            world ❤️
          </p>
        </div>

        {/* Right: Vows & Interactive Thumbprint Sign */}
        <div className="space-y-4">
          {vows.map((v, i) => (
            <div
              key={i}
              className="glass-card p-5 rounded-2xl border border-white/10 hover:border-rose-400/40 transition space-y-1"
            >
              <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                {v.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{v.desc}</p>
            </div>
          ))}

          <div className="glass-card p-6 rounded-2xl border border-cyan-400/40 text-center space-y-4 relative overflow-hidden">
            <p className="font-romantic text-2xl text-white">
              &ldquo;No matter how long it takes to convince everyone, my heart
              is locked on you, Neha Praveen. — Yours forever, Saquib&rdquo;
            </p>

            {!promiseSigned ? (
              <div className="space-y-3 pt-1">
                <button
                  onClick={handleAcceptAndPreview}
                  disabled={isScanning}
                  className="px-7 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 text-white font-bold text-sm inline-flex items-center gap-2.5 shadow-lg shadow-rose-500/30 hover:scale-105 transition cursor-pointer"
                >
                  <Fingerprint
                    className={`w-5 h-5 ${
                      isScanning ? "animate-ping text-amber-200" : ""
                    }`}
                  />
                  <span>
                    {isScanning
                      ? "Scanning Neha's Heart Signature..."
                      : "Tap to Co-Sign & View Promise Bond 💍"}
                  </span>
                </button>
                <p className="text-[11px] text-slate-400">
                  Tap above to place your digital signature on our Forever Bond
                </p>
              </div>
            ) : (
              <div className="space-y-3 animate-fadeIn">
                <div className="text-emerald-300 text-sm font-semibold flex items-center justify-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>Promise Bond Signed &amp; Sealed! ({signedTime})</span>
                </div>
                <div className="flex flex-wrap justify-center gap-2.5">
                  <button
                    onClick={() => setShowPreviewModal(true)}
                    className="px-4 py-2.5 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-rose-500/30 transition cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    View Certificate
                  </button>
                  <button
                    onClick={generatePromiseBondPDF}
                    className="px-4 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-lg hover:scale-105 transition cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button
                    onClick={notifySaquibOnWhatsApp}
                    className="px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-lg hover:scale-105 transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Notify Saquib 💬
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* On-Screen Certificate Preview Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative max-w-2xl w-full bg-[#0c0e18] border-2 border-rose-500 rounded-3xl p-1 shadow-2xl my-8 animate-fadeIn">
            <div className="border border-cyan-400/60 rounded-[20px] p-6 sm:p-8 space-y-6 text-center relative overflow-hidden">
              {/* Close Button */}
              <button
                onClick={() => setShowPreviewModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-white/10 p-1.5 rounded-full cursor-pointer z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Official Golden Royal Stamp Badge */}
              <div className="animate-stamp hidden sm:flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-dashed border-amber-400/80 bg-amber-400/10 text-amber-300 absolute top-6 left-6 pointer-events-none shadow-lg">
                <CheckCircle2 className="w-6 h-6 text-amber-300 mb-0.5" />
                <span className="text-[9px] font-extrabold uppercase tracking-tighter">
                  OFFICIALLY SEALED
                </span>
                <span className="text-[8px] text-rose-300 font-bold">
                  INSHAALLAH ❤️
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-bold tracking-widest text-cyan-400 uppercase">
                  OFFICIAL ETERNAL LOVE &amp; MARRIAGE PROMISE BOND
                </p>
                <h3 className="font-romantic text-4xl sm:text-5xl text-rose-400">
                  Forever Promise Certificate
                </h3>
                <p className="text-xs text-slate-300">
                  Officially sealed between two souls destined for forever
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-romantic text-3xl sm:text-4xl text-amber-300">
                  Neha Praveen &nbsp;&amp;&nbsp; Md Saquib Alam
                </h4>
                <p className="text-xs text-slate-400 font-semibold">
                  Her Birthday: 05 September 2002 &nbsp;|&nbsp; In Love Since:
                  28 July 2019
                </p>
              </div>

              <div className="border-t border-rose-500/30 pt-4 text-left space-y-2.5 text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                <p className="font-semibold text-rose-300 not-italic">
                  I, Md Saquib Alam, solemnly promise to my beloved Neha Praveen
                  that:
                </p>
                <p>
                  1. Since 28 July 2019, you have been my sweetest girlfriend,
                  my peace, my best friend, and the only girl my heart beats
                  for.
                </p>
                <p>
                  2. Even before our official wedding day arrives, in my heart,
                  my loyalty, and my prayers, I already hold and cherish you as
                  my future wife.
                </p>
                <p>
                  3. I promise to wait patiently, work hard, and win your
                  parents&apos; hearts and blessings with complete respect so
                  they happily place your hand into mine.
                </p>
                <p>
                  4. InshaAllah, the day your parents say &ldquo;Yes&rdquo;, I
                  will make you my forever bride in front of the whole world and
                  love you endlessly for life.
                </p>
              </div>

              {/* Status Box */}
              <div className="bg-[#1e1426] border border-rose-500 rounded-2xl p-4 space-y-1">
                <p className="text-xs sm:text-sm font-bold text-rose-400">
                  BOND STATUS: LOCKED FOR LIFE &amp; HEREAFTER (INSHAALLAH)
                </p>
                <p className="text-xs text-slate-200">
                  Saquib &amp; Neha &nbsp;|&nbsp; Zero Expiry Date &nbsp;|&nbsp;
                  Unbreakable Loyalty
                </p>
              </div>

              {/* Signatures Row */}
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-1">
                  <p className="font-romantic text-2xl text-cyan-400 border-b border-slate-600 pb-1">
                    Neha Praveen ✓
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Digitally Signed By (My Future Wife)
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="font-romantic text-2xl text-cyan-400 border-b border-slate-600 pb-1">
                    Md Saquib Alam ✓
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Signed By (Yours Forever, Saquib)
                  </p>
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 flex flex-wrap justify-center gap-3 border-t border-white/10">
                <button
                  onClick={generatePromiseBondPDF}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-rose-500/30 hover:scale-105 transition cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Promise Bond PDF 💍
                </button>
                <button
                  onClick={notifySaquibOnWhatsApp}
                  className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg hover:scale-105 transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send Acceptance to Saquib 💬
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-semibold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
