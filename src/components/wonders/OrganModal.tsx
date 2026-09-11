import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Sparkles, Lightbulb, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import type { Organ } from "@/data/organsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTTS } from "@/hooks/useTTS";
import { soundEffects } from "@/utils/soundEffects";

interface OrganModalProps {
  organ: Organ | null;
  isOpen: boolean;
  onClose: () => void;
}

const colorClasses: Record<string, { bg: string; accent: string; text: string }> = {
  heart: { bg: "bg-organ-heart-bg", accent: "bg-organ-heart", text: "text-organ-heart" },
  brain: { bg: "bg-organ-brain-bg", accent: "bg-organ-brain", text: "text-organ-brain" },
  eyes: { bg: "bg-organ-eyes-bg", accent: "bg-organ-eyes", text: "text-organ-eyes" },
  lungs: { bg: "bg-organ-lungs-bg", accent: "bg-organ-lungs", text: "text-organ-lungs" },
  stomach: { bg: "bg-organ-stomach-bg", accent: "bg-organ-stomach", text: "text-organ-stomach" },
  liver: { bg: "bg-organ-liver-bg", accent: "bg-organ-liver", text: "text-organ-liver" },
  kidneys: { bg: "bg-organ-kidneys-bg", accent: "bg-organ-kidneys", text: "text-organ-kidneys" },
  bones: { bg: "bg-organ-bones-bg", accent: "bg-organ-bones", text: "text-organ-bones" },
  muscles: { bg: "bg-organ-muscles-bg", accent: "bg-organ-muscles", text: "text-organ-muscles" },
  skin: { bg: "bg-organ-skin-bg", accent: "bg-organ-skin", text: "text-organ-skin" },
  ears: { bg: "bg-organ-ears-bg", accent: "bg-organ-ears", text: "text-organ-ears" },
  tongue: { bg: "bg-organ-tongue-bg", accent: "bg-organ-tongue", text: "text-organ-tongue" },
  nose: { bg: "bg-organ-nose-bg", accent: "bg-organ-nose", text: "text-organ-nose" },
  intestines: { bg: "bg-organ-intestines-bg", accent: "bg-organ-intestines", text: "text-organ-intestines" },
  teeth: { bg: "bg-organ-teeth-bg", accent: "bg-organ-teeth", text: "text-organ-teeth" },
  blood: { bg: "bg-organ-blood-bg", accent: "bg-organ-blood", text: "text-organ-blood" },
};

