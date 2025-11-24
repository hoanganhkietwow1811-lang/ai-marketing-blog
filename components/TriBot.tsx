import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, Send, Image as ImageIcon, Loader, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/mockData';

interface Message {
  role: 'user' | 'model';
  text: string;
  image?: string;
}

const TriBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hi, I'm TriBot. I can help you break down marketing strategies, analyze ads, or find insights from Tri's blog. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Prepare context from blog posts for the AI
  const blogContext = BLOG_POSTS.map(p => 
    `Title: ${p.title}\nCategory: ${p.category}\nKey Point: ${p.content.takeaways}`
  ).join('\n\n');

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = { role: 'user', text: input, image: selectedImage || undefined };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null); // Clear image after sending
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
      
      const systemPrompt = `You are TriBot, an AI assistant for Tri Bui's marketing blog. 
      Tone: Smart, simple, direct, analytical, NO fluff. 
      Role: Help marketers analyze cases, strategy, and consumer behavior.
      
      Here is a summary of Tri's recent writing to inform your answers:
      ${blogContext}

      If the user uploads an image, analyze it like a senior creative strategist. Look for the hook, the insight, and the execution quality.
      Keep answers concise and punchy. Use bullet points for readability.`;

      let responseText = '';

      if (currentImage) {
         // Image analysis flow
         const model = genAI.getGenerativeModel({ 
           model: 'gemini-1.5-flash',
           systemInstruction: systemPrompt 
         });
         const base64Data = currentImage.split(',')[1];
         const result = await model.generateContent([
           { inlineData: { mimeType: 'image/jpeg', data: base64Data } },
           input || "Analyze this marketing asset. What is the strategy behind it?"
         ]);
         const response = await result.response;
         responseText = response.text() || "I couldn't analyze that image.";
      } else {
         // Text chat flow
         const model = genAI.getGenerativeModel({ 
           model: 'gemini-1.5-flash',
           systemInstruction: systemPrompt 
         });
         const chat = model.startChat({
            history: messages.map(m => ({
                role: m.role,
                parts: [{ text: m.text }]
            }))
         });
         
         const result = await chat.sendMessage(input);
         const response = await result.response;
         responseText = response.text() || "I'm thinking...";
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);

    } catch (error) {
      console.error("Bot Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "My brain is offline briefly. Try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-50 p-4 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-premium-lg hover:scale-110 hover:rotate-12 transition-all duration-300 ${isOpen ? 'hidden' : 'flex'} items-center justify-center border-2 border-white/20 dark:border-black/20 glow animate-float`}
      >
        <Sparkles size={24} className="animate-pulse" />
        <span className="ml-2 font-bold tracking-tight hidden md:inline">Ask TriBot</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-8 md:right-8 z-50 w-full md:w-[400px] h-[600px] max-h-[100vh] glass shadow-premium-lg border-2 border-slate-200 dark:border-slate-800 rounded-t-2xl md:rounded-2xl flex flex-col overflow-hidden animate-scale-in">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center glass">
            <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse glow"></div>
                <h3 className="font-serif font-bold text-lg text-black dark:text-white">TriBot <span className="text-xs font-sans text-slate-400 font-normal ml-1">AI Strategy Assistant</span></h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full transition-all duration-300 text-black dark:text-white hover:rotate-90 hover:scale-110">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 gradient-bg">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-slide-up`} style={{ animationDelay: `${idx * 0.05}s` }}>
                <div 
                  className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-premium transition-all duration-300 hover:scale-105 ${
                    msg.role === 'user' 
                      ? 'bg-black text-white dark:bg-white dark:text-black rounded-tr-sm shine-effect' 
                      : 'glass border border-slate-200 dark:border-slate-800 rounded-tl-sm text-black dark:text-slate-300'
                  }`}
                >
                  {msg.image && (
                      <img src={msg.image} alt="User upload" className="max-w-full h-auto rounded-lg mb-2 border border-white/20 hover:scale-105 transition-transform duration-300" />
                  )}
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-pulse">
                <div className="glass shadow-premium p-4 rounded-2xl rounded-tl-sm flex items-center space-x-2">
                   <Loader size={16} className="animate-spin text-black dark:text-white" />
                   <span className="text-xs text-slate-500">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 glass border-t border-slate-100 dark:border-slate-800">
            {selectedImage && (
                <div className="mb-2 relative inline-block animate-scale-in">
                    <img src={selectedImage} alt="Preview" className="h-16 w-auto rounded border-2 border-slate-200 shadow-premium hover:scale-105 transition-transform duration-300" />
                    <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:scale-110 hover:rotate-90 transition-all duration-300 shadow-lg"><X size={10} /></button>
                </div>
            )}
            <div className="flex items-end space-x-2">
                <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 text-slate-400 hover:text-black dark:hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-12 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-900"
                >
                    <ImageIcon size={20} />
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageSelect}
                />
                <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Analyze strategy, ads, or ask for insights..."
                    className="flex-1 glass border-2 border-slate-200 dark:border-zinc-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-black dark:focus:ring-white focus:scale-105 resize-none max-h-32 text-sm text-black dark:text-white placeholder-slate-400 transition-all duration-300"
                    rows={1}
                />
                <button 
                    onClick={handleSend}
                    disabled={(!input && !selectedImage) || isLoading}
                    className="p-3 bg-black dark:bg-white text-white dark:text-black rounded-xl hover:scale-110 hover:rotate-12 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:rotate-0 transition-all duration-300 shadow-premium shine-effect"
                >
                    <Send size={18} />
                </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default TriBot;