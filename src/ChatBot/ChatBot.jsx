import styles from './ChatBot.module.css'
import BlockRenderer from './BlockRenderer'
import FloatingParticles from '../FloatingParticles'
import Navbar from '@/Navbar/Navbar'
import { useEffect, useState } from 'react'

export default function ChatBot() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [firstInteraction, setFirstInteraction] = useState(false)

  useEffect(() => {
    const list = document.querySelector(`.${styles.messageList}`)
    if (list) list.scrollTop = list.scrollHeight
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: message.trim() },
    ])
    setMessage('')
    setFirstInteraction(true)
    setIsLoading(true)

    try {
      const res = await fetch('http://localhost:4242/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      if (!res.ok) throw new Error('Status ' + res.status)

      const { blocks } = await res.json()

      setMessages((prev) => [
        ...prev,
        { sender: 'bot', blocks },
      ])
    } catch (err) {
      console.error(err)
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          blocks: [
            { type: 'paragraph', text: 'Sorry, something went wrong.' },
          ],
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.body}>
      <Navbar />
      <FloatingParticles />
      <div className={styles.chatbotContainer}>
        <div className={styles.headerInfo}>
          <img
            className={styles.botIcon}
            src="bot_icon_1.png"
            alt="bot icon"
          />
          <h2 className={styles.logoText}>Smart NPC Coach</h2>
        </div>

        {!firstInteraction && (
          <div className={styles.botContainer}>
            <div className={styles.imageContainer}>
              <img
                className={styles.botImage}
                src="bot.png"
                alt="bot image"
              />
            </div>
            <div className={styles.bubbleContainer}>
              Hey there 👋 How can I help you today?
            </div>
          </div>
        )}

        <div className={styles.messageList}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`
                ${styles.messageBubble}
                ${msg.sender === 'user'
                  ? styles.userBubble
                  : styles.botBubble}
              `}
            >
              {msg.sender === 'bot' && msg.blocks
                ? <BlockRenderer blocks={msg.blocks} />
                : <p className={styles.userParagraph}>{msg.text}</p>
              }
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.messageBubble} ${styles.botBubble}`}>
              Thinking...
            </div>
          )}
        </div>

        <div className={styles.chatContainer}>
          <form className={styles.chatForm} onSubmit={handleSubmit}>
            <textarea
              className={styles.messageInput}
              placeholder="Message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading}>
              <span className="material-symbols-rounded">
                arrow_upward
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
