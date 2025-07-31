import styles from "./LeaderBoard.module.css";

export default function LeaderBoard({friends}) {

    return (
        <div className={styles.leaderBoardContainer}>
            <h3 className={styles.title}>Leader Board</h3>
            <table className={styles.table}>
                <tbody>
                    {friends.map((friend, index) => (
                        <tr key={index}>
                            <td>
                                <img 
                                    src={friend.avatarUrl || "default_avatar.png"} 
                                    alt={friend.username} 
                                    className={styles.avatar} 
                                />
                            </td>
                            <td>{friend.username}</td>
                            <td>Lv. {friend.level}</td>
                            <td>{friend.experience} EXP</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}