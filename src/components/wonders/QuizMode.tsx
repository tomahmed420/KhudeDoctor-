import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Trophy, RotateCcw, Award } from "lucide-react";
import confetti from "canvas-confetti";
import { quizQuestions } from "@/data/organsData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { soundEffects } from "@/utils/soundEffects";

interface QuizModeProps {
  mode: "quick" | "challenge";
  onExit: () => void;
}

interface ScoreFeedback {
  title: string;
  description: string;
  badgeName: string;
  stars: number;
  emoji: string;
  color: string;
}

export const QuizMode = ({ mode, onExit }: QuizModeProps) => {
  const questionCount = mode === "quick" ? 5 : 15;
  const [questions, setQuestions] = useState<typeof quizQuestions>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Shuffle and pick questions based on mode
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    const selected = mode === "quick" 
      ? shuffled.filter(q => q.difficulty === "easy").slice(0, questionCount)
      : shuffled.slice(0, questionCount);
    setQuestions(selected);
  }, [mode, questionCount]);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questionCount) * 100;

  const handleAnswer = (answer: string) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);

    const isCorrect = answer === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((s) => s + 1);
      soundEffects.playSuccess();
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.65 },
        colors: ["#10B981", "#3B82F6", "#F59E0B", "#EC4899"],
      });
    } else {
      soundEffects.playWrong();
    }

    // Advance after brief reading delay
    setTimeout(() => {
      if (currentIndex < questionCount - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsComplete(true);
        // Calculate final sound
        const finalScore = isCorrect ? score + 1 : score;
        if (finalScore >= Math.ceil(questionCount * 0.7)) {
          soundEffects.playBadgeUnlock();
          confetti({
            particleCount: 180,
            spread: 90,
            origin: { y: 0.5 },
          });
        } else {
          soundEffects.playChime();
        }
      }
    }, 1600);
  };

  const resetQuiz = () => {
    soundEffects.playPop();
    setCurrentIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setIsComplete(false);
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
    const selected = mode === "quick" 
      ? shuffled.filter(q => q.difficulty === "easy").slice(0, questionCount)
      : shuffled.slice(0, questionCount);
    setQuestions(selected);
  };

  // Detailed, compassionate feedback tailored directly to the child's score
  const getFeedback = (): ScoreFeedback => {
    if (questionCount === 5) {
      switch (score) {
        case 0:
          return {
            title: "মন খারাপ করো না আমার বন্ধু! 🩺",
            description: "শেখার শুরুতে এমন ভুল হতেই পারে। এতে মন খারাপের কিচ্ছু নেই! চলো অঙ্গগুলো আরেকবার ঘুরে দেখি, পরের বার তুমি নিশ্চয়ই পারবে!",
            badgeName: "খুদে শিক্ষানবিস",
            stars: 0,
            emoji: "🌱",
            color: "text-amber-600",
          };
        case 1:
          return {
            title: "প্রথম ধাপ সম্পন্ন! 🌱",
            description: "তুমি ১টি প্রশ্নের সঠিক উত্তর দিতে পেরেছো। শুরুটা ভালো হয়েছে! অধ্যায়গুলো আরেকটু মনোযোগ দিয়ে পড়লে দেখবে পরের বার অনেক বেশি পয়েন্ট পাবে!",
            badgeName: "অভিযাত্রী বন্ধু",
            stars: 1,
            emoji: "⭐",
            color: "text-blue-600",
          };
        case 2:
          return {
            title: "বেশ ভালো এগিয়েছো! 👍",
            description: "২টি প্রশ্নের সঠিক উত্তর হয়েছে! তুমি অর্ধেকের কাছাকাছি চলে এসেছো। আরেকবার চেষ্টা করো, তুমি খুব তাড়াতাড়ি বিজয়ী হবে!",
            badgeName: "উদ্যমী শিক্ষার্থী",
            stars: 1,
            emoji: "🥉",
            color: "text-emerald-600",
          };
        case 3:
          return {
            title: "দারুণ করেছো, খুদে ডাক্তার! 🌟",
            description: "অর্ধেকেরও বেশি (৩টি) সঠিক উত্তর দিয়েছো! তোমার জানার আগ্রহ ও মেধা কিন্তু অনেক প্রশংসনীয়!",
            badgeName: "চৌকস ডাক্তার",
            stars: 2,
            emoji: "🥈",
            color: "text-indigo-600",
          };
        case 4:
          return {
            title: "অসাধারণ ফলাফল! প্রায় ফুল মার্কস! 👏",
            description: "৪টি সঠিক উত্তর! আর মাত্র একটি হলেই পারফেক্ট ১০০% হতো! তুমি মানবদেহ সম্পর্কে অনেক কিছু চমৎকারভাবে শিখেছো!",
            badgeName: "সিনিয়র খুদে ডাক্তার",
            stars: 3,
            emoji: "🥇",
            color: "text-purple-600",
          };
        case 5:
        default:
          return {
            title: "মাশাআল্লাহ! নিখুঁত ও সেরা! 🏆",
            description: "সবকটি (৫টি) প্রশ্নের সঠিক উত্তর দিয়েছো! একটুও ভুল হয়নি! তুমি একজন সত্যিকারের সুপারস্টার খুদে ডাক্তার!",
            badgeName: "চ্যাম্পিয়ন খুদে ডাক্তার",
            stars: 3,
            emoji: "👑",
            color: "text-rose-600",
          };
      }
    } else {
      // 15 question challenge mode
      const ratio = score / questionCount;
      if (score === 0) {
        return {
          title: "মন খারাপ করো না আমার বন্ধু! 🩺",
          description: "চ্যালেঞ্জটা একটু বড় ছিল। ভুল হওয়া মানেই নতুন কিছু শেখার সুযোগ! চলো পাঠশালার কার্ডগুলো আরেকটু পড়ে আবার চেষ্টা করি!",
          badgeName: "খুদে শিক্ষানবিস",
          stars: 0,
          emoji: "🌱",
          color: "text-amber-600",
        };
      } else if (ratio < 0.3) {
        return {
          title: "সুন্দর শুরু! 🌱",
          description: `তুমি ${score}টি প্রশ্নের সঠিক উত্তর দিয়েছো। অল্প ভুল হয়েছে, কিন্তু আরেকবার চেষ্টা করলেই তুমি অনেক ভালো করতে পারবে!`,
          badgeName: "অভিযাত্রী বন্ধু",
          stars: 1,
          emoji: "⭐",
          color: "text-blue-600",
        };
      } else if (ratio < 0.6) {
        return {
          title: "বেশ ভালো চেষ্টা! 👍",
          description: `${score}টি সঠিক উত্তর! তুমি বেশ অনেক দূর এগিয়েছো। আরেকটু মনোযোগ দিলে তুমি সেরা স্কোরের তালিকায় চলে আসবে!`,
          badgeName: "উদ্যমী শিক্ষার্থী",
          stars: 2,
          emoji: "🥉",
          color: "text-emerald-600",
        };
      } else if (ratio < 0.85) {
        return {
          title: "দারুণ মেধা ও দক্ষতা! 🌟",
          description: `${score}টি প্রশ্নের সঠিক উত্তর হয়েছে! তোমার জানার পরিধি দারুণ বেড়েছে, তুমি চমৎকার একজন খুদে ডাক্তার!`,
          badgeName: "সিনিয়র ডাক্তার",
          stars: 3,
          emoji: "🥈",
          color: "text-indigo-600",
        };
      } else {
        return {
          title: "অবিশ্বাস্য সাফল্য! সেরা খুদে ডাক্তার! 🏆",
          description: `মাশাআল্লাহ! ১৫টির মধ্যে ${score}টি সঠিক উত্তর! তুমি মানবদেহের একজন বিশেষজ্ঞ খুদে বিজ্ঞানী হয়ে উঠেছো!`,
          badgeName: "মাস্টার খুদে ডাক্তার",
          stars: 3,
          emoji: "👑",
          color: "text-rose-600",
        };
      }
    }
  };

  if (isComplete) {
    const feedback = getFeedback();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4 sm:p-8 max-w-xl mx-auto"
      >
        <motion.div
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.4 }}
          className="text-6xl sm:text-7xl mb-4"
        >
          {feedback.emoji}
        </motion.div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full text-xs sm:text-sm font-bangla font-semibold text-primary mb-3">
          <Award size={16} />
          <span>অর্জিত খেতাব: {feedback.badgeName}</span>
        </div>

        <h2 className={`font-bubblegum text-2xl sm:text-3xl lg:text-4xl ${feedback.color} mb-3 leading-tight`}>
          {feedback.title}
        </h2>

        <div className="p-4 bg-muted/60 rounded-2xl border border-border/80 mb-6 max-w-md">
          <p className="text-base sm:text-lg text-foreground font-bangla leading-relaxed">
            {feedback.description}
          </p>
          <div className="mt-3 pt-3 border-t border-border/60 flex items-center justify-center gap-2 font-bangla text-sm sm:text-base font-semibold">
            <span>ফলাফল:</span>
            <span className="px-2.5 py-0.5 bg-card rounded-lg border border-primary/20 text-primary font-bold">
              {score} / {questionCount} টি সঠিক
            </span>
          </div>
        </div>

        {/* Stars */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((starNum) => (
            <motion.div
              key={starNum}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: starNum <= feedback.stars ? 1.15 : 0.7, 
                rotate: 0,
                opacity: starNum <= feedback.stars ? 1 : 0.25
              }}
              transition={{ delay: starNum * 0.15 }}
            >
              <Star
                className={`w-9 h-9 sm:w-11 sm:h-11 ${
                  starNum <= feedback.stars ? "text-amber-400 fill-amber-400 drop-shadow-sm" : "text-muted-foreground"
                }`}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="rounded-full px-6 py-3 font-bangla font-semibold border-2 hover:bg-muted"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            আরেকবার চেষ্টা করো
          </Button>
          <Button
            onClick={() => { soundEffects.playPop(); onExit(); }}
            className="rounded-full px-6 py-3 font-bangla font-semibold bg-primary hover:bg-primary/90 text-white shadow-md"
          >
            পাঠশালায় ফিরে যাও
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <Button
          onClick={() => { soundEffects.playPop(); onExit(); }}
          variant="ghost"
          size="sm"
          className="rounded-full font-bangla hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-1.5" />
          বের হও
        </Button>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-500/15 border border-amber-500/30 rounded-full">
          <Trophy className="w-4 h-4 text-amber-600" />
          <span className="font-bangla font-bold text-sm text-foreground">
            সঠিক: {score} / {questionCount}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-xs sm:text-sm text-muted-foreground font-bangla mb-1.5">
          <span>প্রশ্ন {currentIndex + 1}</span>
          <span>মোট {questionCount}টি প্রশ্ন</span>
        </div>
        <Progress value={progress} className="h-2.5 rounded-full bg-muted" />
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="bg-card rounded-3xl p-5 sm:p-7 shadow-lg border border-border/80"
        >
          <div className="text-center mb-6">
            <span className="inline-block text-xs font-bangla px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground mb-2">
              খুদে ডাক্তার প্রশ্নোত্তর
            </span>
            <h3 className="font-bangla font-bold text-xl sm:text-2xl text-foreground leading-snug">
              {currentQuestion.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let btnStyle = "bg-muted/70 hover:bg-muted text-foreground border-2 border-transparent";
              if (showResult) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-600 text-white border-emerald-700 shadow-md font-bold";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-rose-500 text-white border-rose-600 shadow-sm";
                } else {
                  btnStyle = "bg-muted/40 text-muted-foreground opacity-60";
                }
              }

              return (
                <motion.button
                  key={option}
                  whileHover={!showResult ? { scale: 1.02 } : {}}
                  whileTap={!showResult ? { scale: 0.98 } : {}}
                  onClick={() => handleAnswer(option)}
                  disabled={showResult}
                  className={`
                    ${btnStyle}
                    p-3.5 sm:p-4 rounded-2xl font-bangla font-semibold text-base sm:text-lg
                    transition-all duration-200 text-center
                    ${!showResult ? "cursor-pointer active:scale-95" : "cursor-default"}
                  `}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center mt-5 p-3 rounded-xl font-bangla font-bold text-base sm:text-lg ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? "bg-emerald-500/15 text-emerald-700 border border-emerald-500/30"
                  : "bg-rose-500/15 text-rose-700 border border-rose-500/30"
              }`}
            >
              {selectedAnswer === currentQuestion.correctAnswer
                ? "মাশাআল্লাহ! একদম সঠিক উত্তর! 🎉"
                : `উফ! সঠিক উত্তরটি ছিল: ${currentQuestion.correctAnswer}`}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
