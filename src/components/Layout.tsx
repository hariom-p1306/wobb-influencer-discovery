import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600"
          >
            Influencer Search
          </Link>

          {title && (
            <h1 className="mt-3 text-3xl font-bold text-gray-900">
              {title}
            </h1>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}