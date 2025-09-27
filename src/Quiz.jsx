
import { CustomSidebar } from "./CustomSidebar/CustomSidebar";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Confetti from "react-confetti-boom";
import { q } from "framer-motion/client";

const EmptyQuiz = [
  {
    question: "",
    answer: true,
    reason: ""
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [quiz, setQuiz] = useState(EmptyQuiz);
  const [quizTitle, setQuizTitle] = useState("");

  const question = quiz[current]

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/quiz`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      })
      .then((res) => res.json())
      .then((data) => {
        setQuiz(data.data.questions);
        setQuizTitle(data.title);
      });
  }, []);

  const handleAnswer = (ans) => {
    setSelected(ans);
    setShowAnswer(true);
    if (ans === question.answer) setScore((s) => s + 1);
    setTimeout(() => {
      if (current === quiz.length - 1) {
        setFinished(true);
      } else {
        setCurrent((c) => c + 1);
        setShowAnswer(false);
        setSelected(null);
      }
    }, 3000);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl min-h-[500px] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-primary mb-8 drop-shadow-sm text-center">{quizTitle}</h1>
        <AnimatePresence mode="wait">
          {!finished ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, type: "spring" }}
            >
              <Card className="shadow-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 via-white to-white/80 backdrop-blur-md min-h-[420px] min-w-[520px] md:min-h-[500px] md:min-w-[800px] flex flex-col justify-between ring-1 ring-orange-200/40">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-primary-800">
                    Question {current + 1} / {quiz.length}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl md:text-3xl font-semibold text-center mb-10 min-h-[64px] md:min-h-[80px] flex items-center justify-center">
                    {question.question}
                  </div>
                  <div className="flex gap-10 justify-center mt-4">
                    <Button
                      size="lg"
                      variant={selected === true ? (question.answer === true ? "default" : "destructive") : "outline"}
                      className={`w-40 h-16 text-2xl font-bold text-gray-800 transition-all duration-200 border-2 ring-1
                        ${selected === true
                          ? question.answer === true
                            ? 'border-green-400 bg-gradient-to-br from-green-100 via-white to-white/80 ring-green-200/40 focus:border-green-400 active:border-green-400'
                            : 'border-red-400 bg-gradient-to-br from-red-100 via-white to-white/80 ring-red-200/40 focus:border-red-400 active:border-red-400'
                          : 'border-orange-300 bg-gradient-to-br from-orange-50 via-white to-white/80 ring-orange-200/40 focus:border-orange-400 active:border-orange-400'}
                        hover:scale-105 hover:shadow-lg hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-100 hover:via-white hover:to-white/80
                        ${showAnswer && question.answer === true ? "ring-2 ring-success" : ""}`}
                      disabled={showAnswer}
                      onClick={() => handleAnswer(true)}
                    >
                      True
                    </Button>
                    <Button
                      size="lg"
                      variant={selected === false ? (question.answer === false ? "default" : "destructive") : "outline"}
                      className={`w-40 h-16 text-2xl font-bold text-gray-800 transition-all duration-200 border-2 ring-1
                        ${selected === false
                          ? question.answer === false
                            ? 'border-green-400 bg-gradient-to-br from-green-100 via-white to-white/80 ring-green-200/40 focus:border-green-400 active:border-green-400'
                            : 'border-red-400 bg-gradient-to-br from-red-100 via-white to-white/80 ring-red-200/40 focus:border-red-400 active:border-red-400'
                          : 'border-orange-300 bg-gradient-to-br from-orange-50 via-white to-white/80 ring-orange-200/40 focus:border-orange-400 active:border-orange-400'}
                        hover:scale-105 hover:shadow-lg hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-100 hover:via-white hover:to-white/80
                        ${showAnswer && question.answer === false ? "ring-2 ring-success" : ""}`}
                      disabled={showAnswer}
                      onClick={() => handleAnswer(false)}
                    >
                      False
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-2">
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`text-lg font-semibold ${selected === question.answer ? "text-chart-2" : "text-destructive"} w-full`}
                    >
                      <p className={`w-full text-center ${selected === question.answer ? "text-chart-2" : "text-destructive"}`}>{selected === question.answer ? "Correct!" : "Incorrect!"}</p>
                      <p className="w-full text-center">{question.reason}</p>
                    </motion.div>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="score"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="shadow-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 via-white to-white/80 backdrop-blur-md min-h-[420px] min-w-[520px] md:min-h-[500px] md:min-w-[800px] flex flex-col justify-between ring-1 ring-orange-200/40">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary-800 text-center">
                    Game Over
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl text-center mb-8">
                    Your score: <span className="font-bold text-success">{score}</span> / {quiz.length}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-center gap-2">
                  <Button size="lg" className="w-40 h-16 text-2xl font-bold text-gray-800 border-2 border-orange-300 bg-gradient-to-br from-orange-50 via-white to-white/80 ring-1 ring-orange-200/40 hover:scale-105 hover:shadow-lg hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-100 hover:via-white hover:to-white/80 focus:border-orange-400 active:border-orange-400 transition-all duration-200" onClick={() => {
                    setCurrent(0);
                    setScore(0);
                    setFinished(false);
                    setShowAnswer(false);
                    setSelected(null);
                  }}>
                    Play Again
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {showAnswer && selected === question.answer && !finished && (
        <Confetti particleCount={100} shapeSize={12} spreadDeg={270} x={0.55}/>
      )}
    </div>
  );
}
