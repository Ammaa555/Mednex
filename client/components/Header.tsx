import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-secondary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity">
            <span className="text-2xl">🏥</span>
            <span>Mednex</span>
          </Link>

          <nav className="hidden md:flex gap-6">
            <Link to="/" className="hover:opacity-80 transition-opacity">Home</Link>
            <Link to="/genetic-analyzer" className="hover:opacity-80 transition-opacity">Genetic Analyzer</Link>
            <Link to="/health-tracker" className="hover:opacity-80 transition-opacity">Health Tracker</Link>
            <Link to="/ai-chat" className="hover:opacity-80 transition-opacity">AI Chat</Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link to="/" className="block hover:opacity-80 transition-opacity py-2">Home</Link>
            <Link to="/genetic-analyzer" className="block hover:opacity-80 transition-opacity py-2">Genetic Analyzer</Link>
            <Link to="/health-tracker" className="block hover:opacity-80 transition-opacity py-2">Health Tracker</Link>
            <Link to="/ai-chat" className="block hover:opacity-80 transition-opacity py-2">AI Chat</Link>
          </nav>
        )}
      </div>
    </header>
  );
}
