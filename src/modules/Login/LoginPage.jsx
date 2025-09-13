import styles from './LoginPage.module.css';
import common_styles from '../../App.module.css'; 
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import FloatingParticles from '../PlayMapDashboard/FloatingParticles';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginMode = {
  Login: 'LOGIN',
  Signup: 'SIGNUP',
};

function LoginPage() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [logType, setLogType] = useState(LoginMode.Login);
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '', username: '', firstName: ''});
  const [formErrors, setFormErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  useEffect(() => {
    const errors = {};

    if (formData.password && formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      setPasswordError(errors.password);
    } else {
      setPasswordError('');
    }

    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      setConfirmPasswordError(errors.confirmPassword);
    } else {
      setConfirmPasswordError('');
    }

    setFormErrors(errors);
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
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

    if (formData.password !== formData.confirmPassword) return;

    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName
    };

    await register(payload);

    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      firstName: ''
    });
  };

  return (
    <div className={common_styles.FirstContainer}>
      <FloatingParticles />
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

            {logType === LoginMode.Login ? (
              <div className={styles.loginDiv}>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                  <h2 className={styles.panelTitle}>Welcome back to PlayMap! 🎮</h2>
                  <input name="email" type="email" value={formData.email} placeholder="Email" onChange={handleChange}/>
                  <input name="password" type="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
                  <button type="submit" className={styles.submitButton}>Login</button>
                </form>
              </div>
            ) : (
              <form onSubmit={handleRegister} className={styles.loginForm}>
                <input name="email" type="email" value={formData.email} placeholder="Email" onChange={handleChange}/>
                <input name="username" type="text" value={formData.username} placeholder="Username" onChange={handleChange}/>
                <input name="firstName" type="text" value={formData.firstName} placeholder="First name" onChange={handleChange}/>

                <div className="password-input">
                  <input
                    name="password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={formData.password}
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
                {passwordError && <p className="error-message">{passwordError}</p>}

                <div className="password-input">
                  <input
                    name="confirmPassword"
                    type={passwordVisible ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                  />
                  <button type="button" onClick={togglePasswordVisibility} className="password-toggle-btn">
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}

                <button type="submit" className={styles.submitButton}>Create Account</button>
              </form>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
