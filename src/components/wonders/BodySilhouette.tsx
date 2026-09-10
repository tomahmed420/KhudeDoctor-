import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Organ } from "@/data/organsData";
import { soundEffects } from "@/utils/soundEffects";
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ChevronRight,
  Brain,
  Heart,
  Utensils,
  Activity
} from "lucide-react";
import { useTTS } from "@/hooks/useTTS";

interface BodySilhouetteProps {
  organs: Organ[];
  onOrganClick: (organ: Organ) => void;
}

type BodyZone = "all" | "head" | "chest" | "abdomen" | "motion";

interface ZoneConfig {
  id: BodyZone;
  label: string;
  icon: typeof Brain;
  organIds: string[];
  description: string;
}

const zones: ZoneConfig[] = [
  {
    id: "all",
    label: "পুরো শরীর",
    icon: Sparkles,
    organIds: [
      "brain", "eyes", "ears", "nose", "teeth", "tongue",
      "heart", "lungs", "blood",
      "stomach", "liver", "intestines", "kidneys",
      "bones", "muscles", "skin"
    ],
    description: "আমাদের প্রতিটি অঙ্গ একে অপরের বন্ধু হয়ে দিনরাত কাজ করে!",
  },
  {
    id: "head",
    label: "মাথা ও ইন্দ্রিয়",
    icon: Brain,
    organIds: ["brain", "eyes", "ears", "nose", "teeth", "tongue"],
    description: "জ্ঞান, ভাবনা, দেখা, শোনা ও স্বাদের অপূর্ব কেন্দ্র!",
  },
  {
    id: "chest",
    label: "বুক ও শ্বাসপ্রশ্বাস",
    icon: Heart,
    organIds: ["heart", "lungs", "blood"],
    description: "অক্সিজেন আর বিশুদ্ধ রক্তের অফুরন্ত পাম্পিং স্টেশন!",
  },
  {
    id: "abdomen",
    label: "পেট ও পরিপাক",
    icon: Utensils,
    organIds: ["stomach", "liver", "kidneys", "intestines"],
    description: "খাবার ভেঙে শরীরকে পুষ্টি ও খেলার শক্তি দেওয়ার কারখানা!",
  },
  {
    id: "motion",
    label: "হাত-পা ও সুরক্ষা",
    icon: Activity,
    organIds: ["bones", "muscles", "skin"],
    description: "মজবুত কাঠামো, নড়াচড়া আর বাইরের তাপ-ঠাণ্ডা থেকে রক্ষা!",
  },
];

const colorClasses: Record<string, { bg: string; border: string; text: string; lightBg: string }> = {
  heart: { bg: "bg-organ-heart", border: "border-organ-heart", text: "text-organ-heart", lightBg: "bg-organ-heart-bg" },
  brain: { bg: "bg-organ-brain", border: "border-organ-brain", text: "text-organ-brain", lightBg: "bg-organ-brain-bg" },
  eyes: { bg: "bg-organ-eyes", border: "border-organ-eyes", text: "text-organ-eyes", lightBg: "bg-organ-eyes-bg" },
  lungs: { bg: "bg-organ-lungs", border: "border-organ-lungs", text: "text-organ-lungs", lightBg: "bg-organ-lungs-bg" },
  stomach: { bg: "bg-organ-stomach", border: "border-organ-stomach", text: "text-organ-stomach", lightBg: "bg-organ-stomach-bg" },
  liver: { bg: "bg-organ-liver", border: "border-organ-liver", text: "text-organ-liver", lightBg: "bg-organ-liver-bg" },
  kidneys: { bg: "bg-organ-kidneys", border: "border-organ-kidneys", text: "text-organ-kidneys", lightBg: "bg-organ-kidneys-bg" },
  bones: { bg: "bg-organ-bones", border: "border-organ-bones", text: "text-organ-bones", lightBg: "bg-organ-bones-bg" },
  muscles: { bg: "bg-organ-muscles", border: "border-organ-muscles", text: "text-organ-muscles", lightBg: "bg-organ-muscles-bg" },
  skin: { bg: "bg-organ-skin", border: "border-organ-skin", text: "text-organ-skin", lightBg: "bg-organ-skin-bg" },
  ears: { bg: "bg-organ-ears", border: "border-organ-ears", text: "text-organ-ears", lightBg: "bg-organ-ears-bg" },
  tongue: { bg: "bg-organ-tongue", border: "border-organ-tongue", text: "text-organ-tongue", lightBg: "bg-organ-tongue-bg" },
  nose: { bg: "bg-organ-nose", border: "border-organ-nose", text: "text-organ-nose", lightBg: "bg-organ-nose-bg" },
  intestines: { bg: "bg-organ-intestines", border: "border-organ-intestines", text: "text-organ-intestines", lightBg: "bg-organ-intestines-bg" },
  teeth: { bg: "bg-organ-teeth", border: "border-organ-teeth", text: "text-organ-teeth", lightBg: "bg-organ-teeth-bg" },
  blood: { bg: "bg-organ-blood", border: "border-organ-blood", text: "text-organ-blood", lightBg: "bg-organ-blood-bg" },
};

