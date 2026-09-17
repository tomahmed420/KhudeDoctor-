import { useEffect, useMemo, useRef, useState } from "react";
import type { Organ } from "@/data/organsData";
import { soundEffects } from "@/utils/soundEffects";
import { useTTS } from "@/hooks/useTTS";
import {
  Activity,
  Brain,
  ChevronRight,
  Heart,
  Sparkles,
  Utensils,
  Volume2,
  VolumeX,
} from "lucide-react";

interface BodySilhouetteProps {
  organs: Organ[];
  onOrganClick: (organ: Organ) => void;
}

type BodyZone = "all" | "head" | "chest" | "abdomen" | "motion";

const SKIN_MODEL = "https://raw.githubusercontent.com/yamz8/human-body-simulator/main/public/models/anatomy-skin.glb";
const ORGANS_MODEL = "https://raw.githubusercontent.com/yamz8/human-body-simulator/main/public/models/anatomy-organs.glb";

const zones: Array<{
  id: BodyZone;
  label: string;
  icon: typeof Brain;
  organIds: string[];
  description: string;
}> = [
  {
    id: "all",
    label: "পুরো শরীর",
    icon: Sparkles,
    organIds: ["brain", "eyes", "ears", "nose", "teeth", "tongue", "heart", "lungs", "blood", "stomach", "liver", "intestines", "kidneys", "bones", "muscles", "skin"],
    description: "এবার কার্টুন নয়—বাস্তব 3D anatomical model দিয়ে শরীরটা ঘুরিয়ে দেখো।",
  },
  {
    id: "head",
    label: "মাথা ও ইন্দ্রিয়",
    icon: Brain,
    organIds: ["brain", "eyes", "ears", "nose", "teeth", "tongue"],
    description: "মাথা ও ইন্দ্রিয়ের অঙ্গগুলো আলাদা করে শেখো।",
  },
  {
    id: "chest",
    label: "বুক ও শ্বাসপ্রশ্বাস",
    icon: Heart,
    organIds: ["heart", "lungs", "blood"],
    description: "হৃদপিণ্ড, ফুসফুস ও রক্ত চলাচল সম্পর্কে শেখো।",
  },
  {
    id: "abdomen",
    label: "পেট ও পরিপাক",
    icon: Utensils,
    organIds: ["stomach", "liver", "kidneys", "intestines"],
    description: "পেটের ভেতরের গুরুত্বপূর্ণ অঙ্গগুলো দেখো।",
  },
  {
    id: "motion",
    label: "হাত-পা ও সুরক্ষা",
    icon: Activity,
    organIds: ["bones", "muscles", "skin"],
    description: "হাড়, পেশি ও ত্বকের কাজ শেখো।",
  },
];

const colorClasses: Record<string, { bg: string; border: string; lightBg: string }> = {
  heart: { bg: "bg-organ-heart", border: "border-organ-heart", lightBg: "bg-organ-heart-bg" },
  brain: { bg: "bg-organ-brain", border: "border-organ-brain", lightBg: "bg-organ-brain-bg" },
  eyes: { bg: "bg-organ-eyes", border: "border-organ-eyes", lightBg: "bg-organ-eyes-bg" },
  lungs: { bg: "bg-organ-lungs", border: "border-organ-lungs", lightBg: "bg-organ-lungs-bg" },
  stomach: { bg: "bg-organ-stomach", border: "border-organ-stomach", lightBg: "bg-organ-stomach-bg" },
  liver: { bg: "bg-organ-liver", border: "border-organ-liver", lightBg: "bg-organ-liver-bg" },
  kidneys: { bg: "bg-organ-kidneys", border: "border-organ-kidneys", lightBg: "bg-organ-kidneys-bg" },
  bones: { bg: "bg-organ-bones", border: "border-organ-bones", lightBg: "bg-organ-bones-bg" },
  muscles: { bg: "bg-organ-muscles", border: "border-organ-muscles", lightBg: "bg-organ-muscles-bg" },
  skin: { bg: "bg-organ-skin", border: "border-organ-skin", lightBg: "bg-organ-skin-bg" },
  ears: { bg: "bg-organ-ears", border: "border-organ-ears", lightBg: "bg-organ-ears-bg" },
  tongue: { bg: "bg-organ-tongue", border: "border-organ-tongue", lightBg: "bg-organ-tongue-bg" },
  nose: { bg: "bg-organ-nose", border: "border-organ-nose", lightBg: "bg-organ-nose-bg" },
  intestines: { bg: "bg-organ-intestines", border: "border-organ-intestines", lightBg: "bg-organ-intestines-bg" },
  teeth: { bg: "bg-organ-teeth", border: "border-organ-teeth", lightBg: "bg-organ-teeth-bg" },
  blood: { bg: "bg-organ-blood", border: "border-organ-blood", lightBg: "bg-organ-blood-bg" },
};

