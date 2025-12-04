import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || 'Registration failed');
      return;
    }

    router.push('/login'); // redirect after registration as simplest flow
  };

  return (
    <Layout>
      <div className="card space-y-4">
        <h1 className="text-xl font-bold text-slate-900">Create account</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              className="w-full rounded-md border border-slate-200 p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <input
              type="password"
              className="w-full rounded-md border border-slate-200 p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="button-primary w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        <p className="text-sm text-slate-600">
          Already have an account? <a className="text-blue-600" href="/login">Sign in</a>
        </p>
      </div>
    </Layout>
  );
}
