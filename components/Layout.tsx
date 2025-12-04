import Link from 'next/link';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-screen-md mx-auto p-4">
          <Link href="/">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-blue-700">Success Blueprint Coach</span>
              <span className="text-sm text-slate-600">Your coach in your pocket</span>
            </div>
          </Link>
        </div>
      </header>
      <main className="max-w-screen-md mx-auto p-4 space-y-4">{children}</main>
    </div>
  );
}
