// Converts LanguageTool JSON output to reviewdog format
import fs from 'fs';

const [,, jsonFile, filename] = process.argv;

if (!jsonFile || !filename) {
  console.error('Usage: node script.js <jsonFile> <originalFilename>');
  process.exit(1);
}

const raw = fs.readFileSync(jsonFile, 'utf-8');
const data = JSON.parse(raw);

for (const match of data.matches) {
  const line = match.context.offset !== undefined ? match.context.line || 0 : 0;
  const message = match.message.replace(/\n/g, ' ');
  console.log(`${filename}: Line ${line + 1}: ${message}`);
}
