import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Gamepad2, Sparkles, Trophy, UserRound } from "lucide-react";
import { funFactSnippets, organsData } from "@/data/organsData";

interface HomeHubProps {
  exploredCount: number;
  totalCount: number;
  progressPercent: number;
  onNavigate: (view: "chapters" | "body" | "quiz-select") => void;
  onOrganPick: (organId: string) => void;
}

export const HomeHub = ({
  exploredCount,
  totalCount,
  progressPercent,
  onNavigate,
  onOrganPick,
}: HomeHubProps) => {
  const nextOrgan = organsData.find((organ) => !exploredCount || !exploredCount) ?? organsData[0];
  const firstUnexplored = organsData.find((organ) => !window.localStorage.getItem("wonders_body_explored_v1")?.includes(organ.id)) ?? organsData[0];
  const funFact = funFactSnippets[exploredCount % funFactSnippets.length];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-background to-amber-500/10 p-5 sm:p-8">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/15 blur-2xl" />
        <div className="absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-amber-400/15 blur-2xl" />
        <div className="relative z-10 grid items-center gap-5 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-bangla font-bold text-emerald-700 dark:text-emerald-300">
              ✨ মানবদেহের মজার অভিযান
            </span>
            <h2 className="mt-3 font-bangla text-2xl font-black leading-tight sm:text-4xl">
              হাই, খুদে ডাক্তার! 👋
            </h2>
            <p className="mt-2 max-w-xl font-bangla text-sm font-semibold leading-relaxed text-muted-foreground sm:text-base">
              নিজের শরীরের ভেতরের আশ্চর্য জগতটা আজ একটু আবিষ্কার করবে?
            </p>
            <button
              type="button"
              onClick={() => onOrganPick(firstUnexplored.id)}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 font-bangla text-sm font-black text-white shadow-md transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              🚀 অভিযান শুরু করি <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-xs items-center justify-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-emerald-500/20 bg-card/80 shadow-lg sm:h-52 sm:w-52">
              <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }} className="text-7xl sm:text-8xl">
                🧑‍⚕️
              </motion.div>
              <motion.span animate={{ y: [-4, 4, -4], rotate: [0, 8, 0] }} transition={{ duration: 2.2, repeat: Infinity }} className="absolute -left-2 top-6 text-3xl">🫀</motion.span>
              <motion.span animate={{ y: [4, -4, 4], rotate: [0, -8, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="absolute -right-1 top-10 text-3xl">🧠</motion.span>
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="absolute bottom-5 right-5 text-3xl">🫁</motion.span>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-500/25 bg-amber-500/10 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-amber-500/15 p-2.5 text-xl">🚀</div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-bangla text-xs font-bold text-amber-700 dark:text-amber-300">আজকের অভিযান</p>
                <h3 className="font-bangla text-lg font-black">একটা নতুন অঙ্গ আবিষ্কার করো!</h3>
              </div>
              <button type="button" onClick={() => onOrganPick(firstUnexplored.id)} className="rounded-xl px-3 py-2 font-bangla text-xs font-black text-amber-700 hover:bg-amber-500/10 dark:text-amber-300">
                শুরু → 
              </button>
            </div>
            <p className="mt-1 font-bangla text-xs leading-relaxed text-muted-foreground">
              {firstUnexplored.name} কী কাজ করে, তার মজার তথ্য আর ছোট্ট রহস্য জেনে নাও।
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-bangla text-base font-black sm:text-lg">কী করতে চাও?</h3>
          <Sparkles className="h-5 w-5 text-amber-500" />
        </div>
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
          <button type="button" onClick={() => onNavigate("chapters")} className="group rounded-2xl border border-emerald-500/20 bg-card p-3 text-center shadow-xs transition-all hover:-translate-y-0.5 hover:border-emerald-500/40 active:scale-95 sm:p-4">
            <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600"><BookOpen className="h-5 w-5" /></div>
            <span className="font-bangla text-xs font-black sm:text-sm">পাঠশালা</span>
          </button>
          <button type="button" onClick={() => onNavigate("quiz-select")} className="group rounded-2xl border border-amber-500/20 bg-card p-3 text-center shadow-xs transition-all hover:-translate-y-0.5 hover:border-amber-500/40 active:scale-95 sm:p-4">
            <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600"><Gamepad2 className="h-5 w-5" /></div>
            <span className="font-bangla text-xs font-black sm:text-sm">কুইজ খেলি</span>
          </button>
          <button type="button" onClick={() => onNavigate("body")} className="group rounded-2xl border border-sky-500/20 bg-card p-3 text-center shadow-xs transition-all hover:-translate-y-0.5 hover:border-sky-500/40 active:scale-95 sm:p-4">
            <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600"><UserRound className="h-5 w-5" /></div>
            <span className="font-bangla text-xs font-black sm:text-sm">শরীর দেখো</span>
          </button>
        </div>
      </section>

      <div className="grid gap-3 md:grid-cols-2">
        <section className="rounded-3xl border border-border/80 bg-card p-4 shadow-xs sm:p-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bangla text-xs font-bold text-muted-foreground"><Trophy className="h-4 w-4 text-amber-500" /> আমার অগ্রগতি</span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 font-bangla text-[10px] font-extrabold text-primary">{progressPercent}%</span>
          </div>
          <div className="mb-1.5 flex items-center justify-between font-bangla text-xs font-bold sm:text-sm">
            <span>{exploredCount}/{totalCount}টি অঙ্গ চিনেছো</span><span>{progressPercent}%</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-muted"><motion.div className="h-full rounded-full bg-primary" animate={{ width: progressPercent + "%" }} /></div>
        </section>

        <section className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-4 shadow-xs sm:p-5">
          <div className="flex items-start gap-3">
            <span className="text-xl">✨</span>
            <div>
              <p className="font-bangla text-xs font-bold text-violet-700 dark:text-violet-300">তুমি কি জানতে?</p>
              <p className="mt-1 font-bangla text-xs font-semibold leading-relaxed sm:text-sm">{funFact.fact}</p>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
};