import { useEffect, useRef, useState } from "react";

const MOBILE_INTRO_VIDEO =
  "https://res.cloudinary.com/dqzuwf0ra/video/upload/f_mp4,vc_h264,ac_aac,q_auto/v1789132448/intro.mp4";

const MobileVideoIntro = ({ onFinish }: { onFinish: () => void }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [exiting, setExiting] = useState(false);

  const finish = () => {
    setExiting((current) => {
      if (current) return current;
      return true;
    });
  };

  useEffect(() => {
    if (!exiting) return;
    const timer = window.setTimeout(onFinish, 280);
    return () => window.clearTimeout(timer);
  }, [exiting, onFinish]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const playWithBestAvailableAudio = async () => {
      try {
        video.muted = false;
        await video.play();
      } catch {
        // Mobile autoplay policies commonly reject autoplay with sound.
        // Retry the exact same video muted so the intro still plays instead of disappearing.
        try {
          video.muted = true;
          await video.play();
        } catch {
          finish();
        }
      }
    };

    void playWithBestAvailableAudio();

    const slowLoadTimer = window.setTimeout(() => {
      if (video.readyState < 3) finish();
    }, 12000);

    return () => window.clearTimeout(slowLoadTimer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden bg-black transition-opacity duration-300 ${
        exiting ? "opacity-0" : "opacity-100"
      }`}
      aria-label="খুদে ডাক্তার পরিচিতি"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        playsInline
        preload="auto"
        onCanPlay={(event) => {
          const video = event.currentTarget;
          if (video.paused) {
            void video.play().catch(async () => {
              try {
                video.muted = true;
                await video.play();
              } catch {
                finish();
              }
            });
          }
        }}
        onLoadedData={(event) => {
          const video = event.currentTarget;
          if (video.paused) {
            void video.play().catch(async () => {
              try {
                video.muted = true;
                await video.play();
              } catch {
                finish();
              }
            });
          }
        }}
        onError={finish}
        onEnded={finish}
      >
        <source src={MOBILE_INTRO_VIDEO} type="video/mp4" />
      </video>
    </div>
  );
};

const DesktopIntro = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = window.setTimeout(onFinish, 1800);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-[#062e2b] px-5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(52,211,153,.28),transparent_42%),radial-gradient(circle_at_20%_85%,rgba(56,189,248,.16),transparent_32%),radial-gradient(circle_at_85%_75%,rgba(251,191,36,.14),transparent_32%)]" />
      <div className="relative z-10 text-center animate-kd-intro">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-md">
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-cyan-200 to-cyan-400 shadow-lg animate-kd-float" />
        </div>
        <h1 className="mt-4 font-bangla text-2xl font-black text-white">খুদে ডাক্তার</h1>
        <p className="mt-1 font-bangla text-xs font-bold text-emerald-100/80">
          শরীরের ভেতরটা চলো আবিষ্কার করি!
        </p>
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-full origin-left bg-emerald-300/80 animate-kd-progress" />
    </div>
  );
};

export const IntroSequence = ({ onFinish }: { onFinish: () => void }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return isMobile ? (
    <MobileVideoIntro onFinish={onFinish} />
  ) : (
    <DesktopIntro onFinish={onFinish} />
  );
};
