import { NextRequest, NextResponse } from 'next/server';
import { scrapeAdStandards } from '@/lib/scrapers/adstandards';
import { scrapeACCC } from '@/lib/scrapers/accc';
import { scrapeASIC } from '@/lib/scrapers/asic';
import { scrapeTGA } from '@/lib/scrapers/tga';
import { scrapeABAC } from '@/lib/scrapers/abac';
import { summariseItems } from '@/lib/summariser';
import { buildIssue } from '@/lib/issueBuilder';

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const { sector } = await req.json();

    if (!sector) {
      return NextResponse.json({ error: 'Sector is required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Run all 5 scrapers with Promise.allSettled
    const results = await Promise.allSettled([
      scrapeAdStandards(),
      scrapeACCC(),
      scrapeASIC(),
      scrapeTGA(),
      scrapeABAC(),
    ]);

    // Collect successful results
    const allItems = results.flatMap((r) => (r.status === 'fulfilled' ? r.value : []));

    // Interleave by source for variety
    const bySource: Record<string, typeof allItems> = {};
    for (const item of allItems) {
      if (!bySource[item.source]) bySource[item.source] = [];
      bySource[item.source].push(item);
    }

    const sources = Object.keys(bySource);
    const interleaved: typeof allItems = [];
    const maxLen = Math.max(...sources.map((s) => bySource[s].length), 0);
    for (let i = 0; i < maxLen; i++) {
      for (const source of sources) {
        if (bySource[source][i]) {
          interleaved.push(bySource[source][i]);
        }
      }
    }

    // Summarise with 10 call cap
    const { summarised, callCount, capped: summariserCapped } = await summariseItems(
      interleaved,
      sector,
      apiKey
    );

    // Build issue with 15 total call cap
    const { issue } = await buildIssue(summarised, sector, apiKey, callCount);

    // Update capped flag if summariser was capped
    if (summariserCapped) {
      issue.meta.capped = true;
    }

    return NextResponse.json(issue);
  } catch (error) {
    console.error('Pipeline failed:', error);
    return NextResponse.json({ error: 'Pipeline failed' }, { status: 500 });
  }
}
