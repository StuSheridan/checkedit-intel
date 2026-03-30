'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';

export default function MonthlyInsight() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const stats = [
    { label: 'Top flag this month', value: 'Health Claims' },
    { label: 'Riskiest sector', value: 'Supplements' },
    { label: 'Score trend', value: '↑ 12pts vs March', green: true },
  ];

  return (
    <div className="flex flex-col gap-6 border p-6 bg-brand-white border-grey-200 shadow-sm rounded-xl transition-all duration-500">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-medium text-brand-title-text">Your Monthly Compliance Insight</h2>
        <span className="inline-flex items-center justify-center rounded-md text-xs font-medium px-2.5 py-1 bg-brand-primary/10 text-brand-primary">
          April 2026
        </span>
      </div>

      <p className="text-sm text-gray-500">Delivered last Friday of every month.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-grey-50 rounded-xl p-4 text-center border border-grey-200">
            <p className="text-xs text-brand-body-text uppercase tracking-wide mb-1">{stat.label}</p>
            <p className={`text-lg font-semibold ${stat.green ? 'text-[#2F8440]' : 'text-brand-title-text'}`}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <p className="text-sm text-brand-body-text">
        This month you ran 12 reports across 3 sectors. Your Supplements reports averaged 61/100 — your lowest performing category. Health claim substantiation was flagged in 8 of 12 reports.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <button
          onClick={() => showToast('PDF download coming soon')}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium active:scale-95 shadow-md px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white h-11 cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          <Download className="w-4 h-4" />
          Download April Report
        </button>
        <span className="inline-flex items-center justify-center rounded-md text-xs font-medium px-2.5 py-1 bg-brand-primary/10 text-brand-primary">
          Next insight: Friday 29 May 2026
        </span>
      </div>

      {toast && (
        <div className="fixed bottom-24 right-4 bg-brand-title-text text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50 transition-all">
          {toast}
        </div>
      )}
    </div>
  );
}
