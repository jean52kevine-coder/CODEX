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
    {
      role: 'assistant',
      content:
        'Bonjour 👋 Je suis le conseiller Altéra. Décrivez votre projet (activité, pages souhaitées, délai) et je vous donne une estimation.',
    },
  ]);

  const ask = async () => {
    if (!input.trim() || loading) return;

    const next = [...messages, { role: 'user' as const, content: input }];
    setMessages(next);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });

      if (!res.ok || !res.body) throw new Error('stream_unavailable');
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

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
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Je rencontre un souci technique. Vous pouvez nous écrire à contact@altera.agency pour recevoir votre estimation en priorité.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-6 sm:right-6">
      <button
        onClick={() => setOpen((value) => !value)}
        className="group rounded-full border border-white/20 bg-white/10 p-4 backdrop-blur-xl transition hover:shadow-glow"
        aria-label="Ouvrir le chatbot Altéra"
      >
        {open ? <X size={18} /> : <MessageCircle size={18} className="transition group-hover:scale-110" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            className="glass mt-3 h-[470px] w-[calc(100vw-2.5rem)] max-w-[360px] rounded-2xl p-4"
          >
            <div className="mb-3 text-sm text-white/70">Assistant IA Altéra</div>
            <div className="mb-3 h-[350px] space-y-3 overflow-auto pr-1">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`rounded-xl p-3 text-sm ${msg.role === 'assistant' ? 'bg-white/10 text-white' : 'bg-violet-500/35 text-white'}`}
                >
                  {msg.content}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && ask()}
                placeholder="Votre besoin..."
                className="w-full rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm outline-none"
              />
              <button
                onClick={ask}
                disabled={loading}
                className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 px-3 text-black disabled:opacity-60"
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
