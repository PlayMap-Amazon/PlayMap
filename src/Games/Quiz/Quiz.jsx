
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Quiz.module.css';

export default function Quiz({ }) {
    const [testquiz, setTestquiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = import.meta.env.VITE_API_URL;
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${url}/quiz`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        'ngrok-skip-browser-warning': 'true',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setTestquiz(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching quiz data:', err);
                setError('Failed to load quiz data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchQuizData();
    }, []);

    // Don't calculate these if testquiz is not loaded yet
    const questions = testquiz?.data?.questions || [];
    const currentQuestion = questions[currentQuestionIndex];
    const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

    const handleAnswerSelect = (answer) => {
        if (selectedAnswer !== null) return;
        
        setSelectedAnswer(answer);
        setShowResult(true);
        
        if (answer === currentQuestion.answer) {
            setScore(score + 1);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setShowExplanation(false);
        } else {
            setQuizCompleted(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setQuizCompleted(false);
        setShowExplanation(false);
    };

    // Loading screen
    if (loading) {
        return (
            <motion.div 
                className={styles.quizContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className={styles.loadingContainer}
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.div
                        className={styles.loadingSpinner}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        style={{ fontSize: '4rem', marginBottom: '1rem' }}
                    >
                        🧠
                    </motion.div>
                    <motion.h2 
                        className={styles.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        Loading Quiz...
                    </motion.h2>
                    <motion.p 
                        className={styles.loadingText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        Fetching your personalized questions
                    </motion.p>
                </motion.div>
            </motion.div>
        );
    }

    // Error screen
    if (error) {
        return (
            <motion.div 
                className={styles.quizContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className={styles.errorContainer}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h2 
                        className={styles.title}
                        style={{ color: '#ef4444' }}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        ❌ Error Loading Quiz
                    </motion.h2>
                    <motion.p 
                        className={styles.errorText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        {error}
                    </motion.p>
                    <motion.button 
                        className={styles.restartButton}
                        onClick={() => window.location.reload()}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🔄 Retry
                    </motion.button>
                </motion.div>
            </motion.div>
        );
    }

    // Don't render if testquiz is not loaded yet
    if (!testquiz || !questions.length) {
        return null;
    }

    const getScoreMessage = () => {
        const percentage = (score / questions.length) * 100;
        if (percentage >= 80) return "🎉 Excellent work!";
        if (percentage >= 60) return "👍 Good job!";
        if (percentage >= 40) return "📚 Keep studying!";
        return "💪 Don't give up!";
    };

    if (quizCompleted) {
        return (
            <motion.div 
                className={styles.completionContainer}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <motion.div 
                    className={styles.completionCard}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h2 
                        className={styles.completionTitle}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        Quiz Completed! 🎯
                    </motion.h2>
                    <motion.div 
                        className={styles.finalScore}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
                    >
                        <span className={styles.scoreNumber}>{score}</span>
                        <span className={styles.scoreTotal}>/ {questions.length}</span>
                    </motion.div>
                    <motion.p 
                        className={styles.scoreMessage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                    >
                        {getScoreMessage()}
                    </motion.p>
                    <div className={styles.scorePercentageContainer}>
                        <motion.div 
                            className={styles.scorePercentage}
                            initial={{ width: 0 }}
                            animate={{ width: `${(score / questions.length) * 100}%` }}
                            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                        >
                            {Math.round((score / questions.length) * 100)}%
                        </motion.div>
                    </div>
                    <motion.button 
                        className={styles.restartButton}
                        onClick={handleRestart}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1.2 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🔄 Play Again
                    </motion.button>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <div className={styles.quizContainer}>
            {/* Header */}
            <motion.div 
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={styles.title}>{testquiz.title || 'Quiz'}</h2>
            </motion.div>

            {/* Progress Bar */}
            <motion.div className={styles.progressContainer}>
                <div className={styles.progressInfo}>
                    <span className={styles.questionCount}>
                        Question {currentQuestionIndex + 1} of {questions.length}
                    </span>
                    <span className={styles.currentScore}>Score: {score}</span>
                </div>
                <div className={styles.progressBar}>
                    <motion.div 
                        className={styles.progressFill}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                </div>
            </motion.div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div 
                    key={currentQuestionIndex}
                    className={styles.questionCard}
                    initial={{ opacity: 0, x: 100, rotateY: -15 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: -100, rotateY: 15 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <motion.h3 
                        className={styles.questionText}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        {currentQuestion.question}
                    </motion.h3>

                    {/* Answer Buttons */}
                    <motion.div 
                        className={styles.answersContainer}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                    >
                        <motion.button
                            className={`${
                                styles.answerButton
                            } ${
                                selectedAnswer === true 
                                    ? currentQuestion.answer === true 
                                        ? styles.correct 
                                        : styles.incorrect
                                    : showResult && currentQuestion.answer === true 
                                        ? styles.correctHighlight
                                        : ''
                            }`}
                            onClick={() => handleAnswerSelect(true)}
                            disabled={selectedAnswer !== null}
                            whileHover={selectedAnswer === null ? { 
                                scale: 1.02, 
                                boxShadow: "0 6px 25px rgba(76, 175, 80, 0.3)" 
                            } : {}}
                            whileTap={{ scale: 0.98 }}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        >
                            <span className={styles.answerIcon}>✓</span>
                            <span>True</span>
                        </motion.button>

                        <motion.button
                            className={`${
                                styles.answerButton
                            } ${
                                selectedAnswer === false 
                                    ? currentQuestion.answer === false 
                                        ? styles.correct 
                                        : styles.incorrect
                                    : showResult && currentQuestion.answer === false 
                                        ? styles.correctHighlight
                                        : ''
                            }`}
                            onClick={() => handleAnswerSelect(false)}
                            disabled={selectedAnswer !== null}
                            whileHover={selectedAnswer === null ? { 
                                scale: 1.02, 
                                boxShadow: "0 6px 25px rgba(244, 67, 54, 0.3)" 
                            } : {}}
                            whileTap={{ scale: 0.98 }}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                        >
                            <span className={styles.answerIcon}>✗</span>
                            <span>False</span>
                        </motion.button>
                    </motion.div>

                    {/* Result and Explanation */}
                    <AnimatePresence>
                        {showResult && (
                            <motion.div 
                                className={styles.resultContainer}
                                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                                transition={{ duration: 0.4, delay: 0.1 }}
                            >
                                <motion.div 
                                    className={`${
                                        styles.resultMessage
                                    } ${
                                        selectedAnswer === currentQuestion.answer 
                                            ? styles.correctResult 
                                            : styles.incorrectResult
                                    }`}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                                >
                                    {selectedAnswer === currentQuestion.answer ? '🎉 Correct!' : '❌ Incorrect!'}
                                </motion.div>

                                {showExplanation && (
                                    <motion.div 
                                        className={styles.explanation}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <p>{currentQuestion.reason}</p>
                                    </motion.div>
                                )}

                                <motion.div 
                                    className={styles.actionsContainer}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                >
                                    {!showExplanation && (
                                        <motion.button 
                                            className={styles.explanationButton}
                                            onClick={() => setShowExplanation(true)}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: 0.1 }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            💡 Show Explanation
                                        </motion.button>
                                    )}
                                    
                                    <motion.button 
                                        className={styles.nextButton}
                                        onClick={handleNextQuestion}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: showExplanation ? 0.3 : 0.1 }}
                                        whileHover={{ 
                                            scale: 1.05, 
                                            boxShadow: "0 6px 20px rgba(102, 126, 234, 0.4)" 
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {currentQuestionIndex < questions.length - 1 ? '➡️ Next Question' : '🏁 Finish Quiz'}
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}