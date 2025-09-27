import common_styles from '../App.module.css';
import TopBar from '../Topbar/Topbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { ArrowedButton } from '../components/ui/button';

import { RegisterForm } from '@/components/register-form';

function RegisterPage() {
  const { register } = useAuth();

  return (
    <div className={common_styles.FirstContainer}>
      <TopBar>
        <ArrowedButton className='mr-5' variant='outline' link='/login' unroundOnHover>Log in</ArrowedButton>
        <ArrowedButton link='/' unroundOnHover>Home</ArrowedButton>
      </TopBar>
      <div className="flex-grow">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-sm">
            <RegisterForm onSubmitCallback={(loginObj) => {
              register(loginObj);
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
