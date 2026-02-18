'use client';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '@/animations/motion';
import { Navbar } from '@/components/Navbar';
import { Chatbot } from '@/components/Chatbot';
import { differentiators, faqs, portfolioItems, pricing, processSteps, services } from '@/lib/content';

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className="overflow-x-clip pb-20">
      <Navbar />

      {/* HERO */}
      <section id="hero" className="section-wrapper pt-24 md:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <motion.p
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-cyan-300"
            >
              <Sparkles size={14} /> Agence digitale startup-grade
            </motion.p>
            <motion.h1 variants={fadeUp} className="premium-title safe-balance">
              Des sites web ultra premium. Sans le prix ultra premium.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-lg text-white/75">
              Altéra conçoit, développe et maintient des sites performants qui convertissent.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="group rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 px-6 py-3 font-semibold text-black transition hover:-translate-y-[1px]"
              >
                Obtenir mon site <ArrowRight className="ml-1 inline transition group-hover:translate-x-1" size={18} />
              </a>
              <a
                href="#portfolio"
                className="rounded-full border border-white/15 px-6 py-3 text-white/90 transition hover:bg-white/10"
              >
                Voir les réalisations
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            className="glass relative overflow-hidden rounded-3xl p-[1px] shadow-glow"
          >
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-300/20" />
            <div className="glass rounded-[calc(1.5rem-1px)] p-4">
              <Image
                src="https://images.unsplash.com/photo-1518773553398-650c184e0bb3?auto=format&fit=crop&w=1400&q=80"
                width={1400}
                height={900}
                alt="Mockup floating premium"
                className="h-[420px] w-full animate-float rounded-2xl object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="section-wrapper">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 md:grid-cols-3"
        >
          {differentiators.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="glass rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:shadow-glow"
            >
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="mt-2 text-white/70">{item.text}</p>
            </motion.article>
          ))}
        </motion.div>
      </section>

      {/* SERVICES */}
      <section className="section-wrapper" id="services">
        <h2 className="text-3xl font-semibold md:text-4xl">Services</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="group rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.05] to-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-violet-300/35"
            >
              <h3 className="text-lg font-medium">{service.title}</h3>
              <p className="mt-2 text-white/70">{service.description}</p>
              <div className="mt-4 h-px w-0 bg-gradient-to-r from-violet-400 to-cyan-300 transition-all duration-300 group-hover:w-full" />
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="section-wrapper" id="method">
        <h2 className="text-3xl font-semibold md:text-4xl">Méthodologie</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ delay: index * 0.07 }}
              className="glass rounded-2xl p-5"
            >
              <p className="text-xs text-cyan-300">0{index + 1}</p>
              <p className="mt-2 font-medium">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="section-wrapper" id="portfolio">
        <h2 className="text-3xl font-semibold md:text-4xl">Portfolio</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {portfolioItems.map((item, i) => (
            <article key={item.name} className="group glass overflow-hidden rounded-2xl">
              <Image
                src={`https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=${1200 + i}&q=80`}
                width={1200}
                height={700}
                alt={item.name}
                className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="p-4">
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-white/70">{item.tag}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="section-wrapper" id="pricing">
        <h2 className="text-3xl font-semibold md:text-4xl">Tarification</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {pricing.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-2xl p-[1px] ${plan.featured ? 'bg-gradient-to-r from-violet-500 to-cyan-400' : 'bg-white/15'}`}
            >
              <div className="glass h-full rounded-2xl p-6">
                <p className="text-sm text-white/70">{plan.name}</p>
                <p className="mt-3 text-3xl font-semibold">{plan.price}</p>
                <p className="mt-2 text-sm text-white/70">{plan.description}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-white/85">
                      <Check size={14} className="text-cyan-300" /> {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="section-wrapper" id="faq">
        <h2 className="text-3xl font-semibold md:text-4xl">FAQ</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((item, index) => (
            <div key={item.q} className="glass rounded-2xl p-5">
              <button
                className="w-full text-left font-medium"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                aria-expanded={openFaq === index}
              >
                {item.q}
              </button>
              {openFaq === index && <p className="mt-2 text-white/70">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="section-wrapper" id="contact">
        <div className="rounded-3xl border border-violet-300/25 bg-gradient-to-r from-violet-500/20 to-cyan-300/10 p-10 text-center">
          <h2 className="text-3xl font-semibold safe-balance md:text-4xl">Transformons votre site en machine à crédibilité et conversion.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/75">
            Audit rapide, vision claire, exécution premium. Vous repartez avec un plan concret et une estimation adaptée.
          </p>
          <a
            href="mailto:contact@altera.agency"
            className="mt-6 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:-translate-y-[1px]"
          >
            Réserver un échange stratégique
          </a>
        </div>
      </section>

      <Chatbot />
    </main>
  );
}
