import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Crossword.module.css';

export default function Crossword({ }) {
    const [testCrossword, setTestCrossword] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const url = import.meta.env.VITE_API_URL;
    const [userGrid, setUserGrid] = useState([]);
    const [selectedCell, setSelectedCell] = useState(null);
    const [selectedClue, setSelectedClue] = useState(null);
    const [completedWords, setCompletedWords] = useState(new Set());
    const [gameCompleted, setGameCompleted] = useState(false);
    const [showCongratulations, setShowCongratulations] = useState(false);
    const cellRefs = useRef({});
    const [gridBounds, setGridBounds] = useState(null);
    const [cellSize, setCellSize] = useState(45);

    // Calculate the actual content bounds of the crossword
    const calculateGridBounds = (grid, clues) => {
        if (!grid || !clues || clues.length === 0) return null;

        let minRow = grid.length;
        let maxRow = -1;
        let minCol = grid[0].length;
        let maxCol = -1;

        // Find bounds based on actual letter positions from clues
        clues.forEach(clue => {
            const { row, col, answer, direction } = clue;
            
            if (direction === 'across') {
                minRow = Math.min(minRow, row);
                maxRow = Math.max(maxRow, row);
                minCol = Math.min(minCol, col);
                maxCol = Math.max(maxCol, col + answer.length - 1);
            } else {
                minRow = Math.min(minRow, row);
                maxRow = Math.max(maxRow, row + answer.length - 1);
                minCol = Math.min(minCol, col);
                maxCol = Math.max(maxCol, col);
            }
        });

        // Add padding around the content
        const padding = 1;
        return {
            minRow: Math.max(0, minRow - padding),
            maxRow: Math.min(grid.length - 1, maxRow + padding),
            minCol: Math.max(0, minCol - padding),
            maxCol: Math.min(grid[0].length - 1, maxCol + padding)
        };
    };

    // Get the actual grid size based on content
    const getActualGridSize = () => {
        if (!gridBounds) return { rows: 0, cols: 0 };
        return {
            rows: gridBounds.maxRow - gridBounds.minRow + 1,
            cols: gridBounds.maxCol - gridBounds.minCol + 1
        };
    };

    // Calculate dynamic cell size based on content and screen size
    const getDynamicCellSize = () => {
        if (!gridBounds) return 45;
        
        const actualSize = getActualGridSize();
        const maxGridWidth = window.innerWidth < 900 ? window.innerWidth - 80 : 600;
        const maxGridHeight = window.innerHeight < 800 ? window.innerHeight * 0.4 : 500;
        
        const cellSizeByWidth = Math.floor(maxGridWidth / actualSize.cols) - 2;
        const cellSizeByHeight = Math.floor(maxGridHeight / actualSize.rows) - 2;
        
        // Use the smaller size to ensure the grid fits
        const dynamicSize = Math.min(cellSizeByWidth, cellSizeByHeight, 60); // Max 60px per cell
        return Math.max(dynamicSize, 25); // Min 25px per cell
    };

    useEffect(() => {
        const fetchCrosswordData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${url}/quiz_crossword`, {
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
                setTestCrossword(data.data);
                
                // Calculate grid bounds based on actual content
                const bounds = calculateGridBounds(data.data.grid, data.data.clues);
                setGridBounds(bounds);
                
                // Initialize user grid once we have the crossword data
                setUserGrid(Array(data.data.gridSize.rows).fill().map(() => 
                    Array(data.data.gridSize.cols).fill('')
                ));
                
                setError(null);
            } catch (err) {
                console.error('Error fetching crossword data:', err);
                setError('Failed to load crossword data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCrosswordData();
    }, []);

    // Update cell size on window resize or when grid bounds change
    useEffect(() => {
        const updateCellSize = () => {
            if (gridBounds) {
                setCellSize(getDynamicCellSize());
            }
        };

        updateCellSize();
        window.addEventListener('resize', updateCellSize);
        return () => window.removeEventListener('resize', updateCellSize);
    }, [gridBounds]);

    // Calculate progress
    const progress = testCrossword ? (completedWords.size / testCrossword.clues.length) * 100 : 0;

    // Check if a word is completed
    const checkWordCompletion = (clue) => {
        if (!testCrossword || !userGrid.length) return false;
        
        const { row, col, answer, direction } = clue;
        let userWord = '';
        
        for (let i = 0; i < answer.length; i++) {
            const r = direction === 'across' ? row : row + i;
            const c = direction === 'across' ? col + i : col;
            
            // Add boundary checks
            if (r >= 0 && r < testCrossword.gridSize.rows && 
                c >= 0 && c < testCrossword.gridSize.cols) {
                userWord += userGrid[r]?.[c] || '';
            }
        }
        
        return userWord.toUpperCase() === answer.toUpperCase();
    };

    // Update completed words when grid changes
    useEffect(() => {
        if (!testCrossword || !userGrid.length) return;
        
        const newCompletedWords = new Set();
        testCrossword.clues.forEach((clue, index) => {
            if (checkWordCompletion(clue)) {
                newCompletedWords.add(index);
            }
        });
        setCompletedWords(newCompletedWords);
        
        // Check if game is completed
        if (newCompletedWords.size === testCrossword.clues.length && newCompletedWords.size > 0) {
            if (!gameCompleted) {
                setGameCompleted(true);
                setShowCongratulations(true);
            }
        }
    }, [userGrid, gameCompleted, testCrossword]);

    const handleCellClick = (row, col) => {
        if (!testCrossword || testCrossword.grid[row][col] === '#') return;
        
        setSelectedCell({ row, col });
        
        // Find clues that include this cell
        const relevantClues = testCrossword.clues.filter(clue => {
            const { row: clueRow, col: clueCol, answer, direction } = clue;
            
            if (direction === 'across') {
                return row === clueRow && col >= clueCol && col < clueCol + answer.length;
            } else {
                return col === clueCol && row >= clueRow && row < clueRow + answer.length;
            }
        });
        
        if (relevantClues.length > 0) {
            // If we have a selected clue and it's still relevant, keep it, otherwise pick the first one
            const currentClueStillRelevant = selectedClue !== null && 
                relevantClues.some((_, index) => 
                    testCrossword.clues.findIndex(c => c === _) === selectedClue
                );
            
            if (!currentClueStillRelevant) {
                setSelectedClue(testCrossword.clues.findIndex(c => c === relevantClues[0]));
            }
        }
    };

    const handleCellChange = (row, col, value) => {
        if (value.length > 1) return; // Only allow single characters
        if (value && !/^[a-zA-Z]$/.test(value)) return; // Only letters
        
        const newGrid = [...userGrid];
        newGrid[row] = [...newGrid[row]];
        newGrid[row][col] = value.toUpperCase();
        setUserGrid(newGrid);
        
        // Move to next cell in the current word if we entered a letter
        if (value && selectedClue !== null) {
            const clue = testCrossword.clues[selectedClue];
            const { row: clueRow, col: clueCol, answer, direction } = clue;
            
            let nextRow = row;
            let nextCol = col;
            
            if (direction === 'across') {
                nextCol = col + 1;
                if (nextCol < clueCol + answer.length && nextCol < testCrossword.gridSize.cols) {
                    setSelectedCell({ row: nextRow, col: nextCol });
                    setTimeout(() => {
                        cellRefs.current[`${nextRow}-${nextCol}`]?.focus();
                    }, 0);
                }
            } else {
                nextRow = row + 1;
                if (nextRow < clueRow + answer.length && nextRow < testCrossword.gridSize.rows) {
                    setSelectedCell({ row: nextRow, col: nextCol });
                    setTimeout(() => {
                        cellRefs.current[`${nextRow}-${nextCol}`]?.focus();
                    }, 0);
                }
            }
        }
    };

    const handleKeyDown = (e, row, col) => {
        if (e.key === 'Backspace' && !userGrid[row][col] && selectedClue !== null) {
            // Move to previous cell if current is empty and backspace is pressed
            const clue = testCrossword.clues[selectedClue];
            const { row: clueRow, col: clueCol, direction } = clue;
            
            let prevRow = row;
            let prevCol = col;
            
            if (direction === 'across') {
                prevCol = col - 1;
                if (prevCol >= clueCol && prevCol >= 0) {
                    setSelectedCell({ row: prevRow, col: prevCol });
                    setTimeout(() => {
                        cellRefs.current[`${prevRow}-${prevCol}`]?.focus();
                    }, 0);
                }
            } else {
                prevRow = row - 1;
                if (prevRow >= clueRow && prevRow >= 0) {
                    setSelectedCell({ row: prevRow, col: prevCol });
                    setTimeout(() => {
                        cellRefs.current[`${prevRow}-${prevCol}`]?.focus();
                    }, 0);
                }
            }
        }
    };

    const handleClueClick = (clueIndex) => {
        setSelectedClue(clueIndex);
        const clue = testCrossword.clues[clueIndex];
        setSelectedCell({ row: clue.row, col: clue.col });
        setTimeout(() => {
            cellRefs.current[`${clue.row}-${clue.col}`]?.focus();
        }, 0);
    };

    const handleRestart = () => {
        if (!testCrossword) return;
        
        setUserGrid(Array(testCrossword.gridSize.rows).fill().map(() => 
            Array(testCrossword.gridSize.cols).fill('')
        ));
        setSelectedCell(null);
        setSelectedClue(null);
        setCompletedWords(new Set());
        setGameCompleted(false);
        setShowCongratulations(false);
        
        // Recalculate bounds
        const bounds = calculateGridBounds(testCrossword.grid, testCrossword.clues);
        setGridBounds(bounds);
    };

    const isHighlighted = (row, col) => {
        if (selectedClue === null || !testCrossword) return false;
        
        const clue = testCrossword.clues[selectedClue];
        const { row: clueRow, col: clueCol, answer, direction } = clue;
        
        if (direction === 'across') {
            return row === clueRow && col >= clueCol && col < clueCol + answer.length;
        } else {
            return col === clueCol && row >= clueRow && row < clueRow + answer.length;
        }
    };

    // Loading screen
    if (loading) {
        return (
            <motion.div 
                className={styles.crosswordContainer}
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
                        🧩
                    </motion.div>
                    <motion.h2 
                        className={styles.title}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                    >
                        Loading Crossword...
                    </motion.h2>
                    <motion.p 
                        className={styles.loadingText}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.6 }}
                    >
                        Fetching your personalized puzzle
                    </motion.p>
                </motion.div>
            </motion.div>
        );
    }

    // Error screen
    if (error) {
        return (
            <motion.div 
                className={styles.crosswordContainer}
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
                        ❌ Error Loading Crossword
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

    // Don't render if testCrossword is not loaded yet
    if (!testCrossword) {
        return null;
    }

    if (showCongratulations) {
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
                        Crossword Completed! 🎯
                    </motion.h2>
                    <motion.div 
                        className={styles.celebrationIcon}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
                    >
                        🧩
                    </motion.div>
                    <motion.p 
                        className={styles.completionMessage}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.8 }}
                    >
                        🎉 Excellent work! You've solved all the clues!
                    </motion.p>
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

    const acrossClues = testCrossword ? testCrossword.clues.filter(clue => clue.direction === 'across') : [];
    const downClues = testCrossword ? testCrossword.clues.filter(clue => clue.direction === 'down') : [];

    return (
        <div className={styles.crosswordContainer}>
            {/* Header */}
            <motion.div 
                className={styles.header}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className={styles.title}>{testCrossword.title}</h2>
                <div className={styles.progressInfo}>
                    <span className={styles.progressText}>
                        {completedWords.size} of {testCrossword.clues.length} words completed
                    </span>
                    <div className={styles.progressBar}>
                        <motion.div 
                            className={styles.progressFill}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>
            </motion.div>

            <div className={styles.gameLayout}>
                {/* Crossword Grid */}
                <motion.div 
                    className={styles.gridContainer}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {gridBounds && (
                        <div 
                            className={styles.grid}
                            style={{
                                gridTemplateColumns: `repeat(${getActualGridSize().cols}, 1fr)`,
                                gridTemplateRows: `repeat(${getActualGridSize().rows}, 1fr)`,
                                '--cell-size': `${cellSize}px`
                            }}
                        >
                            {Array.from({ length: getActualGridSize().rows }, (_, relativeRowIndex) => {
                                const rowIndex = gridBounds.minRow + relativeRowIndex;
                                return Array.from({ length: getActualGridSize().cols }, (_, relativeColIndex) => {
                                    const colIndex = gridBounds.minCol + relativeColIndex;
                                    const cell = testCrossword.grid[rowIndex][colIndex];
                                    const isBlackCell = cell === '#';
                                    const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                                    const isHighlightedCell = isHighlighted(rowIndex, colIndex);
                                    
                                    // Find if this cell is the start of a word
                                    const clueNumber = testCrossword.clues.findIndex(clue => 
                                        clue.row === rowIndex && clue.col === colIndex
                                    );
                                    const hasNumber = clueNumber !== -1;
                                    
                                    return (
                                        <motion.div
                                            key={`${rowIndex}-${colIndex}`}
                                            className={`${
                                                styles.cell
                                            } ${
                                                isBlackCell ? styles.blackCell : styles.whiteCell
                                            } ${
                                                isSelected ? styles.selectedCell : ''
                                            } ${
                                                isHighlightedCell ? styles.highlightedCell : ''
                                            }`}
                                            onClick={() => handleCellClick(rowIndex, colIndex)}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ 
                                                duration: 0.3, 
                                                delay: (relativeRowIndex * getActualGridSize().cols + relativeColIndex) * 0.02 
                                            }}
                                            whileHover={!isBlackCell ? { scale: 1.05 } : {}}
                                        >
                                            {hasNumber && (
                                                <span className={styles.cellNumber}>
                                                    {clueNumber + 1}
                                                </span>
                                            )}
                                            {!isBlackCell && (
                                                <input
                                                    ref={el => cellRefs.current[`${rowIndex}-${colIndex}`] = el}
                                                    className={styles.cellInput}
                                                    value={userGrid[rowIndex][colIndex]}
                                                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                                                    onKeyDown={(e) => handleKeyDown(e, rowIndex, colIndex)}
                                                    maxLength={1}
                                                />
                                            )}
                                        </motion.div>
                                    );
                                });
                            }).flat()}
                        </div>
                    )}
                </motion.div>

                {/* Clues */}
                <motion.div 
                    className={styles.cluesContainer}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className={styles.cluesSection}>
                        <h3 className={styles.cluesTitle}>Across</h3>
                        <div className={styles.cluesList}>
                            {acrossClues.map((clue, index) => {
                                const clueIndex = testCrossword.clues.findIndex(c => c === clue);
                                const isCompleted = completedWords.has(clueIndex);
                                const isSelected = selectedClue === clueIndex;
                                
                                return (
                                    <motion.div
                                        key={clueIndex}
                                        className={`${
                                            styles.clueItem
                                        } ${
                                            isCompleted ? styles.completedClue : ''
                                        } ${
                                            isSelected ? styles.selectedClue : ''
                                        }`}
                                        onClick={() => handleClueClick(clueIndex)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className={styles.clueNumber}>{clueIndex + 1}.</span>
                                        <span className={styles.clueText}>{clue.clue}</span>
                                        {isCompleted && <span className={styles.checkMark}>✓</span>}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    <div className={styles.cluesSection}>
                        <h3 className={styles.cluesTitle}>Down</h3>
                        <div className={styles.cluesList}>
                            {downClues.map((clue, index) => {
                                const clueIndex = testCrossword.clues.findIndex(c => c === clue);
                                const isCompleted = completedWords.has(clueIndex);
                                const isSelected = selectedClue === clueIndex;
                                
                                return (
                                    <motion.div
                                        key={clueIndex}
                                        className={`${
                                            styles.clueItem
                                        } ${
                                            isCompleted ? styles.completedClue : ''
                                        } ${
                                            isSelected ? styles.selectedClue : ''
                                        }`}
                                        onClick={() => handleClueClick(clueIndex)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.6 + acrossClues.length * 0.1 + index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className={styles.clueNumber}>{clueIndex + 1}.</span>
                                        <span className={styles.clueText}>{clue.clue}</span>
                                        {isCompleted && <span className={styles.checkMark}>✓</span>}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}