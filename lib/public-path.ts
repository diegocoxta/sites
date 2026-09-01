import path from 'node:path';

export function publicPath(domain: string, ...segments: string[]): string {
  return path.join(process.cwd(), 'public', domain, ...segments);
}
