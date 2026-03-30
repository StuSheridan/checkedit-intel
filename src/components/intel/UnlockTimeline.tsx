import { Zap, Lock, Trophy } from 'lucide-react';

interface TimelineMonth {
  month: number;
  label: string;
  name: string;
  description: string;
  state: 'active' | 'teased' | 'locked' | 'future';
  isFuture?: boolean;
}

const TIMELINE_MONTHS: TimelineMonth[] = [
  {
    month: 1,
    label: 'Month 1',
    name: 'Your Journey',
    description: 'Micro-unlocks as you build your compliance habit',
    state: 'active',
  },
  {
    month: 2,
    label: 'Month 2',
    name: 'Score Trend Report',
    description: 'Your compliance score over time — are you improving?',
    state: 'teased',
  },
  {
    month: 3,
    label: 'Month 3',
    name: 'Industry Benchmark',
    description: 'How does your score compare to your sector average?',
    state: 'teased',
  },
  {
    month: 4,
    label: 'Month 4',
    name: 'Peer Comparison',
    description: 'Anonymous benchmark against brands like yours.',
    state: 'locked',
  },
  {
    month: 5,
    label: 'Month 5',
    name: 'Risk Forecast',
    description: 'Forward-looking regulatory risk intelligence.',
    state: 'locked',
  },
  {
    month: 6,
    label: 'Month 6',
    name: 'Platform Intelligence',
    description: 'Full site-wide data, all sectors, downloadable reports.',
    state: 'locked',
  },
  {
    month: 7,
    label: 'Months 7–12',
    name: 'Power User Tier',
    description: 'Sector Risk Calendar, Client Report Cards, API Access, Team Benchmarking, Annual Report.',
    state: 'future',
    isFuture: true,
  },
];

function NodeIcon({ state, isFuture }: { state: string; isFuture?: boolean }) {
  if (state === 'active') return <Zap className="w-5 h-5 text-white" />;
  if (isFuture) return <Trophy className="w-5 h-5 text-amber-500" />;
  return <Lock className="w-4 h-4 text-grey-400" />;
}

function nodeCircleClass(state: string, isFuture?: boolean): string {
  if (state === 'active') {
    return 'w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center ring-4 ring-brand-primary/20 animate-pulse';
  }
  if (isFuture) {
    return 'w-12 h-12 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center';
  }
  if (state === 'teased') {
    return 'w-10 h-10 rounded-full bg-grey-100 border-2 border-grey-200 flex items-center justify-center';
  }
  // locked
  return 'w-10 h-10 rounded-full bg-grey-100 border-2 border-grey-200 flex items-center justify-center opacity-40';
}

function TimelineNode({ month, isLast }: { month: TimelineMonth; isLast: boolean }) {
  return (
    <div className="flex items-start">
      <div className="flex flex-col items-center">
        <div className={nodeCircleClass(month.state, month.isFuture)}>
          <NodeIcon state={month.state} isFuture={month.isFuture} />
        </div>
        <div className="mt-2 text-center max-w-[80px] lg:max-w-[100px]">
          <p className={`text-xs font-medium ${month.state === 'active' ? 'text-brand-primary' : 'text-grey-400'}`}>
            {month.label}
          </p>
          <p className={`text-xs font-semibold mt-0.5 ${month.state === 'locked' ? 'text-grey-300' : 'text-brand-title-text'}`}>
            {month.name}
          </p>
          {(month.state === 'active' || month.state === 'teased') && (
            <p className="text-xs text-brand-body-text mt-0.5 leading-tight">
              {month.description}
            </p>
          )}
          {month.state === 'locked' && (
            <p className="text-xs text-grey-300 mt-0.5">Locked</p>
          )}
          {month.isFuture && (
            <p className="text-xs text-amber-600 mt-0.5 leading-tight">
              {month.description}
            </p>
          )}
        </div>
      </div>
      {!isLast && (
        <div className="h-0.5 bg-grey-200 flex-shrink-0 w-8 lg:w-12 mt-5 mx-1" />
      )}
    </div>
  );
}

export default function UnlockTimeline() {
  return (
    <div className="border-t border-grey-200 pt-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-sm font-semibold text-brand-title-text">Your 12-Month Intelligence Journey</h3>
      </div>

      <div className="overflow-x-auto pb-2">
        <div className="flex items-start gap-0 min-w-max lg:min-w-0 lg:w-full">
          {TIMELINE_MONTHS.map((month, index) => (
            <TimelineNode key={month.month} month={month} isLast={index === TIMELINE_MONTHS.length - 1} />
          ))}
        </div>
      </div>
    </div>
  );
}
