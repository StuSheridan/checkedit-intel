'use client';

import { useState } from 'react';
import { Zap, Trophy, BarChart2 } from 'lucide-react';
import MonthlyInsight from '@/components/intel/MonthlyInsight';
import ComplianceProfile from '@/components/intel/ComplianceProfile';
import PlatformIntelligence from '@/components/intel/PlatformIntelligence';
import GenerateIntel from '@/components/intel/GenerateIntel';
import ProgressStrip from '@/components/intel/ProgressStrip';

const tabs = [
  { id: 'journey' as const, label: 'My Journey', icon: Trophy },
  { id: 'generate' as const, label: 'Generate Intel', icon: Zap },
  { id: 'platform' as const, label: 'Platform Insights', icon: BarChart2 },
];

export default function IntelPage() {
  const [activeTab, setActiveTab] = useState<'journey' | 'generate' | 'platform'>('journey');

  return (
    <div className="mx-auto max-w-6xl space-y-4 px-4 sm:px-6">
      <div className="mb-2">
        <h1 className="text-3xl font-semibold text-brand-title-text my-2">Checkedit Intel</h1>
        <p className="text-sm text-brand-body-text">
          Your compliance intelligence centre — powered by Checkedit.
        </p>
      </div>

      {/* Progress strip — always visible */}
      <ProgressStrip />

      {/* Tab bar */}
      <div className="flex gap-1 bg-grey-100 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white text-brand-primary shadow-sm'
                : 'text-brand-body-text hover:text-brand-title-text'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'journey' && (
        <div className="space-y-6">
          <MonthlyInsight />
          <ComplianceProfile />
        </div>
      )}

      {activeTab === 'generate' && (
        <div className="space-y-6">
          <GenerateIntel />
        </div>
      )}

      {activeTab === 'platform' && (
        <div className="space-y-6">
          <PlatformIntelligence />
        </div>
      )}
    </div>
  );
}
