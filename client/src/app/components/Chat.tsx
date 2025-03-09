'use client';

import { FaComments, FaPaperPlane } from 'react-icons/fa';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatProps {
  messages: Message[];
  sendMessage: (e: React.FormEvent) => void;
  setMessage: (message: string) => void;
  message: string;
  name: string;
  loading: boolean;
}

export default function Chat({
  messages,
  sendMessage,
  setMessage,
  message,
  name,
  loading,
}: ChatProps) {

  return (
    <div className="bg-gray-800/50 rounded-2xl w-[800px] h-[600px] flex flex-col 
                        shadow-xl shadow-black/20 border border-white/10">
      {/* Chat Header */}
      <div className="p-6 border-b border-white/10 flex items-center gap-3">
        <FaComments className="text-cyan-400 text-xl" />
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 
                                text-transparent bg-clip-text">
          Chat with {name}
        </h2>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-gray-900/50 rounded-xl p-6 h-full border border-white/5">
          {messages?.map((message, index) => (
            <div key={index} className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}>
              <div className="inline-block px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 text-black font-medium">
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <form onSubmit={sendMessage}>
        <div className="p-6 border-t border-white/10">
          <div className="flex gap-3">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Message ${name}...`}
              className="flex-1 bg-gray-900/50 border border-white/10 rounded-xl px-5 py-4
                                    text-white placeholder-white/50 focus:outline-none focus:ring-2 
                                    focus:ring-blue-500/50 focus:border-blue-500"
            />
            <button
              className={`bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl
                                    transition-all duration-300 flex items-center gap-3 font-medium
                                    hover:shadow-lg hover:shadow-blue-500/30 hover:scale-[1.02] active:scale-[0.98]
                                    ${loading ? 'opacity-50 cursor-not-allowed hover:bg-blue-600 hover:scale-100' : ''}`}
              disabled={loading}
            >
              <FaPaperPlane className="text-blue-300" />
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}