'use client';

import React, { useState } from 'react';
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
  const base = 'rounded-full flex items-center justify-center mx-auto';
  if (state === 'active') return `w-14 h-14 bg-brand-primary ring-4 ring-brand-primary/20 animate-pulse cursor-pointer ${base}`;
  if (isFuture) return `w-10 h-10 bg-amber-50 border-2 border-amber-200 ${base}`;
  if (state === 'teased') return `w-10 h-10 bg-grey-100 border-2 border-grey-200 ${base}`;
  return `w-10 h-10 bg-grey-100 border-2 border-grey-200 opacity-40 ${base}`;
}

function lineColor(index: number): string {
  if (index < 1) return 'rgb(59 130 246)';
  if (index < 3) return 'rgb(147 197 253)';
  return 'rgb(229 231 235)';
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
        <div style={{ display: 'table', width: '100%', minWidth: 560 }}>
          {/* Circle row */}
          <div style={{ display: 'table-row' }}>
            {TIMELINE_MONTHS.map((month, index) => (
              <React.Fragment key={month.month}>
                <div style={{ display: 'table-cell', textAlign: 'center', verticalAlign: 'middle', paddingBottom: 4 }}>
                  <div
                    className={circleClass(month.state, month.isFuture)}
                    onClick={month.state === 'active' ? () => handleToggle(month.month) : undefined}
                    title={month.state !== 'active' ? `${month.name} — ${month.state === 'teased' ? 'coming soon' : 'locked'}` : undefined}
                  >
                    <NodeIcon state={month.state} isFuture={month.isFuture} />
                  </div>
                </div>
                {index < TIMELINE_MONTHS.length - 1 && (
                  <div style={{ display: 'table-cell', verticalAlign: 'middle', paddingBottom: 4 }}>
                    <div className="h-0.5 w-full rounded-full" style={{ background: lineColor(index) }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Label row */}
          <div style={{ display: 'table-row' }}>
            {TIMELINE_MONTHS.map((month, index) => (
              <React.Fragment key={month.month}>
                <div style={{ display: 'table-cell', textAlign: 'center', verticalAlign: 'top', paddingTop: 6 }}>
                  <p className="text-xs text-brand-body-text">{month.label}</p>
                  <p className={`text-xs font-semibold mt-0.5 ${month.state === 'locked' ? 'text-grey-300' : 'text-brand-title-text'}`}>
                    {month.name}
                  </p>
                  {month.state === 'active' && (
                    <button
                      onClick={() => handleToggle(month.month)}
                      className="text-xs text-brand-primary inline-flex items-center gap-0.5 mt-0.5 mx-auto"
                    >
                      Active
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${expandedMonth === month.month ? 'rotate-180' : ''}`}
                      />
                    </button>
                  )}
                  {month.state === 'teased' && (
                    <span className="text-xs text-brand-body-text mt-0.5 block">
                      ~{month.month - 1} week{month.month - 1 !== 1 ? 's' : ''} away
                    </span>
                  )}
                  {month.state === 'locked' && (
                    <span className="text-xs text-grey-300 mt-0.5 block">~month {month.month}</span>
                  )}
                  {month.state === 'future' && (
                    <span className="text-xs text-amber-600 mt-0.5 block">Unlocks at month 6</span>
                  )}
                </div>
                {index < TIMELINE_MONTHS.length - 1 && (
                  <div style={{ display: 'table-cell' }} />
                )}
              </React.Fragment>
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