export const OrganModal = ({ organ, isOpen, onClose }: OrganModalProps) => {
  const [activeTab, setActiveTab] = useState("function");
  const { speak, stop, isSpeaking, isSupported } = useTTS();

  // Play natural organ sound on open
  useEffect(() => {
    if (isOpen && organ) {
      if (organ.id === "heart" || organ.id === "blood") {
        soundEffects.playHeartbeat();
      } else if (organ.id === "stomach" || organ.id === "intestines" || organ.id === "kidneys") {
        soundEffects.playBubble();
      } else {
        soundEffects.playChime();
      }
    } else {
      stop();
    }
  }, [isOpen, organ, stop]);

  if (!organ) return null;

  const colors = colorClasses[organ.colorKey] || colorClasses.heart;
  const IconComponent = organ.icon;

  const handleSpeak = () => {
    soundEffects.playPop();
    if (isSpeaking) {
      stop();
    } else {
      // Speak clear English pronunciation and sentence
      const englishText = organ.englishDesc || `${organ.nameBn}. It is an essential organ in your body.`;
      speak(englishText);
    }
  };

  const handleClose = () => {
    soundEffects.playPop();
    stop();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 25 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            className="fixed inset-3 sm:inset-5 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full z-50 flex items-center justify-center pointer-events-none"
          >
            <div className={`${colors.bg} rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] w-full overflow-y-auto pointer-events-auto border-2 border-white/80`}>
              {/* Header */}
              <div className={`${colors.accent} p-4 sm:p-5 text-white relative shadow-sm`}>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  aria-label="বন্ধ করুন"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 rounded-full bg-black/15 hover:bg-black/25 text-white transition-colors"
                >
                  <X size={20} />
                </motion.button>

                <div className="flex items-center gap-3 sm:gap-4 pr-10">
                  <motion.div
                    animate={organ.id === "heart" ? { scale: [1, 1.15, 1, 1.1, 1] } : { rotate: [0, 8, -8, 0] }}
                    transition={{ repeat: Infinity, duration: organ.id === "heart" ? 1.2 : 2.5, ease: "easeInOut" }}
                    className="p-3 sm:p-3.5 rounded-2xl bg-white/20 shrink-0 shadow-inner"
                  >
                    <IconComponent size={34} className="sm:w-11 sm:h-11 text-white" />
                  </motion.div>
                  <div className="min-w-0">
                    <h2 className="font-bubblegum text-2xl sm:text-3xl leading-tight text-white drop-shadow-sm truncate">{organ.name}</h2>
                    <p className="text-sm sm:text-base text-white/90 font-sans font-semibold tracking-wide flex items-center gap-1.5 mt-0.5">
                      <span>{organ.nameBn}</span>
                      <span className="text-xs bg-white/25 px-2 py-0.5 rounded-full font-normal">English Name</span>
                    </p>
                  </div>
                </div>

                {/* English TTS Button */}
                {isSupported && (
                  <div className="mt-3.5 pt-3 border-t border-white/20 flex items-center justify-between">
                    <span className="text-xs text-white/90 font-bangla">
                      🇺🇸 ইংরেজি উচ্চারণ ও পরিচয় শুনো:
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSpeak}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all shadow-sm ${
                        isSpeaking 
                          ? 'bg-white text-emerald-800 animate-pulse font-bold' 
                          : 'bg-white/20 hover:bg-white/30 text-white'
                      }`}
                    >
                      {isSpeaking ? <VolumeX size={15} /> : <Volume2 size={15} />}
                      <span>{isSpeaking ? "থামাও" : "Listen in English"}</span>
                    </motion.button>
                  </div>
                )}
              </div>

              {/* Content Tabs */}
              <div className="p-4 sm:p-5">
                <Tabs value={activeTab} onValueChange={(val) => { soundEffects.playPop(); setActiveTab(val); }} className="w-full">
                  <TabsList className="w-full grid grid-cols-3 bg-muted/80 rounded-2xl p-1 gap-1 h-auto">
                    <TabsTrigger 
                      value="function" 
                      className="py-2 px-1 rounded-xl font-bangla text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1 shrink-0 text-amber-500" />
                      <span>কী কাজ করে</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="fact" 
                      className="py-2 px-1 rounded-xl font-bangla text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
                    >
                      <Lightbulb className="w-3.5 h-3.5 mr-1 shrink-0 text-amber-500" />
                      <span>মজার তথ্য</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="spiritual" 
                      className="py-2 px-1 rounded-xl font-bangla text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
                    >
                      <Heart className="w-3.5 h-3.5 mr-1 shrink-0 text-rose-500" />
                      <span>সুবহানাল্লাহ</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4">
                    <TabsContent value="function" className="mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-card rounded-2xl border border-border/70 shadow-sm"
                      >
                        <p className="text-base sm:text-lg font-bangla text-foreground leading-relaxed">
                          {organ.simpleFunction}
                        </p>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="fact" className="mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-card rounded-2xl border border-border/70 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl shrink-0">🔬</span>
                          <p className="text-base sm:text-lg font-bangla text-foreground leading-relaxed">
                            {organ.funFact}
                          </p>
                        </div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="spiritual" className="mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-card rounded-2xl border border-border/70 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl shrink-0">🌙</span>
                          <p className="text-base sm:text-lg font-bangla text-foreground leading-relaxed">
                            {organ.spiritualReflection}
                          </p>
                        </div>
                      </motion.div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-5 pt-0 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-bangla">খুদে ডাক্তার পাঠশালা</span>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className={`px-5 py-2.5 rounded-xl ${colors.accent} text-white font-bangla font-semibold shadow-sm text-sm sm:text-base`}
                >
                  বুঝেছি, ধন্যবাদ!
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
