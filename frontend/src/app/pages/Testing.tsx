import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Clock, ChevronRight, CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Label } from "../components/ui/label";

const questions = [
  {
    id: 1,
    category: "Web Vulnerabilities",
    question: "What does XSS stand for in cybersecurity?",
    options: [
      "External Site Scripting",
      "Cross-Site Scripting",
      "Extended Security System",
      "XML Security Standard",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    category: "Web Vulnerabilities",
    question: "Which HTTP header helps prevent clickjacking attacks?",
    options: [
      "X-Frame-Options",
      "Content-Security-Policy",
      "X-XSS-Protection",
      "Strict-Transport-Security",
    ],
    correctAnswer: 0,
  },
  {
    id: 3,
    category: "Web Vulnerabilities",
    question: "What is SQL injection primarily used to exploit?",
    options: [
      "Network vulnerabilities",
      "Database queries",
      "File systems",
      "User authentication",
    ],
    correctAnswer: 1,
  },
];

export default function Testing() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1]);
      } else {
        setShowResults(true);
      }
    }
  };

  const calculateScore = () => {
    return answers.reduce((score, answer, index) => {
      return answer === questions[index].correctAnswer ? score + 1 : score;
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (showResults) {
    const score = calculateScore();
    const percentage = (score / questions.length) * 100;

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
          <h2 className="text-4xl font-bold text-white mb-4">Test Complete!</h2>
          <p className="text-gray-400 mb-8">You've completed the Web Vulnerabilities test</p>

          <div className="bg-[#151B2E] rounded-2xl p-8 mb-8">
            <div className="text-6xl font-bold bg-gradient-to-r from-[#00F5FF] to-[#00FF9D] bg-clip-text text-transparent mb-2">
              {percentage.toFixed(0)}%
            </div>
            <div className="text-gray-400 mb-6">
              {score} out of {questions.length} correct
            </div>
            <div className="flex items-center justify-center gap-2">
              {questions.map((_, index) => (
                <div
                  key={index}
                  className={`w-12 h-2 rounded-full ${
                    answers[index] === questions[index].correctAnswer
                      ? "bg-[#00FF9D]"
                      : "bg-[#FF3366]"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => {
                setCurrentQuestion(0);
                setSelectedAnswer(null);
                setAnswers(Array(questions.length).fill(null));
                setShowResults(false);
              }}
              className="bg-gradient-to-r from-[#00F5FF] to-[#7B61FF] hover:opacity-90 text-white"
            >
              Retake Test
            </Button>
            <Button variant="outline" className="border-[#00F5FF] text-[#00F5FF] hover:bg-[#00F5FF]/10">
              View Solutions
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Web Vulnerabilities Test</h1>
            <p className="text-gray-400">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-[#1A2234] border border-[#7B61FF]/30 rounded-xl">
            <Clock className="w-5 h-5 text-[#00F5FF]" />
            <span className="text-[#00F5FF] font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="relative h-2 bg-[#151B2E] rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00F5FF] to-[#7B61FF]"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question Card */}
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
              {questions[currentQuestion].category}
            </span>
          </div>

          <h2 className="text-2xl font-bold text-white mb-8">
            {questions[currentQuestion].question}
          </h2>

          <RadioGroup value={selectedAnswer?.toString()} onValueChange={(val) => setSelectedAnswer(parseInt(val))}>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
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
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
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

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          className="border-[#7B61FF]/30 text-gray-400 hover:bg-[#151B2E]"
          onClick={() => {
            if (currentQuestion > 0) {
              setCurrentQuestion(currentQuestion - 1);
              setSelectedAnswer(answers[currentQuestion - 1]);
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
