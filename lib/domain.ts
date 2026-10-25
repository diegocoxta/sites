import path from 'node:path';

/** Env names can't hold dots, so the domain prefix is upper-cased with non-alphanumerics removed (`diegocosta.me` → `DIEGOCOSTAME_`). */
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
