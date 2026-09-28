import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Organ } from "@/data/organsData";
import { soundEffects } from "@/utils/soundEffects";
import { 
  Volume2, 
  VolumeX, 
  ChevronRight,
  Brain,
  Heart,
  Utensils,
  Activity,
  Smile,
  Eye,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useTTS } from "@/hooks/useTTS";

interface BodySilhouetteProps {
  organs: Organ[];
  onOrganClick: (organ: Organ) => void;
}

type CharacterGender = "boy" | "girl";
type ViewLayer = "external" | "xray"; // বাহ্যিক শরীর বনাম ভেতরের অঙ্গ
type BodyZone = "all" | "head" | "chest" | "abdomen" | "limbs";

interface ZoneConfig {
  id: BodyZone;
  label: string;
  icon: any;
  organIds: string[];
}

const zones: ZoneConfig[] = [
  {
    id: "all",
    label: "পুরো শরীর 🌟",
    icon: Smile,
    organIds: [
      "brain", "eyes", "ears", "nose", "teeth", "tongue",
      "heart", "lungs", "stomach", "liver", "intestines", "kidneys",
      "bones", "muscles", "skin", "blood"
    ],
  },
  {
    id: "head",
    label: "মাথা ও মুখ 🧠",
    icon: Brain,
    organIds: ["brain", "eyes", "ears", "nose", "teeth", "tongue"],
  },
  {
    id: "chest",
    label: "বুক ও ফুসফুস 🫀",
    icon: Heart,
    organIds: ["heart", "lungs", "blood"],
  },
  {
    id: "abdomen",
    label: "পেট ও পরিপাক 🍎",
    icon: Utensils,
    organIds: ["stomach", "liver", "intestines", "kidneys"],
  },
  {
    id: "limbs",
    label: "হাত-পা ও সুরক্ষা 🏃",
    icon: Activity,
    organIds: ["bones", "muscles", "skin"],
  },
];

// পজিশনিং ও ভিজ্যুয়াল স্টাইল
const hotspotPositions: Record<string, { top: string; left: string; color: string; label: string }> = {
  brain: { top: "12%", left: "50%", color: "#9333EA", label: "মস্তিষ্ক" },
  eyes: { top: "20%", left: "44%", color: "#0284C7", label: "চোখ" },
  ears: { top: "20%", left: "56%", color: "#6366F1", label: "কান" },
  nose: { top: "24%", left: "50%", color: "#F59E0B", label: "নাক" },
  teeth: { top: "28%", left: "50%", color: "#14B8A6", label: "দাঁত" },
  tongue: { top: "31%", left: "50%", color: "#EC4899", label: "জিহ্বা" },
  lungs: { top: "42%", left: "43%", color: "#06B6D4", label: "ফুসফুস" },
  heart: { top: "45%", left: "53%", color: "#EF4444", label: "হৃৎপিণ্ড" },
  liver: { top: "52%", left: "44%", color: "#D97706", label: "যকৃত" },
  stomach: { top: "55%", left: "54%", color: "#EAB308", label: "পাকস্থলী" },
  kidneys: { top: "61%", left: "45%", color: "#8B5CF6", label: "বৃক্ক" },
  intestines: { top: "66%", left: "50%", color: "#F97316", label: "অন্ত্র" },
  bones: { top: "78%", left: "42%", color: "#64748B", label: "হাড়" },
  muscles: { top: "78%", left: "58%", color: "#E11D48", label: "পেশি" },
  skin: { top: "88%", left: "44%", color: "#10B981", label: "ত্বক" },
  blood: { top: "88%", left: "56%", color: "#DC2626", label: "রক্ত" },
};

