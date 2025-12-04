import Link from 'next/link';
import Layout from '../components/Layout';

const features = [
  {
    title: 'Daily check-ins',
    description: 'Capture mood, energy, stress, and sleep in seconds with a mobile-friendly form.'
  },
  {
    title: 'Habits that stick',
    description: 'Track daily and weekly habits, mark completion, and celebrate your streaks.'
  },
  {
    title: 'Task clarity',
    description: 'Stay on top of today\'s priorities with simple task status and due dates.'
  },
  {
    title: 'Coaching nudges',
    description: 'Get rule-based guidance tailored to your day to keep momentum strong.'
  }
];

export default function Home() {
  return (
    <Layout>
      <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-white to-slate-50 p-6 shadow">
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.25),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(250,204,21,0.2),transparent_45%)]" />
        </div>
        <div className="relative space-y-4">
          <p className="inline-flex rounded-full bg-slate-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-50 shadow">Success Blueprint Coach</p>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Build the habits and tasks that power your best days.</h1>
          <p className="text-slate-700 sm:text-lg">
            Stay accountable with daily check-ins, clear priorities, and focused coaching messages—all in one calm, mobile-friendly dashboard.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              Create your account
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow hover:bg-slate-100"
            >
              Log in
            </Link>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-slate-700">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">📅 Daily rhythm</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">✅ Habit and task tracking</span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm">💡 Coach nudges</span>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-lg bg-white p-5 shadow">
            <h2 className="text-lg font-semibold text-slate-900">{feature.title}</h2>
            <p className="mt-2 text-sm text-slate-700">{feature.description}</p>
          </div>
        ))}
      </section>

      <section className="rounded-lg bg-white p-6 shadow">
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900">Your path to a calmer, focused day</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-md border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-blue-700">1. Check in</p>
              <p className="mt-1 text-sm text-slate-700">Log mood, energy, stress, and sleep to keep a pulse on your well-being.</p>
            </div>
            <div className="rounded-md border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-blue-700">2. Act with intention</p>
              <p className="mt-1 text-sm text-slate-700">Complete habits and mark tasks done to move your goals forward.</p>
            </div>
            <div className="rounded-md border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-blue-700">3. Get guided</p>
              <p className="mt-1 text-sm text-slate-700">Receive a tailored coach message that highlights the next best step.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg bg-blue-700 p-6 text-white shadow">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-xl font-bold">Ready to start your blueprint?</h3>
            <p className="text-sm text-blue-100">Join Success Blueprint Coach and make progress with clarity every day.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-md bg-white px-5 py-3 text-sm font-semibold text-blue-700 shadow hover:bg-blue-50"
            >
              Get started free
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-md border border-blue-200 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-600"
            >
              I already have an account
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

import { GetServerSideProps } from 'next';

export default function Home() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/login',
      permanent: false
    }
  };
};
