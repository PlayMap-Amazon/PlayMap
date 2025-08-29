import React, { useEffect, useRef } from "react";
import styles from "./PlayMapDashboard.module.css";

export default function FloatingParticles() {
  const containerRef = useRef(null);

  useEffect(() => {
    const colors = ["#ff6f00", "#ff8f00", "#e65100"];
    const particles = containerRef.current.querySelectorAll(`.${styles.particle}`);

    particles.forEach((particle, index) => {
      particle.style.background = colors[index % colors.length];
      particle.style.left = Math.random() * 100 + "%";
      particle.style.animationDelay = Math.random() * 15 + "s";
      particle.style.animationDuration = 15 + Math.random() * 10 + "s";
    });
  }, []);

  return (
    <div className={styles.floatingParticles} ref={containerRef}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className={styles.particle} />
      ))}
    </div>
  );
}
