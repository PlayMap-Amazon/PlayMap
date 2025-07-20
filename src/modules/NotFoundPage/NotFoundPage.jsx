import { Link } from "react-router-dom";
import styles from '../../App.module.css';
import notfound_styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={styles.FirstContainer}>
            <h1 className={styles.Title} style={{ color: 'white' }}>404 - Page Not Found</h1>
            <p style={{
                color: 'white',
                textAlign: 'center'
            }}>Sorry, the page you are looking for does not exist.</p>
            <p>
                <Link to="/" style={{ color: '#FB7E25', textDecoration: 'underline' }}>
                    <button className={notfound_styles.customButton} style={{ backgroundColor: '#FB7E25', borderColor: 'white' }}>
                        Go back to Home
                    </button>
                </Link>
            </p>
        </div>
    );
}

export default NotFoundPage;