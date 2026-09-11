import { motion } from "framer-motion";
import { Volume2, VolumeX, CheckCircle2 } from "lucide-react";
import type { Organ } from "@/data/organsData";
import { useTTS } from "@/hooks/useTTS";
import { soundEffects } from "@/utils/soundEffects";

interface OrganCardProps {
  organ: Organ;
  onClick: () => void;
  isExplored?: boolean;
}

const colorClasses: Record<string, { bg: string; border: string; icon: string }> = {
  heart: { bg: "bg-organ-heart-bg", border: "border-organ-heart", icon: "text-organ-heart" },
  brain: { bg: "bg-organ-brain-bg", border: "border-organ-brain", icon: "text-organ-brain" },
  eyes: { bg: "bg-organ-eyes-bg", border: "border-organ-eyes", icon: "text-organ-eyes" },
  lungs: { bg: "bg-organ-lungs-bg", border: "border-organ-lungs", icon: "text-organ-lungs" },
  stomach: { bg: "bg-organ-stomach-bg", border: "border-organ-stomach", icon: "text-organ-stomach" },
  liver: { bg: "bg-organ-liver-bg", border: "border-organ-liver", icon: "text-organ-liver" },
  kidneys: { bg: "bg-organ-kidneys-bg", border: "border-organ-kidneys", icon: "text-organ-kidneys" },
  bones: { bg: "bg-organ-bones-bg", border: "border-organ-bones", icon: "text-organ-bones" },
  muscles: { bg: "bg-organ-muscles-bg", border: "border-organ-muscles", icon: "text-organ-muscles" },
  skin: { bg: "bg-organ-skin-bg", border: "border-organ-skin", icon: "text-organ-skin" },
  ears: { bg: "bg-organ-ears-bg", border: "border-organ-ears", icon: "text-organ-ears" },
  tongue: { bg: "bg-organ-tongue-bg", border: "border-organ-tongue", icon: "text-organ-tongue" },
  nose: { bg: "bg-organ-nose-bg", border: "border-organ-nose", icon: "text-organ-nose" },
  intestines: { bg: "bg-organ-intestines-bg", border: "border-organ-intestines", icon: "text-organ-intestines" },
  teeth: { bg: "bg-organ-teeth-bg", border: "border-organ-teeth", icon: "text-organ-teeth" },
  blood: { bg: "bg-organ-blood-bg", border: "border-organ-blood", icon: "text-organ-blood" },
};

export const OrganCard = ({ organ, onClick, isExplored = false }: OrganCardProps) => {
  const colors = colorClasses[organ.colorKey] || colorClasses.heart;
  const IconComponent = organ.icon;
  const { speak, stop, isSpeaking, isSupported } = useTTS();

  const handleCardClick = () => {
    if (organ.id === "heart" || organ.id === "blood") {
      soundEffects.playHeartbeat();
    } else if (organ.id === "stomach" || organ.id === "kidneys" || organ.id === "intestines") {
      soundEffects.playBubble();
    } else {
      soundEffects.playPop();
    }
    onClick();
  };

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playPop();
    if (isSpeaking) {
      stop();
    } else {
      speak(organ.englishDesc);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={handleCardClick}
      className={`
        ${colors.bg} ${colors.border}
        relative cursor-pointer rounded-3xl border-2 border-solid p-4 sm:p-5
        shadow-sm hover:shadow-md transition-shadow duration-300
        flex flex-col items-center text-center gap-2.5 select-none
      `}
    >
      {/* Exploration Status Badge */}
      {isExplored && (
        <div className="absolute top-3 left-3 flex items-center gap-1 bg-emerald-500/15 text-emerald-800 text-[11px] font-bangla font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
          <CheckCircle2 size={12} className="text-emerald-600" />
          <span>শেখা হয়েছে</span>
        </div>
      )}

      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className={`${colors.icon} p-3 rounded-2xl bg-card/70 shadow-xs mt-1`}
      >
        <IconComponent size={38} strokeWidth={1.8} />
      </motion.div>
      
      <div>
        <h3 className="font-bangla font-bold text-xl sm:text-2xl text-foreground">{organ.name}</h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans font-semibold tracking-wide">{organ.nameBn}</p>
      </div>

      <p className="text-xs sm:text-sm text-foreground/80 line-clamp-2 font-bangla leading-relaxed">
        {organ.simpleFunction.split('!')[0]}!
      </p>

      <div className="w-full pt-2 mt-auto flex items-center justify-between border-t border-foreground/10 text-xs font-bangla font-semibold text-primary">
        <span>বিস্তারিত জানো →</span>
        {isSupported && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSpeak}
            title={isSpeaking ? "শব্দ বন্ধ করুন" : "ইংরেজি উচ্চারণ শুনুন"}
            aria-label="ইংরেজি অডিও শুনুন"
            className={`p-1.5 rounded-full transition-colors ${
              isSpeaking 
                ? `${colors.icon} bg-card animate-pulse shadow-xs` 
                : `${colors.icon} bg-card/80 hover:bg-card`
            }`}
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};
