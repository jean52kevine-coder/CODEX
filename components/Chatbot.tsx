'use client';

import { MessageCircle, Send, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

type Msg = { role: 'user' | 'assistant'; content: string };

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Bonjour, je suis le conseiller Altéra. Quel est votre objectif web principal ?' },
  ]);

  const ask = async () => {
    if (!input.trim() || loading) return;
    const next = [...messages, { role: 'user' as const, content: input }];
    setMessages(next);
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: next }),
    });

    const reader = res.body?.getReader();
    if (!reader) return;

    let assistantText = '';
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      assistantText += decoder.decode(value);
      setMessages((prev) => {
        const cloned = [...prev];
        cloned[cloned.length - 1] = { role: 'assistant', content: assistantText };
        return cloned;
      });
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      <button onClick={() => setOpen((v) => !v)} className="group rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur-xl transition hover:shadow-glow">
        {open ? <X size={18} /> : <MessageCircle size={18} className="group-hover:scale-110" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="glass mt-3 h-[480px] w-[340px] rounded-2xl p-4"
          >
            <div className="mb-3 text-sm text-white/70">Assistant IA Altéra</div>
            <div className="mb-3 h-[360px] space-y-3 overflow-auto pr-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`rounded-xl p-3 text-sm ${msg.role === 'assistant' ? 'bg-white/10 text-white' : 'bg-violet-500/35 text-white'}`}>
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && ask()}
                placeholder="Décrivez votre besoin..."
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none"
              />
              <button onClick={ask} className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-3 text-black">
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
