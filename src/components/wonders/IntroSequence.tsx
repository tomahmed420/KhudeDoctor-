import { motion } from "framer-motion";

type Scene = 0 | 1 | 2;

const Heart = () => (
  <motion.svg viewBox="0 0 160 160" className="h-28 w-28 sm:h-36 sm:w-36" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .55 }}>
    <defs><linearGradient id="heartG" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#ff8a8a"/><stop offset=".55" stopColor="#ef4444"/><stop offset="1" stopColor="#b91c1c"/></linearGradient></defs>
    <motion.path d="M80 132 C66 119 27 94 27 57 C27 28 62 20 80 48 C98 20 133 28 133 57 C133 94 94 119 80 132Z" fill="url(#heartG)" stroke="#7f1d1d" strokeWidth="5" animate={{ scale: [1, 1.06, 1] }} transition={{ duration: .9, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "80px 78px" }} />
    <path d="M58 55 C50 47 43 48 38 54" fill="none" stroke="white" strokeOpacity=".65" strokeWidth="6" strokeLinecap="round"/>
    <motion.circle cx="126" cy="34" r="5" fill="#fde68a" animate={{ y: [0,-7,0], opacity:[.3,1,.3] }} transition={{ duration:1.4, repeat:Infinity }}/>
  </motion.svg>
);

const Brain = () => (
  <motion.svg viewBox="0 0 180 150" className="h-28 w-32 sm:h-36 sm:w-40" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .55 }}>
    <defs><linearGradient id="brainG" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#f9a8d4"/><stop offset=".55" stopColor="#ec4899"/><stop offset="1" stopColor="#9d174d"/></linearGradient></defs>
    <path d="M89 127 C65 137 40 123 44 101 C22 96 20 69 39 59 C32 37 51 19 72 25 C85 4 111 10 119 29 C142 23 160 44 150 64 C171 77 159 105 139 108 C136 130 110 138 89 127Z" fill="url(#brainG)" stroke="#831843" strokeWidth="5"/>
    <motion.path d="M61 48 C77 38 79 58 67 67 C85 73 75 90 61 88 C79 98 68 111 57 105 M103 35 C91 50 112 55 101 70 C91 81 114 86 103 105 M127 50 C112 58 133 70 119 78 C109 86 130 96 121 106" fill="none" stroke="#fce7f3" strokeOpacity=".72" strokeWidth="6" strokeLinecap="round" animate={{ pathLength:[.6,1,.6] }} transition={{ duration:2, repeat:Infinity }}/>
  </motion.svg>
);

const Lungs = () => (
  <motion.svg viewBox="0 0 180 160" className="h-28 w-32 sm:h-36 sm:w-40" initial={{ scale: .8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .55 }}>
    <defs><linearGradient id="lungG" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#7dd3fc"/><stop offset=".55" stopColor="#38bdf8"/><stop offset="1" stopColor="#0369a1"/></linearGradient></defs>
    <path d="M86 40 C70 38 47 50 39 73 C31 95 32 128 55 135 C73 141 84 124 84 101Z" fill="url(#lungG)" stroke="#075985" strokeWidth="5"/>
    <path d="M94 40 C110 38 133 50 141 73 C149 95 148 128 125 135 C107 141 96 124 96 101Z" fill="url(#lungG)" stroke="#075985" strokeWidth="5"/>
    <path d="M90 28 L90 78 M90 56 L72 72 M90 56 L108 72" fill="none" stroke="#e0f2fe" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"/>
    <motion.path d="M54 82 C47 96 51 113 60 119 M126 82 C133 96 129 113 120 119" fill="none" stroke="white" strokeOpacity=".55" strokeWidth="5" strokeLinecap="round" animate={{ opacity:[.3,.9,.3] }} transition={{ duration:2, repeat:Infinity }}/>
  </motion.svg>
);

const scenes: Record<Scene, {title:string; subtitle:string}> = {
  0: { title: "শরীরের ভেতর আছে এক আশ্চর্য জগৎ!", subtitle: "চলো, খুদে ডাক্তার হয়ে সেটি আবিষ্কার করি।" },
  1: { title: "হৃদয়, মস্তিষ্ক, ফুসফুস…", subtitle: "প্রতিটি অঙ্গ মিলে তোমার শরীরকে সচল রাখে।" },
  2: { title: "আজকের অভিযান শুরু হোক!", subtitle: "শিখি • খেলি • আবিষ্কার করি" },
};

