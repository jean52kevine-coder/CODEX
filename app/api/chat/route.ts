import { NextRequest } from 'next/server';

type Message = { role: 'user' | 'assistant'; content: string };

function buildReply(lastMessage: string) {
  const base =
    "Merci pour ces détails. Chez Altéra, je recommande un cadrage express de 30 minutes pour qualifier vos objectifs, votre cible et vos contraintes. ";

  if (/prix|budget|coût|tarif/i.test(lastMessage)) {
    return (
      base +
      "À titre indicatif : une landing premium démarre vers 1 490€, un site business complet vers 2 990€, et les projets sur-mesure sont chiffrés après audit. Souhaitez-vous une estimation plus précise selon votre secteur ?"
    );
  }

  if (/seo|référencement/i.test(lastMessage)) {
    return base + 'Le SEO technique est intégré dès la conception: structure sémantique, vitesse, indexation et Core Web Vitals.';
  }

  return (
    base +
    'Je peux vous proposer une première estimation aujourd’hui si vous me précisez: nombre de pages, délai cible et niveau de maintenance souhaité.'
  );
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { messages?: Message[] };
  const last = body.messages?.at(-1)?.content ?? '';
  const responseText = buildReply(last);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const words = responseText.split(' ');
      for (const word of words) {
        controller.enqueue(encoder.encode(`${word} `));
        await new Promise((resolve) => setTimeout(resolve, 20));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  });
}
