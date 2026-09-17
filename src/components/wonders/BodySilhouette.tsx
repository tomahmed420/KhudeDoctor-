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
            
            {/* Realistic 3D-style anatomical illustration — vector-rendered, responsive and interactive */}
            <svg
              viewBox="0 0 300 620"
              className="w-full h-full select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="ইন্টার‌্যাক্টিভ মানবদেহের 3D-স্টাইল অ্যানাটমি মডেল"
            >
              <defs>
                <linearGradient id="realSkin" x1="65" y1="30" x2="235" y2="590" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#ffe9d2"/>
                  <stop offset="0.22" stopColor="#f8c7a6"/>
                  <stop offset="0.5" stopColor="#eaa080"/>
                  <stop offset="0.78" stopColor="#c8785f"/>
                  <stop offset="1" stopColor="#985044"/>
                </linearGradient>
                <linearGradient id="realSkinLight" x1="80" y1="80" x2="145" y2="500" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff4e8" stopOpacity=".82"/>
                  <stop offset=".5" stopColor="#f8c9aa" stopOpacity=".35"/>
                  <stop offset="1" stopColor="#d98268" stopOpacity=".05"/>
                </linearGradient>
                <linearGradient id="hairReal" x1="90" y1="35" x2="215" y2="125" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#34201e"/>
                  <stop offset=".45" stopColor="#171213"/>
                  <stop offset="1" stopColor="#08090a"/>
                </linearGradient>
                <linearGradient id="shirtReal" x1="90" y1="165" x2="210" y2="400" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bfa9"/>
                  <stop offset=".48" stopColor="#118f79"/>
                  <stop offset="1" stopColor="#07584f"/>
                </linearGradient>
                <linearGradient id="glassReal" x1="90" y1="180" x2="210" y2="410" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffffff" stopOpacity=".52"/>
                  <stop offset=".5" stopColor="#dff7f2" stopOpacity=".22"/>
                  <stop offset="1" stopColor="#8ad9ce" stopOpacity=".08"/>
                </linearGradient>
                <radialGradient id="heartReal" cx="35%" cy="24%" r="78%">
                  <stop stopColor="#ff8b92"/>
                  <stop offset=".38" stopColor="#ed4658"/>
                  <stop offset=".78" stopColor="#b91f3c"/>
                  <stop offset="1" stopColor="#74122b"/>
                </radialGradient>
                <linearGradient id="lungReal" x1="100" y1="210" x2="200" y2="300" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffb9c8"/>
                  <stop offset=".5" stopColor="#e96a89"/>
                  <stop offset="1" stopColor="#a92f59"/>
                </linearGradient>
                <linearGradient id="liverReal" x1="90" y1="310" x2="190" y2="350" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#a95a3e"/>
                  <stop offset=".55" stopColor="#7f392f"/>
                  <stop offset="1" stopColor="#572329"/>
                </linearGradient>
                <linearGradient id="stomachReal" x1="150" y1="310" x2="205" y2="370" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#ffc17e"/>
                  <stop offset=".55" stopColor="#ec7d4b"/>
                  <stop offset="1" stopColor="#b84238"/>
                </linearGradient>
                <linearGradient id="kidneyReal" x1="100" y1="345" x2="205" y2="390" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#c45c5a"/>
                  <stop offset=".65" stopColor="#8d343d"/>
                  <stop offset="1" stopColor="#571f2b"/>
                </linearGradient>
                <filter id="bodyShadow" x="-40%" y="-30%" width="180%" height="170%">
                  <feDropShadow dx="0" dy="9" stdDeviation="9" floodColor="#5a4038" floodOpacity=".22"/>
                </filter>
                <filter id="organShadowReal" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3.5" floodColor="#421c2a" floodOpacity=".28"/>
                </filter>
                <filter id="softGlowReal" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="4" result="b"/>
                  <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <clipPath id="torsoWindowReal">
                  <path d="M91 171 C76 176 66 196 62 229 L55 333 C54 346 62 353 74 348 L88 292 L91 388 C92 405 106 417 124 420 L150 425 L176 420 C194 417 208 405 209 388 L212 292 L226 348 C238 353 246 346 245 333 L238 229 C234 196 224 176 209 171 L179 157 L121 157Z"/>
                </clipPath>
              </defs>

              <ellipse cx="150" cy="603" rx="82" ry="12" fill="#5c4942" opacity=".12"/>

              {/* Legs — rounded volume + subtle edge lighting */}
              <path d="M105 391 C105 440 102 504 93 564 C91 578 84 590 81 598 C91 606 119 607 127 597 C133 575 140 470 140 414Z" fill="url(#realSkin)" stroke="#a85d4f" strokeWidth="2" filter="url(#bodyShadow)"/>
              <path d="M160 414 C160 470 167 575 173 597 C181 607 209 606 219 598 C216 590 209 578 207 564 C198 504 195 440 195 391Z" fill="url(#realSkin)" stroke="#a85d4f" strokeWidth="2" filter="url(#bodyShadow)"/>
              <path d="M106 421 C104 475 101 535 94 565" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity=".12"/>
              <path d="M194 421 C196 475 199 535 206 565" stroke="#6e3935" strokeWidth="9" strokeLinecap="round" opacity=".13"/>

              {/* Shoes */}
              <path d="M81 595 C73 595 65 600 63 605 C73 614 108 616 127 605 C124 598 114 595 104 595Z" fill="#f4fbfb" stroke="#c7dddd" strokeWidth="2"/>
              <path d="M196 595 C186 595 176 598 173 605 C192 616 227 614 237 605 C235 600 227 595 219 595Z" fill="#f4fbfb" stroke="#c7dddd" strokeWidth="2"/>

              {/* Neck */}
              <path d="M127 126 C129 145 126 157 115 171 L185 171 C174 157 171 145 173 126Z" fill="url(#realSkin)" stroke="#aa5f50" strokeWidth="1.8"/>

              {/* Torso / clothing */}
              <path d="M91 171 C76 176 66 196 62 229 L55 333 C54 346 62 353 74 348 L88 292 L91 388 C92 405 106 417 124 420 L150 425 L176 420 C194 417 208 405 209 388 L212 292 L226 348 C238 353 246 346 245 333 L238 229 C234 196 224 176 209 171 L179 157 L121 157Z" fill="url(#shirtReal)" stroke="#075f54" strokeWidth="2.5" filter="url(#bodyShadow)"/>

              {/* Collar and central seam */}
              <path d="M121 158 L150 190 L179 158 L171 151 C164 164 136 164 129 151Z" fill="#e8fffb" opacity=".9"/>
              <path d="M150 190 L150 405" stroke="#063f39" strokeWidth="2.5" opacity=".18"/>

              {/* Transparent anatomical window */}
              <g clipPath="url(#torsoWindowReal)">
                <rect x="70" y="178" width="160" height="235" fill="url(#glassReal)"/>

                {/* Sternum + rib cage */}
                <path d="M150 194 L150 327" stroke="#fff7ed" strokeWidth="3" opacity=".42"/>
                <g stroke="#fff9f1" strokeWidth="3" opacity=".38" fill="none">
                  <path d="M113 199 C89 218 89 255 111 276"/>
                  <path d="M187 199 C211 218 211 255 189 276"/>
                  <path d="M109 214 Q150 232 191 214"/>
                  <path d="M105 234 Q150 252 195 234"/>
                  <path d="M103 255 Q150 272 197 255"/>
                  <path d="M104 276 Q150 291 196 276"/>
                </g>

                {/* Lungs with lobed contours */}
                <g filter="url(#organShadowReal)">
                  <path d="M145 202 C126 188 105 199 99 224 C95 243 99 270 111 288 C119 300 133 299 145 290Z" fill="url(#lungReal)"/>
                  <path d="M155 202 C174 188 195 199 201 224 C205 243 201 270 189 288 C181 300 167 299 155 290Z" fill="url(#lungReal)"/>
                  <path d="M112 225 C121 219 132 221 140 229 M188 225 C179 219 168 221 160 229" stroke="#ffd9df" strokeWidth="3" opacity=".55" fill="none"/>
                  <path d="M150 200 L150 292" stroke="#f4d8dc" strokeWidth="4" opacity=".8"/>
                </g>

                {/* Heart — dimensional with vessels */}
                <g filter="url(#organShadowReal)">
                  <path d="M150 226 C136 204 112 215 116 237 C120 258 141 275 150 285 C159 275 180 258 184 237 C188 215 164 204 150 226Z" fill="url(#heartReal)"/>
                  <path d="M137 224 C142 221 147 224 149 230" stroke="#ffced1" strokeWidth="3" strokeLinecap="round" opacity=".65"/>
                  <path d="M150 217 L143 204 M155 220 L168 207 M159 226 L174 219" stroke="#711d33" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M147 237 C151 244 151 255 147 264" stroke="#8f1e36" strokeWidth="2.5" opacity=".7"/>
                </g>

                {/* Liver */}
                <path d="M91 300 C112 289 137 293 150 307 C143 331 118 344 92 338 C83 330 83 311 91 300Z" fill="url(#liverReal)" filter="url(#organShadowReal)"/>
                <path d="M102 305 Q125 299 143 311" stroke="#d78a6b" strokeWidth="3" opacity=".35" fill="none"/>

                {/* Stomach */}
                <path d="M158 302 C180 298 197 312 192 331 C188 346 171 360 159 349 C152 342 155 331 161 324 C169 315 162 307 158 302Z" fill="url(#stomachReal)" filter="url(#organShadowReal)"/>
                <path d="M169 311 Q184 320 178 335 Q173 344 163 342" stroke="#ffd9ad" strokeWidth="3" opacity=".5" fill="none"/>

                {/* Kidneys */}
                <path d="M111 345 C99 337 88 346 90 362 C92 378 104 385 115 375 C120 366 120 351 111 345Z" fill="url(#kidneyReal)" filter="url(#organShadowReal)"/>
                <path d="M189 345 C201 337 212 346 210 362 C208 378 196 385 185 375 C180 366 180 351 189 345Z" fill="url(#kidneyReal)" filter="url(#organShadowReal)"/>

                {/* Intestines — layered coils */}
                <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#organShadowReal)">
                  <path d="M104 377 C118 364 137 370 139 382 C141 394 122 400 112 389 C103 379 94 391 102 401 C112 413 133 405 141 395 C149 385 159 385 168 395 C177 405 198 413 198 397 C198 386 185 380 174 386 C164 391 162 378 173 371 C184 364 193 375 196 382" stroke="#e98772" strokeWidth="11"/>
                  <path d="M104 377 C118 364 137 370 139 382 C141 394 122 400 112 389" stroke="#ffd0bb" strokeWidth="3" opacity=".6"/>
                </g>
              </g>

              {/* Arms */}
              <path d="M92 178 C75 192 70 229 68 266 L61 333 C60 342 66 348 74 348 L88 292 L101 231Z" fill="url(#realSkin)" stroke="#a85d4f" strokeWidth="2" filter="url(#bodyShadow)"/>
              <path d="M208 178 C225 192 230 229 232 266 L239 333 C240 342 234 348 226 348 L212 292 L199 231Z" fill="url(#realSkin)" stroke="#a85d4f" strokeWidth="2" filter="url(#bodyShadow)"/>
              <path d="M74 205 C70 244 69 286 65 326" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity=".14"/>
              <path d="M226 205 C230 244 231 286 235 326" stroke="#704039" strokeWidth="7" strokeLinecap="round" opacity=".12"/>

              {/* Hands */}
              <path d="M61 329 C52 326 44 332 45 340 C46 348 58 353 70 348 L77 340 C73 334 68 331 61 329Z" fill="url(#realSkin)" stroke="#a85d4f" strokeWidth="1.5"/>
              <path d="M239 329 C248 326 256 332 255 340 C254 348 242 353 230 348 L223 340 C227 334 232 331 239 329Z" fill="url(#realSkin)" stroke="#a85d4f" strokeWidth="1.5"/>

              {/* Head with realistic volume */}
              <ellipse cx="150" cy="91" rx="57" ry="61" fill="url(#realSkin)" stroke="#a85d4f" strokeWidth="2" filter="url(#bodyShadow)"/>
              <ellipse cx="133" cy="72" rx="28" ry="30" fill="url(#realSkinLight)" opacity=".75"/>

              {/* Ears */}
              <ellipse cx="91" cy="96" rx="11" ry="18" fill="url(#realSkin)" stroke="#a85d4f" strokeWidth="1.8"/>
              <ellipse cx="209" cy="96" rx="11" ry="18" fill="url(#realSkin)" stroke="#a85d4f" strokeWidth="1.8"/>
              <path d="M88 94 Q96 84 101 96 Q97 108 90 103 M212 94 Q204 84 199 96 Q203 108 210 103" stroke="#b36b58" strokeWidth="2" fill="none" opacity=".7"/>

              {/* Hair cap */}
              <path d="M93 77 C87 46 106 25 135 28 C166 16 204 38 207 77 C194 61 184 53 171 50 C158 65 134 69 115 60 C108 68 102 73 93 77Z" fill="url(#hairReal)" filter="url(#bodyShadow)"/>
              <path d="M111 46 Q128 31 145 38 M148 35 Q168 30 187 47 M120 55 Q144 43 165 43" stroke="#765049" strokeWidth="3" strokeLinecap="round" opacity=".5"/>

              {/* Eyes / brows */}
              <path d="M111 80 Q126 70 139 79 M161 79 Q174 70 189 80" stroke="#3a2421" strokeWidth="4" strokeLinecap="round"/>
              <ellipse cx="126" cy="92" rx="13" ry="16" fill="#fff"/>
              <ellipse cx="174" cy="92" rx="13" ry="16" fill="#fff"/>
              <ellipse cx="127" cy="94" rx="7" ry="10" fill="#3a2928"/>
              <ellipse cx="173" cy="94" rx="7" ry="10" fill="#3a2928"/>
              <ellipse cx="128" cy="92" rx="3.2" ry="4.5" fill="#101011"/>
              <ellipse cx="172" cy="92" rx="3.2" ry="4.5" fill="#101011"/>
              <circle cx="124" cy="88" r="2.7" fill="#fff"/>
              <circle cx="169" cy="88" r="2.7" fill="#fff"/>

              {/* Nose, cheeks, mouth */}
              <path d="M150 93 Q144 110 150 114 Q156 112 157 106" stroke="#aa5f50" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
              <ellipse cx="112" cy="116" rx="11" ry="5" fill="#f07e79" opacity=".28"/>
              <ellipse cx="188" cy="116" rx="11" ry="5" fill="#f07e79" opacity=".28"/>
              <path d="M133 119 Q150 134 167 119" stroke="#9e3d46" strokeWidth="3.2" strokeLinecap="round" fill="#ffb2ae"/>
              <path d="M141 124 Q150 128 159 124" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity=".8"/>

              {/* Small medical emblem */}
              <circle cx="194" cy="164" r="15" fill="#fff" fillOpacity=".9" stroke="#2cae96" strokeWidth="2.2"/>
              <path d="M194 156 L194 172 M186 164 L202 164" stroke="#2cae96" strokeWidth="3" strokeLinecap="round"/>

              {/* Subtle 3D highlights */}
              <path d="M95 184 C84 224 82 280 91 326" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".12"/>
              <path d="M205 184 C216 224 218 280 209 326" stroke="#063e38" strokeWidth="7" strokeLinecap="round" opacity=".12"/>
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
