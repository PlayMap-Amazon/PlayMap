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
  const [signupStep, setSignupStep] = useState(0); 
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    firstName: '',
    phone: '',
    avatar: '',
    studyLevel: '',
    studyChallenge: '',
    sessionMinutes: 25, 
    reminderTimes: ['08:00', '14:00', '19:00', null],
    selectedReminder: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [sessionMinutes, setSessionMinutes] = useState(formData.sessionMinutes ?? 25);

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

  useEffect(() => {
    if (typeof formData.sessionMinutes === 'number' && formData.sessionMinutes !== sessionMinutes) {
      setSessionMinutes(formData.sessionMinutes);
    }
  }, [formData.sessionMinutes]);

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
    setFormData(prev => ({ ...prev, email: '', password: '' }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (signupStep < 4) {
      setSignupStep(s => s + 1);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    const payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      firstName: formData.firstName,
      phone: formData.phone,
      avatar: formData.avatar,
      studyLevel: formData.studyLevel,
      studyChallenge: formData.studyChallenge,
      sessionMinutes: formData.sessionMinutes,
    };

    await register(payload);

    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      firstName: '',
      phone: '',
      avatar: '',
      studyLevel: '',
      studyChallenge: '',
      sessionMinutes: 25,
    });
    setSessionMinutes(25);
    setSignupStep(0);
    setLogType(LoginMode.Login);
  };

  const handleBack = () => {
    if (signupStep === 0) {
      setLogType(LoginMode.Login);
    } else {
      setSignupStep(s => Math.max(0, s - 1));
    }
  };

  const handleSelectReminder = (index) => {
    setFormData(prev => ({ ...prev, selectedReminder: index }));
  };

  const formatMinutes = (mins) => {
    if (mins >= 60) {
      const h = Math.floor(mins / 60);
      const m = mins % 60;
      return m === 0 ? `${h}h` : `${h}h ${m}m`;
    }
    return `${mins}m`;
  };

  const avatars = ['avatar1', 'avatar2', 'avatar3', 'avatar4'];

  const renderSignupStep = () => {
    switch (signupStep) {
      case 0:
        return (
          <>
            <h2 className={styles.panelTitle}>Welcome to PlayMap! 🎮</h2>
            <p className={styles.panelSubtitle}>Let's create your account</p>
            <input name="email" type="email" value={formData.email} placeholder="Email" onChange={handleChange} autoFocus />
            <input name="firstName" type="text" value={formData.firstName} placeholder="First name" onChange={handleChange} />
            <div className={styles.passwordWrapper}>
              <input
                name="password"
                type={passwordVisible ? 'text' : 'password'}
                value={formData.password}
                placeholder="Password"
                onChange={handleChange}
              />
              <button type="button" onClick={togglePasswordVisibility} className={styles.passwordToggleBtn} aria-label="Toggle password visibility">
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordError && <p className={styles.errorText}>{passwordError}</p>}
          </>
        );
      case 1:
        return ( 
        <>
          <h2 className={styles.panelTitle}>What's your study style?</h2>
          <p className={styles.panelSubtitle}>Help us personalize your experience</p>
          <select name="studyLevel" value={formData.studyLevel} onChange={handleChange}>
            <option value="">-- I'm primarily studying --</option>
            <option value="highschool">High School</option>
            <option value="degree">Degree / University</option>
            <option value="nothing">Not studying</option>
            <option value="other">Other</option>
          </select>

          <select name="studyChallenge" value={formData.studyChallenge} onChange={handleChange}>
            <option value="">-- My biggest studying challenge is --</option>
            <option value="motivation">Staying motivated</option>
            <option value="focus">Staying focused</option>
            <option value="time">Managing my time</option>
            <option value="understanding">Understanding difficult concepts</option>
          </select>
        </>
      );
      case 2:
        return (
        <>
          <h2 className={styles.panelTitle}>Choose Your Study Buddy!</h2>
          <p className={styles.panelSubtitle}>Pick your companion who will guide you through your learning journey</p>

          <div className={styles.avatarGrid} role="list">
            {avatars.map(avatar => {
              const selected = formData.avatar === avatar;
              return (
                <div
                  key={avatar}
                  className={`${styles.avatarOption} ${selected ? styles.selectedAvatar : ''}`}
                  onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                >
                  <img src={`/avatars/${avatar}.png`} alt={`${avatar} avatar`} className={styles.avatarImage} />
                  <p className={styles.avatarLabel}>{avatar.charAt(0).toUpperCase() + avatar.slice(1)}</p>
                </div>
              );
            })}
          </div>
        </>
      );
      case 3:
        const reminderMeta = [
          { emoji: '🌅', label: 'Morning' },
          { emoji: '☀️', label: 'Afternoon' },
          { emoji: '🌇', label: 'Evening' },
          { emoji: '🚫', label: 'No reminders' },
        ];

        return (
          <>
            <h2 className={styles.panelTitle}>Stay on track!</h2>
            <p className={styles.panelSubtitle}>When would you like us to send study reminders?</p>

            <div className={styles.reminderGrid}>
              {reminderMeta.map((m, i) => {
                const isSelected = formData.selectedReminder === i;
                return (
                  <div
                    key={i}
                    className={`${styles.reminderBox} ${isSelected ? styles.selectedReminder : ''}`}
                    onClick={() => handleSelectReminder(i)}
                  >
                    <div className={styles.reminderEmoji} aria-hidden>{m.emoji}</div>
                    <div className={styles.reminderTitle}>{m.label}</div>
                    <div className={styles.reminderTime}>{formData.reminderTimes?.[i] || '—:—'}</div>
                  </div>
                );
              })}
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className={styles.panelTitle}>Perfect study sessions</h2>
            <p className={styles.panelSubtitle}>How long do you prefer to study in one session?</p>

            <div className={styles.sliderWrapper}>
              <div className={styles.timeDisplay}>{formatMinutes(sessionMinutes)}</div>

              <input
                type="range"
                min={0}
                max={120}
                step={5}
                value={sessionMinutes}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setSessionMinutes(val);
                  setFormData(prev => ({ ...prev, sessionMinutes: val }));
                }}
                className={styles.rangeInput}
                aria-label="Session length in minutes"
              />

              <div className={styles.rangeTicks}>
                <span>0m</span>
                <span>60m</span>
                <span>120m</span>
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <div className={styles.reviewBox}>
            <p><strong>Email:</strong> {formData.email || '—'}</p>
            <p><strong>First name:</strong> {formData.firstName || '—'}</p>
            <p><strong>Username:</strong> {formData.username || '—'}</p>
            <p className={styles.smallNote}>If everything looks good press "Create Account". Otherwise use Back to edit.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={common_styles.FirstContainer}>
      <FloatingParticles />
      <div className={styles.presentationContainer}>
        <div className={styles.textContainer}>
          <div className={styles.loginPanel}>

            {/* LOGIN VIEW */}
            {logType === LoginMode.Login ? (
              <div className={styles.loginDiv}>
                <form onSubmit={handleLogin} className={styles.loginForm}>
                  <h2 className={styles.panelTitle}>Welcome back to PlayMap! 🎮</h2>
                  <input name="email" type="email" value={formData.email} placeholder="Email" onChange={handleChange}/>
                  <input name="password" type="password" value={formData.password} placeholder="Password" onChange={handleChange}/>
                  <button type="submit" className={styles.submitButton}>Login</button>

                  <div className={styles.helpers}>
                    <p className={styles.gotoSignup}>Don't have an account? <button type="button" className={styles.linkInline} onClick={() => { setLogType(LoginMode.Signup); setSignupStep(0); }}>Create account</button></p>
                    <Link to="/forgot-password" className={styles.linkText}>Forgot?</Link>
                  </div>
                </form>
              </div>

            ) : (

              <form onSubmit={handleSignupSubmit} className={styles.loginForm}>

                <div className={styles.stepper} aria-hidden>
                  {[0,1,2,3,4].map(i => (
                    <div
                      key={i}
                      className={`${styles.stepCircle} ${signupStep >= i ? styles.active : ''}`}
                    />
                  ))}
                </div>

                {renderSignupStep()}

                <div className={styles.stepButtons}>
                  <button type="button" onClick={handleBack} className={styles.backButton}>
                    Back
                  </button>

                  <button type="submit" className={styles.submitButton}>
                    {signupStep === 4 ? 'Create Account' : 'Continue'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
