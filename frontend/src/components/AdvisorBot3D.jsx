import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './AdvisorBot3D.css';

const AdvisorBot3D = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Farmwise Here !! Tell me your problems", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const userStr = localStorage.getItem('user');
      const user = userStr ? JSON.parse(userStr) : { id: 'guest' };

      const response = await axios.post('http://localhost:5000/api/advisor/ask', {
        question: userMessage.text,
        userId: user.id
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.answer,
        sender: 'bot'
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching advice:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting to the farm database. Please try again later.",
        sender: 'bot',
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main" style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: '20px' }}>
      <section className="advisor-card">
        <div className="advisor-header">
          <div className="bot-icon">🤖</div>
          <div>
            <h2>Agricultural Advisor</h2>
            <span className="status">● ALWAYS READY</span>
          </div>
        </div>

        <div className="advisor-body">

          {messages.map((msg) => (
            <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
              {msg.text}
            </div>
          ))}
          {loading && <div className="chat-bubble bot">Typing...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="advisor-input">
          <input
            type="text"
            id="question"
            placeholder="Describe your farming challenge..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <button onClick={handleSubmit}>➜</button>
        </div>
      </section>

      <footer className="footer" style={{ width: '100%', maxWidth: '800px', marginTop: '20px', borderRadius: '20px' }}>
        <h2>FarmWise Intelligence</h2>

        <div className="stats">
          <div>
            <h1>0</h1>
            <p>REPORTS</p>
          </div>
          <div>
            <h1>0</h1>
            <p>PENDING TASKS</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdvisorBot3D;
