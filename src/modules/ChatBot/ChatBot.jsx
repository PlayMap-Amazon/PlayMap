import styles from "./ChatBot.module.css";
import common_styles from "../../App.module.css";
import TopBar from "../Topbar/Topbar";
import { Link } from 'react-router-dom';
import React, { useState } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);


  const botMessages = messages.filter((msg) => msg.sender === "bot");
  const lastBotMessage = botMessages[botMessages.length - 1]?.text || "Hey there 👋 How can I help you today?";
  const [firstInteraction, setFirstInteraction] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = { sender: "user", text: message };
    if (!firstInteraction) setFirstInteraction(true);
    setMessages((prev) => [...prev, userMessage]);
    setMessage("");


    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: generateBotResponse(message)
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000); 
  };

  const generateBotResponse = (input) => {
    if (input.toLowerCase().includes("help")) {
      return "I'm here to help you. What are you struggling with?";
    }
    if (input.toLowerCase().includes("joke")) {
      return "Why did the computer go to therapy? Because it had too many 'bytes' of trauma!";
    }
    return "Hmm, let me think... 🤔 That's an interesting one!";
  };


  return (
    <div className={styles.body}>
      <TopBar>
        <Link to="/">
          <button
            className={common_styles.customButton}
            style={{
              color: '#C06D3E',
              backgroundColor: '#F5E9E3',
              borderColor: '#FB7E25',
            }}
          >
            Home
          </button>
        </Link>
      </TopBar>
      <div className={styles.chatbotContainer}>
        <div className={styles.headerInfo}>
          <img className={styles.botIcon} src="bot_icon_1.png" alt="bot icon" />
          <h2 className={styles.logoText}>Smart NPC Coach</h2>
        </div>
        {!firstInteraction && (
          <div className={styles.botContainer}>
            <div className={styles.imageContainer}>
              <img className={styles.botImage} src="bot.png" alt="bot image" />
            </div>
            <div className={styles.bubbleContainer}>
              {lastBotMessage}
            </div>
          </div>
        )}
        <div className={styles.messageList}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.messageBubble} ${
                msg.sender === "user" ? styles.userBubble : styles.botBubble
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className={styles.chatContainer}>
          <form className={styles.chatForm} onSubmit={handleSubmit}>
            <textarea className={styles.messageInput} placeholder="Message..." value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" title="Send">
              <span className="material-symbols-rounded">arrow_upward</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}