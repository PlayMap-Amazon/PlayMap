import React, { useEffect, useState } from "react";
import styles from "./PlayMapDashboard.module.css";

export default function Notification({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      className={styles.notification}
      style={{
        transform: visible ? "translateX(0)" : "translateX(400px)"
      }}
    >
      {message}
    </div>
  );
}
