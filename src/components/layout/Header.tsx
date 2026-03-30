'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Feedback', href: '#' },
    { label: 'Use Cases', href: '#' },
    { label: 'ROI', href: '#' },
    { label: 'Trends', href: '#' },
    { label: 'Policies', href: '#' },
    { label: 'Intel', href: '/intel', active: true },
  ];

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container px-4 sm:px-6 py-4 flex items-center">
        <a href="/intel" className="flex items-center cursor-pointer hover:opacity-80 transition-opacity mr-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.svg" alt="checkedit.ai" className="h-10 sm:h-12 w-auto" />
        </a>

        <nav className="hidden lg:flex flex-1 items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              className={`text-lg font-bold transition-colors relative ${
                link.active
                  ? 'text-brand-primary border-b-2 border-brand-primary'
                  : 'text-brand-body-text hover:text-brand-primary'
              }`}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button className="lg:hidden p-2 ml-auto" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="container px-4 sm:px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                className={`text-lg font-bold transition-colors ${
                  link.active ? 'text-brand-primary' : 'text-brand-body-text hover:text-brand-primary'
                }`}
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
