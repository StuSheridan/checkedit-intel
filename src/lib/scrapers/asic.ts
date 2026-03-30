import { ScrapedItem } from '../types';

export async function scrapeASIC(): Promise<ScrapedItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch('https://asic.gov.au/about-asic/news-centre/find-a-media-release/', {
      signal: controller.signal,
      headers: { 'User-Agent': 'CheckeditIntel/1.0' },
    });
    const html = await res.text();

    const items: ScrapedItem[] = [];
    const titleRegex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
    const linkRegex = /href="(\/about-asic\/news-centre\/[^"]+)"/gi;

    const titles: string[] = [];
    let match;
    while ((match = titleRegex.exec(html)) !== null) {
      const title = match[1].replace(/<[^>]+>/g, '').trim();
      if (title.length > 5) titles.push(title);
    }

    const links: string[] = [];
    while ((match = linkRegex.exec(html)) !== null) {
      links.push(`https://asic.gov.au${match[1]}`);
    }

    for (let i = 0; i < Math.min(titles.length, 10); i++) {
      items.push({
        title: titles[i] || 'ASIC Update',
        date: new Date().toISOString().split('T')[0],
        url: links[i] || 'https://asic.gov.au/about-asic/news-centre/find-a-media-release/',
        body_text: titles[i] || '',
        source: 'ASIC',
      });
    }

    return items;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
