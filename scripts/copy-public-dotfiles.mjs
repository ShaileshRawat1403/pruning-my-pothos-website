import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const PUBLIC_HTACCESS = path.join(ROOT, 'public', '.htaccess');
const DIST_HTACCESS = path.join(ROOT, 'dist', '.htaccess');

async function main() {
  try {
    await fs.access(PUBLIC_HTACCESS);
  } catch {
    return;
  }

  await fs.copyFile(PUBLIC_HTACCESS, DIST_HTACCESS);
  console.log('Copied public/.htaccess to dist/.htaccess');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
