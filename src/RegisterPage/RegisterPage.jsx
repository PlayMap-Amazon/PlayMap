import common_styles from '../App.module.css';
import TopBar from '../Topbar/Topbar';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../AuthContext';
import { ArrowedButton } from '../components/ui/button';

import { RegisterForm } from '@/components/register-form';
import Navbar from '@/Navbar/Navbar';

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  return (
    <div className={common_styles.FirstContainer}>
      <Navbar />
      <div className="flex-grow">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-full max-w-sm">
            <RegisterForm onSubmitCallback={async (loginObj) => {
              const user = await register(loginObj);
              if (user) {
                navigate("/dashboard");
              }
            }}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
