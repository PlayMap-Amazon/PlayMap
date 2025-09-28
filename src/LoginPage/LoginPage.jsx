import common_styles from '../App.module.css';
import { LoginForm } from '../components/login-form';
import Navbar from '@/Navbar/Navbar';

function LoginPage() {
  return (
    <div className={common_styles.FirstContainer}>
      <Navbar />
      <div className="flex-grow">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
