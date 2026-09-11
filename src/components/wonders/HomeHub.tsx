import { ArrowRight, BookOpen, Gamepad2, Sparkles, Trophy, UserRound } from "lucide-react";
import { funFactSnippets, organsData } from "@/data/organsData";

interface HomeHubProps {
  exploredCount: number;
  totalCount: number;
  progressPercent: number;
  exploredIds: string[];
  onNavigate: (view: "chapters" | "body" | "quiz-select") => void;
  onOrganPick: (organId: string) => void;
}

export const HomeHub = ({
  exploredCount,
  totalCount,
  progressPercent,
  exploredIds,
  onNavigate,
  onOrganPick,
}: HomeHubProps) => {
  const firstUnexplored = organsData.find((organ) => !exploredIds.includes(organ.id)) ?? organsData[0];
  const funFact = funFactSnippets[exploredCount % funFactSnippets.length];

  return (
    <div className="space-y-4 sm:space-y-6">
      <section className="relative overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-background to-amber-500/10 p-5 sm:p-8">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-400/15 blur-2xl" />
        <div className="absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-amber-400/15 blur-2xl" />
        <div className="relative z-10 grid items-center gap-5 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-[11px] font-bangla font-bold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="h-3.5 w-3.5" /> মানবদেহের মজার জগৎ
            </span>
            <h2 className="mt-3 font-bangla text-2xl font-black leading-tight sm:text-4xl">
              হাই, খুদে ডাক্তার!
            </h2>
            <p className="mt-2 max-w-xl font-bangla text-sm font-semibold leading-relaxed text-muted-foreground sm:text-base">
              নিজের শরীরের ভেতরের আশ্চর্য জগতটা আজ একটু আবিষ্কার করবে?
            </p>
            <button
              type="button"
              onClick={() => onOrganPick(firstUnexplored.id)}
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 font-bangla text-sm font-black text-white shadow-md transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              শুরু করি <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mx-auto flex w-full max-w-xs items-center justify-center">
            <div className="relative h-44 w-44 sm:h-52 sm:w-52 animate-kd-float" aria-label="খুদে ডাক্তার লোগো">
              <svg viewBox="0 0 240 240" className="h-full w-full overflow-visible" role="img" aria-hidden="true">
                <defs>
                  <linearGradient id="kd-card" x1="20" y1="10" x2="210" y2="235" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#6fd8ff" />
                    <stop offset="0.5" stopColor="#39bff4" />
                    <stop offset="1" stopColor="#159fe0" />
                  </linearGradient>
                  <linearGradient id="kd-edge" x1="25" y1="15" x2="210" y2="225" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ffffff" stopOpacity="0.96" />
                    <stop offset="0.5" stopColor="#d8f5ff" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#8edfff" stopOpacity="0.92" />
                  </linearGradient>
                  <linearGradient id="kd-plus" x1="90" y1="76" x2="158" y2="144" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ff7474" />
                    <stop offset="0.55" stopColor="#ff4e4e" />
                    <stop offset="1" stopColor="#e62f3f" />
                  </linearGradient>
                  <linearGradient id="kd-tube" x1="55" y1="50" x2="150" y2="188" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#6ff0dc" />
                    <stop offset="0.55" stopColor="#22c8b1" />
                    <stop offset="1" stopColor="#0e9f93" />
                  </linearGradient>
                  <filter id="kd-shadow" x="-30%" y="-30%" width="160%" height="180%">
                    <feDropShadow dx="0" dy="8" stdDeviation="7" floodColor="#0c5d86" floodOpacity="0.28" />
                  </filter>
                  <filter id="kd-soft" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="7" />
                  </filter>
                </defs>

                <ellipse cx="120" cy="222" rx="62" ry="10" fill="#0b6f98" opacity="0.16" filter="url(#kd-soft)" />

                <g filter="url(#kd-shadow)">
                  <rect x="26" y="18" width="188" height="188" rx="43" fill="url(#kd-edge)" />
                  <rect x="35" y="27" width="170" height="170" rx="36" fill="url(#kd-card)" />
                  <path d="M48 34h94c28 0 50 22 50 50v9c-19-21-48-34-81-34-31 0-57 9-76 25V70c0-20 7-31 13-36Z" fill="#fff" opacity="0.18" />
                  <path d="M39 160c35 18 86 24 166-9v35c0 6-5 11-11 11H47c-5 0-8-4-8-9Z" fill="#087fba" opacity="0.14" />

                  <g fill="none" stroke="url(#kd-tube)" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M73 69c-14 6-18 20-14 35l8 25c4 13 15 21 29 21h24c14 0 25-7 29-20l7-24c4-14 0-27-14-35" />
                    <path d="M91 145c-3 17 7 27 23 27h7c12 0 19-6 19-16" />
                  </g>
                  <circle cx="70" cy="69" r="8" fill="#18bba7" />
                  <circle cx="143" cy="69" r="8" fill="#18bba7" />

                  <circle cx="106" cy="101" r="31" fill="#9be7f6" stroke="#eaffff" strokeWidth="5" />
                  <circle cx="95" cy="91" r="10" fill="#dffbff" opacity="0.75" />
                  <circle cx="97" cy="102" r="3.7" fill="#1d4255" />
                  <circle cx="117" cy="102" r="3.7" fill="#1d4255" />
                  <path d="M98 114c6 7 13 7 19 0" fill="none" stroke="#1d4255" strokeWidth="4" strokeLinecap="round" />

                  <path d="M151 83h23c7 0 12 5 12 12v23c0 7-5 12-12 12h-23c-7 0-12-5-12-12V95c0-7 5-12 12-12Z" fill="url(#kd-plus)" />
                  <path d="M158 91h9v9h9v10h-9v10h-10v-10h-9V100h10Z" fill="#fff" />

                  <text x="120" y="173" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="17" fontWeight="900" letterSpacing="0.7" fill="#fff">KHUDE</text>
                  <text x="120" y="190" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="21" fontWeight="900" letterSpacing="0.2" fill="#fff">DOCTOR</text>
                </g>

                <motion.g animate={{ opacity: [0.55, 1, 0.55], scale: [0.96, 1.05, 0.96] }} transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "198px 45px" }}>
                  <circle cx="198" cy="45" r="4" fill="#ffd24a" />
                  <path d="M198 33v24M186 45h24" stroke="#ffd24a" strokeWidth="3" strokeLinecap="round" />
                </motion.g>
                <motion.g animate={{ opacity: [0.35, 0.9, 0.35], y: [0, -4, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
                  <circle cx="28" cy="75" r="3.5" fill="#ff6d83" />
                  <circle cx="214" cy="153" r="4" fill="#55d6a8" />
                </motion.g>
              </svg>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-amber-500/25 bg-amber-500/10 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-amber-500/15 p-2.5"><ArrowRight className="h-5 w-5 text-amber-600" /></div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-bangla text-xs font-bold text-amber-700 dark:text-amber-300">আজ কী শিখব?</p>
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
          <div className="h-2.5 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${progressPercent}%` }} /></div>
        </section>

        <section className="rounded-3xl border border-violet-500/20 bg-violet-500/5 p-4 shadow-xs sm:p-5">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" />
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