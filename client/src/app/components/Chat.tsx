'use client';

import { useState } from 'react';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    setMessages(prev => [...prev, { text: message, isUser: true }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          agentId: '7accb91f-3953-0421-9a2a-6eb46708451e', // Replace with your agent ID if different
        }),
      });

      const data = await response.json();
      
      // Add agent responses to chat
      data.forEach((msg: { text: string }) => {
        setMessages(prev => [...prev, { text: msg.text, isUser: false }]);
      });
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
      setMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="border rounded-lg p-4 h-[500px] overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.isUser ? 'bg-blue-100 ml-auto' : 'bg-gray-100'
            } max-w-[80%] ${msg.isUser ? 'text-right' : 'text-left'}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        {loading && <div className="text-center">Loading...</div>}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Type your message..."
        />
        <button 
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          Send
        </button>
      </form>
    </div>
  );
}