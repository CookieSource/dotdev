// scripts/clean-mdx.js
import fs from 'fs/promises';
import { remark } from 'remark';
import remarkMdx from 'remark-mdx';
import strip from 'strip-markdown';

const filePath = process.argv[2];
if (!filePath) {
  console.error('No file path provided.');
  process.exit(1);
}

const mdx = await fs.readFile(filePath, 'utf8');
const file = await remark()
  .use(remarkMdx)
  .use(strip)
  .process(mdx);

console.log(String(file));
