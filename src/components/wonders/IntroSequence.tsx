import { useEffect } from "react";

type Scene = 0 | 1 | 2;

const MobileIntro = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, 350);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#062e2b]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(52,211,153,.28),transparent_42%),radial-gradient(circle_at_20%_85%,rgba(56,189,248,.16),transparent_32%)]" />
      <div className="relative z-10 text-center animate-kd-intro">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-md">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-200 to-cyan-400 shadow-lg animate-kd-float" />
        </div>
        <h1 className="mt-4 font-bangla text-2xl font-black text-white">খুদে ডাক্তার</h1>
        <p className="mt-1 font-bangla text-xs font-bold text-emerald-100/80">শরীরের ভেতরটা চলো আবিষ্কার করি!</p>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left bg-emerald-300/80 animate-kd-progress" />
    </div>
  );
};

export const IntroSequence = ({ onFinish }: { onFinish: () => void }) => {
  return <MobileIntro onFinish={onFinish} />;
};
