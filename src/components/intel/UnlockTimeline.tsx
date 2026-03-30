'use client';

import { useState } from 'react';
import { Zap, Lock, Trophy, ChevronDown } from 'lucide-react';
import MicroUnlockTrack from './MicroUnlockTrack';

interface TimelineMonth {
  month: number;
  label: string;
  name: string;
  state: 'active' | 'teased' | 'locked' | 'future';
  isFuture?: boolean;
}

const TIMELINE_MONTHS: TimelineMonth[] = [
  { month: 1, label: 'Month 1', name: 'Your Journey', state: 'active' },
  { month: 2, label: 'Month 2', name: 'Score Trend Report', state: 'teased' },
  { month: 3, label: 'Month 3', name: 'Industry Benchmark', state: 'teased' },
  { month: 4, label: 'Month 4', name: 'Peer Comparison', state: 'locked' },
  { month: 5, label: 'Month 5', name: 'Risk Forecast', state: 'locked' },
  { month: 6, label: 'Month 6', name: 'Platform Intelligence', state: 'locked' },
  { month: 7, label: 'Months 7–12', name: 'Power User Tier', state: 'future', isFuture: true },
];

function NodeIcon({ state, isFuture }: { state: string; isFuture?: boolean }) {
  if (state === 'active') return <Zap className="w-6 h-6 text-white" />;
  if (isFuture) return <Trophy className="w-5 h-5 text-amber-500" />;
  return <Lock className="w-4 h-4 text-grey-400" />;
}

function circleClass(state: string, isFuture?: boolean): string {
  if (state === 'active') return 'w-14 h-14 rounded-full bg-brand-primary flex items-center justify-center ring-4 ring-brand-primary/20 animate-pulse cursor-pointer flex-shrink-0';
  if (isFuture) return 'w-10 h-10 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center flex-shrink-0';
  if (state === 'teased') return 'w-10 h-10 rounded-full bg-grey-100 border-2 border-grey-200 flex items-center justify-center flex-shrink-0';
  return 'w-10 h-10 rounded-full bg-grey-100 border-2 border-grey-200 flex items-center justify-center opacity-40 flex-shrink-0';
}

function lineColor(index: number): string {
  if (index < 1) return 'rgb(59 130 246)';
  if (index < 3) return 'rgb(147 197 253)';
  return 'rgb(229 231 235)';
}

function statusLine(month: TimelineMonth, expandedMonth: number | null) {
  if (month.state === 'active') {
    return (
      <span className="text-xs text-brand-primary inline-flex items-center gap-0.5">
        Active
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            expandedMonth === month.month ? 'rotate-180' : ''
          }`}
        />
      </span>
    );
  }
  if (month.state === 'teased') {
    return (
      <span className="text-xs text-brand-body-text">
        ~{month.month - 1} week{month.month - 1 !== 1 ? 's' : ''} away
      </span>
    );
  }
  if (month.isFuture) {
    return <span className="text-xs text-amber-600">Unlocks at month 6</span>;
  }
  // locked
  return (
    <span className="text-xs text-grey-300">
      ~month {month.month}
    </span>
  );
}

export default function UnlockTimeline() {
  const [expandedMonth, setExpandedMonth] = useState<number | null>(1);

  const handleToggle = (month: number) => {
    setExpandedMonth(expandedMonth === month ? null : month);
  };

  return (
    <div className="border-t border-brand-primary/10 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-brand-title-text">Your 12-Month Intelligence Journey</h3>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="w-fit">
          {/* ROW 1 — Circles and connecting lines */}
          <div className="flex items-center">
            {TIMELINE_MONTHS.map((month, index) => (
              <div key={month.month} className="flex items-center">
                <div
                  className={circleClass(month.state, month.isFuture)}
                  onClick={month.state === 'active' ? () => handleToggle(month.month) : undefined}
                  title={month.state !== 'active' ? `${month.name} — ${month.state === 'teased' ? 'coming soon' : 'locked'}` : undefined}
                >
                  <NodeIcon state={month.state} isFuture={month.isFuture} />
                </div>
                {index < TIMELINE_MONTHS.length - 1 && (
                  <div
                    className={`h-0.5 rounded-full flex-shrink-0 mx-1 ${index < 1 ? 'w-12 lg:w-16' : 'w-10 lg:w-14'}`}
                    style={{ background: lineColor(index) }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* ROW 2 — Labels */}
          <div className="flex items-start mt-2">
            {TIMELINE_MONTHS.map((month, index) => (
              <div
                key={month.month}
                className={`text-center flex-shrink-0 ${
                  month.state === 'active'
                    ? 'min-w-[80px] w-[80px]'
                    : 'min-w-[72px] w-[72px]'
                } ${
                  index < TIMELINE_MONTHS.length - 1
                    ? index < 1
                      ? 'mr-[calc(3rem+0.5rem)] lg:mr-[calc(4rem+0.5rem)]'
                      : 'mr-[calc(2.5rem+0.5rem)] lg:mr-[calc(3.5rem+0.5rem)]'
                    : ''
                }`}
              >
                <p className="text-xs text-brand-body-text truncate">{month.label}</p>
                <p className={`text-xs font-semibold truncate ${month.state === 'locked' ? 'text-grey-300' : 'text-brand-title-text'}`}>
                  {month.name}
                </p>
                <div>{statusLine(month, expandedMonth)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {expandedMonth === 1 && (
        <div className="mt-4 border-t border-brand-primary/10 pt-4">
          <MicroUnlockTrack />
        </div>
      )}
    </div>
  );
}
