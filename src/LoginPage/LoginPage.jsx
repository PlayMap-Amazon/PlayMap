import TopBar from '../Topbar/Topbar';
import common_styles from '../App.module.css';
import { LoginForm } from '../components/login-form';
import { ArrowedButton } from '../components/ui/button';

function LoginPage() {
  return (
    <div className={common_styles.FirstContainer}>
      <TopBar>
        <ArrowedButton className='mr-5' variant='outline' link='/register' unroundOnHover>Register</ArrowedButton>
        <ArrowedButton link='/' unroundOnHover>Home</ArrowedButton>
      </TopBar>
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
