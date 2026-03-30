'use client';

import { useState } from 'react';
import { Share2, Lock } from 'lucide-react';

export default function PlatformIntelligence() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const findings = [
    '67% contained at least one compliance flag',
    'Alcohol + Supplements are highest-risk',
    'Health claims are the #1 flagged issue',
  ];

  const handleShare = async () => {
    const text = 'Checkedit has reviewed 312 pieces of Australian advertising. 67% contained at least one compliance flag. Is yours one of them? checkedit.ai #advertising #compliance #Australia';
    try {
      await navigator.clipboard.writeText(text);
      showToast('Copied to clipboard — ready to paste to LinkedIn');
    } catch {
      showToast('Could not copy — please copy the text manually');
    }
  };

  return (
    <div className="flex flex-col gap-6 border p-6 bg-brand-white border-grey-200 shadow-sm rounded-xl transition-all duration-500">
      {/* Header row — always visible */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-medium text-brand-title-text">Platform Intelligence</h2>
        <span className="inline-flex items-center justify-center rounded-md text-xs font-medium px-2.5 py-1 bg-brand-primary/10 text-brand-primary">
          Unlocks at Month 6
        </span>
      </div>

      {/* Locked content */}
      <div className="relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 rounded-xl z-10 backdrop-blur-[1px]">
          <div className="text-center px-6">
            <div className="w-12 h-12 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mx-auto mb-3">
              <Lock className="w-5 h-5 text-brand-primary" />
            </div>
            <p className="text-sm font-semibold text-brand-title-text mb-1">Unlocks at Month 6</p>
            <p className="text-xs text-brand-body-text max-w-xs">
              Keep using Checkedit and platform-wide insights unlock automatically. All data is anonymised — no individual reports or brand data is ever shared.
            </p>
          </div>
        </div>

        <div className="blur-sm pointer-events-none select-none">
          <div className="bg-brand-primary/5 rounded-xl p-6 text-center">
            <p className="text-5xl font-bold text-brand-primary">312</p>
            <p className="text-sm text-brand-body-text mt-2">
              pieces of Australian advertising reviewed on Checkedit
            </p>
            <div className="border-t border-grey-200 my-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {findings.map((finding) => (
                <div key={finding} className="flex items-start gap-2 justify-center">
                  <div className="bg-brand-primary w-2 h-2 rounded-full mt-1.5 shrink-0" />
                  <p className="text-sm text-brand-body-text">{finding}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium active:scale-95 border-2 px-4 py-2 border-brand-primary text-brand-primary hover:bg-grey-100 h-11 cursor-pointer transition-colors duration-200"
            >
              <Share2 className="w-4 h-4" />
              Share this insight
            </button>
          </div>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Platform stats update monthly. Next update: 1 May 2026.
          </p>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-24 right-4 bg-brand-title-text text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50 transition-all">
          {toast}
        </div>
      )}
    </div>
  );
}
