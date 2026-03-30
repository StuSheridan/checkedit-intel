export default function ProgressStrip() {
  return (
    <div
      className="rounded-xl px-5 py-3 flex items-center justify-between flex-wrap gap-2"
      style={{ backgroundColor: 'rgb(239 246 255)' }}
    >
      <div className="flex items-center gap-3 flex-wrap">
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-primary text-white">
          Month 1
        </span>
        <span className="text-sm text-brand-body-text">
          <span className="font-semibold text-brand-title-text">3 reports</span> run
        </span>
        <span className="text-grey-300 hidden sm:block">·</span>
        <span className="text-sm text-brand-body-text">
          <span className="font-semibold text-brand-title-text">4 days</span> active
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-brand-body-text">Next unlock:</span>
        <span className="text-xs font-semibold text-brand-primary">
          Sector Insight — run 2 more reports →
        </span>
      </div>
    </div>
  );
}
