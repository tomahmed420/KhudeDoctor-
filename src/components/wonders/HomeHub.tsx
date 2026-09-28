import { ArrowRight, BookOpen, Compass, Gamepad2, HeartHandshake, Lightbulb, Sparkles, Star, Stethoscope, Trophy } from "lucide-react";
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

  // গ্যামিফাইড ব্যাজ লেভেল
  const doctorLevel =
    exploredCount === 0
      ? "নতুন পরিব্রাজক"
      : exploredCount < totalCount / 2
      ? "শিক্ষানবিশ ডাক্তার 🩺"
      : exploredCount < totalCount
      ? "চৌকস খুদে সার্জন 🌟"
      : "মাস্টার ডক্টর 🏆";

  return (
    <div className="space-y-5 sm:space-y-7">
      {/* ১. হিরো সেকশন: প্রাণবন্ত ব্যানার ও জীবন্ত ম্যাসকট */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-emerald-500/25 bg-gradient-to-r from-emerald-50 via-teal-50 to-amber-50 p-6 shadow-sm dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-amber-950/20 sm:p-8">
        <div className="relative z-10 grid items-center gap-6 md:grid-cols-[1.2fr_.8fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3.5 py-1 text-xs font-bangla font-black text-emerald-800 dark:text-emerald-300">
              <Stethoscope className="h-4 w-4 text-emerald-600" />
              <span>শরীরের ভেতরের অ্যাডভেঞ্চার!</span>
            </div>
            
            <h1 className="mt-3 font-bangla text-3xl font-black tracking-tight text-slate-800 dark:text-slate-100 sm:text-4xl">
              হ্যালো খুদে ডাক্তার! 👋
            </h1>
            
            <p className="mt-2 max-w-xl font-bangla text-base font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              আমাদের শরীর কীভাবে খাবার হজম করে? হার্ট কীভাবে রক্ত পাম্প করে? চলো, এক ক্লিকেই শরীরের ভেতরের জাদুটা দেখে আসি!
            </p>

            <button
              type="button"
              onClick={() => onOrganPick(firstUnexplored.id)}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 font-bangla text-base font-black text-white shadow-lg shadow-emerald-600/25 transition-all hover:bg-emerald-700 hover:scale-105 active:scale-95"
            >
              <span>শরীরের যাত্রা শুরু করো</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>

          {/* জীবন্ত খুদে ডাক্তার ম্যাসকট (অ্যাপ লোগোর বদলে বন্ধুভাবাপন্ন চরিত্র) */}
          <div className="mx-auto flex w-full max-w-xs items-center justify-center">
            <div className="relative flex flex-col items-center">
              <svg viewBox="0 0 220 220" className="h-48 w-48 drop-shadow-md sm:h-56 sm:w-56" role="img" aria-label="খুদে ডাক্তার বন্ধু">
                {/* ব্যাকগ্রাউন্ড সানবার্স্ট গ্লো */}
                <circle cx="110" cy="110" r="95" fill="#DEF7EC" />
                <circle cx="110" cy="110" r="80" fill="#BCF0DA" opacity="0.6" />

                {/* ডাক্তার কোট ও শরীর */}
                <path d="M60 195 Q110 160 160 195 L165 220 L55 220 Z" fill="#0E9F6E" />
                <path d="M75 190 Q110 170 145 190 L148 220 L72 220 Z" fill="#FFFFFF" />

                {/* মাথা ও মুখ */}
                <circle cx="110" cy="100" r="48" fill="#FDE8E8" />
                
                {/* ডাক্তারের টুপি */}
                <path d="M68 85 Q110 50 152 85 Q145 65 110 65 Q75 65 68 85 Z" fill="#31C48D" />
                <rect x="104" y="66" width="12" height="12" rx="2" fill="#E02424" />
                <rect x="107" y="63" width="6" height="18" rx="2" fill="#E02424" />

                {/* চুল */}
                <path d="M72 85 Q85 68 110 70 Q135 68 148 85 Q135 78 110 78 Q85 78 72 85 Z" fill="#4B5563" />

                {/* চোখ দুটি (উজ্জ্বল ও হাসিখুশি) */}
                <ellipse cx="94" cy="98" rx="5" ry="7" fill="#1F2A37" />
                <circle cx="96" cy="96" r="2" fill="#FFFFFF" />
                <ellipse cx="126" cy="98" rx="5" ry="7" fill="#1F2A37" />
                <circle cx="128" cy="96" r="2" fill="#FFFFFF" />

                {/* লালচে গাল */}
                <circle cx="86" cy="108" r="6" fill="#F98080" opacity="0.6" />
                <circle cx="134" cy="108" r="6" fill="#F98080" opacity="0.6" />

                {/* মিষ্টি হাসি */}
                <path d="M100 114 Q110 126 120 114" fill="none" stroke="#1F2A37" strokeWidth="3.5" strokeLinecap="round" />

                {/* স্টেথোস্কোপ */}
                <path d="M88 135 Q110 165 132 135" fill="none" stroke="#046C4E" strokeWidth="5" strokeLinecap="round" />
                <path d="M110 152 L110 168" stroke="#046C4E" strokeWidth="5" strokeLinecap="round" />
                <circle cx="110" cy="172" r="9" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
              </svg>
              <span className="mt-1 inline-block rounded-full bg-white/90 px-3 py-1 text-xs font-bangla font-black text-slate-700 shadow-sm border border-slate-100">
                তোমার স্বাস্থ্য সঙ্গী 🩺
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ২. আজকের রোমাঞ্চকর আবিষ্কার কার্ড */}
      <section className="rounded-3xl border-2 border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 p-5 shadow-xs dark:from-amber-950/20 dark:to-orange-950/20">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20">
            <Lightbulb className="h-7 w-7" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bangla font-black uppercase text-amber-800 dark:text-amber-300">
                  আজকের বিশেষ রহস্য
                </span>
                <h3 className="font-bangla text-lg font-black text-slate-800 dark:text-slate-100 sm:text-xl">
                  {firstUnexplored.name}-এর গোপন ক্ষমতা আবিষ্কার করো!
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onOrganPick(firstUnexplored.id)}
                className="rounded-xl bg-amber-500 px-4 py-2 font-bangla text-xs font-black text-white shadow-xs transition-transform hover:scale-105 active:scale-95"
              >
                জেনে নেই →
              </button>
            </div>
            <p className="mt-1 font-bangla text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-300">
              তোমার {firstUnexplored.name} সারাদিন কীভাবে অক্লান্ত পরিশ্রম করে তোমাকে সুস্থ রাখে, চলো এক নজরে দেখে নিই।
            </p>
          </div>
        </div>
      </section>

      {/* ৩. প্রধান ৩টি আকর্ষণীয় চাইল্ড-ফ্রেন্ডলি একশন কার্ড */}
      <section>
        <div className="mb-3.5 flex items-center justify-between px-1">
          <h2 className="font-bangla text-lg font-black text-slate-800 dark:text-slate-100 sm:text-xl">
            আজ কোন অভিযানে যাবে?
          </h2>
          <span className="text-xs font-bangla font-bold text-slate-500">তোমার পছন্দের পথ বেছে নাও</span>
        </div>

        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3 sm:gap-4">
          {/* কার্ড ১: পাঠশালা */}
          <button
            type="button"
            onClick={() => onNavigate("chapters")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-emerald-400/40 bg-gradient-to-b from-white to-emerald-50/60 p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-md active:scale-95 dark:from-slate-900 dark:to-emerald-950/20"
          >
            <div>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md shadow-emerald-500/20 group-hover:scale-110 transition-transform">
                <BookOpen className="h-7 w-7" />
              </div>
              <h3 className="font-bangla text-lg font-black text-slate-800 dark:text-slate-100">
                ডাক্তারি পাঠশালা
              </h3>
              <p className="mt-1 font-bangla text-xs font-medium text-slate-600 dark:text-slate-300">
                গল্পে গল্পে মানবদেহের সব অঙ্গের মজার তথ্য ও কাজ শিখি।
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 font-bangla text-xs font-black text-emerald-700 dark:text-emerald-300">
              পড়তে যাই <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          {/* কার্ড ২: কুইজ */}
          <button
            type="button"
            onClick={() => onNavigate("quiz-select")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-amber-400/40 bg-gradient-to-b from-white to-amber-50/60 p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-amber-500 hover:shadow-md active:scale-95 dark:from-slate-900 dark:to-amber-950/20"
          >
            <div>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-md shadow-amber-500/20 group-hover:scale-110 transition-transform">
                <Gamepad2 className="h-7 w-7" />
              </div>
              <h3 className="font-bangla text-lg font-black text-slate-800 dark:text-slate-100">
                মজার কুইজ খেলি
              </h3>
              <p className="mt-1 font-bangla text-xs font-medium text-slate-600 dark:text-slate-300">
                বুদ্ধির লড়াই ও কুইজ খেলে পয়েন্ট ও আকর্ষণীয় ব্যাজ জিতো!
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 font-bangla text-xs font-black text-amber-700 dark:text-amber-300">
              খেলতে যাই <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>

          {/* কার্ড ৩: অঙ্গ পরিচিতি ও মানচিত্র (শরীর দেখো এর বদলে) */}
          <button
            type="button"
            onClick={() => onNavigate("body")}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-sky-400/40 bg-gradient-to-b from-white to-sky-50/60 p-5 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-500 hover:shadow-md active:scale-95 dark:from-slate-900 dark:to-sky-950/20"
          >
            <div>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500 text-white shadow-md shadow-sky-500/20 group-hover:scale-110 transition-transform">
                <Compass className="h-7 w-7" />
              </div>
              <h3 className="font-bangla text-lg font-black text-slate-800 dark:text-slate-100">
                দেহের মানচিত্র
              </h3>
              <p className="mt-1 font-bangla text-xs font-medium text-slate-600 dark:text-slate-300">
                মাথা থেকে পা পর্যন্ত ঘুরে দেখে প্রতিটি অংশের রহস্য চিনে নিই।
              </p>
            </div>
            <span className="mt-4 inline-flex items-center gap-1 font-bangla text-xs font-black text-sky-700 dark:text-sky-300">
              ঘুরে দেখি <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </section>

      {/* ৪. গ্যামিফাইড অগ্রগতি ও আকর্ষণীয় জ্ঞান কার্ড */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* অগ্রগতি কার্ড */}
        <section className="rounded-3xl border-2 border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 font-bangla text-sm font-black text-slate-700 dark:text-slate-200">
              <Trophy className="h-5 w-5 text-amber-500" />
              <span>ডাক্তার পদমর্যাদা:</span>
            </span>
            <span className="rounded-full bg-amber-100 px-3 py-1 font-bangla text-xs font-black text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              {doctorLevel}
            </span>
          </div>

          <div className="mb-2 flex items-center justify-between font-bangla text-sm font-black text-slate-600 dark:text-slate-300">
            <span>{exploredCount}/{totalCount}টি অঙ্গ জয় করেছো</span>
            <span className="text-emerald-600 dark:text-emerald-400">{progressPercent}% সম্পন্ন</span>
          </div>

          {/* রঙিন ও শিশুদের উপযোগী প্রগ্রেস বার */}
          <div className="h-3.5 overflow-hidden rounded-full bg-slate-100 p-0.5 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </section>

        {/* তুমি কি জানতে? তথ্য কার্ড */}
        <section className="rounded-3xl border-2 border-indigo-200/80 bg-gradient-to-r from-indigo-50/60 to-purple-50/60 p-5 shadow-xs dark:border-indigo-900/50 dark:from-indigo-950/20 dark:to-purple-950/20 sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-indigo-500 text-white shadow-md shadow-indigo-500/20">
              <Lightbulb className="h-6 w-6" />
            </div>
            <div>
              <p className="font-bangla text-xs font-black uppercase text-indigo-700 dark:text-indigo-300">
                আজব তথ্য 💡
              </p>
              <p className="mt-1 font-bangla text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-200">
                {funFact.fact}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
