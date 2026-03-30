import { ScrapedItem } from '../types';

export async function scrapeTGA(): Promise<ScrapedItem[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch('https://www.tga.gov.au/news/media-releases', {
      signal: controller.signal,
      headers: { 'User-Agent': 'CheckeditIntel/1.0' },
    });
    const html = await res.text();

    const items: ScrapedItem[] = [];
    const titleRegex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
    const linkRegex = /href="(\/news\/media-releases\/[^"]+)"/gi;

    const titles: string[] = [];
    let match;
    while ((match = titleRegex.exec(html)) !== null) {
      const title = match[1].replace(/<[^>]+>/g, '').trim();
      if (title.length > 5) titles.push(title);
    }

    const links: string[] = [];
    while ((match = linkRegex.exec(html)) !== null) {
      links.push(`https://www.tga.gov.au${match[1]}`);
    }

    for (let i = 0; i < Math.min(titles.length, 10); i++) {
      items.push({
        title: titles[i] || 'TGA Update',
        date: new Date().toISOString().split('T')[0],
        url: links[i] || 'https://www.tga.gov.au/news/media-releases',
        body_text: titles[i] || '',
        source: 'TGA',
      });
    }

    return items;
  } catch {
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
