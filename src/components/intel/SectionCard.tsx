interface SectionCardProps {
  headline: string;
  summary: string;
  action: string;
  source: string;
  url: string;
  sector_tags: string[];
}

export default function SectionCard({ headline, summary, action, source, url, sector_tags }: SectionCardProps) {
  return (
    <div className="flex flex-col gap-3 border p-4 bg-brand-white border-grey-200 shadow-sm rounded-xl">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center justify-center rounded-md text-xs font-medium px-2.5 py-1 bg-grey-100 text-brand-body-text">
          {source}
        </span>
        <div className="flex flex-wrap gap-1">
          {sector_tags.map((tag) => (
            <span key={tag} className="inline-flex items-center justify-center rounded-md text-xs font-medium px-2.5 py-1 bg-brand-primary/10 text-brand-primary">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <h3 className="font-semibold text-brand-title-text">{headline}</h3>
      <p className="text-sm text-brand-body-text">{summary}</p>

      <div className="border-l-4 border-brand-primary pl-3 text-sm text-brand-body-text">
        <strong>What to do:</strong> {action}
      </div>

      <div className="text-right">
        <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-brand-primary hover:underline">
          View source →
        </a>
      </div>
    </div>
  );
}
