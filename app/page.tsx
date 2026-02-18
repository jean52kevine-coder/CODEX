'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, Sparkles, Check } from 'lucide-react';
import { fadeUp, stagger } from '@/animations/motion';
import { services, processSteps, pricing, faqs } from '@/lib/content';
import { Navbar } from '@/components/Navbar';
import { Chatbot } from '@/components/Chatbot';
import { useState } from 'react';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main>
      <Navbar />

      <section id="hero" className="section-wrapper pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-300">
              <Sparkles size={14} /> Agence digitale nouvelle génération
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl font-semibold leading-tight md:text-6xl">
              Des sites web ultra premium. Sans le prix ultra premium.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg text-white/75">
              Altéra conçoit, développe et maintient des sites performants qui convertissent.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a href="#contact" className="group rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 font-semibold text-black transition hover:scale-[1.02]">
                Obtenir mon site <ChevronRight className="ml-1 inline" size={18} />
              </a>
              <a href="#portfolio" className="rounded-full border border-white/15 px-6 py-3 text-white/90 transition hover:bg-white/10">
                Voir les réalisations
              </a>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="glass relative overflow-hidden rounded-3xl p-4 shadow-glow">
            <div className="absolute inset-0 -z-10 animate-gradient bg-[linear-gradient(120deg,rgba(124,58,237,.25),rgba(34,211,238,.15),rgba(124,58,237,.2))] bg-[length:200%_200%]" />
            <Image
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80"
              width={1200}
              height={800}
              alt="Mockup premium Altéra"
              className="h-[420px] w-full rounded-2xl object-cover"
            />
          </motion.div>
        </div>
      </section>

      <section className="section-wrapper" id="services">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid gap-5 md:grid-cols-3">
          {['Performance', 'Design', 'Conversion'].map((item) => (
            <motion.article key={item} variants={fadeUp} className="glass rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-glow">
              <h3 className="text-xl font-semibold">{item}</h3>
              <p className="mt-2 text-white/70">Une exécution calibrée pour transformer votre présence web en actif business.</p>
            </motion.article>
          ))}
        </motion.div>

        <h2 className="mt-16 text-3xl font-semibold" id="services">Services</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.title} className="glass rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/40">
              <h3 className="text-lg font-medium">{service.title}</h3>
              <p className="mt-2 text-white/70">{service.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrapper" id="méthodologie">
        <h2 className="text-3xl font-semibold">Méthodologie</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, idx) => (
            <motion.div key={step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="glass rounded-2xl p-5">
              <p className="text-xs text-cyan-300">0{idx + 1}</p>
              <p className="mt-2 font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section-wrapper" id="portfolio">
        <h2 className="text-3xl font-semibold">Portfolio</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <article key={n} className="group glass overflow-hidden rounded-2xl">
              <Image
                src={`https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=${600 + n}&q=80`}
                width={640}
                height={420}
                alt={`Projet ${n}`}
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="font-medium">Projet {n}</p>
                <p className="text-sm text-white/70">Refonte premium orientée conversion.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrapper" id="tarifs">
        <h2 className="text-3xl font-semibold">Tarification</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {pricing.map((plan) => (
            <article key={plan.name} className={`rounded-2xl p-[1px] ${plan.featured ? 'bg-gradient-to-r from-violet-500 to-cyan-400' : 'bg-white/10'}`}>
              <div className="glass h-full rounded-2xl p-6">
                <p className="text-sm text-white/70">{plan.name}</p>
                <p className="mt-3 text-3xl font-semibold">{plan.price}</p>
                <p className="mt-2 text-sm text-white/70">{plan.description}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-white/85">
                      <Check size={14} className="text-cyan-300" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-wrapper" id="faq">
        <h2 className="text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((f, idx) => (
            <div key={f.q} className="glass rounded-2xl p-5">
              <button className="w-full text-left font-medium" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                {f.q}
              </button>
              {openFaq === idx && <p className="mt-2 text-white/70">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>

      <section className="section-wrapper" id="contact">
        <div className="rounded-3xl border border-violet-300/25 bg-gradient-to-r from-violet-500/20 to-cyan-300/10 p-10 text-center">
          <h2 className="text-3xl font-semibold">Prêt à transformer votre présence digitale ?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">Altéra vous accompagne de la stratégie à la maintenance pour un site qui inspire confiance et génère des leads.</p>
          <a href="mailto:contact@altera.agency" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:scale-[1.02]">
            Réserver un échange stratégique
          </a>
        </div>
      </section>
      <Chatbot />
    </main>
  );
}
