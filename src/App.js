import PresentationPart from './modules/PresentationPart/PresentationPart';
import TopBar from './modules/Topbar/Topbar';
import styles from './App.module.css';
import { createBrowserRouter, Link, Outlet, RouterProvider } from 'react-router-dom';
import NotFoundPage from './modules/NotFoundPage/NotFoundPage';
import LoginPage from './modules/Login/LoginPage';
import { AuthProvider } from './AuthContext';
import DashboardPage from './modules/Dashboard/DashboardPage';
import ChatBot from './modules/ChatBot/ChatBot.jsx';
import UploadDoc from './modules/UploadDoc/UploadDoc.jsx';
import ProfilePage from './modules/Profile/ProfilePage.jsx';
import PlayMapDashboard from './modules/PlayMapDashboard/PlayMapDashboard.jsx';
import AppLayout from './AppLayout.jsx';
import './index.css';
import RequireAuth from './RequireAuth.jsx';

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
  {
    element: <AuthProvider><AppLayout /></AuthProvider>,
    children: [
      { path: '/', element: <ProfilePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '*', element: <NotFoundPage /> },
      {
        element: <RequireAuth><Outlet /></RequireAuth>,
        children: [
          { path: '/dashboard', element: <DashboardPage /> },
          { path: '/uploaddoc', element: <UploadDoc /> },
          { path: '/chatbot', element: <ChatBot /> },
          { path: '/profile', element: <ProfilePage /> },
          { path: '/playmapdashboard', element: <PlayMapDashboard />},
        ]
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

function MainPage() {
  return (
    <div>
      <div className={styles.FirstContainer}>
        <TopBar>
          <Link to="/login">
            <button className={styles.customButton} style={{ color: '#C06D3E', backgroundColor: '#F5E9E3', borderColor: '#FB7E25' }}>
              Sign In
            </button>
          </Link>
        </TopBar>
        <PresentationPart />
      </div>
    
      <div className={styles.SecondContainer}>
        <h1 className={styles.Title}>Why Students Love PlayMap</h1>

        <div className={styles.CardsContainer}>
          {cards.map((card, index) => 
            <div key={index} className={styles.Card}>
              <h2 className={styles.CardTitle}>{card.title}</h2>
              <p className={styles.CardDescription}>{card.description}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
