export default function ComplianceProfile() {
  const stats = [
    { label: 'Reports this month', value: '12' },
    { label: 'All time', value: '12' },
    { label: 'Member since', value: 'March 2026' },
  ];

  const progress = (12 / 25) * 100;

  return (
    <div className="flex flex-col gap-6 border p-6 bg-brand-white border-grey-200 shadow-sm rounded-xl transition-all duration-500">
      <h2 className="text-base font-medium text-brand-title-text">Your Compliance Profile</h2>

      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-brand-body-text">12 reports run</p>
          <p className="text-sm text-gray-500">Next milestone: 25</p>
        </div>
        <div className="h-2 w-full bg-grey-100 rounded-full overflow-hidden">
          <div
            className="h-full transition-all duration-1000 ease-out bg-brand-primary rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-brand-body-text mt-2">Run 13 more reports to unlock your sector trend analysis</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-grey-50 rounded-xl p-4 text-center border border-grey-200">
            <p className="text-xs text-brand-body-text uppercase tracking-wide mb-1">{stat.label}</p>
            <p className="text-lg font-semibold text-brand-title-text">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-brand-primary/20 rounded-xl p-4">
        <span className="inline-flex items-center justify-center rounded-md text-xs font-medium px-2.5 py-1 bg-[#2F8440]/10 text-[#2F8440] mb-2">
          Unlocked at 10 reports
        </span>
        <p className="text-sm text-brand-body-text">
          Your most common flag: Health Claims appear in 67% of your reports
        </p>
      </div>
    </div>
  );
}