export const RealisticBodyViewer = ({ organs, onOrganClick }: BodySilhouetteProps) => {
  const [selectedZone, setSelectedZone] = useState<BodyZone>("all");
  const [activeOrganId, setActiveOrganId] = useState("heart");
  const [showSkin, setShowSkin] = useState(true);
  const [modelReady, setModelReady] = useState(false);
  const organsViewerRef = useRef<HTMLElement | null>(null);
  const skinViewerRef = useRef<HTMLElement | null>(null);
  const { speak, stop, isSpeaking } = useTTS();

  const currentZone = zones.find((zone) => zone.id === selectedZone) ?? zones[0];
  const visibleOrgans = useMemo(
    () => organs.filter((organ) => currentZone.organIds.includes(organ.id)),
    [currentZone.organIds, organs],
  );
  const activeOrgan = organs.find((organ) => organ.id === activeOrganId) ?? visibleOrgans[0] ?? organs[0];

  useEffect(() => {
    const skin = skinViewerRef.current as any;
    const organsViewer = organsViewerRef.current as any;
    if (!skin || !organsViewer) return;

    const syncCamera = () => {
      try {
        skin.cameraOrbit = organsViewer.cameraOrbit;
        skin.cameraTarget = organsViewer.cameraTarget;
        skin.fieldOfView = organsViewer.fieldOfView;
      } catch {
        // The custom element can fire camera-change before its API is ready.
      }
    };

    organsViewer.addEventListener("camera-change", syncCamera);
    return () => organsViewer.removeEventListener("camera-change", syncCamera);
  }, [modelReady]);

  const selectOrgan = (organ: Organ) => {
    soundEffects.playPop();
    setActiveOrganId(organ.id);
  };

  if (!activeOrgan) return null;

  const activeColor = colorClasses[activeOrgan.colorKey] ?? colorClasses.heart;

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      <div className="w-full mb-5">
        <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-2 px-1 scrollbar-none">
          {zones.map((zone) => {
            const ZoneIcon = zone.icon;
            const selected = selectedZone === zone.id;
            return (
              <button
                key={zone.id}
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedZone(zone.id);
                  if (!zone.organIds.includes(activeOrganId)) setActiveOrganId(zone.organIds[0]);
                }}
                className={`shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-2xl text-xs sm:text-sm font-bangla font-bold transition-all ${selected ? "bg-primary text-primary-foreground shadow-sm scale-105" : "bg-card hover:bg-muted text-muted-foreground border border-border/80"}`}
              >
                <ZoneIcon size={16} />
                <span>{zone.label}</span>
              </button>
            );
          })}
        </div>
        <p className="text-center text-xs sm:text-sm text-muted-foreground font-bangla mt-1">{currentZone.description}</p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
        <div className="order-2 lg:order-1 lg:col-span-4 flex flex-col gap-2">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-bangla font-bold text-muted-foreground">অঙ্গসমূহ ({visibleOrgans.length}টি)</span>
            <span className="text-[11px] font-bangla text-primary">ট্যাপ করে নির্বাচন করো</span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 max-h-[480px] overflow-y-auto pr-1">
            {visibleOrgans.map((organ) => {
              const Icon = organ.icon;
              const selected = activeOrgan.id === organ.id;
              const color = colorClasses[organ.colorKey] ?? colorClasses.heart;
              return (
                <button
                  key={organ.id}
                  type="button"
                  onClick={() => selectOrgan(organ)}
                  className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl text-left border transition-all ${selected ? `${color.lightBg} ${color.border} ring-2 ring-primary/25 shadow-sm scale-[1.01]` : "bg-card hover:bg-muted/60 border-border/70"}`}
                >
                  <div className={`p-2 rounded-xl ${color.bg} text-white shrink-0 shadow-sm`}><Icon size={18} /></div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bangla font-bold text-foreground text-sm leading-tight truncate">{organ.name}</p>
                    <p className="font-nunito text-[11px] text-muted-foreground font-semibold">{organ.nameBn}</p>
                  </div>
                  {selected && <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-4 flex flex-col items-center">
          <div className="relative w-full max-w-[300px] sm:max-w-[340px] aspect-[1/1.75] rounded-[2rem] border-2 border-border/80 bg-gradient-to-b from-sky-50/80 via-emerald-50/50 to-amber-50/80 shadow-inner overflow-hidden">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1 p-1 rounded-full bg-white/90 backdrop-blur border border-border shadow-sm">
              <button type="button" onClick={() => setShowSkin(true)} className={`px-3 py-1.5 rounded-full text-[11px] font-bangla font-bold ${showSkin ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>শরীর</button>
              <button type="button" onClick={() => setShowSkin(false)} className={`px-3 py-1.5 rounded-full text-[11px] font-bangla font-bold ${!showSkin ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}>ভেতরের অঙ্গ</button>
            </div>

            <div className="absolute inset-0">
              {createElement("model-viewer", {
                ref: (node: HTMLElement | null) => { organsViewerRef.current = node; },
                src: ORGANS_MODEL,
                "camera-controls": true,
                "touch-action": "pan-y",
                "interaction-prompt": "none",
                "shadow-intensity": "1",
                exposure: "1.05",
                "tone-mapping": "neutral",
                "environment-image": "neutral",
                ar: true,
                "camera-orbit": "0deg 80deg auto",
                "field-of-view": "30deg",
                style: { width: "100%", height: "100%", background: "transparent" },
                onLoad: () => setModelReady(true),
                "aria-label": "বাস্তব 3D মানবদেহের অভ্যন্তরীণ অঙ্গসমূহ",
              })}
              {createElement("model-viewer", {
                ref: (node: HTMLElement | null) => { skinViewerRef.current = node; },
                src: SKIN_MODEL,
                "camera-controls": false,
                "interaction-prompt": "none",
                "shadow-intensity": "0.8",
                exposure: "1.0",
                "tone-mapping": "neutral",
                "environment-image": "neutral",
                "camera-orbit": "0deg 80deg auto",
                "field-of-view": "30deg",
                style: {
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  background: "transparent",
                  opacity: showSkin ? 0.42 : 0,
                  pointerEvents: "none",
                  transition: "opacity 220ms ease",
                },
                "aria-hidden": "true",
              })}
            </div>

            {!modelReady && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <div className="h-8 w-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                  <span className="font-bangla text-xs">3D শরীর লোড হচ্ছে…</span>
                </div>
              </div>
            )}

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur border border-border shadow-sm whitespace-nowrap">
              <span className="font-bangla text-[11px] text-muted-foreground">আঙুল/মাউস দিয়ে ঘোরাও • pinch/scroll করে zoom</span>
            </div>
          </div>
          <p className="font-bangla text-[11px] text-muted-foreground mt-2 text-center">মডেলটি শিক্ষামূলক 3D anatomy visualization।</p>
        </div>

        <div className={`order-3 lg:col-span-4 rounded-3xl border-2 ${activeColor.border} ${activeColor.lightBg} p-4 sm:p-5 shadow-sm`}>
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`p-3 rounded-2xl ${activeColor.bg} text-white shadow-sm shrink-0`}>
                {(() => { const Icon = activeOrgan.icon; return <Icon size={24} />; })()}
              </div>
              <div className="min-w-0">
                <h2 className="font-bangla font-black text-xl text-foreground truncate">{activeOrgan.name}</h2>
                <p className="font-nunito text-xs font-bold text-muted-foreground uppercase tracking-wide">{activeOrgan.nameBn}</p>
              </div>
            </div>
            <button type="button" onClick={() => isSpeaking ? stop() : speak(`${activeOrgan.name}। ${activeOrgan.simpleFunction}`)} className="p-2 rounded-full bg-white/80 border border-border hover:bg-white shrink-0" aria-label="শুনুন">
              {isSpeaking ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

          <div className="bg-white/75 rounded-2xl p-4 mb-3">
            <p className="font-bangla text-xs font-bold text-primary mb-1">আমাদের প্রধান কাজ:</p>
            <p className="font-bangla text-sm leading-6 text-foreground">{activeOrgan.simpleFunction}</p>
          </div>

          <button type="button" onClick={() => onOrganClick(activeOrgan)} className="w-full flex items-center justify-center gap-2 rounded-2xl py-3 px-4 bg-primary text-primary-foreground font-bangla font-bold shadow-sm hover:shadow-md transition-shadow">
            সম্পূর্ণ বিস্তারিত ও মজার তথ্য দেখো <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

// React's JSX intrinsic element list does not include model-viewer in this project.
// createElement keeps the component type-safe without adding a custom JSX namespace declaration.
import { createElement } from "react";
