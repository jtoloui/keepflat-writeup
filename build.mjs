import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import MarkdownIt from 'markdown-it';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

const source = readFileSync(join(root, 'article.md'), 'utf8');
const BASE = 'https://jtoloui.github.io/keepflat-writeup/';
const body = md.render(source).replaceAll('src="assets/', `src="${BASE}assets/`);

const template = readFileSync(join(root, 'src', 'template.html'), 'utf8');
const html = template.replace('{{content}}', body);

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

writeFileSync(join(dist, 'index.html'), html);
cpSync(join(root, 'src', 'styles.css'), join(dist, 'styles.css'));
cpSync(join(root, 'assets'), join(dist, 'assets'), { recursive: true });
writeFileSync(join(dist, '.nojekyll'), '');

console.log(`Built dist/index.html (${body.length} chars of rendered HTML).`);
