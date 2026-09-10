import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  User, 
  Gamepad2, 
  Sparkles, 
  RefreshCw, 
  Trophy, 
  CheckCircle2, 
  Activity,
  HeartHandshake,
  Stethoscope
} from "lucide-react";
import { 
  organsData, 
  learningChapters, 
  funFactSnippets, 
  type Organ 
} from "@/data/organsData";
import { OrganCard } from "./OrganCard";
import { OrganModal } from "./OrganModal";
import { BodySilhouette } from "./BodySilhouette";
import { QuizMode } from "./QuizMode";
import { soundEffects } from "@/utils/soundEffects";
import { Button } from "@/components/ui/button";

type ViewMode = "chapters" | "body" | "quiz-select";
type QuizModeType = "quick" | "challenge" | null;

export const WondersOfBody = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("chapters");
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizMode, setQuizMode] = useState<QuizModeType>(null);
  
  // Daily / Rotating fun fact index
  const [currentFactIdx, setCurrentFactIdx] = useState(0);

  // Learning progress tracker
  const [exploredIds, setExploredIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("wonders_body_explored_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save progress on change
  useEffect(() => {
    try {
      localStorage.setItem("wonders_body_explored_v1", JSON.stringify(exploredIds));
    } catch {
      // Ignore storage errors
    }
  }, [exploredIds]);

  const handleOrganClick = (organ: Organ) => {
    soundEffects.playPop();
    setSelectedOrgan(organ);
    setIsModalOpen(true);

    // Mark as explored
    if (!exploredIds.includes(organ.id)) {
      setExploredIds((prev) => [...prev, organ.id]);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedOrgan(null), 300);
  };

  const handleNextFact = () => {
    soundEffects.playPop();
    setCurrentFactIdx((prev) => (prev + 1) % funFactSnippets.length);
  };

  // Active Quiz View
  if (quizMode) {
    return (
      <div className="min-h-screen bg-background">
        <QuizMode mode={quizMode} onExit={() => setQuizMode(null)} />
      </div>
    );
  }

  const exploredCount = exploredIds.length;
  const totalCount = organsData.length;
  const progressPercent = Math.round((exploredCount / totalCount) * 100);

  // Kid-friendly rank title
  const getRankTitle = () => {
    if (exploredCount === totalCount) return "🏆 মানবদেহ সুপার মাস্টার!";
    if (exploredCount >= 12) return "🥇 শরীর বিশেষজ্ঞ বিজ্ঞানী";
    if (exploredCount >= 6) return "🥈 কৌতূহলী খুদে গবেষক";
    if (exploredCount >= 1) return "🥉 প্রাথমিক অভিযাত্রী";
    return "🌱 নতুন শিক্ষার্থী";
  };

  const currentFact = funFactSnippets[currentFactIdx];

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      
      {/* 1. App Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/80 shadow-xs">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Title & Meaningful Anatomy Icon */}
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="p-2.5 rounded-2xl bg-primary/10 text-primary shrink-0 shadow-xs">
                <Stethoscope className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="font-bangla font-black text-xl sm:text-2xl text-foreground tracking-tight leading-tight">
                    খুদে ডাক্তার
                  </h1>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 tracking-wide uppercase">
                    KhudeDoctor
                  </span>
                </div>
                <p className="text-muted-foreground font-bangla font-semibold text-xs sm:text-sm mt-0.5">
                  মানবদেহের জাদুকরী পাঠশালা • এসো নিজের শরীরকে জানি!
                </p>
              </div>
            </div>

            {/* 2. Mobile-Friendly Segmented View Switcher (Zero Overflow) */}
            <nav 
              aria-label="প্রধান নেভিগেশন"
              className="w-full md:w-auto flex items-center justify-center bg-muted/80 p-1 rounded-2xl border border-border/70 shadow-xs"
            >
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setViewMode("chapters");
                }}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bangla font-bold transition-all ${
                  viewMode === "chapters"
                    ? "bg-primary text-primary-foreground shadow-xs scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>অঙ্গ পাঠশালা</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setViewMode("body");
                }}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bangla font-bold transition-all ${
                  viewMode === "body"
                    ? "bg-primary text-primary-foreground shadow-xs scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <User className="w-4 h-4" />
                <span>মানবদেহ মডেল</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playChime();
                  setViewMode("quiz-select");
                }}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bangla font-bold transition-all ${
                  viewMode === "quiz-select"
                    ? "bg-primary text-primary-foreground shadow-xs scale-[1.02]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                <Gamepad2 className="w-4 h-4 text-amber-500" />
                <span>মজার কুইজ</span>
              </button>
            </nav>

          </div>
        </div>
      </header>

      {/* Main Learning Hub */}
      <main className="container mx-auto px-4 py-5 flex-1 max-w-6xl">
        
        {/* Progress Tracker & Wonder of the Day Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-6">
          
          {/* Progress Tracker Box */}
          <div className="md:col-span-6 bg-card p-4 rounded-2xl border border-border/80 shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bangla font-bold text-muted-foreground flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-500" />
                আমার অর্জিত অগ্রগতি
              </span>
              <span className="text-xs font-bangla font-extrabold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {getRankTitle()}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bangla font-bold text-foreground">
                <span>তুমি {totalCount}টির মধ্যে {exploredCount}টি অঙ্গ চিনেছো</span>
                <span>{progressPercent}% সম্পূর্ণ</span>
              </div>
              <div className="w-full h-2.5 bg-muted rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* "Did you know?" (তুমি কি জানতে?) Interactive Fact Card */}
          <div className="md:col-span-6 bg-amber-500/10 dark:bg-amber-950/25 p-4 rounded-2xl border border-amber-500/30 shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bangla font-bold text-amber-700 dark:text-amber-300 block">
                  তুমি কি জানতে? ({currentFact.organ})
                </span>
                <p className="text-xs sm:text-sm font-bangla text-foreground/90 font-medium leading-snug mt-0.5">
                  {currentFact.fact}
                </p>
              </div>
            </div>

            <button
              onClick={handleNextFact}
              title="অন্য তথ্য দেখো"
              className="p-2 rounded-xl bg-card hover:bg-card/80 text-muted-foreground hover:text-foreground border border-border shrink-0 shadow-xs transition-transform active:scale-95"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* View Routing */}
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: Systematic Learning Chapters */}
          {viewMode === "chapters" && (
            <motion.div
              key="chapters"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-8"
            >
              {learningChapters.map((chapter, chapIdx) => {
                const chapterOrgans = organsData.filter((o) => chapter.organIds.includes(o.id));
                const exploredInChapter = chapterOrgans.filter((o) => exploredIds.includes(o.id)).length;

                return (
                  <section 
                    key={chapter.id}
                    className="bg-card/40 rounded-3xl p-4 sm:p-6 border border-border/70 shadow-xs"
                  >
                    {/* Chapter Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-5 border-b border-border/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bangla font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                            {chapter.badge}
                          </span>
                          <h2 className="font-bangla font-black text-lg sm:text-xl text-foreground">
                            {chapter.title}
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm font-bangla text-muted-foreground mt-0.5">
                          {chapter.subtitle}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 self-start sm:self-auto bg-muted/70 px-3 py-1 rounded-full text-xs font-bangla font-bold text-muted-foreground shrink-0">
                        <CheckCircle2 className={`w-3.5 h-3.5 ${exploredInChapter === chapterOrgans.length ? "text-emerald-500" : "text-muted-foreground"}`} />
                        <span>{exploredInChapter} / {chapterOrgans.length} শেখা হয়েছে</span>
                      </div>
                    </div>

                    {/* Organs in this chapter */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
                      {chapterOrgans.map((organ) => (
                        <OrganCard
                          key={organ.id}
                          organ={organ}
                          onClick={() => handleOrganClick(organ)}
                          isExplored={exploredIds.includes(organ.id)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </motion.div>
          )}

          {/* VIEW 2: Human Body Silhouette Explorer */}
          {viewMode === "body" && (
            <motion.div
              key="body"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              className="py-2"
            >
              <div className="text-center mb-5">
                <p className="text-foreground font-bangla text-sm sm:text-base font-bold inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                  <Activity className="w-4 h-4 text-primary animate-pulse" />
                  <span>শরীরের যে অঙ্গটি সম্পর্কে জানতে চাও, তাতে ছুঁয়ে দাও!</span>
                </p>
              </div>

              <BodySilhouette organs={organsData} onOrganClick={handleOrganClick} />
            </motion.div>
          )}

          {/* VIEW 3: Quiz Selection Mission Hub */}
          {viewMode === "quiz-select" && (
            <motion.div
              key="quiz-select"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-xl mx-auto py-8 text-center space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-accent/30 text-accent-foreground mb-1">
                  <Gamepad2 className="w-10 h-10 text-primary" />
                </div>
                <h2 className="font-bangla font-black text-2xl sm:text-3xl text-foreground">
                  খুদে বিজ্ঞানীর কুইজ মিশন!
                </h2>
                <p className="font-bangla text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
                  তুমি তোমার শরীর সম্পর্কে কতটা জানো? এসো মজার প্রশ্নগুলোর উত্তর দিয়ে নিজেকে পরীক্ষা করি!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                {/* Quick Quiz Option */}
                <button
                  onClick={() => {
                    soundEffects.playChime();
                    setQuizMode("quick");
                  }}
                  className="p-5 rounded-3xl bg-card hover:bg-card/90 border-2 border-primary/40 hover:border-primary shadow-sm hover:shadow-md transition-all flex flex-col gap-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bangla font-bold text-lg text-foreground">
                      ⚡ দ্রুত কুইজ
                    </h3>
                    <p className="font-bangla text-xs text-muted-foreground mt-1">
                      ৫টি সহজ ও মজার প্রশ্ন! কম সময়ে শেখার জন্য দারুণ।
                    </p>
                  </div>
                  <span className="mt-auto text-xs font-bangla font-bold text-primary flex items-center gap-1">
                    শুরু করো →
                  </span>
                </button>

                {/* Challenge Quiz Option */}
                <button
                  onClick={() => {
                    soundEffects.playChime();
                    setQuizMode("challenge");
                  }}
                  className="p-5 rounded-3xl bg-card hover:bg-card/90 border-2 border-amber-500/40 hover:border-amber-500 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 group"
                >
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 w-fit group-hover:scale-110 transition-transform">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bangla font-bold text-lg text-foreground">
                      🏆 চ্যালেঞ্জ মোড
                    </h3>
                    <p className="font-bangla text-xs text-muted-foreground mt-1">
                      ১৫টি প্রশ্ন, সবকটি অঙ্গ নিয়ে একটি পূর্ণাঙ্গ পরীক্ষা!
                    </p>
                  </div>
                  <span className="mt-auto text-xs font-bangla font-bold text-amber-600 flex items-center gap-1">
                    চ্যালেঞ্জ নাও →
                  </span>
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

      </main>

      {/* Clean Footer */}
      <footer className="bg-card border-t border-border/80 py-5 mt-10">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bangla text-muted-foreground text-xs sm:text-sm">
            আনন্দে শেখো এবং তোমার অসাধারণ শরীরের প্রতিটি নিয়ামতের জন্য সবসময় বলো{" "}
            <span className="font-bold text-foreground">আলহামদুলিল্লাহ</span>!
          </p>
        </div>
      </footer>

      {/* Organ Detail Modal */}
      <OrganModal
        organ={selectedOrgan}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};
