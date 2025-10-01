import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./GamesPage.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Navbar from "@/Navbar/Navbar";
import FloatingParticles from "@/FloatingParticles";
import GameBox from "./GameBox";

const Games = {
    QUIZ: "QUIZ",
    SCRAMBLE: "SCRAMBLE",
    MATCHING_PAIRS: "MATCHING_PAIRS"
}

function GamesPage() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const [currentGame, setCurrentGame] = useState(null);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/login');
        }
    }, [navigate, user, loading]);

    return (
        <div className={styles.body}>
            <Navbar />
            <FloatingParticles />
            <AnimatePresence>
                {currentGame !== null && (
                    <motion.button
                        className={styles.backButton}
                        onClick={() => setCurrentGame(null)}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30, scale: 0.8 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95, y: -10 }}
                    >
                        ← Back to Games
                    </motion.button>
                )}
            </AnimatePresence>
            <div className={styles.contentContainer}>
                <AnimatePresence mode="wait">
                    {currentGame === null ? (
                        <motion.div 
                            key="games-grid"
                            className={styles.gameSections}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={{
                                hidden: { 
                                    opacity: 0,
                                    scale: 0.9,
                                    y: 20,
                                    transition: {
                                        staggerChildren: 0.05,
                                        staggerDirection: -1,
                                        duration: 0.3
                                    }
                                },
                                visible: {
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    transition: {
                                        staggerChildren: 0.15,
                                        delayChildren: 0.1,
                                        duration: 0.4
                                    }
                                }
                            }}
                        >
                            <GameBox
                                icon="🎯"
                                title="Trivia Quizzes"
                                description="Test your knowledge with exciting trivia questions from your study materials. Challenge yourself and track your progress!"
                                onPlay={() => setCurrentGame(Games.QUIZ)}
                                index={0}
                            />
                            <GameBox
                                icon="🔤"
                                title="Word Scrambles"
                                description="Unscramble letters to form key terms and concepts. Improve your vocabulary while having fun!"
                                onPlay={() => setCurrentGame(Games.SCRAMBLE)}
                                index={1}
                            />
                            <GameBox
                                icon="🔗"
                                title="Matching Pairs"
                                description="Match related concepts, definitions, and terms. Perfect for memorizing important connections!"
                                onPlay={() => setCurrentGame(Games.MATCHING_PAIRS)}
                                index={2}
                            />
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="game-container"
                            className={styles.gameContainerWrapper}
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ 
                                duration: 0.4,
                                delay: 0.05,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                        >
                            {currentGame === Games.QUIZ && (
                                <div 
                                    className={[styles.gameContainer, 'h-[75vh]'].join(' ')}
                                >
                                        <iframe
                                        src="https://play.kahoot.it/v2/?quizId=3b1c3f7e-3f4e-4e2b-9d3a-8f4e2b9d3a8f"
                                        title="Trivia Quiz"
                                        allowFullScreen
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                    ></iframe>
                                </div>
                            )}
                            {currentGame === Games.SCRAMBLE && (
                                <div 
                                    className={[styles.gameContainer, 'h-[75vh]'].join(' ')}
                                >
                                    <iframe
                                        src="https://wordwall.net/resource/123456/word-scramble"
                                        title="Word Scramble"
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                    ></iframe>
                                </div>
                            )}
                            {currentGame === Games.MATCHING_PAIRS && (
                                <div 
                                    className={[styles.gameContainer, 'h-[75vh]'].join(' ')}
                                >
                                    <iframe
                                        src="https://wordwall.net/resource/654321/matching-pairs"
                                        title="Matching Pairs"
                                        style={{ width: '100%', height: '100%', border: 'none' }}
                                    ></iframe>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default GamesPage;