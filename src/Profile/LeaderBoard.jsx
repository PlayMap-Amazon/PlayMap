import styles from "./LeaderBoard.module.css";

export default function LeaderBoard({ friends, onClose }) {
  return (
    <div className={styles.leaderBoardContainer}>
      <button className={styles.closeButton} onClick={onClose}>
        ✕
      </button>

      <h3 className={styles.title}>Leader Board</h3>
      <table className={styles.table}>
        <tbody>
          {friends.map((friend, index) => {
            const rank = index + 1;
            let rankContent;

            if (rank === 1) {
              rankContent = (
                <img
                  src="/rank1.png"
                  alt="1st place"
                  className={styles.medal}
                />
              );
            } else if (rank === 2) {
              rankContent = (
                <img
                  src="/rank2.png"
                  alt="2nd place"
                  className={styles.medal}
                />
              );
            } else if (rank === 3) {
              rankContent = (
                <img
                  src="/rank3.png"
                  alt="3rd place"
                  className={styles.medal}
                />
              );
            } else {
              rankContent = (
                <span className={`${styles.rank} ${styles.normal}`}>
                  {rank}
                </span>
              );
            }

            return (
              <tr key={index}>
                <td className={styles.rankCell}>{rankContent}</td>
                <td>
                  <img
                    src={friend.avatarUrl || "default_avatar.png"}
                    alt={friend.username}
                    className={styles.avatar}
                  />
                </td>
                <td className={styles.username}>{friend.username}</td>
                <td>Lv. {friend.level}</td>
                <td>{friend.experience} EXP</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
