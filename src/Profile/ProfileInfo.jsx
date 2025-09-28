import styles from './ProfileInfo.module.css';

export default function ProfileInfo({ user }) {

    return(
        <div className={styles.profileInfo}>
            <img className={styles.profilePicture} src="profile_picture.png" alt="Profile" />
            <div className={styles.profileDetails}>
                <p className={styles.userName}>{user.username}</p>
                <p className={styles.userInstitution}>{user.institution}</p>
            </div>
        </div>
    );
}