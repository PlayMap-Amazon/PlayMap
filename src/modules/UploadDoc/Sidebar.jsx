import React from "react";
import styles from "./UploadDoc.module.css";
import HistoryList from "./HistoryList";

const Sidebar = ({ active, setActive, history }) => {
  const menuItem = (id, icon, text) => (
    <li
      className={active === id ? styles.active : ""}
      onClick={() => setActive(id)}
    >
      <i data-lucide={icon}></i> {text}
    </li>
  );

  return (
    <aside className={styles.sidebar}>
      <div className={styles["logo-box"]}>
        <img src="logo.png" className={styles.logo} alt="PlayMap logo" />
      </div>

      <nav>
        <ul className={styles.menu}>
          {menuItem("new", "message-square", "New Topic")}
          <p className={styles["section-title"]}>Summarize PDF/Doc</p>
          {menuItem("pdf", "file-text", "PDF")}
          {menuItem("document", "file", "Document")}
          {menuItem("images", "image", "Images")}
          {menuItem("slides", "presentation", "Slides")}
          <p className={styles["section-title"]}>History</p>
          <HistoryList history={history} />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
