import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";
import { api } from "../services/api";

interface Question {
  id: number;
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  difficulty: string;
}

export default function Testing() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const data = await api.getQuestions();
      setQuestions(data);
      setAnswers(Array(data.length).fill(null));
    } catch (error) {
      console.error("Questions loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (showResults || loading || questions.length === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setShowResults(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResults, loading, questions.length]);

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(newAnswers[nextQuestion]);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = (): number => {
  const optionMap = ["A", "B", "C", "D"];

  return answers.reduce<number>(
    (score, answer, index) => {
      if (
        answer !== null &&
        questions[index] &&
        optionMap[answer] === questions[index].correctAnswer
      ) {
        return score + 1;
      }

      return score;
    },
    0
  );
};

  const isCorrectAnswer = (index: number) => {
    const optionMap = ["A", "B", "C", "D"];
    const answer = answers[index];

    return (
      answer !== null &&
      questions[index] &&
      optionMap[answer] === questions[index].correctAnswer
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers(Array(questions.length).fill(null));
    setShowResults(false);
    setTimeLeft(600);
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen text-white">
        Loading questions...
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen text-white">
        No questions found. Add questions from Admin Panel.
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = questions.length > 0 ? (score / questions.length) * 100 : 0;

    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#1A2234] border border-[#7B61FF]/30 rounded-3xl p-12 max-w-2xl w-full text-center"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00F5FF] to-[#7B61FF] flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(0,245,255,0.4)]">
            <CheckCircle className="w-16 h-16 text-white" />
          </div>

          <h2 className="text-4xl font-bold text-white mb-4">
            Test Complete!
          </h2>

          <p className="text-gray-400 mb-8">
            You've completed the Cybersecurity test
          </p>

          <div className="bg-[#151B2E] rounded-2xl p-8 mb-8">
            <div className="text-6xl font-bold bg-gradient-to-r from-[#00F5FF] to-[#00FF9D] bg-clip-text text-transparent mb-2">
              {percentage.toFixed(0)}%
            </div>

            <div className="text-gray-400 mb-6">
              {score} out of {questions.length} correct
            </div>

            <div className="flex items-center justify-center gap-2 flex-wrap">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-12 h-2 rounded-full ${
                    isCorrectAnswer(index) ? "bg-[#00FF9D]" : "bg-[#FF3366]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={restartTest}
              className="bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] hover:opacity-90 text-white"
            >
              Retake Test
            </Button>

            <Button
              variant="outline"
              className="border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/10"
            >
              View Solutions
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  const current = questions[currentQuestion];

  const options = [
    current.optionA,
    current.optionB,
    current.optionC,
    current.optionD,
  ];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Cybersecurity Test
            </h1>

            <p className="text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 bg-[#1A2234] border border-[#7B61FF]/30 rounded-xl">
            <Clock className="w-5 h-5 text-[#00F5FF]" />
            <span className="text-[#00F5FF] font-mono font-bold">
              {formatTime(timeLeft)}
            </span>
          </div>
        </div>

        <div className="relative h-2 bg-[#151B2E] rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00F5FF] to-[#7B61FF]"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1A2234] border border-[#7B61FF]/30 rounded-2xl p-8 mb-6"
        >
          <div className="mb-6">
            <span className="px-3 py-1 rounded-full bg-[#00F5FF]/20 text-[#00F5FF] text-sm font-medium border border-[#00F5FF]/30">
              {current.difficulty || "Easy"}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-8">
            {current.questionText}
          </h2>

          <RadioGroup
            value={selectedAnswer !== null ? selectedAnswer.toString() : ""}
            onValueChange={(val) => setSelectedAnswer(Number(val))}
          >
            <div className="space-y-4">
              {options.map((option, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`flex items-center space-x-4 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedAnswer === index
                        ? "bg-[#00F5FF]/10 border-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.2)]"
                        : "bg-[#151B2E] border-[#7B61FF]/20 hover:border-[#7B61FF]/40"
                    }`}
                    onClick={() => setSelectedAnswer(index)}
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                    />

                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 text-white cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                </motion.div>
              ))}
            </div>
          </RadioGroup>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="border-[#7B61FF]/30 text-gray-400 hover:bg-[#151B2E]"
          onClick={() => {
            if (currentQuestion > 0) {
              const previousQuestion = currentQuestion - 1;
              setCurrentQuestion(previousQuestion);
              setSelectedAnswer(answers[previousQuestion]);
            }
          }}
          disabled={currentQuestion === 0}
        >
          Previous
        </Button>

        <Button
          onClick={handleNext}
          disabled={selectedAnswer === null}
          className="bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] hover:opacity-90 text-white disabled:opacity-50"
        >
          {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}