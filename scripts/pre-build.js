import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

const imageFiles = await glob('content/**/*.{png,jpg,jpeg,svg}');

imageFiles.forEach((file) => {
  const originalFile = path.join(process.cwd(), file);
  const newFile = path.join('public', 'assets', file);
  const fullNewFile = path.join(process.cwd(), newFile);
  const directory = newFile.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, '');
  const fullDirectory = path.join(process.cwd(), directory);

  if (!fs.existsSync(fullDirectory)) {
    fs.mkdirSync(fullDirectory, { recursive: true });
  }

  fs.copyFileSync(originalFile, fullNewFile);
  console.log(`File '${file}' has been copied to the public directory`);
});
