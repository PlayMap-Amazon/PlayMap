import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './AuthContext';

import styles from './App.module.css';
import PresentationPart from './PresentationPart/PresentationPart';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import DashboardPage from './Dashboard/DashboardPage';

import Example from './Example';
import { Toaster } from 'sonner';
import Quiz from './Quiz';
import Navbar from './Navbar/Navbar';
import ProfilePage from './Profile/ProfilePage';
import GamesPage from './Games/GamesPage';
import ChatBot from './ChatBot/ChatBot';

const cards = [
  {
    title: 'Trivia Quizzes',
    description: 'Test your knowledge with fun trivia quizzes.',
  },
  {
    title: 'Interactive Mindmaps',
    description: 'Visualize your notes with interactive mindmaps.',
  },
  {
    title: 'Storytelling',
    description: 'Create engaging stories from your study materials.',
  },
  {
    title: 'Trivia Quizzes',
    description: 'Test your knowledge with fun trivia quizzes.',
  },
  {
    title: 'Interactive Mindmaps',
    description: 'Visualize your notes with interactive mindmaps.',
  },
  {
    title: 'Storytelling',
    description: 'Create engaging stories from your study materials.',
  },
]

const router = createBrowserRouter([
  { path: '/', element: <MainPage /> },
  { path: '/games', element: <GamesPage /> },
  { path: '/quizz', element: <Quiz /> },
  { path: '/example', element: <Example /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/profile', element: <ProfilePage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/chatbot', element: <ChatBot /> },
  { path: '*', element: <NotFoundPage /> }
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
};

function MainPage() {
  return (
    <div>
      <div className={styles.FirstContainer}>
        <Navbar />
        <PresentationPart />
      </div>
    </div>
  );
}

export default App;
