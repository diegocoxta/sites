import path from 'node:path';

/**
 * Reads the env var `NAME`, preferring `<DOMAIN>_NAME` for the given domain.
 * The domain is upper-cased with anything outside `A-Z0-9` removed
 * (`diegocosta.me` + `SITE_ACCENT_COLOR` → `DIEGOCOSTAME_SITE_ACCENT_COLOR`),
 * since env names can't hold dots. A missing value throws unless `required: false`.
 */
export function domainEnv(name: string, domain: string, options: { required: false }): string | undefined;
export function domainEnv(name: string, domain: string): string;
export function domainEnv(name: string, domain: string, options?: { required?: boolean }): string | undefined {
  const prefix = domain.toUpperCase().replace(/[^A-Z0-9]/g, '');
  const value = process.env[`${prefix}_${name}`] || process.env[name] || undefined;

  if (!value && options?.required !== false) {
    throw new Error(`${name} (or ${prefix}_${name}) must be set`);
  }

  return value;
}

const HEX_COLOR = /^[0-9a-f]{3,8}$/i;

export function themeColor(name: string, domain: string): string {
  const value = domainEnv(name, domain).replace(/^#/, '');

  if (!HEX_COLOR.test(value)) {
    throw new Error(`${name} must be a hex color, got "${value}"`);
  }

  return `#${value}`;
}

export function publicPath(domain: string, ...segments: string[]): string {
  return path.join(process.cwd(), 'public', domain, ...segments);
}
