import Link from 'next/link';
import Layout from '../components/Layout';

const features = [
  {
    title: 'Daily check-ins',
    description: 'Capture mood, energy, stress, and sleep in seconds with a calm, mobile-friendly flow.',
    emoji: '📅'
  },
  {
    title: 'Habits that stick',
    description: 'Track daily and weekly habits, mark completion, and celebrate your streaks.',
    emoji: '✅'
  },
  {
    title: 'Task clarity',
    description: 'Stay on top of today\'s priorities with simple task status and due dates.',
    emoji: '🗒️'
  },
  {
    title: 'Coaching nudges',
    description: 'Get rule-based guidance tailored to your day to keep momentum strong.',
    emoji: '💡'
  }
];

const steps = [
  {
    title: '1. Check in',
    detail: 'Log mood, energy, stress, and sleep to keep a pulse on your well-being.',
    accent: 'text-blue-700'
  },
  {
    title: '2. Act with intention',
    detail: 'Complete habits and mark tasks done to move your goals forward.',
    accent: 'text-yellow-500'
  },
  {
    title: '3. Get guided',
    detail: 'Receive a tailored coach message that highlights the next best step.',
    accent: 'text-slate-800'
  }
];

export default function Home() {
  return (
    <Layout>
      <section className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-slate-900 p-6 shadow-lg text-white sm:p-8">
        <div className="absolute inset-0 opacity-25" aria-hidden>
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.35),transparent_45%)]" />
        </div>
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-4 sm:max-w-xl">
            <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-50 shadow">Success Blueprint Coach</p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">Plan calm days, build stronger habits, and stay guided.</h1>
            <p className="text-blue-100 sm:text-lg">
              A focused dashboard for daily check-ins, habit tracking, and simple coaching nudges that keep you moving forward—on desktop or one-thumb mobile.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/register"
                className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50"
              >
                Commencer gratuitement
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-md border border-white/50 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Je suis déjà inscrit(e)
              </Link>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-blue-100">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">📱 Mobile friendly</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">🔒 Sécurisé</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">⚡ Démarrage rapide</span>
            </div>
          </div>
          <div className="w-full sm:max-w-xs">
            <div className="rounded-xl bg-white/10 p-4 shadow-lg backdrop-blur">
              <p className="text-sm font-semibold text-blue-50">Aperçu du tableau de bord</p>
              <div className="mt-3 space-y-2 rounded-lg bg-white/10 p-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-blue-50">Humeur</span>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-xs text-blue-50">3 / 5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-50">Énergie</span>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-xs text-blue-50">4 / 5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-50">Habitudes</span>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-xs text-blue-50">2 / 3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-50">Tâches</span>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-xs text-blue-50">1 / 2</span>
                </div>
              </div>
              <p className="mt-3 rounded-lg bg-white/15 p-3 text-sm text-blue-50">
                « Garde le rythme, concentre-toi sur 1 tâche essentielle aujourd'hui. »
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="flex gap-3 rounded-lg bg-white p-5 shadow">
            <div className="text-xl" aria-hidden>
              {feature.emoji}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
              <p className="mt-1 text-sm text-slate-700">{feature.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-lg bg-white p-6 shadow">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">Focus quotidien</p>
            <h2 className="text-xl font-bold text-slate-900">Construisez un rythme durable</h2>
            <p className="mt-2 text-sm text-slate-700">
              Capturez vos signaux du jour, marquez vos actions, et laissez Success Blueprint Coach générer une recommandation claire.
            </p>
          </div>
          <div className="flex gap-2 text-sm">
            <div className="rounded-lg bg-blue-50 px-4 py-3 text-blue-700 shadow-sm">
              <p className="font-semibold">3 / 4</p>
              <p className="text-xs">Habitudes complétées</p>
            </div>
            <div className="rounded-lg bg-yellow-50 px-4 py-3 text-yellow-700 shadow-sm">
              <p className="font-semibold">2 / 3</p>
              <p className="text-xs">Tâches du jour</p>
            </div>
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {steps.map((step) => (
            <div key={step.title} className="rounded-md border border-slate-100 bg-slate-50 p-4">
              <p className={`text-sm font-semibold ${step.accent}`}>{step.title}</p>
              <p className="mt-1 text-sm text-slate-700">{step.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-slate-900 p-6 text-white shadow">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">Prêt à démarrer ?</h3>
            <p className="text-sm text-slate-200">Rejoignez Success Blueprint Coach et créez votre routine claire en quelques minutes.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              Créer mon compte
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md bg-white/10 px-5 py-3 text-sm font-semibold text-white hover:bg-white/20"
            >
              Me connecter
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
