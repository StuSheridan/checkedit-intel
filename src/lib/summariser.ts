import { ScrapedItem, SummarisedItem } from './types';

const SUMMARISER_CAP = 10;

export async function summariseItems(
  items: ScrapedItem[],
  sector: string,
  apiKey: string
): Promise<{ summarised: SummarisedItem[]; callCount: number; capped: boolean }> {
  const summarised: SummarisedItem[] = [];
  let callCount = 0;
  let capped = false;

  // Process items in batches to minimize API calls
  // Batch up to 5 items per call
  const batchSize = 5;
  for (let i = 0; i < items.length; i += batchSize) {
    if (callCount >= SUMMARISER_CAP) {
      capped = true;
      break;
    }

    const batch = items.slice(i, i + batchSize);
    const batchText = batch
      .map(
        (item, idx) =>
          `[${idx + 1}] Title: ${item.title}\nSource: ${item.source}\nURL: ${item.url}\nDate: ${item.date}\nBody: ${item.body_text.slice(0, 500)}`
      )
      .join('\n\n---\n\n');

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
          max_tokens: 2000,
          messages: [
            {
              role: 'user',
              content: `You are a compliance analyst summarising regulatory updates for the Australian ${sector} sector.

For each item below, return a JSON array of objects with these fields:
- "original_url": the URL provided
- "section": one of "regulatory_update", "judgement", or "under_review"
- "headline": a concise headline (max 15 words)
- "summary": 2-3 sentence summary of the compliance relevance
- "action": one sentence telling the reader what to do
- "sector_tags": array of relevant sector tags
- "source": the source name

UNDER REVIEW: Only classify as under_review if the item explicitly describes an active consultation paper, proposed code change, or public comment period with a defined closing date. General references to regulatory portals, adjudication pages, or media centres are NOT under_review items — discard them.

DISCARD RULE: If an item's body_text contains fewer than 50 words of substantive content, or appears to be a navigation element, portal page, search function, or site menu item rather than actual regulatory content, return section: "discard" for that item. Do not attempt to summarise navigation or portal items.

Return ONLY valid JSON array, no markdown fences.

Items:
${batchText}`,
            },
          ],
        }),
      });

      callCount++;

      if (!res.ok) continue;

      const data = await res.json();
      const text = data.content?.[0]?.text || '';

      try {
        // Try to parse as JSON, strip any markdown fences
        const cleaned = text.replace(/```json?\n?/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleaned);
        if (Array.isArray(parsed)) {
          for (const item of parsed) {
            summarised.push({
              original_url: item.original_url || '',
              section: item.section || 'regulatory_update',
              headline: item.headline || '',
              summary: item.summary || '',
              action: item.action || '',
              sector_tags: item.sector_tags || [],
              source: item.source || '',
            });
          }
        }
      } catch {
        // If JSON parse fails, skip this batch
      }
    } catch {
      // API call failed, no retry per brief
    }
  }

  return { summarised, callCount, capped };
}
