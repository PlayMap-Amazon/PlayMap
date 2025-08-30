import { Outlet } from 'react-router-dom'
import FadeIn from './components/FadeIn'
import Navbar from './modules/Navbar/Navbar'
import ChatBotButton from './modules/ChatBot/ChatBotButton'
import { useLocation } from 'react-router-dom'

export default function AppLayout() {
    const { pathname } = useLocation()
  return (
    <>
      <Navbar />
      <FadeIn key={pathname}>
        <ChatBotButton />
        <Outlet />
      </FadeIn>
      <ChatBotButton />
    </>
  )
}
