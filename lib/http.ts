const SERVICE_TIMEOUT_MS = 5000;

type RequestOptions = Omit<RequestInit, 'signal'> & {
  revalidate?: number | false;
  timeoutMs?: number;
  id?: string;
};

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(url: string, options: RequestOptions): Promise<Response | null> {
  const { revalidate = 3600, timeoutMs = SERVICE_TIMEOUT_MS, id = 'http', ...init } = options;

  try {
    const response = await fetch(url, {
      ...init,
      next: { revalidate },
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
      console.error(`[${id}] ${response.status} ${response.statusText} — ${url}`);
      return null;
    }

    return response;
  } catch (error) {
    console.error(`[${id}] request failed — ${url}`, error);
    return null;
  }
}

export async function fetchJson<T>(url: string, options: RequestOptions = {}): Promise<T | null> {
  const response = await request(url, {
    ...options,
    headers: {
      ...options.headers,
      'Content-Type': 'application/json',
    },
  });

  if (!response) {
    return null;
  }

  try {
    return (await response.json()) as T;
  } catch (error) {
    console.error(`[${options.id ?? 'http'}] invalid JSON — ${url}`, error);
    return null;
  }
}

export async function fetchText(url: string, options: RequestOptions = {}): Promise<string | null> {
  const response = await request(url, options);

  return response ? response.text() : null;
}
