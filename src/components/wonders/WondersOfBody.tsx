import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  User, 
  Gamepad2, 
  Home,
  Trophy,
  CheckCircle2, 
  Activity,
  Stethoscope
} from "lucide-react";
import { 
  organsData, 
  learningChapters, 
  type Organ 
} from "@/data/organsData";
import { OrganCard } from "./OrganCard";
import { HomeHub } from "./HomeHub";
import { IntroSequence } from "./IntroSequence";
import { OrganModal } from "./OrganModal";
import { BodySilhouette } from "./BodySilhouette";
import { QuizMode } from "./QuizMode";
import { soundEffects } from "@/utils/soundEffects";

type ViewMode = "home" | "chapters" | "body" | "quiz-select";
type QuizModeType = "quick" | "challenge" | null;

export const WondersOfBody = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("home");
  const [showIntro, setShowIntro] = useState(true);
  const [selectedOrgan, setSelectedOrgan] = useState<Organ | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quizMode, setQuizMode] = useState<QuizModeType>(null);

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
    setSelectedOrgan(organ);
    setIsModalOpen(true);

    // Mark as explored
    if (!exploredIds.includes(organ.id)) {
      setExploredIds((prev) => [...prev, organ.id]);
    }
  };

  const exploredCount = exploredIds.length;
  const totalCount = organsData.length;
  const progressPercent = Math.round((exploredCount / totalCount) * 100);

  const changeView = (view: ViewMode) => {
    soundEffects.playPop();
    setViewMode(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedOrgan(null), 300);
  };

  const finishIntro = () => setShowIntro(false);

  if (showIntro) return <IntroSequence onFinish={finishIntro} />;

  // Active Quiz View
  if (quizMode) {
    return (
      <div className="min-h-screen bg-background pb-20 md:pb-0">
        <QuizMode mode={quizMode} onExit={() => setQuizMode(null)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col selection:bg-primary/20">
      
      {/* 1. App Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/80 shadow-xs">
        <div className="container mx-auto px-3 sm:px-4 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            
            {/* Title & Brand Icon */}
            <button type="button" onClick={() => changeView("home")} className="flex items-center gap-2.5 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" aria-label="খুদে ডাক্তার হোম">
              <div className="flex items-center gap-2.5">
                <div className="p-2 sm:p-2.5 rounded-2xl bg-emerald-600 text-white shrink-0 shadow-sm">
                  <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="flex flex-col items-start leading-none">
                  <div className="flex items-baseline gap-1.5 sm:gap-2">
                    <h1 className="font-bangla font-black text-lg sm:text-xl text-foreground tracking-tight">
                      খুদে ডাক্তার
                    </h1>
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-wide text-emerald-700 dark:text-emerald-300">
                      KhudeDoctor
                    </span>
                  </div>
                  <p className="mt-1.5 font-bangla font-semibold text-[10px] sm:text-xs text-muted-foreground tracking-tight">
                    মানবদেহের জাদুকরী পাঠশালা
                  </p>
                </div>
              </div>
            </button>

            {/* 2. Kid-Friendly Top Navigation Tabs (Zero Overflow, Fully Responsive) */}
            <div className="hidden md:flex w-full md:w-auto items-center justify-center gap-1.5">
              <nav 
                aria-label="প্রধান নেভিগেশন"
                className="flex items-center justify-center bg-muted/80 p-1 rounded-2xl border border-border/70 shadow-xs w-full md:w-auto"
              >
                <button type="button" onClick={() => changeView("home")} className="flex-1 md:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bangla font-bold bg-primary text-primary-foreground shadow-xs">
                  <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" /><span>হোম</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setViewMode("chapters");
                  }}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bangla font-bold transition-all ${
                    viewMode === "chapters"
                      ? "bg-primary text-primary-foreground shadow-xs scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>পাঠশালা</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setViewMode("body");
                  }}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bangla font-bold transition-all ${
                    viewMode === "body"
                      ? "bg-primary text-primary-foreground shadow-xs scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>শরীর</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playChime();
                    setViewMode("quiz-select");
                  }}
                  className={`flex-1 md:flex-initial flex items-center justify-center gap-1 sm:gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-bangla font-bold transition-all ${
                    viewMode === "quiz-select"
                      ? "bg-primary text-primary-foreground shadow-xs scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500" />
                  <span>মজার কুইজ</span>
                </button>
              </nav>
            </div>

          </div>
        </div>
      </header>

      {/* Main Learning Hub */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 flex-1 max-w-6xl pb-24 md:pb-6">

        {viewMode === "home" && (
          <HomeHub
            exploredCount={exploredCount}
            totalCount={totalCount}
            progressPercent={progressPercent}
            exploredIds={exploredIds}
            onNavigate={changeView}
            onOrganPick={(organId) => {
              const organ = organsData.find((item) => item.id === organId);
              if (organ) handleOrganClick(organ);
            }}
          />
        )}

        {/* View Routing */}
        <AnimatePresence mode="wait">
          
          {/* VIEW 1: Systematic Learning Chapters (Opens immediately with zero clutter) */}
          {viewMode === "chapters" && (
            <motion.div
              key="chapters"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6 sm:space-y-8"
            >
              {learningChapters.map((chapter) => {
                const chapterOrgans = organsData.filter((o) => chapter.organIds.includes(o.id));
                const exploredInChapter = chapterOrgans.filter((o) => exploredIds.includes(o.id)).length;
                const isAllDone = exploredInChapter === chapterOrgans.length;

                return (
                  <section 
                    key={chapter.id}
                    className="bg-card/70 rounded-3xl p-4 sm:p-6 border border-border/80 shadow-xs"
                  >
                    {/* Chapter Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3.5 mb-4 border-b border-border/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bangla font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/25">
                            {chapter.badge}
                          </span>
                          <h2 className="font-bangla font-black text-lg sm:text-xl text-foreground">
                            {chapter.title}
                          </h2>
                        </div>
                        <p className="text-xs sm:text-sm font-bangla text-muted-foreground mt-1">
                          {chapter.subtitle}
                        </p>
                      </div>

                      <div className={`flex items-center gap-1.5 self-start sm:self-auto px-3 py-1 rounded-full text-xs font-bangla font-bold shrink-0 ${
                        isAllDone 
                          ? "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border border-emerald-500/30" 
                          : "bg-muted text-muted-foreground"
                      }`}>
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isAllDone ? "text-emerald-600" : "text-muted-foreground"}`} />
                        <span>{exploredInChapter} / {chapterOrgans.length} চিনেছো</span>
                      </div>
                    </div>

                    {/* Organs in this chapter */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4">
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
              className="py-1"
            >
              <div className="text-center mb-4">
                <p className="text-foreground font-bangla text-xs sm:text-sm font-bold inline-flex items-center gap-2 bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/25">
                  <Activity className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>শরীরের যে অঙ্গটি দেখতে চাও, তার ওপর ট্যাপ করো!</span>
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
              className="max-w-xl mx-auto py-6 sm:py-8 text-center space-y-6"
            >
              <div className="space-y-2">
                <div className="inline-flex p-3 rounded-2xl bg-amber-500/15 text-amber-600 mb-1">
                  <Gamepad2 className="w-9 h-9" />
                </div>
                <h2 className="font-bangla font-black text-2xl sm:text-3xl text-foreground">
                  খুদে ডাক্তারের কুইজ পাঠশালা!
                </h2>
                <p className="font-bangla text-muted-foreground text-xs sm:text-sm max-w-md mx-auto">
                  তুমি তোমার শরীর সম্পর্কে কতটা শিখেছো? এসো মজার প্রশ্নের উত্তর দিয়ে নিজেকে যাচাই করি!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-left">
                {/* Quick Quiz Option */}
                <button
                  onClick={() => {
                    soundEffects.playChime();
                    setQuizMode("quick");
                  }}
                  className="p-5 rounded-3xl bg-card hover:bg-card/90 border-2 border-emerald-500/30 hover:border-emerald-600 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 group active:scale-98"
                >
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 w-fit group-hover:scale-110 transition-transform">
                    <span className="text-xl">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-bangla font-bold text-lg text-foreground">
                      দ্রুত কুইজ (৫টি প্রশ্ন)
                    </h3>
                    <p className="font-bangla text-xs text-muted-foreground mt-1 leading-relaxed">
                      সহজ ও মজার ৫টি প্রশ্ন! অল্প সময়ে সুন্দর অনুশীলনের জন্য সেরা।
                    </p>
                  </div>
                  <span className="mt-auto text-xs font-bangla font-bold text-emerald-600 flex items-center gap-1">
                    শুরু করো →
                  </span>
                </button>

                {/* Challenge Quiz Option */}
                <button
                  onClick={() => {
                    soundEffects.playChime();
                    setQuizMode("challenge");
                  }}
                  className="p-5 rounded-3xl bg-card hover:bg-card/90 border-2 border-amber-500/30 hover:border-amber-600 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 group active:scale-98"
                >
                  <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 w-fit group-hover:scale-110 transition-transform">
                    <span className="text-xl">🏆</span>
                  </div>
                  <div>
                    <h3 className="font-bangla font-bold text-lg text-foreground">
                      চ্যালেঞ্জ মোড (১৫টি প্রশ্ন)
                    </h3>
                    <p className="font-bangla text-xs text-muted-foreground mt-1 leading-relaxed">
                      সবগুলো অঙ্গ নিয়ে একটি পূর্ণাঙ্গ পরীক্ষা! সেরা ডাক্তার ব্যাজ জেতো।
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

      {/* Clean Educational Footer */}
      <footer className="hidden md:block bg-card border-t border-border/80 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="font-bangla text-muted-foreground text-xs sm:text-sm">
            আনন্দে শেখো এবং তোমার অসাধারণ শরীরের প্রতিটি নিয়ামতের জন্য সবসময় বলো{" "}
            <span className="font-bold text-foreground">আলহামদুলিল্লাহ</span>!
          </p>
        </div>
      </footer>

      <nav aria-label="মোবাইল নেভিগেশন" className="md:hidden fixed bottom-0 inset-x-0 z-50 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] bg-background/95 backdrop-blur-xl border-t border-border/80 shadow-[0_-6px_24px_rgba(0,0,0,0.08)]">
        <div className="max-w-lg mx-auto grid grid-cols-4 gap-1">
          <button type="button" onClick={() => changeView("home")} className={`flex flex-col items-center justify-center gap-0.5 min-h-14 rounded-2xl font-bangla text-[11px] font-bold active:scale-95 transition-all ${viewMode === "home" ? "bg-primary/12 text-primary" : "text-muted-foreground"}`}><Home className="w-5 h-5" /><span>হোম</span></button>
          <button type="button" onClick={() => changeView("chapters")} className={`flex flex-col items-center justify-center gap-0.5 min-h-14 rounded-2xl font-bangla text-[11px] font-bold active:scale-95 transition-all ${viewMode === "chapters" ? "bg-primary/12 text-primary" : "text-muted-foreground"}`}><BookOpen className="w-5 h-5" /><span>পাঠশালা</span></button>
          <button type="button" onClick={() => changeView("quiz-select")} className={`flex flex-col items-center justify-center gap-0.5 min-h-14 rounded-2xl font-bangla text-[11px] font-bold active:scale-95 transition-all ${viewMode === "quiz-select" ? "bg-primary/12 text-primary" : "text-muted-foreground"}`}><Gamepad2 className="w-5 h-5" /><span>কুইজ</span></button>
          <button type="button" onClick={() => changeView("body")} className={`flex flex-col items-center justify-center gap-0.5 min-h-14 rounded-2xl font-bangla text-[11px] font-bold active:scale-95 transition-all ${viewMode === "body" ? "bg-primary/12 text-primary" : "text-muted-foreground"}`}><User className="w-5 h-5" /><span>শরীর</span></button>
        </div>
      </nav>

      {/* Organ Detail Modal */}
      <OrganModal
        organ={selectedOrgan}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

    </div>
  );
};
