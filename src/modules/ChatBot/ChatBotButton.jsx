import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './ChatBotButton.module.css'

const allowedRoutes = ['/PlayMapDashBoard', '/profile']

export default function ChatbotButton() {
  const { pathname } = useLocation()
  console.log('ChatbotButton path:', pathname)
  const [showBubble, setShowBubble] = useState(false)

  useEffect(() => {
    if (!allowedRoutes.includes(pathname)) return
    setShowBubble(true)
    const timer = setTimeout(() => setShowBubble(false), 5000)
    return () => clearTimeout(timer)
  }, [pathname])

  if (!allowedRoutes.includes(pathname)) return null

  return (
    <Link className={styles.chatbotWrapper} to="/chatbot">
      {showBubble && (
        <div className={styles.bubble}>
          Hey there 👋 How can I help you today?
          <span className={styles.bubbleArrow}></span>
        </div>
      )}
      <img className={styles.botIcon} src="/bot_icon_1.png" alt="ChatBot" />
    </Link>
  )
}
