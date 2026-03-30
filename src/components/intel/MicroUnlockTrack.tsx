import { CheckCircle, Lock, Trophy } from 'lucide-react';

const REPORTS_RUN = 3;
const DAYS_ACTIVE = 4;

const MICRO_UNLOCKS = [
  {
    id: 1,
    trigger: '1st report',
    name: 'First Flag Revealed',
    description: 'Your first compliance flag type has been identified.',
    unlockedContent: 'Health Claims is your first identified flag type.',
    unlocked: REPORTS_RUN >= 1,
    isNew: false,
    progressLabel: null,
    isBigUnlock: false,
  },
  {
    id: 2,
    trigger: 'Day 3 active',
    name: 'Compliance Habit Started',
    description: 'You\'ve returned to Checkedit 3 days in a row.',
    unlockedContent: 'You\'re building a compliance-first content culture.',
    unlocked: DAYS_ACTIVE >= 3,
    isNew: false,
    progressLabel: null,
    isBigUnlock: false,
  },
  {
    id: 3,
    trigger: '3 reports',
    name: 'First Pattern',
    description: 'Your flag pattern is emerging across reports.',
    unlockedContent: 'Health Claims appears in 67% of your reports — most common in Supplements content.',
    unlocked: REPORTS_RUN >= 3,
    isNew: true,
    progressLabel: null,
    isBigUnlock: false,
  },
  {
    id: 4,
    trigger: '5 reports',
    name: 'Sector Insight',
    description: 'See which of your sectors is performing best vs worst.',
    unlockedContent: null,
    unlocked: false,
    progressLabel: 'Run 2 more reports',
    isNew: false,
    isBigUnlock: false,
  },
  {
    id: 5,
    trigger: '7 days active',
    name: 'Weekly Intel Access',
    description: 'Unlock your sector\'s PolicyPulse weekly digest.',
    unlockedContent: null,
    unlocked: false,
    progressLabel: 'Return in 3 days',
    isNew: false,
    isBigUnlock: false,
  },
  {
    id: 6,
    trigger: '10 reports',
    name: 'Flag Deep Dive',
    description: 'Full breakdown of every flag type, frequency, and sector.',
    unlockedContent: null,
    unlocked: false,
    progressLabel: 'Run 7 more reports',
    isNew: false,
    isBigUnlock: false,
  },
  {
    id: 7,
    trigger: 'End of month',
    name: 'Month 1 Report',
    description: 'Your personalised compliance report card — client-ready PDF.',
    unlockedContent: null,
    unlocked: false,
    progressLabel: '43% complete',
    isNew: false,
    isBigUnlock: true,
  },
];

export default function MicroUnlockTrack() {
  const unlockedCount = MICRO_UNLOCKS.filter((u) => u.unlocked).length;

  return (
    <div className="border-t border-grey-200 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
        <h3 className="text-sm font-semibold text-brand-title-text">Month 1 — Your Journey</h3>
        <span className="text-xs text-brand-body-text">{unlockedCount} of {MICRO_UNLOCKS.length} unlocked</span>
      </div>

      <div>
        {MICRO_UNLOCKS.map((unlock) => {
          if (unlock.isBigUnlock) {
            return (
              <div key={unlock.id} className="flex items-start gap-3 py-3 mt-2 bg-amber-50 rounded-xl px-3 border border-amber-200">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Trophy className="w-4 h-4 text-amber-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-amber-800">{unlock.name}</span>
                    <span className="text-xs text-amber-600 ml-auto">{unlock.trigger}</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-1">{unlock.description}</p>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-amber-600 mb-1">
                      <span>Building your report</span>
                      <span>43%</span>
                    </div>
                    <div className="w-full bg-amber-200 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '43%' }} />
                    </div>
                  </div>
                </div>
              </div>
            );
          }

          if (unlock.unlocked) {
            return (
              <div key={unlock.id} className="flex items-start gap-3 py-3 border-b border-grey-100 last:border-0">
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 text-brand-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-medium text-brand-title-text">{unlock.name}</span>
                    {unlock.isNew && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700">
                        New
                      </span>
                    )}
                    <span className="text-xs text-brand-body-text ml-auto">{unlock.trigger}</span>
                  </div>
                  {unlock.unlockedContent && (
                    <p className="text-xs text-brand-body-text mt-1 bg-grey-50 rounded-lg px-3 py-2 border border-grey-200">
                      {unlock.unlockedContent}
                    </p>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={unlock.id} className="flex items-start gap-3 py-3 border-b border-grey-100 last:border-0 opacity-50">
              <div className="w-8 h-8 rounded-full bg-grey-100 border border-grey-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Lock className="w-4 h-4 text-grey-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-grey-400">{unlock.name}</span>
                  <span className="text-xs text-grey-400 ml-auto">{unlock.trigger}</span>
                </div>
                <p className="text-xs text-grey-400 mt-1">{unlock.progressLabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
