import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Star, Trophy, Sparkles, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { quizQuestions } from "@/data/organsData";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizModeProps {
  mode: "quick" | "challenge";
  onExit: () => void;
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

    if (answer === currentQuestion.correctAnswer) {
      setScore((s) => s + 1);
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FFD93D", "#6BCB77", "#4D96FF", "#FF6B6B"],
      });
    }

    // Auto advance after delay
    setTimeout(() => {
      if (currentIndex < questionCount - 1) {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsComplete(true);
        // Final celebration
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
        });
      }
    }, 1500);
  };

  const resetQuiz = () => {
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

  const getStars = () => {
    const percentage = (score / questionCount) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 50) return 1;
    return 0;
  };

  if (isComplete) {
    const stars = getStars();
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Trophy className="w-24 h-24 text-quiz-pending mb-6" />
        </motion.div>

        <h2 className="font-bubblegum text-4xl text-foreground mb-4">
          {stars >= 2 ? "মাশাআল্লাহ! অসাধারণ!" : "ভালো চেষ্টা!"}
        </h2>

        <p className="text-xl text-muted-foreground mb-6">
          তুমি <span className="font-bold text-primary">{score}</span>টি সঠিক উত্তর দিয়েছো{" "}
          <span className="font-bold">{questionCount}</span>টির মধ্যে!
        </p>

        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((starNum) => (
            <motion.div
              key={starNum}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ 
                scale: starNum <= stars ? 1 : 0.5, 
                rotate: 0,
                opacity: starNum <= stars ? 1 : 0.3
              }}
              transition={{ delay: starNum * 0.2 }}
            >
              <Star
                className={`w-12 h-12 ${
                  starNum <= stars ? "text-quiz-pending fill-quiz-pending" : "text-muted"
                }`}
              />
            </motion.div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={resetQuiz}
            variant="outline"
            className="rounded-full px-6 py-3 font-nunito font-semibold"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            আবার চেষ্টা করো
          </Button>
          <Button
            onClick={onExit}
            className="rounded-full px-6 py-3 font-nunito font-semibold bg-primary hover:bg-primary/90"
          >
            শেখায় ফিরে যাও
          </Button>
        </div>
      </motion.div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Button
          onClick={onExit}
          variant="ghost"
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          কুইজ থেকে বের হও
        </Button>

        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-quiz-pending" />
          <span className="font-bubblegum text-xl text-foreground">
            {score} / {questionCount}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>প্রশ্ন {currentIndex + 1}</span>
          <span>মোট {questionCount}টি</span>
        </div>
        <Progress value={progress} className="h-3 rounded-full" />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="bg-card rounded-3xl p-8 shadow-lg border border-border"
        >
          <h3 className="font-bangla font-bold text-2xl text-foreground mb-8 text-center">
            {currentQuestion.question}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === currentQuestion.correctAnswer;
              
              let bgClass = "bg-secondary hover:bg-secondary/80";
              if (showResult) {
                if (isCorrect) {
                  bgClass = "bg-quiz-correct text-primary-foreground";
                } else if (isSelected && !isCorrect) {
                  bgClass = "bg-quiz-wrong text-primary-foreground";
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
                    ${bgClass}
                    p-4 rounded-2xl font-bangla font-semibold text-lg
                    transition-colors duration-300
                    ${!showResult ? "cursor-pointer" : "cursor-default"}
                  `}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>

          {showResult && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center mt-6 font-bangla font-bold text-xl ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? "text-quiz-correct"
                  : "text-quiz-wrong"
              }`}
            >
              {selectedAnswer === currentQuestion.correctAnswer
                ? "মাশাআল্লাহ! সঠিক! 🎉"
                : `উফ! সঠিক উত্তর ছিল: ${currentQuestion.correctAnswer}`}
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
