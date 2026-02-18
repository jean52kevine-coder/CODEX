import { NextRequest } from 'next/server';

type Message = { role: 'user' | 'assistant'; content: string };

function salesAdvisorReply(lastMessage: string) {
  const brief =
    'Parfait. Chez Altéra, nous concevons des sites premium qui renforcent la crédibilité et génèrent des leads qualifiés. ';

  if (/prix|budget|coût|tarif|estimation/i.test(lastMessage)) {
    return (
      brief +
      'Ordres de grandeur : landing premium dès 1 490€, site business multi-pages dès 2 990€, projet sur-mesure sur audit. Donnez-moi votre nombre de pages et votre délai pour une estimation affinée.'
    );
  }

  if (/maintenance|suivi|support/i.test(lastMessage)) {
    return (
      brief +
      'Nous proposons un suivi mensuel : monitoring, sécurité, optimisation continue et évolutions prioritaires. Voulez-vous une formule légère ou un accompagnement long terme ?'
    );
  }

  if (/seo|référencement/i.test(lastMessage)) {
    return (
      brief +
      'Le SEO technique est intégré dès le départ : structure sémantique, performances Core Web Vitals, maillage et indexation propre.'
    );
  }

  return (
    brief +
    'Pour vous qualifier rapidement, j’ai besoin de 3 infos : votre secteur, le nombre de pages souhaité et votre date de lancement cible.'
  );
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { messages?: Message[] };
  const lastMessage = body.messages?.at(-1)?.content ?? '';
  const answer = salesAdvisorReply(lastMessage);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // Small chunk streaming to simulate a real assistant output.
      for (const token of answer.split(' ')) {
        controller.enqueue(encoder.encode(`${token} `));
        await new Promise((resolve) => setTimeout(resolve, 16));
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
