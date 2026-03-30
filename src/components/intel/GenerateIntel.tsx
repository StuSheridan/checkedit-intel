'use client';

import { useState, useEffect, useCallback } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import NewsletterPreview from './NewsletterPreview';
import ReggieChat from './ReggieChat';
import { IssueData } from '@/lib/types';
import { DEMO_DATA } from '@/lib/demoData';

const sectors = [
  'Alcohol',
  'Food and Beverage',
  'Supplements',
  'Gaming and Gambling',
  'Insurance Broker',
  'News and Publications',
];

const stages = [
  'Scanning Ad Standards...',
  'Scanning ACCC, ASIC, TGA, ABAC...',
  'Summarising with AI...',
  'Building your briefing...',
];

export default function GenerateIntel() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [issueData, setIssueData] = useState<IssueData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDemo, setIsDemo] = useState(false);

  const handleDemo = (sector: string) => {
    setSelectedSector(sector);
    setIssueData(DEMO_DATA[sector]);
    setIsDemo(true);
    setError(null);
  };

  const handleGenerate = useCallback(async () => {
    if (!selectedSector) return;
    setLoading(true);
    setIssueData(null);
    setError(null);
    setIsDemo(false);

    let i = 0;
    const interval = setInterval(() => {
      setLoadingStage(stages[i % stages.length]);
      i++;
    }, 2500);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sector: selectedSector }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Generation failed');
      setIssueData(data);
    } catch {
      setError("Couldn't generate Intel. Check your connection and try again.");
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  }, [selectedSector]);

  useEffect(() => {
    if (loading) {
      setLoadingStage(stages[0]);
    }
  }, [loading]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 border p-6 bg-brand-white border-grey-200 shadow-sm rounded-xl transition-all duration-500">
        <h2 className="text-base font-medium text-brand-title-text">Generate Intel</h2>
        <p className="text-sm text-brand-body-text">
          Select an industry to generate a live compliance briefing.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {sectors.map((sector) => (
            <div
              key={sector}
              className={`flex items-center justify-between px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                selectedSector === sector
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-white text-brand-body-text border border-grey-200 hover:bg-grey-100'
              }`}
              onClick={() => setSelectedSector(sector)}
            >
              <span>{sector}</span>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  handleDemo(sector);
                }}
                className={`ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium border cursor-pointer transition-colors ${
                  selectedSector === sector
                    ? 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                    : 'bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20'
                }`}
              >
                Demo
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleGenerate}
          disabled={!selectedSector || loading}
          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium active:scale-95 shadow-md px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white h-11 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${
            !selectedSector || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {loadingStage}
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Generate Intel
            </>
          )}
        </button>

        {loading && (
          <p className="text-xs text-gray-500">
            This takes 20–30 seconds — pulling live regulatory data
          </p>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-600">
            {error}
          </div>
        )}
      </div>

      {issueData && (
        <>
          {isDemo && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-800 flex items-center gap-2">
              <span className="font-medium">Demo mode</span> — showing example data for {selectedSector}. Click Generate Intel for live data.
            </div>
          )}
          <NewsletterPreview issueData={issueData} selectedSector={selectedSector || ''} />
          <ReggieChat />
        </>
      )}
    </div>
  );
}
