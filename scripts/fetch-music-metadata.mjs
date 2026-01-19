import fs from 'node:fs/promises';
import path from 'node:path';

const MUSIC_DIR = path.resolve('src/content/shelf/music');
const COUNTRY = process.env.ITUNES_COUNTRY || 'US';
const FORCE = process.argv.includes('--force');

const toTitleCase = (value) => value.replace(/\s+/g, ' ').trim();

const parseFrontmatter = (raw) => {
  const parts = raw.split('---');
  if (parts.length < 3) return null;
  const frontmatter = parts[1];
  const body = parts.slice(2).join('---');
  return { frontmatter, body };
};

const getField = (frontmatter, key) => {
  const match = frontmatter.match(new RegExp(`^${key}:\s*(.+)$`, 'm'));
  if (!match) return null;
  return match[1].replace(/^['"]|['"]$/g, '').trim();
};

const setField = (lines, key, value) => {
  const valueString = typeof value === 'number' ? String(value) : `"${value}"`;
  const index = lines.findIndex((line) => line.startsWith(`${key}:`));
  if (index !== -1) {
    lines[index] = `${key}: ${valueString}`;
    return;
  }

  let insertAt = lines.length;
  const tagsIndex = lines.findIndex((line) => line.startsWith('tags:'));
  if (tagsIndex !== -1) {
    insertAt = tagsIndex + 1;
    while (insertAt < lines.length && /^\s+- /.test(lines[insertAt])) {
      insertAt += 1;
    }
  }
  lines.splice(insertAt, 0, `${key}: ${valueString}`);
};

const fetchItunes = async (term) => {
  const url = new URL('https://itunes.apple.com/search');
  url.searchParams.set('term', term);
  url.searchParams.set('entity', 'song');
  url.searchParams.set('limit', '1');
  url.searchParams.set('country', COUNTRY);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`iTunes request failed: ${response.status}`);
  }
  return response.json();
};

const normalizeCover = (url) => {
  if (!url) return null;
  return url.replace(/\/\d+x\d+bb\./, '/600x600bb.');
};

const files = (await fs.readdir(MUSIC_DIR))
  .filter((file) => file.endsWith('.md'))
  .map((file) => path.join(MUSIC_DIR, file));

for (const file of files) {
  const raw = await fs.readFile(file, 'utf8');
  const parsed = parseFrontmatter(raw);
  if (!parsed) {
    console.warn(`Skipping ${file}: missing frontmatter`);
    continue;
  }

  const { frontmatter, body } = parsed;
  const title = getField(frontmatter, 'title');
  const artist = getField(frontmatter, 'artist');
  const existingCover = getField(frontmatter, 'coverUrl');
  const existingApple = getField(frontmatter, 'appleMusicUrl');

  if (!title) {
    console.warn(`Skipping ${file}: missing title`);
    continue;
  }
  if (!FORCE && existingCover && existingApple) {
    console.log(`Skipping ${path.basename(file)}: metadata already present`);
    continue;
  }

  const term = toTitleCase([title, artist].filter(Boolean).join(' '));
  try {
    const data = await fetchItunes(term);
    if (!data.results || data.results.length === 0) {
      console.warn(`No results for ${term}`);
      continue;
    }
    const result = data.results[0];
    const coverUrl = normalizeCover(result.artworkUrl100);
    const album = result.collectionName;
    const artistName = result.artistName;
    const appleMusicUrl = result.trackViewUrl;
    const year = result.releaseDate ? new Date(result.releaseDate).getFullYear() : null;

    const lines = frontmatter.trim().split('\n');
    if (artistName && (FORCE || !getField(frontmatter, 'artist'))) {
      setField(lines, 'artist', artistName);
    }
    if (album && (FORCE || !getField(frontmatter, 'album'))) {
      setField(lines, 'album', album);
    }
    if (year && (FORCE || !getField(frontmatter, 'year'))) {
      setField(lines, 'year', year);
    }
    if (coverUrl && (FORCE || !existingCover)) {
      setField(lines, 'coverUrl', coverUrl);
    }
    if (appleMusicUrl && (FORCE || !existingApple)) {
      setField(lines, 'appleMusicUrl', appleMusicUrl);
    }

    const updated = `---\n${lines.join('\n')}\n---${body}`;
    await fs.writeFile(file, updated, 'utf8');
    console.log(`Updated ${path.basename(file)}`);
  } catch (error) {
    console.warn(`Failed ${path.basename(file)}: ${error.message}`);
  }
}
