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
            
            {/* High-detail, code-rendered 3D-style child anatomy artwork */}
            <svg
              viewBox="0 0 240 450"
              className="w-full h-full select-none"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="ইন্টার‌্যাক্টিভ মানবদেহ"
            >
              <defs>
                <linearGradient id="skin3d" x1="45" y1="20" x2="205" y2="430" gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#fff1df"/>
                  <stop offset="0.28" stopColor="#ffd8b5"/>
                  <stop offset="0.58" stopColor="#f4b58e"/>
                  <stop offset="0.82" stopColor="#d98a68"/>
                  <stop offset="1" stopColor="#b96852"/>
                </linearGradient>
                <radialGradient id="faceGlow" cx="42%" cy="30%" r="70%">
                  <stop offset="0" stopColor="#fff8ef" stopOpacity="0.95"/>
                  <stop offset="0.52" stopColor="#ffd7b5" stopOpacity="0.92"/>
                  <stop offset="1" stopColor="#dc906e" stopOpacity="0.98"/>
                </radialGradient>
                <linearGradient id="hair3d" x1="78" y1="20" x2="162" y2="105" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#4b2a27"/>
                  <stop offset="0.45" stopColor="#241817"/>
                  <stop offset="1" stopColor="#120f10"/>
                </linearGradient>
                <linearGradient id="shirt3d" x1="76" y1="120" x2="164" y2="300" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#43c7b1"/>
                  <stop offset="0.5" stopColor="#16a085"/>
                  <stop offset="1" stopColor="#08735f"/>
                </linearGradient>
                <linearGradient id="glassBody" x1="60" y1="115" x2="180" y2="310" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fff" stopOpacity="0.48"/>
                  <stop offset="0.45" stopColor="#e9f8ff" stopOpacity="0.25"/>
                  <stop offset="1" stopColor="#b7e6e0" stopOpacity="0.12"/>
                </linearGradient>
                <radialGradient id="heart3d" cx="35%" cy="25%" r="80%">
                  <stop stopColor="#ff777f"/>
                  <stop offset="0.5" stopColor="#f23d50"/>
                  <stop offset="1" stopColor="#a70e2c"/>
                </radialGradient>
                <linearGradient id="lung3d" x1="85" y1="150" x2="155" y2="230">
                  <stop stopColor="#ffb6c4"/>
                  <stop offset="1" stopColor="#d94d72"/>
                </linearGradient>
                <linearGradient id="organWarm" x1="90" y1="210" x2="150" y2="290">
                  <stop stopColor="#ffbd7a"/>
                  <stop offset="1" stopColor="#e46d38"/>
                </linearGradient>
                <filter id="softShadow" x="-30%" y="-30%" width="160%" height="170%">
                  <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#6b4b3f" floodOpacity="0.20"/>
                </filter>
                <filter id="organShadow" x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#5b2330" floodOpacity="0.22"/>
                </filter>
                <filter id="glow" x="-80%" y="-80%" width="260%" height="260%">
                  <feGaussianBlur stdDeviation="3" result="blur"/>
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
                <clipPath id="torsoClip">
                  <path d="M77 116 C62 120 53 135 50 157 L44 245 C43 254 49 259 56 256 L67 204 L70 286 C71 300 82 310 98 313 L120 318 L142 313 C158 310 169 300 170 286 L173 204 L184 256 C191 259 197 254 196 245 L190 157 C187 135 178 120 163 116 Z"/>
                </clipPath>
              </defs>

              {/* Ground shadow */}
              <ellipse cx="120" cy="438" rx="62" ry="8" fill="#6b554d" opacity="0.13"/>

              {/* Legs behind the torso */}
              <path d="M82 294 C82 330 80 371 74 409 C72 423 67 432 65 437 C75 444 94 443 99 437 C103 425 108 374 112 315 Z"
                fill="url(#skin3d)" stroke="#b86d57" strokeWidth="1.6" filter="url(#softShadow)"/>
              <path d="M128 315 C132 374 137 425 141 437 C146 443 165 444 175 437 C173 432 168 423 166 409 C160 371 158 330 158 294 Z"
                fill="url(#skin3d)" stroke="#b86d57" strokeWidth="1.6" filter="url(#softShadow)"/>

              {/* Shoes */}
              <ellipse cx="82" cy="438" rx="22" ry="7" fill="#eff7f7" stroke="#c5dddd"/>
              <ellipse cx="158" cy="438" rx="22" ry="7" fill="#eff7f7" stroke="#c5dddd"/>

              {/* Neck */}
              <path d="M106 91 C107 105 105 112 99 120 L141 120 C135 111 133 104 134 91Z" fill="url(#skin3d)"/>

              {/* Torso base / shirt */}
              <path d="M77 116 C62 120 53 135 50 157 L44 245 C43 254 49 259 56 256 L67 204 L70 286 C71 300 82 310 98 313 L120 318 L142 313 C158 310 169 300 170 286 L173 204 L184 256 C191 259 197 254 196 245 L190 157 C187 135 178 120 163 116 L143 109 L97 109Z"
                fill="url(#shirt3d)" stroke="#0d6f61" strokeWidth="2" filter="url(#softShadow)"/>

              {/* Shirt collar */}
              <path d="M97 110 L120 137 L143 110 L136 106 C129 115 111 115 104 106Z" fill="#e8fffa" opacity="0.9"/>
              <path d="M120 137 L120 295" stroke="#075d53" strokeOpacity="0.22" strokeWidth="2"/>

              {/* Semi-transparent anatomical window */}
              <g clipPath="url(#torsoClip)">
                <rect x="66" y="132" width="108" height="165" fill="url(#glassBody)"/>

                {/* Rib cage */}
                <g opacity="0.48" stroke="#fff8ef" strokeWidth="2.1">
                  <path d="M85 151 C75 166 76 190 87 204"/>
                  <path d="M155 151 C165 166 164 190 153 204"/>
                  <path d="M85 160 Q120 174 155 160"/>
                  <path d="M82 174 Q120 187 158 174"/>
                  <path d="M81 189 Q120 201 159 189"/>
                  <path d="M84 204 Q120 214 156 204"/>
                </g>

                {/* Lungs */}
                <g filter="url(#organShadow)">
                  <path d="M117 153 C103 147 91 158 87 179 C84 196 91 213 108 218 C114 215 117 204 118 187Z" fill="url(#lung3d)" opacity="0.94"/>
                  <path d="M123 153 C137 147 149 158 153 179 C156 196 149 213 132 218 C126 215 123 204 122 187Z" fill="url(#lung3d)" opacity="0.94"/>
                  <path d="M120 151 L120 211" stroke="#f5d4d7" strokeWidth="3"/>
                </g>

                {/* Heart */}
                <g filter="url(#organShadow)">
                  <path d="M120 166 C111 154 96 161 99 174 C102 187 115 197 120 203 C125 197 138 187 141 174 C144 161 129 154 120 166Z" fill="url(#heart3d)"/>
                  <path d="M106 169 C111 166 115 169 117 173" stroke="#ffb3b7" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                  <path d="M126 166 L132 157 M129 169 L137 164" stroke="#6d1730" strokeWidth="2" strokeLinecap="round"/>
                </g>

                {/* Liver */}
                <path d="M78 213 C92 205 108 207 119 214 C115 229 98 237 80 232 C74 226 74 219 78 213Z" fill="#9b4d34" opacity="0.95" filter="url(#organShadow)"/>

                {/* Stomach */}
                <path d="M128 212 C142 209 151 219 146 231 C143 239 132 244 126 237 C123 232 126 226 130 223 C135 218 130 214 128 212Z" fill="url(#organWarm)" filter="url(#organShadow)"/>

                {/* Kidneys */}
                <path d="M92 232 C84 227 78 234 80 245 C82 254 90 258 97 252 C100 246 99 237 92 232Z" fill="#a94b48" filter="url(#organShadow)"/>
                <path d="M148 232 C156 227 162 234 160 245 C158 254 150 258 143 252 C140 246 141 237 148 232Z" fill="#a94b48" filter="url(#organShadow)"/>

                {/* Intestines */}
                <path d="M91 258 C102 249 139 249 149 258 C154 267 145 276 137 271 C130 266 125 276 118 271 C111 266 106 276 99 271 C92 268 87 264 91 258Z"
                  fill="none" stroke="#f28f72" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M92 258 C103 249 137 250 148 258" stroke="#ffd1b9" strokeWidth="2" opacity="0.75" fill="none"/>
              </g>

              {/* Arms */}
              <path d="M76 123 C63 137 58 169 55 205 L48 245 C47 252 51 257 57 255 L68 207 L76 172Z"
                fill="url(#skin3d)" stroke="#b86d57" strokeWidth="1.6" filter="url(#softShadow)"/>
              <path d="M164 123 C177 137 182 169 185 205 L192 245 C193 252 189 257 183 255 L172 207 L164 172Z"
                fill="url(#skin3d)" stroke="#b86d57" strokeWidth="1.6" filter="url(#softShadow)"/>

              {/* Hands */}
              <path d="M48 244 C41 243 37 249 40 254 C43 259 51 260 57 255 L61 249 C57 246 53 244 48 244Z" fill="url(#skin3d)"/>
              <path d="M192 244 C199 243 203 249 200 254 C197 259 189 260 183 255 L179 249 C183 246 187 244 192 244Z" fill="url(#skin3d)"/>

              {/* Face */}
              <ellipse cx="120" cy="62" rx="43" ry="45" fill="url(#faceGlow)" stroke="#b86d57" strokeWidth="1.8" filter="url(#softShadow)"/>

              {/* Ears */}
              <ellipse cx="77" cy="66" rx="8" ry="13" fill="url(#skin3d)" stroke="#b86d57" strokeWidth="1.5"/>
              <ellipse cx="163" cy="66" rx="8" ry="13" fill="url(#skin3d)" stroke="#b86d57" strokeWidth="1.5"/>
              <path d="M75 65 Q80 60 82 68 Q79 75 75 70" stroke="#bd755d" strokeWidth="1.5" fill="none" opacity="0.75"/>
              <path d="M165 65 Q160 60 158 68 Q161 75 165 70" stroke="#bd755d" strokeWidth="1.5" fill="none" opacity="0.75"/>

              {/* Hair mass + highlights */}
              <path d="M78 51 C75 27 93 12 118 15 C145 10 164 28 163 55 C154 45 148 38 139 35 C130 45 116 49 101 45 C94 52 87 57 78 60Z" fill="url(#hair3d)" filter="url(#softShadow)"/>
              <path d="M91 31 Q104 18 116 24 M118 22 Q133 17 146 29 M102 40 Q119 30 134 29" stroke="#8c5b52" strokeWidth="3" strokeLinecap="round" opacity="0.55"/>

              {/* Brows */}
              <path d="M92 56 Q101 50 110 55" stroke="#402724" strokeWidth="4" strokeLinecap="round"/>
              <path d="M130 55 Q139 50 148 56" stroke="#402724" strokeWidth="4" strokeLinecap="round"/>

              {/* Big expressive eyes */}
              <ellipse cx="101" cy="66" rx="11" ry="14" fill="#fff"/>
              <ellipse cx="139" cy="66" rx="11" ry="14" fill="#fff"/>
              <ellipse cx="102" cy="68" rx="7" ry="9" fill="#4b2d2a"/>
              <ellipse cx="138" cy="68" rx="7" ry="9" fill="#4b2d2a"/>
              <ellipse cx="104" cy="65" rx="3" ry="4" fill="#161112"/>
              <ellipse cx="136" cy="65" rx="3" ry="4" fill="#161112"/>
              <circle cx="99" cy="63" r="2.5" fill="#fff"/>
              <circle cx="135" cy="63" r="2.5" fill="#fff"/>

              {/* Nose */}
              <path d="M120 67 Q115 78 120 81 Q125 80 125 76" stroke="#bd755d" strokeWidth="2" strokeLinecap="round" fill="none"/>

              {/* Smile + cheeks */}
              <ellipse cx="91" cy="83" rx="9" ry="4" fill="#f58d88" opacity="0.35"/>
              <ellipse cx="149" cy="83" rx="9" ry="4" fill="#f58d88" opacity="0.35"/>
              <path d="M108 84 Q120 96 132 84" stroke="#9e3e46" strokeWidth="3" strokeLinecap="round" fill="#ffb4b0"/>
              <path d="M113 88 Q120 92 127 88" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.85"/>

              {/* Tiny anatomy badge */}
              <circle cx="151" cy="125" r="13" fill="#fff" fillOpacity="0.9" stroke="#22a88c" strokeWidth="2"/>
              <path d="M151 118 L151 132 M144 125 L158 125" stroke="#22a88c" strokeWidth="3" strokeLinecap="round"/>
              <path d="M146 120 Q151 114 156 120" stroke="#22a88c" strokeWidth="1.5" fill="none" opacity="0.65"/>

              {/* Soft highlight over the body for a toy-like 3D finish */}
              <path d="M75 126 C66 154 65 204 71 245" stroke="#fff" strokeWidth="5" strokeLinecap="round" opacity="0.16"/>
              <path d="M162 128 C173 160 175 202 169 244" stroke="#0b6257" strokeWidth="5" strokeLinecap="round" opacity="0.13"/>
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
