import styles from './Topbar.module.css';

const TopBar = ({ children }) => (
  <div className={styles.topBarContainer}>
    <div className={styles.topBarItemsContainer}>
      <img src="logo.png" alt="Logo" className={styles.logoImg} />
      <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#FD751D' }}>PlayMap</h1>
    </div>

    <div className={styles.topBarItemsContainer}>
      {children}
    </div>
  </div>
);

export default TopBar;