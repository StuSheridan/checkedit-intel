/*
 * TIM HANDOVER — ComplianceProfile
 *
 * Demo state is hardcoded at top of MicroUnlockTrack.tsx:
 *   const REPORTS_RUN = 3
 *   const DAYS_ACTIVE = 4
 *
 * Production implementation:
 * - Replace REPORTS_RUN with user's actual report count from Supabase
 * - Replace DAYS_ACTIVE with days since user's created_at
 * - isNew pill needs a seen_at timestamp — add unlock_seen table or field
 * - Month number derived from months since user's created_at
 * - Month 1 Report progress = (unlocked_count / 7) * 100
 *
 * No other changes needed — all unlock logic is driven by these two values.
 */

import UnlockTimeline from './UnlockTimeline';

export default function ComplianceProfile() {
  return (
    <div
      className="flex flex-col gap-6 border p-6 rounded-xl transition-all duration-500"
      style={{ backgroundColor: 'rgb(239 246 255)', borderColor: 'rgb(219 234 254)' }}
    >
      {/* Header row */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-base font-medium text-brand-title-text">Your Compliance Profile</h2>
          <p className="text-sm text-brand-body-text mt-1">Track your compliance journey and unlock intelligence as you grow.</p>
        </div>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-brand-primary/10 text-brand-primary border border-brand-primary/20 flex-shrink-0">
          Month 1 of 12
        </span>
      </div>

      {/* 12-month timeline (with expandable Month 1 micro-unlocks) */}
      <UnlockTimeline />

      {/* Stats row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white/80 rounded-xl p-4 text-center border border-blue-100">
          <p className="text-xs text-brand-body-text uppercase tracking-wide mb-1">Reports run</p>
          <p className="text-2xl font-bold text-brand-title-text">3</p>
        </div>
        <div className="bg-white/80 rounded-xl p-4 text-center border border-blue-100">
          <p className="text-xs text-brand-body-text uppercase tracking-wide mb-1">Days active</p>
          <p className="text-2xl font-bold text-brand-title-text">4</p>
        </div>
        <div className="bg-white/80 rounded-xl p-4 text-center border border-blue-100">
          <p className="text-xs text-brand-body-text uppercase tracking-wide mb-1">Member since</p>
          <p className="text-sm font-semibold text-brand-title-text">March 2026</p>
        </div>
      </div>
    </div>
  );
}
