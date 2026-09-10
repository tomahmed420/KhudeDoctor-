import { motion, AnimatePresence } from "framer-motion";
import { X, Volume2, VolumeX, Sparkles, Lightbulb, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import type { Organ } from "@/data/organsData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTTS } from "@/hooks/useTTS";

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

  // Automatically speak when organ modal opens
  useEffect(() => {
    if (isOpen && organ) {
      const timer = setTimeout(() => {
        const textToSpeak = `${organ.name}। ইংরেজিতে ${organ.nameBn}। ${organ.simpleFunction}`;
        speak(textToSpeak);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      stop();
    }
  }, [isOpen, organ, speak, stop]);

  if (!organ) return null;

  const colors = colorClasses[organ.colorKey] || colorClasses.heart;
  const IconComponent = organ.icon;

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      let textToSpeak = `${organ.name}। `;
      if (activeTab === "function") {
        textToSpeak += organ.simpleFunction;
      } else if (activeTab === "fact") {
        textToSpeak += `মজার তথ্য: ${organ.funFact}`;
      } else if (activeTab === "spiritual") {
        textToSpeak += `সুবহানাল্লাহ: ${organ.spiritualReflection}`;
      }
      speak(textToSpeak);
    }
  };

  const handleClose = () => {
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
              className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50"
            />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed inset-3 sm:inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-lg md:w-full z-50 flex items-center justify-center pointer-events-none"
          >
            <div className={`${colors.bg} rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] w-full overflow-y-auto pointer-events-auto border-2 border-white/60`}>
              {/* Header */}
              <div className={`${colors.accent} p-4 sm:p-6 text-primary-foreground relative shadow-sm`}>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleClose}
                  aria-label="বন্ধ করুন"
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors"
                >
                  <X size={20} />
                </motion.button>

                <div className="flex items-center gap-3 sm:gap-4 pr-10">
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    className="p-3 sm:p-4 rounded-2xl bg-primary-foreground/20 shrink-0 shadow-inner"
                  >
                    <IconComponent size={36} className="sm:w-12 sm:h-12" />
                  </motion.div>
                  <div className="min-w-0">
                    <h2 className="font-bubblegum text-2xl sm:text-3xl leading-tight truncate">{organ.name}</h2>
                    <p className="text-base sm:text-lg opacity-95 font-bangla font-semibold">{organ.nameBn}</p>
                  </div>
                </div>

                {isSupported && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSpeak}
                    title={isSpeaking ? "শব্দ বন্ধ করুন" : "শুনুন"}
                    className={`mt-3 sm:mt-0 sm:absolute sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 sm:p-2.5 rounded-full text-xs sm:text-sm font-bangla font-medium transition-all shadow-sm ${
                      isSpeaking 
                        ? 'bg-primary-foreground text-foreground animate-pulse font-bold' 
                        : 'bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground'
                    }`}
                  >
                    {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    <span>{isSpeaking ? "বন্ধ করুন" : "শুনুন"}</span>
                  </motion.button>
                )}
              </div>

              {/* Content Tabs */}
              <div className="p-4 sm:p-6">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="w-full flex sm:grid sm:grid-cols-3 bg-muted/90 rounded-2xl p-1 gap-1 h-auto overflow-x-auto">
                    <TabsTrigger 
                      value="function" 
                      className="flex-1 min-w-[105px] py-2 sm:py-2.5 px-2 rounded-xl font-bangla text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
                    >
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 shrink-0 text-amber-500" />
                      <span className="whitespace-nowrap">কীভাবে কাজ করি</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="fact" 
                      className="flex-1 min-w-[90px] py-2 sm:py-2.5 px-2 rounded-xl font-bangla text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
                    >
                      <Lightbulb className="w-3.5 h-3.5 mr-1.5 shrink-0 text-amber-500" />
                      <span className="whitespace-nowrap">মজার তথ্য</span>
                    </TabsTrigger>
                    <TabsTrigger 
                      value="spiritual" 
                      className="flex-1 min-w-[90px] py-2 sm:py-2.5 px-2 rounded-xl font-bangla text-xs sm:text-sm font-semibold transition-all data-[state=active]:bg-card data-[state=active]:shadow-sm data-[state=active]:text-primary"
                    >
                      <Heart className="w-3.5 h-3.5 mr-1.5 shrink-0 text-rose-500" />
                      <span className="whitespace-nowrap">সুবহানাল্লাহ</span>
                    </TabsTrigger>
                  </TabsList>

                  <div className="mt-4 sm:mt-6">
                    <TabsContent value="function" className="mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 sm:p-5 bg-card rounded-2xl border border-border shadow-sm"
                      >
                        <p className="text-base sm:text-lg font-bangla text-foreground leading-relaxed">
                          {organ.simpleFunction}
                        </p>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="fact" className="mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 sm:p-5 bg-card rounded-2xl border border-border shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl sm:text-3xl shrink-0">🔬</span>
                          <p className="text-base sm:text-lg font-bangla text-foreground leading-relaxed">
                            {organ.funFact}
                          </p>
                        </div>
                      </motion.div>
                    </TabsContent>

                    <TabsContent value="spiritual" className="mt-0">
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 sm:p-5 bg-card rounded-2xl border border-border shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl sm:text-3xl shrink-0">🌙</span>
                          <p className="text-base sm:text-lg font-bangla text-foreground leading-relaxed italic">
                            {organ.spiritualReflection}
                          </p>
                        </div>
                      </motion.div>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              {/* Footer */}
              <div className="p-4 sm:p-6 pt-0 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleClose}
                  className={`px-5 py-2.5 rounded-xl ${colors.accent} text-primary-foreground font-bangla font-semibold shadow-sm text-sm sm:text-base`}
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
