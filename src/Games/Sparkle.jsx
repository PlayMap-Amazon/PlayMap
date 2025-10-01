import styles from "../PlayMapDashboard.module.css";

export default function Sparkle() {
  const sparkles = Array.from({ length: 6 }, (_, i) => ({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    delay: Math.random() * 2 + "s",
  }));

  return (
    <>
      {sparkles.map((s, i) => (
        <div
          key={i}
          className={styles.sparkle}
          style={{ top: s.top, left: s.left, animationDelay: s.delay }}
        />
      ))}
    </>
  );
}
