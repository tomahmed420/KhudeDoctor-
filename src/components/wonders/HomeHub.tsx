import { motion } from "framer-motion";
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 sm:space-y-6">
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
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: [0, -5, 0], scale: 1, rotate: [-0.7, 0.7, -0.7] }}
              transition={{
                opacity: { duration: 0.45 },
                scale: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="relative h-48 w-48 sm:h-60 sm:w-60"
              style={{ perspective: "900px" }}
              aria-label="খুদে ডাক্তার 3D লোগো"
            >
              <motion.div
                animate={{ rotateX: [0, 1.5, 0], rotateY: [-1.5, 1.5, -1.5] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                <svg viewBox="0 0 280 280" className="h-full w-full overflow-visible drop-shadow-[0_18px_22px_rgba(18,91,120,0.18)]" role="img" aria-hidden="true">
                  <defs>
                    <linearGradient id="kd3-edge" x1="35" y1="25" x2="245" y2="260" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ffffff"/>
                      <stop offset=".42" stopColor="#f8fdff"/>
                      <stop offset=".75" stopColor="#d8f4ff"/>
                      <stop offset="1" stopColor="#9bdff5"/>
                    </linearGradient>
                    <linearGradient id="kd3-face" x1="45" y1="35" x2="235" y2="245" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#71dcff"/>
                      <stop offset=".42" stopColor="#43c7f6"/>
                      <stop offset="1" stopColor="#159bdc"/>
                    </linearGradient>
                    <linearGradient id="kd3-plus" x1="145" y1="95" x2="215" y2="170" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#ff7b78"/>
                      <stop offset=".5" stopColor="#ff4b4b"/>
                      <stop offset="1" stopColor="#d92d3c"/>
                    </linearGradient>
                    <linearGradient id="kd3-tube" x1="78" y1="65" x2="175" y2="205" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#72f4df"/>
                      <stop offset=".5" stopColor="#22cdb5"/>
                      <stop offset="1" stopColor="#0d968e"/>
                    </linearGradient>
                    <radialGradient id="kd3-face-shine" cx="32%" cy="20%" r="82%">
                      <stop stopColor="#ffffff" stopOpacity=".46"/>
                      <stop offset=".45" stopColor="#ffffff" stopOpacity=".08"/>
                      <stop offset="1" stopColor="#006ea8" stopOpacity=".12"/>
                    </radialGradient>
                    <filter id="kd3-depth" x="-35%" y="-35%" width="170%" height="190%">
                      <feDropShadow dx="0" dy="11" stdDeviation="8" floodColor="#0b587b" floodOpacity=".30"/>
                    </filter>
                    <filter id="kd3-soft" x="-60%" y="-60%" width="220%" height="220%">
                      <feGaussianBlur stdDeviation="8"/>
                    </filter>
                  </defs>

                  <ellipse cx="140" cy="255" rx="82" ry="13" fill="#116b8f" opacity=".17" filter="url(#kd3-soft)"/>

                  <g filter="url(#kd3-depth)">
                    <!-- thick glossy outer shell -->
                    <rect x="28" y="22" width="224" height="224" rx="52" fill="url(#kd3-edge)"/>
                    <rect x="39" y="33" width="202" height="202" rx="43" fill="#bcecff" opacity=".62"/>
                    <rect x="45" y="39" width="190" height="190" rx="39" fill="url(#kd3-face)"/>
                    <rect x="45" y="39" width="190" height="190" rx="39" fill="url(#kd3-face-shine)"/>

                    <!-- glass-like highlight and bottom depth -->
                    <path d="M57 48h105c34 0 61 27 61 61v18c-23-28-57-44-98-44-29 0-53 7-68 18V72c0-14 2-20 0-24Z" fill="#fff" opacity=".19"/>
                    <path d="M46 185c42 24 108 27 189-12v35c0 12-9 21-21 21H68c-12 0-22-9-22-21Z" fill="#0879b3" opacity=".15"/>

                    <!-- stethoscope -->
                    <g fill="none" stroke="url(#kd3-tube)" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M86 82c-17 7-23 23-18 40l9 29c5 16 18 25 35 25h27c17 0 31-10 36-27l8-28c5-17-1-32-18-39"/>
                      <path d="M105 174c-4 18 6 31 25 31h9c14 0 23-8 23-20"/>
                    </g>
                    <circle cx="84" cy="82" r="10" fill="#16bba5"/>
                    <circle cx="166" cy="82" r="10" fill="#16bba5"/>
                    <circle cx="84" cy="80" r="4" fill="#9affed" opacity=".8"/>
                    <circle cx="166" cy="80" r="4" fill="#9affed" opacity=".8"/>

                    <!-- cute stethoscope head -->
                    <circle cx="124" cy="121" r="39" fill="#a9ecf7" stroke="#f3feff" strokeWidth="6"/>
                    <circle cx="113" cy="108" r="13" fill="#e8fdff" opacity=".82"/>
                    <circle cx="114" cy="121" r="4.6" fill="#193f52"/>
                    <circle cx="138" cy="121" r="4.6" fill="#193f52"/>
                    <circle cx="112.5" cy="119.5" r="1.4" fill="#fff"/>
                    <circle cx="136.5" cy="119.5" r="1.4" fill="#fff"/>
                    <path d="M114 136c7 8 16 8 23 0" fill="none" stroke="#1a4354" strokeWidth="4.8" strokeLinecap="round"/>

                    <!-- glossy red medical plus -->
                    <path d="M174 99h29c10 0 17 7 17 17v29c0 10-7 17-17 17h-29c-10 0-17-7-17-17v-29c0-10 7-17 17-17Z" fill="url(#kd3-plus)"/>
                    <path d="M180 108h13v13h13v14h-13v13h-14v-13h-13v-14h14Z" fill="#fff"/>
                    <path d="M177 103h25c8 0 14 6 14 14v3c-8-6-17-8-29-8-7 0-12 1-17 3 1-7 3-12 7-12Z" fill="#fff" opacity=".22"/>

                    <!-- crisp brand mark -->
                    <text x="140" y="202" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="20" fontWeight="900" letterSpacing="1" fill="#fff">KHUDE</text>
                    <text x="140" y="223" textAnchor="middle" fontFamily="Nunito, sans-serif" fontSize="25" fontWeight="900" letterSpacing=".4" fill="#fff">DOCTOR</text>
                  </g>

                  <!-- floating glossy accents -->
                  <motion.g animate={{ y: [0, -6, 0], scale: [1, 1.08, 1], opacity: [.72, 1, .72] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
                    <circle cx="257" cy="62" r="7" fill="#ffd23f"/>
                    <path d="M257 43v38M238 62h38" stroke="#ffd23f" strokeWidth="4" strokeLinecap="round"/>
                  </motion.g>
                  <motion.g animate={{ y: [0, 5, 0], rotate: [-8, 8, -8] }} transition={{ duration: 3.1, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "35px 95px" }}>
                    <path d="M35 76c-9 0-15 7-15 15 0 10 15 23 15 23s15-13 15-23c0-8-6-15-15-15Z" fill="#ff626c" opacity=".95"/>
                  </motion.g>
                  <motion.g animate={{ x: [0, 5, 0], opacity: [.45, .9, .45] }} transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}>
                    <path d="M250 142h18M250 153h13" stroke="#33c968" strokeWidth="7" strokeLinecap="round"/>
                  </motion.g>
                </svg>
              </motion.div>
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
          <div className="h-2.5 overflow-hidden rounded-full bg-muted"><motion.div className="h-full rounded-full bg-primary" animate={{ width: progressPercent + "%" }} /></div>
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