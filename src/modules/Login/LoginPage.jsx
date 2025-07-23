import styles from './LoginPage.module.css';
import common_styles from '../../App.module.css'; 
import TopBar from '../Topbar/Topbar';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../AuthContext';

const LoginMode = {
  Login: 'LOGIN',
  Signup: 'SIGNUP',
};

function LoginPage() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [logType, setLogType] = useState(LoginMode.Login);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { type, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [type]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const new_user_state = await login(formData);

    if(!!new_user_state) {
      navigate('/dashboard');
    }
    setFormData({ email: '', password: '' });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    await register(formData);
    setFormData({ email: '', password: '' });
  };

  return (
    <div className={common_styles.FirstContainer}>
      <TopBar>
        <Link to="/">
          <button
            className={common_styles.customButton}
            style={{
              color: '#C06D3E',
              backgroundColor: '#F5E9E3',
              borderColor: '#FB7E25',
            }}
          >
            Home
          </button>
        </Link>
      </TopBar>
      <div className={styles.presentationContainer}>
        <div className={styles.textContainer}>
          <div className={styles.loginPanel}>
            <div className={styles.loginOptions}>
              <button className={styles.loginButton} onClick={() => setLogType(LoginMode.Login)}>
                <span className={styles.optionButtonText}>Log In</span>
              </button>
              <button className={styles.loginButton} style={{borderLeft: "1px solid white"}} onClick={() => setLogType(LoginMode.Signup)}>
                <span className={styles.optionButtonText}>Sign Up</span>
              </button>
            </div>
            {
              logType === LoginMode.Login ? (
                <div className={styles.loginDiv}>
                  <form onSubmit={handleLogin} className={styles.loginForm}>
                    <h2 className={styles.panelTitle}>Welcome back to PlayMap! 🎮</h2>
                    <input type="email" value={formData.email} placeholder="Email" onChange={handleChange}/>
                    <input type="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
                    <button type="submit" className={styles.submitButton}>Login</button>
                  </form>
                  <div className={styles.helpers}>
                    <p className={styles.gotoSignup}>
                      Don't have an account? <span className={styles.linkText} onClick={() => setLogType(LoginMode.Signup)}>Sign Up</span>
                    </p>
                    <p className={styles.gotoForgotPassword}>
                      Forgot your password? <span className={styles.linkText} onClick={() => navigate('/forgot-password')}>Reset it</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.loginDiv}>
                  <form onSubmit={handleRegister} className={styles.loginForm}>
                    <h2 className={styles.panelTitle}>Welcome back to PlayMap! 🎮</h2>
                    <p className={styles.panelDesc}>Let's create your account and start your learning adventure!</p>
                    <input type="email" value={formData.email} placeholder="Email" onChange={handleChange}/>
                    <input type="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
                    <button type="submit" className={styles.submitButton}>Create Account</button>
                  </form>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
