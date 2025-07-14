import styles from './PresentationPart.module.css';

const PresentationPart = () => (
  <div className={styles.presentationContainer}>
        <div className={styles.textContainer}>
          <h1 style={{ color: 'white', fontSize: '3rem' }}>
            PlayMap - Your AI Learning Companion
          </h1>
          <p style={{ color: 'white', fontSize: '1.5rem' }}>
            PlayMap turns your notes, slides, screenshots, and ideas into interactive mindmaps, stories, and games - in seconds. Powered by AI, it breaks down complex topics into simple, visual steps and lets your study through quizzes, puzzles, and create storytelling. Upload anything from a PDF to a photo - and start learning your way.
          </p>
          <button className={styles.continueButton}>Continue</button>
          <img
            src="/brain.png"
            alt="Brain"
            className={styles.brainImage}
          />
        </div>
      </div>
);

export default PresentationPart;