// Well-spaced hotspot positions mapped to zone views
const bodyPositions: Record<string, { top: string; left: string; labelSide: "left" | "right" }> = {
  brain: { top: "10%", left: "50%", labelSide: "left" },
  eyes: { top: "16%", left: "44%", labelSide: "left" },
  ears: { top: "16%", left: "56%", labelSide: "right" },
  nose: { top: "19%", left: "50%", labelSide: "right" },
  teeth: { top: "23%", left: "50%", labelSide: "left" },
  tongue: { top: "25.5%", left: "50%", labelSide: "right" },
  lungs: { top: "33%", left: "43%", labelSide: "left" },
  heart: { top: "36%", left: "53%", labelSide: "right" },
  liver: { top: "42%", left: "45%", labelSide: "left" },
  stomach: { top: "44%", left: "54%", labelSide: "right" },
  kidneys: { top: "50%", left: "44%", labelSide: "left" },
  intestines: { top: "54%", left: "50%", labelSide: "right" },
  bones: { top: "66%", left: "42%", labelSide: "left" },
  muscles: { top: "66%", left: "58%", labelSide: "right" },
  skin: { top: "78%", left: "43%", labelSide: "left" },
  blood: { top: "78%", left: "57%", labelSide: "right" },
};

export const BodySilhouette = ({ organs, onOrganClick }: BodySilhouetteProps) => {
  const [selectedZone, setSelectedZone] = useState<BodyZone>("all");
  const [activeOrganId, setActiveOrganId] = useState<string>("heart");
  const { speak, stop, isSpeaking, isSupported } = useTTS();

  const currentZone = zones.find((z) => z.id === selectedZone) || zones[0];
  
  // Organs in current active zone
  const visibleOrgans = organs.filter((o) => currentZone.organIds.includes(o.id));
  const activeOrgan = organs.find((o) => o.id === activeOrganId) || visibleOrgans[0] || organs[0];

  const handleSelectOrgan = (organ: Organ) => {
    soundEffects.playPop();
    setActiveOrganId(organ.id);
  };

  const handleOpenDetail = (organ: Organ) => {
    soundEffects.playChime();
    onOrganClick(organ);
  };

  const handleSpeak = (organ: Organ) => {
    if (isSpeaking) {
      stop();
    } else {
      speak(`${organ.name}। ${organ.simpleFunction}`);
    }
  };

  const activeColor = colorClasses[activeOrgan.colorKey] || colorClasses.heart;
  const ActiveIcon = activeOrgan.icon;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* 1. Clean Zone Selector (Mobile-first responsive pills) */}
      <div className="w-full mb-6">
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 px-1 scrollbar-none">
          {zones.map((zone) => {
            const ZoneIcon = zone.icon;
            const isSelected = selectedZone === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedZone(zone.id);
                  // Default to first organ in zone
                  if (!zone.organIds.includes(activeOrganId)) {
                    setActiveOrganId(zone.organIds[0]);
                  }
                }}
                className={`
                  shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bangla font-bold transition-all
                  ${isSelected 
                    ? "bg-primary text-primary-foreground shadow-sm scale-105" 
                    : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border/80"
                  }
                `}
              >
                <ZoneIcon size={16} />
                <span>{zone.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-center text-xs sm:text-sm text-muted-foreground font-bangla mt-1">
          {currentZone.description}
        </p>
      </div>

      {/* 2. Interactive Body Stage & Spotlight Inspector */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Quick Organ Selector Buttons (Desktop: 4 cols) */}
        <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bangla font-bold uppercase tracking-wider text-muted-foreground">
              অঙ্গসমূহ ({visibleOrgans.length}টি)
            </span>
            <span className="text-[11px] font-bangla text-primary">
              যেকোনোটিতে ট্যাপ করো
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 max-h-[480px] overflow-y-auto pr-1">
            {visibleOrgans.map((organ) => {
              const Icon = organ.icon;
              const isSelected = activeOrgan.id === organ.id;
              const color = colorClasses[organ.colorKey] || colorClasses.heart;

              return (
                <button
                  key={organ.id}
                  onClick={() => handleSelectOrgan(organ)}
                  className={`
                    flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl text-left border transition-all
                    ${isSelected 
                      ? `${color.lightBg} ${color.border} ring-2 ring-primary/30 shadow-xs scale-[1.02]` 
                      : "bg-card hover:bg-muted/60 border-border/70"
                    }
                  `}
                >
                  <div className={`p-2 rounded-xl ${color.bg} text-white shrink-0 shadow-xs`}>
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bangla font-bold text-foreground text-sm leading-tight truncate">
                      {organ.name}
                    </p>
                    <p className="font-nunito text-[11px] text-muted-foreground font-semibold">
                      {organ.nameBn}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Anatomical Human Silhouette Canvas (Desktop: 4 cols) */}
        <div className="order-1 lg:order-2 lg:col-span-4 flex flex-col items-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[1/1.85] bg-gradient-to-b from-amber-500/5 via-primary/5 to-emerald-500/5 rounded-3xl p-3 border-2 border-border/80 shadow-inner flex items-center justify-center overflow-hidden">
            
            {/* Friendly Child Silhouette SVG */}
            <svg
              viewBox="0 0 240 450"
              className="w-full h-full select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="bodySkin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#fcd34d" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.75" />
                </linearGradient>
              </defs>

              {/* Head Outline */}
              <circle cx="120" cy="62" r="42" fill="url(#bodySkin)" stroke="#d97706" strokeWidth="2.5" />
              
              {/* Ears */}
              <ellipse cx="76" cy="64" rx="5" ry="9" fill="url(#bodySkin)" stroke="#d97706" strokeWidth="2" />
              <ellipse cx="164" cy="64" rx="5" ry="9" fill="url(#bodySkin)" stroke="#d97706" strokeWidth="2" />

              {/* Friendly Smiling Face */}
              <circle cx="106" cy="58" r="2.5" fill="#78350f" opacity="0.6" />
              <circle cx="134" cy="58" r="2.5" fill="#78350f" opacity="0.6" />
              <path d="M112 74 Q120 80 128 74" stroke="#b45309" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Neck */}
              <rect x="108" y="100" width="24" height="20" rx="4" fill="url(#bodySkin)" stroke="#d97706" strokeWidth="2" />

              {/* Torso & Abdomen */}
              <path
                d="M74 120 C58 124 48 136 44 154 C38 180 34 220 32 245 C32 254 44 256 48 246 C54 228 60 190 66 175 L66 280 C66 295 72 305 90 310 L94 310 L102 260 L138 260 L146 310 L150 310 C168 305 174 295 174 280 L174 175 C180 190 186 228 192 246 C196 256 208 254 208 245 C206 220 202 180 196 154 C192 136 182 124 166 120 Z"
                fill="url(#bodySkin)"
                stroke="#d97706"
                strokeWidth="2.5"
              />

              {/* Chest Accent lines */}
              <path d="M96 155 Q120 162 144 155" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" fill="none" />
              <path d="M102 225 Q120 230 138 225" stroke="#d97706" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" fill="none" />

              {/* Left Leg */}
              <path
                d="M84 310 L80 395 C78 412 76 430 70 438 C64 446 84 448 94 444 C100 436 104 416 106 395 L114 310 Z"
                fill="url(#bodySkin)"
                stroke="#d97706"
                strokeWidth="2.5"
              />

              {/* Right Leg */}
              <path
                d="M126 310 L134 395 C136 416 140 436 146 444 C156 448 176 446 170 438 C164 430 162 412 160 395 L156 310 Z"
                fill="url(#bodySkin)"
                stroke="#d97706"
                strokeWidth="2.5"
              />
            </svg>

            {/* Targeted Organ Hotspots */}
            {visibleOrgans.map((organ) => {
              const pos = bodyPositions[organ.id];
              if (!pos) return null;
              
              const color = colorClasses[organ.colorKey] || colorClasses.heart;
              const isSelected = activeOrgan.id === organ.id;
              const IconComp = organ.icon;

              return (
                <div
                  key={organ.id}
                  className="absolute"
                  style={{
                    top: pos.top,
                    left: pos.left,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleSelectOrgan(organ)}
                    aria-label={organ.name}
                    className={`
                      relative w-8 h-8 sm:w-9 sm:h-9 rounded-full
                      flex items-center justify-center
                      ${color.bg} text-white
                      shadow-md cursor-pointer
                      border-2 border-white
                      transition-all duration-200
                      ${isSelected ? "ring-4 ring-primary scale-125 z-30" : "opacity-85 hover:opacity-100 hover:scale-110 z-10"}
                    `}
                  >
                    <IconComp size={16} />

                    {/* Glowing pulse ring if selected */}
                    {isSelected && (
                      <motion.div
                        className={`absolute inset-0 rounded-full ${color.bg} -z-10`}
                        animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                      />
                    )}
                  </motion.button>
                </div>
              );
            })}
          </div>

          <p className="text-[11px] font-bangla text-muted-foreground mt-2 text-center">
            শরীরের গোলাকার বিন্দুগুলোতে ট্যাপ করে অবস্থান দেখো
          </p>
        </div>

        {/* Right: Active Organ Spotlight Card (Desktop: 4 cols) */}
        <div className="order-3 lg:col-span-4 w-full">
          <motion.div
            key={activeOrgan.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              p-5 sm:p-6 rounded-3xl border-2 shadow-md
              ${activeColor.lightBg} ${activeColor.border}
              flex flex-col gap-4
            `}
          >
            {/* Header with Icon and Title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${activeColor.bg} text-white shadow-sm`}>
                  <ActiveIcon size={32} />
                </div>
                <div>
                  <h3 className="font-bangla font-bold text-2xl text-foreground">
                    {activeOrgan.name}
                  </h3>
                  <span className="font-nunito text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {activeOrgan.nameBn}
                  </span>
                </div>
              </div>

              {isSupported && (
                <button
                  onClick={() => handleSpeak(activeOrgan)}
                  className={`p-2.5 rounded-full border shadow-xs transition-all ${
                    isSpeaking 
                      ? `${activeColor.bg} text-white animate-pulse` 
                      : "bg-card text-foreground hover:bg-card/80 border-border"
                  }`}
                  title={isSpeaking ? "থামাও" : "পড়ে শোনাও"}
                  aria-label="অডিও শুনুন"
                >
                  {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                </button>
              )}
            </div>

            {/* Simple Function Summary */}
            <div className="bg-card/85 p-3.5 rounded-2xl border border-border/60">
              <span className="text-xs font-bangla font-bold text-primary block mb-1">
                আমার প্রধান কাজ:
              </span>
              <p className="font-bangla text-sm text-foreground/90 leading-relaxed">
                {activeOrgan.simpleFunction}
              </p>
            </div>

            {/* Fun Fact Preview */}
            <div className="bg-card/60 p-3 rounded-2xl border border-border/40">
              <span className="text-xs font-bangla font-bold text-amber-600 dark:text-amber-400 block mb-1 flex items-center gap-1">
                <Sparkles size={14} />
                মজার তথ্য:
              </span>
              <p className="font-bangla text-xs text-foreground/80 leading-relaxed">
                {activeOrgan.funFact}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2">
              <button
                onClick={() => handleOpenDetail(activeOrgan)}
                className={`
                  w-full py-3 px-4 rounded-2xl font-bangla font-bold text-sm
                  ${activeColor.bg} text-white shadow-md hover:opacity-95
                  flex items-center justify-center gap-2 transition-all active:scale-98
                `}
              >
                <span>সম্পূর্ণ বিস্তারিত ও সুবহানাল্লাহ দেখো</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
