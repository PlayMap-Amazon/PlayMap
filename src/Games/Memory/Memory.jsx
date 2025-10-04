import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Memory.module.css';

export default function Memory() {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [moves, setMoves] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [isChecking, setIsChecking] = useState(false);
    const [matchingCards, setMatchingCards] = useState([]);
    const [testMemory, setTestMemory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const timerRef = useRef(null);

    const url = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const fetchMemoryData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${url}/quiz_memory`, {
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
                
                const memoryData = Object.values(data.data).map(item => ({
                    display: item.answer,
                    definition: item.clue
                }));
                
                setTestMemory(memoryData);
                setError(null);
            } catch (err) {
                console.error('Error fetching memory data:', err);
                setError('Failed to load game data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchMemoryData();
    }, []);

    // Initialize cards by creating pairs of terms and definitions
    const initializeGame = () => {
        const gameCards = [];
        let id = 0;
        
        testMemory.forEach((item) => {
            // Add term card
            gameCards.push({
                id: id++,
                content: item.display,
                type: 'term',
                pairId: item.display,
                isFlipped: false,
                isMatched: false
            });
            
            // Add definition card
            gameCards.push({
                id: id++,
                content: item.definition,
                type: 'definition',
                pairId: item.display,
                isFlipped: false,
                isMatched: false
            });
        });
        
        // Shuffle cards
        const shuffledCards = gameCards.sort(() => Math.random() - 0.5);
        setCards(shuffledCards);
        setFlippedCards([]);
        setMatchedPairs([]);
        setMoves(0);
        setGameCompleted(false);
        setTimeElapsed(0);
    };

    // Start the game
    const startGame = () => {
        setGameStarted(true);
        initializeGame();
        // Start timer
        timerRef.current = setInterval(() => {
            setTimeElapsed(prev => prev + 1);
        }, 1000);
    };

    // Handle card flip
    const handleCardFlip = (cardId) => {
        if (isChecking) return;
        if (flippedCards.length >= 2) return;
        
        const card = cards.find(c => c.id === cardId);
        if (card.isFlipped || card.isMatched) return;

        const newFlippedCards = [...flippedCards, cardId];
        setFlippedCards(newFlippedCards);
        
        // Flip the card
        setCards(prevCards => 
            prevCards.map(c => 
                c.id === cardId ? { ...c, isFlipped: true } : c
            )
        );

        // Check for match when 2 cards are flipped
        if (newFlippedCards.length === 2) {
            setIsChecking(true);
            setMoves(prev => prev + 1);
            
            const [firstCardId, secondCardId] = newFlippedCards;
            const firstCard = cards.find(c => c.id === firstCardId);
            const secondCard = cards.find(c => c.id === secondCardId);
            
            if (firstCard.pairId === secondCard.pairId) {
                // Match found! Start the matching animation
                setMatchingCards([firstCardId, secondCardId]);
                
                setTimeout(() => {
                    setCards(prevCards => 
                        prevCards.map(c => 
                            c.id === firstCardId || c.id === secondCardId 
                                ? { ...c, isMatched: true } 
                                : c
                        )
                    );
                    setMatchedPairs(prev => [...prev, firstCard.pairId]);
                    setMatchingCards([]);
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1500); // Match the animation duration
            } else {
                // No match, flip cards back
                setTimeout(() => {
                    setCards(prevCards => 
                        prevCards.map(c => 
                            c.id === firstCardId || c.id === secondCardId 
                                ? { ...c, isFlipped: false } 
                                : c
                        )
                    );
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000);
            }
        }
    };

    // Check for game completion
    useEffect(() => {
        if (matchedPairs.length === testMemory.length && gameStarted) {
            setGameCompleted(true);
            clearInterval(timerRef.current);
        }
    }, [matchedPairs, gameStarted]);

    // Cleanup timer
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getPerformanceMessage = () => {
        const efficiency = (testMemory.length / moves) * 100;
        if (efficiency >= 80) return "🏆 Outstanding memory!";
        if (efficiency >= 60) return "🎯 Great performance!";
        if (efficiency >= 40) return "👍 Good job!";
        return "💪 Keep practicing!";
    };

    // Loading screen
    if (loading) {
        return (
            <motion.div 
                className={styles.startContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className={styles.startCard}
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
                        className={styles.gameTitle}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        Loading Memory Game...
                    </motion.h2>
                    <motion.p 
                        className={styles.gameDescription}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        Fetching your personalized quiz content
                    </motion.p>
                </motion.div>
            </motion.div>
        );
    }

    // Error screen
    if (error) {
        return (
            <motion.div 
                className={styles.startContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className={styles.startCard}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h2 
                        className={styles.gameTitle}
                        style={{ color: '#ef4444' }}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        ❌ Error Loading Game
                    </motion.h2>
                    <motion.p 
                        className={styles.gameDescription}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        {error}
                    </motion.p>
                    <motion.button 
                        className={styles.startButton}
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

    // Game start screen
    if (!gameStarted) {
        return (
            <motion.div 
                className={styles.startContainer}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className={styles.startCard}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h1 
                        className={styles.gameTitle}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        🧠 Memory Match
                    </motion.h1>
                    <motion.p 
                        className={styles.gameDescription}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        Match terms with their definitions!
                    </motion.p>
                    <motion.div 
                        className={styles.gameStats}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                    >
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{testMemory.length}</span>
                            <span className={styles.statLabel}>Pairs to Match</span>
                        </div>
                        <div className={styles.stat}>
                            <span className={styles.statValue}>{testMemory.length * 2}</span>
                            <span className={styles.statLabel}>Total Cards</span>
                        </div>
                    </motion.div>
                    <motion.button 
                        className={styles.startButton}
                        onClick={startGame}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 6px 25px rgba(102, 126, 234, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🚀 Start Game
                    </motion.button>
                </motion.div>
            </motion.div>
        );
    }

    // Game completion screen
    if (gameCompleted) {
        return (
            <motion.div 
                className={styles.completionContainer}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <motion.div 
                    className={styles.completionCard}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <motion.h2 
                        className={styles.completionTitle}
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        🎉 Memory Master!
                    </motion.h2>
                    
                    <motion.div 
                        className={styles.finalStats}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6, type: "spring", stiffness: 200 }}
                    >
                        <div className={styles.finalStat}>
                            <span className={styles.statNumber}>{moves}</span>
                            <span className={styles.statText}>Moves</span>
                        </div>
                        <div className={styles.finalStat}>
                            <span className={styles.statNumber}>{formatTime(timeElapsed)}</span>
                            <span className={styles.statText}>Time</span>
                        </div>
                        <div className={styles.finalStat}>
                            <span className={styles.statNumber}>{Math.round((testMemory.length / moves) * 100)}%</span>
                            <span className={styles.statText}>Efficiency</span>
                        </div>
                    </motion.div>
                    
                    <motion.p 
                        className={styles.performanceMessage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                    >
                        {getPerformanceMessage()}
                    </motion.p>
                    
                    <motion.button 
                        className={styles.playAgainButton}
                        onClick={() => setGameStarted(false)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1 }}
                        whileHover={{ scale: 1.05, boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🔄 Play Again
                    </motion.button>
                </motion.div>
            </motion.div>
        );
    }

    // Main game screen
    return (
        <div className={styles.gameContainer}>
            {/* Game Header */}
            <motion.div 
                className={styles.gameHeader}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className={styles.gameInfo}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Moves:</span>
                        <span className={styles.statValue}>{moves}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Time:</span>
                        <span className={styles.statValue}>{formatTime(timeElapsed)}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Pairs:</span>
                        <span className={styles.statValue}>{matchedPairs.length}/{testMemory.length}</span>
                    </div>
                </div>
            </motion.div>

            {/* Cards Grid */}
            <motion.div 
                className={styles.cardsGrid}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <AnimatePresence>
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            className={`${styles.cardContainer} ${
                                card.isMatched ? styles.matched : ''
                            } ${
                                matchingCards.includes(card.id) ? styles.matching : ''
                            }`}
                            initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
                            animate={{ 
                                opacity: 1, 
                                scale: 1, 
                                rotateY: 0 
                            }}
                            transition={{ 
                                duration: 0.4, 
                                delay: index * 0.05,
                                type: "spring",
                                stiffness: 100
                            }}
                            whileHover={!card.isFlipped && !card.isMatched ? { 
                                scale: 1.05,
                                rotateY: 5,
                                boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                            } : {}}
                            whileTap={!card.isFlipped && !card.isMatched ? { scale: 0.95 } : {}}
                        >
                            <motion.div
                                className={styles.card}
                                onClick={() => handleCardFlip(card.id)}
                                animate={{
                                    rotateY: card.isFlipped || card.isMatched ? 180 : 0
                                }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                {/* Card Back */}
                                <motion.div 
                                    className={`${styles.cardFace} ${styles.cardBack}`}
                                    style={{
                                        rotateY: 0,
                                        backfaceVisibility: 'hidden'
                                    }}
                                >
                                    <div className={styles.cardBackContent}>
                                        <span className={styles.cardBackIcon}>🧠</span>
                                        <span className={styles.cardBackText}>Memory</span>
                                    </div>
                                </motion.div>
                                
                                {/* Card Front */}
                                <motion.div 
                                    className={`${styles.cardFace} ${styles.cardFront} ${
                                        card.type === 'term' ? styles.termCard : styles.definitionCard
                                    }`}
                                    style={{
                                        rotateY: 180,
                                        backfaceVisibility: 'hidden'
                                    }}
                                >
                                    <div className={styles.cardTypeIndicator}>
                                        {card.type === 'term' ? '🏷️' : '📖'}
                                    </div>
                                    <div className={styles.cardContent}>
                                        {card.content}
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}