export const IntroSequence = ({ onFinish }: { onFinish: () => void }) => {
  const scene = 0 as Scene;
  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#062e2b] px-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(52,211,153,.28),transparent_42%),radial-gradient(circle_at_20%_85%,rgba(56,189,248,.16),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(251,191,36,.14),transparent_32%)]" />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
          <motion.div className="absolute inset-5 rounded-full border border-white/10 bg-white/[.07] shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_20px_60px_rgba(0,0,0,.2)] backdrop-blur-xl" animate={{ rotate: [0, 360] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} />
          <motion.div className="relative z-10 flex h-40 w-40 items-center justify-center rounded-[2.5rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-md" animate={{ y:[0,-7,0] }} transition={{ duration:2.4, repeat:Infinity, ease:"easeInOut" }}>
            <motion.svg viewBox="0 0 120 140" className="h-32 w-28">
              <defs><linearGradient id="coat" x1="0" x2="1"><stop stopColor="#ecfdf5"/><stop offset="1" stopColor="#a7f3d0"/></linearGradient></defs>
              <circle cx="60" cy="31" r="21" fill="#f6c7a6"/>
              <path d="M40 29 C41 9 78 8 81 31 C73 22 64 19 51 23 C48 27 45 30 40 29Z" fill="#4b3621"/>
              <path d="M31 116 C32 80 41 67 60 67 C79 67 88 80 89 116Z" fill="url(#coat)" stroke="#86efac" strokeWidth="3"/>
              <path d="M60 69 L60 115 M44 88 L52 88 M68 88 L76 88" stroke="#059669" strokeWidth="3" strokeLinecap="round"/>
              <path d="M48 42 Q60 49 72 42" fill="none" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round"/>
              <circle cx="51" cy="34" r="2.2" fill="#334155"/><circle cx="69" cy="34" r="2.2" fill="#334155"/>
              <path d="M77 78 L90 92 L103 78" fill="none" stroke="#e5e7eb" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="103" cy="78" r="7" fill="#e5e7eb" stroke="#94a3b8" strokeWidth="2"/>
            </motion.svg>
          </motion.div>
          <motion.div className="absolute left-0 top-8 rounded-2xl bg-white/10 p-2 shadow-lg backdrop-blur" animate={{ x:[0,-5,0], y:[0,4,0] }} transition={{ duration:2.2, repeat:Infinity }}><Heart/></motion.div>
          <motion.div className="absolute right-0 top-2 rounded-2xl bg-white/10 p-2 shadow-lg backdrop-blur" animate={{ x:[0,5,0], y:[0,-4,0] }} transition={{ duration:2.5, repeat:Infinity }}><Brain/></motion.div>
          <motion.div className="absolute bottom-0 right-2 rounded-2xl bg-white/10 p-2 shadow-lg backdrop-blur" animate={{ x:[0,4,0], y:[0,4,0] }} transition={{ duration:2.3, repeat:Infinity }}><Lungs/></motion.div>
        </div>
        <AnimateText scene={scene}/>
      </div>
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.6, delay:2.9 }} className="absolute bottom-9 text-center">
        <p className="font-bangla text-[11px] font-bold tracking-wide text-emerald-100/70">একটু অপেক্ষা… অভিযান শুরু হচ্ছে</p>
      </motion.div>
      <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:3.2, ease:"linear" }} onAnimationComplete={onFinish} className="absolute bottom-0 left-0 h-1 origin-left bg-emerald-300/80" />
    </div>
  );
};

const AnimateText = ({scene}:{scene:Scene}) => (
  <motion.div key={scene} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} className="mt-7">
    <p className="font-bangla text-sm font-bold text-emerald-100">{scenes[scene].subtitle}</p>
    <h1 className="mt-1 font-bangla text-2xl font-black text-white sm:text-3xl">খুদে ডাক্তার</h1>
    <p className="mt-2 font-bangla text-base font-extrabold text-white">{scenes[scene].title}</p>
  </motion.div>
);
