export interface ScrapedItem {
  title: string;
  date: string;
  url: string;
  body_text: string;
  source: string;
}

export interface SummarisedItem {
  original_url: string;
  section: 'regulatory_update' | 'judgement' | 'under_review';
  headline: string;
  summary: string;
  action: string;
  sector_tags: string[];
  source: string;
}

export interface IssueData {
  meta: {
    sector: string;
    generated_at: string;
    week_number: number;
    capped?: boolean;
  };
  sections: {
    regulatory_updates: SummarisedItem[];
    judgements: SummarisedItem[];
    under_review: SummarisedItem[];
  };
  compliance_tip: string;
  sector_spotlight: string;
}
