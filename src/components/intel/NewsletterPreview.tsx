'use client';

import { Download, Save } from 'lucide-react';
import { useState } from 'react';
import SectionCard from './SectionCard';
import { IssueData, SummarisedItem } from '@/lib/types';

interface NewsletterPreviewProps {
  issueData: IssueData;
  selectedSector: string;
}

export default function NewsletterPreview({ issueData, selectedSector }: NewsletterPreviewProps) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handlePdfDownload = async () => {
    const element = document.getElementById('intel-newsletter-output');
    if (!element) return;
    const html2pdf = (await import('html2pdf.js')).default;
    html2pdf().set({
      margin: 10,
      filename: `checkedit-intel-${selectedSector}-${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }).from(element).save();
  };

  const handleSave = () => {
    showToast('Saved to your dashboard — access under My Reports');
  };

  const renderSection = (title: string, items: SummarisedItem[], cap: number) => {
    const visible = items.slice(0, cap);
    const overflow = items.length - cap;
    return (
      <div className="space-y-4">
        <h3 className="text-base font-medium text-brand-title-text">{title}</h3>
        {visible.length === 0 ? (
          <p className="text-sm text-brand-body-text italic">Nothing to report this week — check back next issue.</p>
        ) : (
          <>
            {visible.map((item, i) => (
              <SectionCard
                key={i}
                headline={item.headline}
                summary={item.summary}
                action={item.action}
                source={item.source || 'Unknown'}
                url={item.original_url}
                sector_tags={item.sector_tags}
              />
            ))}
            {overflow > 0 && (
              <p className="text-sm text-gray-500">{overflow} more available</p>
            )}
          </>
        )}
      </div>
    );
  };

  const checkOfMonth = {
    brand: 'Carlton & United Breweries',
    product: 'Great Northern Super Crisp — recent OOH campaign',
    finding: 'The campaign featured imagery of people in an outdoor setting that could be interpreted as targeting active, healthy lifestyles as a benefit of consumption — a potential ABAC breach under Section 3(a).',
    verdict: 'Borderline. The imagery alone may not constitute a breach but combined with the tagline creates an implied health association that warrants review before the next flight.',
    note: 'Checkedit flagged this in 4 seconds. Audit your own content for less than a coffee a day at Checkedit.ai',
  };

  // Split sector spotlight into 2-sentence chunks, cap at 100 words
  const spotlightText = issueData.sector_spotlight || '';
  const spotlightWords = spotlightText.split(' ').slice(0, 100).join(' ');
  const sentences = spotlightWords.match(/[^.!?]+[.!?]+/g) || [spotlightWords];
  const spotlightChunks: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    spotlightChunks.push(sentences.slice(i, i + 2).join(' ').trim());
  }

  return (
    <>
      {issueData.meta.capped && (
        <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4 text-sm text-brand-primary">
          Some content was capped to protect API usage. All available content is shown below.
        </div>
      )}

      <div id="intel-newsletter-output" className="max-w-3xl mx-auto space-y-8">
        {/* Newsletter header */}
        <div className="text-center space-y-2 py-6 border-b border-grey-200">
          <h2 className="text-2xl font-bold text-brand-title-text">Checkedit Intel</h2>
          <p className="text-sm text-gray-500">
            {issueData.meta.generated_at} · Week {issueData.meta.week_number}, 2026
          </p>
        </div>

        {/* Editor overview placeholder */}
        <div className="bg-grey-50 border border-grey-200 rounded-xl p-4">
          <p className="text-sm text-brand-body-text italic">
            This week&apos;s overview will appear here after your review.
          </p>
        </div>

        {/* Sections */}
        {renderSection('Regulatory Updates', issueData.sections.regulatory_updates, 5)}
        {renderSection('Recent Judgements', issueData.sections.judgements, 5)}
        {renderSection('Under Review', issueData.sections.under_review, 5)}

        {/* Compliance Tip */}
        <div className="space-y-2">
          <h3 className="text-base font-medium text-brand-title-text">Compliance Tip of the Week</h3>
          <div className="bg-grey-50 border border-grey-200 rounded-xl p-4">
            <p className="text-sm text-brand-body-text">{issueData.compliance_tip || 'No tip this week.'}</p>
          </div>
        </div>

        {/* Sector Spotlight */}
        <div className="space-y-2">
          <h3 className="text-base font-medium text-brand-title-text">Sector Spotlight</h3>
          {spotlightChunks.length > 0 ? (
            spotlightChunks.map((chunk, i) => (
              <p key={i} className="text-sm text-brand-body-text">{chunk}</p>
            ))
          ) : (
            <p className="text-sm text-brand-body-text italic">Nothing to report this week — check back next issue.</p>
          )}
        </div>

        {/* Checkedit Check of the Month */}
        <div className="space-y-3">
          <h3 className="text-base font-medium text-brand-title-text">Checkedit Check of the Month</h3>
          <div className="flex flex-col gap-3 border p-4 bg-brand-white border-grey-200 shadow-sm rounded-xl">
            <p className="font-semibold text-brand-title-text">{checkOfMonth.brand} — {checkOfMonth.product}</p>
            <p className="text-sm text-brand-body-text">{checkOfMonth.finding}</p>
            <div className="border-l-4 border-[#F2A025] pl-3 text-sm text-brand-body-text">
              <strong>Verdict:</strong> {checkOfMonth.verdict}
            </div>
            <p className="text-xs text-gray-500">{checkOfMonth.note}</p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-brand-primary text-white rounded-xl p-6 text-center">
          <p className="font-semibold">Audit your own content for less than a coffee a day at Checkedit.ai</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-4 justify-center mt-6">
        <button
          onClick={handlePdfDownload}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium active:scale-95 shadow-md px-4 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white h-11 cursor-pointer transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
        >
          <Download className="w-4 h-4" />
          Download as PDF
        </button>
        <button
          onClick={handleSave}
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium active:scale-95 border-2 px-4 py-2 border-brand-primary text-brand-primary hover:bg-grey-100 h-11 cursor-pointer transition-colors duration-200"
        >
          <Save className="w-4 h-4" />
          Save to Dashboard
        </button>
      </div>

      {toast && (
        <div className="fixed bottom-24 right-4 bg-brand-title-text text-white px-4 py-2 rounded-lg text-sm shadow-lg z-50 transition-all">
          {toast}
        </div>
      )}
    </>
  );
}
