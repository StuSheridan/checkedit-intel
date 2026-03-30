'use client';

import { useState, useEffect, useCallback } from 'react';
import { Zap, Loader2 } from 'lucide-react';
import NewsletterPreview from './NewsletterPreview';
import ReggieChat from './ReggieChat';
import { IssueData } from '@/lib/types';

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

  const handleGenerate = useCallback(async () => {
    if (!selectedSector) return;
    setLoading(true);
    setIssueData(null);
    setError(null);

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

  // Reset loading stage text
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
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 cursor-pointer ${
                selectedSector === sector
                  ? 'bg-brand-primary text-white'
                  : 'bg-brand-white text-brand-body-text border border-grey-200 hover:bg-grey-100'
              }`}
            >
              {sector}
            </button>
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
          <NewsletterPreview issueData={issueData} selectedSector={selectedSector || ''} />
          <ReggieChat />
        </>
      )}
    </div>
  );
}
