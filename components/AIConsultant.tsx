import React, { useState, useEffect, useRef } from 'react';
import { Robot, PaperPlaneRight, X } from 'phosphor-react';
import { sendMessage } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface AIConsultantProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const AIConsultant: React.FC<AIConsultantProps> = ({ isOpen: controlledIsOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Determine effective open state (controlled vs internal)
  const isEffectiveOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      setInternalIsOpen(false);
    }
  };

  const handleOpen = () => {
     setInternalIsOpen(true);
  };

  // Reset initial message when language changes
  useEffect(() => {
    setMessages([{ role: 'model', text: t.consultant.welcome }]);
  }, [language, t.consultant.welcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isEffectiveOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      const responseText = await sendMessage(userText);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'Desculpe, tive um problema técnico. Tente novamente.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <section id="consultant" className="fixed bottom-6 right-6 z-40 font-sans">
      {/* Toggle Button */}
      {!isEffectiveOpen && (
        <button 
          onClick={handleOpen}
          className="flex items-center gap-0 md:gap-3 bg-tokyon-orange hover:bg-tokyon-orangeHover text-white p-2 md:pl-5 md:pr-2 md:py-3 rounded-full shadow-2xl transition-all transform hover:scale-105 group"
        >
          <span className="hidden md:block font-bold text-sm uppercase tracking-wider">{t.consultant.button}</span>
          <div className="bg-white/20 p-2 rounded-full">
             <Robot weight="fill" className="w-5 h-5" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isEffectiveOpen && (
        <div className="w-[90vw] md:w-[400px] h-[500px] bg-tokyon-dark border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="bg-tokyon-gray p-4 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-tokyon-orange flex items-center justify-center">
                <Robot className="text-white w-4 h-4" weight="fill" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">{t.consultant.title}</h3>
                <p className="text-xs text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span> Online
                </p>
              </div>
            </div>
            <button onClick={handleClose} className="text-gray-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-tokyon-black/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-white text-tokyon-black rounded-tr-none' 
                      : 'bg-white/10 text-gray-200 rounded-tl-none border border-white/5'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white/10 p-3 rounded-lg rounded-tl-none flex gap-1 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-tokyon-gray border-t border-white/5">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={t.consultant.placeholder}
                className="w-full bg-tokyon-black border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-tokyon-orange transition-colors placeholder-gray-600"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-tokyon-orange hover:text-white p-2 transition-colors disabled:opacity-50"
              >
                <PaperPlaneRight size={20} weight="fill" />
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-600 mt-2">{t.consultant.footer}</p>
          </div>
        </div>
      )}
    </section>
  );
};