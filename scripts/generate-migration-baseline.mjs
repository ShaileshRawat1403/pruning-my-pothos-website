import fs from 'fs';
import path from 'path';

const DIST_DIR = './dist';
const ARTIFACT_DIR = '/Users/ananyalayek/.gemini/antigravity/brain/7490265b-040f-4849-9b53-99d38d234a8f';

// Recursively find all html files
function getFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

function parseHtmlMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const canonicalMatch = content.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/i) || content.match(/<link[^>]*href="([^"]+)"[^>]*rel="canonical"/i);
  const descMatch = content.match(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) || content.match(/<meta[^>]*content="([^"]*)"[^>]*name="description"/i);
  const robotsMatch = content.match(/<meta[^>]*name="robots"[^>]*content="([^"]*)"/i) || content.match(/<meta[^>]*content="([^"]*)"[^>]*name="robots"/i);
  
  // Extract all OG and Twitter tags
  const ogTags = {};
  const ogMatches = content.matchAll(/<meta[^>]*property="og:([^"]+)"[^>]*content="([^"]*)"/gi);
  for (const m of ogMatches) {
    ogTags[m[1]] = m[2];
  }
  
  const twitterTags = {};
  const twitterMatches = content.matchAll(/<meta[^>]*name="twitter:([^"]+)"[^>]*content="([^"]*)"/gi);
  for (const m of twitterMatches) {
    twitterTags[m[1]] = m[2];
  }

  // Extract JSON-LD scripts
  const jsonLd = [];
  const jsonLdMatches = content.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
  for (const m of jsonLdMatches) {
    try {
      jsonLd.push(JSON.parse(m[1].trim()));
    } catch (e) {
      jsonLd.push({ error: "Invalid JSON-LD", raw: m[1].trim().substring(0, 100) });
    }
  }

  return {
    title: titleMatch ? titleMatch[1].trim() : null,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    description: descMatch ? descMatch[1] : null,
    robots: robotsMatch ? robotsMatch[1] : null,
    og: ogTags,
    twitter: twitterTags,
    jsonLd
  };
}

// Main execution
console.log("Crawling dist output...");
const files = getFiles(DIST_DIR);
const routeManifest = [];
const seoSnapshot = {};

files.forEach(file => {
  let relativeRoute = '/' + path.relative(DIST_DIR, file).replace(/index\.html$/, '').replace(/\\/g, '/');
  if (relativeRoute.endsWith('/') && relativeRoute !== '/') {
    relativeRoute = relativeRoute.slice(0, -1);
  }
  routeManifest.push(relativeRoute);
  
  const meta = parseHtmlMetadata(file);
  seoSnapshot[relativeRoute] = meta;
});

// Save route manifest
fs.writeFileSync(path.join(ARTIFACT_DIR, 'route_manifest.json'), JSON.stringify(routeManifest.sort(), null, 2));
console.log(`Saved route_manifest.json with ${routeManifest.length} routes.`);

// Save SEO snapshot
fs.writeFileSync(path.join(ARTIFACT_DIR, 'seo_snapshot.json'), JSON.stringify(seoSnapshot, null, 2));
console.log(`Saved seo_snapshot.json.`);

// Create Content Inventory
const contentInventory = {};
const collections = ['systems', 'sentences', 'sticky-notes', 'self', 'shelf'];
collections.forEach(col => {
  const colDir = path.join('./src/content', col);
  if (fs.existsSync(colDir)) {
    const list = fs.readdirSync(colDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
    contentInventory[col] = {
      count: list.length,
      files: list
    };
  }
});

fs.writeFileSync(path.join(ARTIFACT_DIR, 'content_inventory.json'), JSON.stringify(contentInventory, null, 2));
console.log(`Saved content_inventory.json.`);