export const BodySilhouette = ({ organs, onOrganClick }: BodySilhouetteProps) => {
  const [gender, setGender] = useState<CharacterGender>("boy");
  const [layer, setLayer] = useState<ViewLayer>("xray");
  const [selectedZone, setSelectedZone] = useState<BodyZone>("all");
  const [activeOrganId, setActiveOrganId] = useState<string>("heart");
  const { speak, stop, isSpeaking } = useTTS();

  const currentZone = zones.find((z) => z.id === selectedZone) || zones[0];
  const activeOrgan = organs.find((o) => o.id === activeOrganId) || organs[0];

  const handleSelectOrgan = (organId: string) => {
    soundEffects.playPop();
    setActiveOrganId(organId);
  };

  const handleSpeak = (organ: Organ) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(`${organ.name}। ${organ.simpleFunction}`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center px-2 sm:px-4">
      {/* ১. টপ কন্ট্রোল বার: ক্যারেক্টার সুইচ ও মোড চয়েস */}
      <div className="w-full flex flex-wrap items-center justify-between gap-3 mb-4 rounded-3xl bg-white/80 p-3 shadow-xs border border-slate-200/80 dark:bg-slate-900/80 dark:border-slate-800">
        {/* ছেলে / মেয়ে সুইচ */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setGender("boy")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bangla text-xs font-black transition-all ${
              gender === "boy" ? "bg-sky-500 text-white shadow-xs scale-102" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>👦 রাহুল</span>
          </button>
          <button
            type="button"
            onClick={() => setGender("girl")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bangla text-xs font-black transition-all ${
              gender === "girl" ? "bg-pink-500 text-white shadow-xs scale-102" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>👧 তিশা</span>
          </button>
        </div>

        {/* এক্স-রে ভিশন বনাম বাহ্যিক শরীর টগল */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-amber-500/10 p-1 border border-amber-500/20">
          <button
            type="button"
            onClick={() => setLayer("xray")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bangla text-xs font-black transition-all ${
              layer === "xray" ? "bg-amber-500 text-white shadow-xs" : "text-amber-800 dark:text-amber-300"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>এক্স-রে ভিশন (ভেতরের অঙ্গ)</span>
          </button>
          <button
            type="button"
            onClick={() => setLayer("external")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bangla text-xs font-black transition-all ${
              layer === "external" ? "bg-amber-500 text-white shadow-xs" : "text-amber-800 dark:text-amber-300"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>বাহ্যিক রূপ</span>
          </button>
        </div>
      </div>

      {/* ২. হরিজন্টাল জোন ফিল্টার (মোবাইলে স্ক্রলযোগ্য ও বড় বাটন) */}
      <div className="w-full flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
        {zones.map((zone) => {
          const isSelected = selectedZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => {
                soundEffects.playPop();
                setSelectedZone(zone.id);
                if (!zone.organIds.includes(activeOrganId)) {
                  setActiveOrganId(zone.organIds[0]);
                }
              }}
              className={`shrink-0 px-4 py-2 rounded-2xl font-bangla text-xs sm:text-sm font-black transition-all ${
                isSelected
                  ? "bg-emerald-600 text-white shadow-md scale-105"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800"
              }`}
            >
              {zone.label}
            </button>
          );
        })}
      </div>

      {/* ৩. মেইন কনটেন্ট এরিয়া (ডেস্কটপে ২-কলাম, মোবাইলে স্ট্যাকড) */}
      <div className="w-full grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-6 items-center">
        {/* ক্যারেক্টার ও ইন্টারঅ্যাক্টিভ অঙ্গ ভিউয়ার */}
        <div className="relative mx-auto flex h-[480px] sm:h-[540px] w-full max-w-sm items-center justify-center rounded-3xl border-2 border-emerald-400/30 bg-gradient-to-b from-sky-100/70 via-emerald-50/50 to-amber-50/60 p-4 shadow-sm dark:from-sky-950/20 dark:to-emerald-950/20">
          {/* সুন্দর প্রাকৃতিক কার্টুন ব্যাকগ্রাউন্ড এলিমেন্ট */}
          <div className="absolute top-4 left-6 text-xl">☁️</div>
          <div className="absolute top-8 right-6 text-xl">✨</div>
          <div className="absolute bottom-2 inset-x-0 h-10 rounded-b-3xl bg-emerald-500/10 border-t border-emerald-500/20" />

          {/* জীবন্ত চাইল্ড ইলাস্ট্রেশন (SVG) */}
          <svg viewBox="0 0 280 500" className="h-full w-auto drop-shadow-md select-none" role="img">
            {/* চরিত্র শরীর ও অঙ্গপ্রত্যঙ্গ */}
            {gender === "boy" ? (
              // ছেলে চরিত্র
              <g>
                {/* পা */}
                <rect x="105" y="340" width="26" height="110" rx="13" fill="#FED7AA" />
                <rect x="149" y="340" width="26" height="110" rx="13" fill="#FED7AA" />
                {/* জুতো */}
                <ellipse cx="114" cy="455" rx="18" ry="10" fill="#3B82F6" />
                <ellipse cx="166" cy="455" rx="18" ry="10" fill="#3B82F6" />

                {/* শর্টস */}
                <path d="M96 280 L184 280 L188 350 L145 350 L140 315 L135 350 L92 350 Z" fill="#2563EB" />

                {/* হাত */}
                <path d="M80 180 Q60 250 55 310" stroke="#FED7AA" strokeWidth="22" strokeLinecap="round" fill="none" />
                <path d="M200 180 Q220 250 225 310" stroke="#FED7AA" strokeWidth="22" strokeLinecap="round" fill="none" />

                {/* টি-শার্ট ও বডি */}
                <path d="M85 160 Q140 145 195 160 L186 285 L94 285 Z" fill="#0284C7" />
                <rect x="94" y="210" width="92" height="16" fill="#FFFFFF" opacity="0.9" />

                {/* এক্স-রে ভিশন গ্লো উইন্ডো (ভেতরের শরীর মোডে) */}
                {layer === "xray" && (
                  <rect x="100" y="165" width="80" height="115" rx="20" fill="#0F172A" opacity="0.75" />
                )}

                {/* ঘাড় ও মুখ */}
                <rect x="126" y="125" width="28" height="28" rx="6" fill="#FDBA74" />
                <circle cx="140" cy="95" r="48" fill="#FED7AA" />

                {/* চুল */}
                <path d="M92 85 Q140 45 188 85 Q180 50 140 50 Q100 50 92 85 Z" fill="#475569" />

                {/* চোখ, ভ্রু ও হাসি */}
                <circle cx="122" cy="94" r="5" fill="#1E293B" />
                <circle cx="124" cy="92" r="1.5" fill="#FFFFFF" />
                <circle cx="158" cy="94" r="5" fill="#1E293B" />
                <circle cx="160" cy="92" r="1.5" fill="#FFFFFF" />
                <circle cx="112" cy="104" r="7" fill="#F87171" opacity="0.4" />
                <circle cx="168" cy="104" r="7" fill="#F87171" opacity="0.4" />
                <path d="M130 110 Q140 120 150 110" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              // মেয়ে চরিত্র
              <g>
                <rect x="105" y="340" width="26" height="110" rx="13" fill="#FED7AA" />
                <rect x="149" y="340" width="26" height="110" rx="13" fill="#FED7AA" />
                <ellipse cx="114" cy="455" rx="18" ry="10" fill="#EC4899" />
                <ellipse cx="166" cy="455" rx="18" ry="10" fill="#EC4899" />

                <path d="M80 180 Q60 250 55 310" stroke="#FED7AA" strokeWidth="22" strokeLinecap="round" fill="none" />
                <path d="M200 180 Q220 250 225 310" stroke="#FED7AA" strokeWidth="22" strokeLinecap="round" fill="none" />

                {/* সুন্দর ফ্রক/পোশাক */}
                <path d="M88 160 Q140 145 192 160 L210 295 L70 295 Z" fill="#F43F5E" />
                <circle cx="140" cy="225" r="18" fill="#FFE4E6" opacity="0.6" />

                {layer === "xray" && (
                  <rect x="100" y="165" width="80" height="115" rx="20" fill="#0F172A" opacity="0.75" />
                )}

                <rect x="126" y="125" width="28" height="28" rx="6" fill="#FDBA74" />
                <circle cx="140" cy="95" r="48" fill="#FED7AA" />

                {/* মেয়েদের চুল ও দুই ঝুঁটি */}
                <path d="M92 85 Q140 40 188 85 Q175 45 140 45 Q105 45 92 85 Z" fill="#78350F" />
                <circle cx="85" cy="85" r="14" fill="#78350F" />
                <circle cx="195" cy="85" r="14" fill="#78350F" />
                <circle cx="85" cy="92" r="5" fill="#F43F5E" />
                <circle cx="195" cy="92" r="5" fill="#F43F5E" />

                <circle cx="122" cy="94" r="5.5" fill="#1E293B" />
                <circle cx="124" cy="92" r="2" fill="#FFFFFF" />
                <circle cx="158" cy="94" r="5.5" fill="#1E293B" />
                <circle cx="160" cy="92" r="2" fill="#FFFFFF" />
                <circle cx="112" cy="104" r="7" fill="#FB7185" opacity="0.5" />
                <circle cx="168" cy="104" r="7" fill="#FB7185" opacity="0.5" />
                <path d="M130 110 Q140 120 150 110" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
            )}
          </svg>

          {/* শরীরের ওপর ইন্টারঅ্যাক্টিভ বাবল হটস্পট (বড় টাচ টার্গেট) */}
          <div className="absolute inset-0 pointer-events-none">
            {currentZone.organIds.map((organId) => {
              const pos = hotspotPositions[organId];
              if (!pos) return null;
              const isSelected = activeOrganId === organId;

              return (
                <button
                  key={organId}
                  type="button"
                  onClick={() => handleSelectOrgan(organId)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bangla font-black shadow-md transition-all duration-300 ${
                    isSelected
                      ? "scale-120 z-20 text-white ring-4 ring-white"
                      : "scale-100 z-10 bg-white/95 text-slate-800 hover:scale-110 hover:z-20 border border-slate-200"
                  }`}
                  style={{
                    backgroundColor: isSelected ? pos.color : "rgba(255, 255, 255, 0.95)",
                    boxShadow: isSelected ? `0 6px 16px ${pos.color}60` : undefined,
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full animate-ping"
                    style={{ backgroundColor: isSelected ? "#FFFFFF" : pos.color }}
                  />
                  <span>{pos.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ডানদিকের ফান ডিসকভারি কার্ড (অঙ্গটির বিবরণ ও ভয়েস) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeOrgan.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.2 }}
            className="rounded-3xl border-2 border-emerald-500/25 bg-white p-6 shadow-md dark:border-slate-800 dark:bg-slate-900"
          >
            {/* কার্ড হেডার */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md"
                  style={{ backgroundColor: hotspotPositions[activeOrgan.id]?.color || "#059669" }}
                >
                  <activeOrgan.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="font-bangla text-2xl font-black text-slate-800 dark:text-slate-100">
                    {activeOrgan.name}
                  </h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {activeOrgan.englishName}
                  </span>
                </div>
              </div>

              {/* অডিও প্রোনাউন্সিয়শন বাটন */}
              <button
                type="button"
                onClick={() => handleSpeak(activeOrgan)}
                className={`flex h-11 w-11 items-center justify-center rounded-2xl transition-all ${
                  isSpeaking
                    ? "bg-emerald-600 text-white animate-pulse"
                    : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-300"
                }`}
                title="উচ্চারণ ও কাজ শুনো"
              >
                {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </button>
            </div>

            {/* অঙ্গটির মূল কাজ */}
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/60">
              <span className="font-bangla text-xs font-black uppercase text-emerald-700 dark:text-emerald-400">
                প্রধান জাদুকরী কাজ:
              </span>
              <p className="mt-1 font-bangla text-base font-semibold leading-relaxed text-slate-700 dark:text-slate-200">
                {activeOrgan.simpleFunction}
              </p>
            </div>

            {/* মজার তথ্য */}
            <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-300/80 bg-amber-50/70 p-4 dark:border-amber-800/40 dark:bg-amber-950/20">
              <Sparkles className="h-5 w-5 shrink-0 text-amber-500 mt-0.5" />
              <div>
                <span className="font-bangla text-xs font-black uppercase text-amber-800 dark:text-amber-300">
                  বিস্ময়কর তথ্য:
                </span>
                <p className="mt-0.5 font-bangla text-xs sm:text-sm font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                  {activeOrgan.funFact}
                </p>
              </div>
            </div>

            {/* সম্পূর্ণ বিস্তারিত পপআপ ওপেন করার বাটন */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playChime();
                onOrganClick(activeOrgan);
              }}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 py-3.5 font-bangla text-base font-black text-white shadow-lg shadow-emerald-600/20 transition-all hover:scale-102 hover:shadow-xl active:scale-98"
            >
              <span>{activeOrgan.name}-এর পুরো গল্পটি পড়ো</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
