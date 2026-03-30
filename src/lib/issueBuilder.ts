import { SummarisedItem, IssueData } from './types';

const TOTAL_CAP = 15;

export async function buildIssue(
  summarised: SummarisedItem[],
  sector: string,
  apiKey: string,
  callsSoFar: number
): Promise<{ issue: IssueData; totalCalls: number; capped: boolean }> {
  let totalCalls = callsSoFar;
  let capped = callsSoFar >= TOTAL_CAP;

  // Filter out discarded items, then sort into sections
  const kept = summarised.filter((i) => i.section !== 'discard');
  const regulatory_updates = kept.filter((i) => i.section === 'regulatory_update');
  const judgements = kept.filter((i) => i.section === 'judgement');
  const under_review = kept.filter((i) => i.section === 'under_review');

  // Generate compliance tip and sector spotlight if we have API budget
  let compliance_tip = 'Review all advertising claims for substantiation before publication. The regulatory environment is tightening — proactive compliance is cheaper than reactive correction.';
  let sector_spotlight = '';

  if (totalCalls < TOTAL_CAP) {
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          messages: [
            {
              role: 'user',
              content: `You are a compliance analyst for the Australian ${sector} sector. Based on recent regulatory activity, provide:
1. A "compliance_tip" — one practical, actionable sentence for advertisers this week.
2. A "sector_spotlight" — a 2-4 sentence overview of the current compliance landscape for ${sector} in Australia.

Return ONLY valid JSON with keys "compliance_tip" and "sector_spotlight". No markdown fences.`,
            },
          ],
        }),
      });

      totalCalls++;

      if (res.ok) {
        const data = await res.json();
        const text = data.content?.[0]?.text || '';
        try {
          const cleaned = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          if (parsed.compliance_tip) compliance_tip = parsed.compliance_tip;
          if (parsed.sector_spotlight) sector_spotlight = parsed.sector_spotlight;
        } catch {
          // Use defaults
        }
      }
    } catch {
      // Use defaults
    }
  } else {
    capped = true;
  }

  const now = new Date();
  const weekNumber = Math.ceil(
    ((now.getTime() - new Date(now.getFullYear(), 0, 1).getTime()) / 86400000 + 1) / 7
  );

  const issue: IssueData = {
    meta: {
      sector,
      generated_at: now.toISOString().split('T')[0],
      week_number: weekNumber,
      capped,
    },
    sections: {
      regulatory_updates,
      judgements,
      under_review,
    },
    compliance_tip,
    sector_spotlight,
  };

  return { issue, totalCalls, capped };
}
