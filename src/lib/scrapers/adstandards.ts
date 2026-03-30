import { ScrapedItem } from '../types';

export async function scrapeAdStandards(): Promise<ScrapedItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch('https://adstandards.com.au/cases/recently-decided', {
      signal: controller.signal,
      headers: { 'User-Agent': 'CheckeditIntel/1.0' },
    });
    const html = await res.text();

    const items: ScrapedItem[] = [];
    // Extract case entries from the HTML
    const caseRegex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
    const linkRegex = /href="(\/cases\/[^"]+)"/gi;
    const dateRegex = /\b(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})\b/gi;

    const titles: string[] = [];
    let match;
    while ((match = caseRegex.exec(html)) !== null) {
      titles.push(match[1].replace(/<[^>]+>/g, '').trim());
    }

    const links: string[] = [];
    while ((match = linkRegex.exec(html)) !== null) {
      links.push(`https://adstandards.com.au${match[1]}`);
    }

    const dates: string[] = [];
    while ((match = dateRegex.exec(html)) !== null) {
      dates.push(match[1]);
    }

    for (let i = 0; i < Math.min(titles.length, 10); i++) {
      items.push({
        title: titles[i] || 'Ad Standards Case',
        date: dates[i] || new Date().toISOString().split('T')[0],
        url: links[i] || 'https://adstandards.com.au/cases/recently-decided',
        body_text: titles[i] || '',
        source: 'Ad Standards',
      });
    }

    return items;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
