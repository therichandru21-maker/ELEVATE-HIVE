import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, Code2, Zap, RefreshCw } from 'lucide-react';

interface AICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AICopilotDrawer: React.FC<AICopilotDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Hello! I am your Elevate Hive Student Mentor. How can I assist your coding or career today? I can review your code, generate resume bullet points, or suggest hackathon team strategies."
    }
  ]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `⚡ Elevate Hive AI Response:\nBased on your GitHub activity and Python profile, here is the suggested approach for "${userMsg}":\n\n1. Use an asynchronous pipeline (e.g. FastAPI + LangChain).\n2. Store embeddings in Qdrant Vector DB for fast <20ms similarity queries.\n3. Add unit test coverage and trigger your GitHub Action CI pipeline.`
        }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-md h-full bg-[#090D16] border-l border-slate-800 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white font-display">Elevate Hive Copilot</h3>
              <p className="text-[10px] font-mono text-cyan-400">Context Aware • Student Role</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {messages.map((m, idx) => (
            <div 
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                m.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
              }`}>
                {m.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                m.sender === 'user' 
                  ? 'bg-purple-600/30 text-white border border-purple-500/40' 
                  : 'bg-slate-900/90 text-slate-200 border border-slate-800 whitespace-pre-wrap font-mono'
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 p-3 rounded-2xl bg-slate-900/50 border border-slate-800">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing codebases & computing response...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts & Input */}
        <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono">
            <button 
              onClick={() => setInput("Review my latest PR on GitHub")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 whitespace-nowrap"
            >
              ⚡ Review GitHub PR
            </button>
            <button 
              onClick={() => setInput("How to win Solana Hackathon?")}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:border-cyan-500/50 whitespace-nowrap"
            >
              🏆 Hackathon Strategy
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about coding, hackathons, or career..."
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              onClick={handleSend}
              className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
