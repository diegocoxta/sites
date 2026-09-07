const SERVICE_TIMEOUT_MS = 5000;

type RequestOptions = Omit<RequestInit, 'signal'> & {
  revalidate?: number | false;
  timeoutMs?: number;
  id?: string;
  /**
   * Status codes that should throw instead of resolving to `null`. Use for calls
   * whose failure must abort the build (e.g. an exhausted API token) rather than
   * silently render an empty page.
   */
  failFastStatuses?: number[];
};

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly url: string,
    public readonly id: string
  ) {
    super(`[${id}] ${status} — ${url}`);
    this.name = 'HttpError';
  }
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function request(url: string, options: RequestOptions): Promise<Response | null> {
  const { revalidate = 3600, timeoutMs = SERVICE_TIMEOUT_MS, id = 'http', failFastStatuses, ...init } = options;

  try {
    const response = await fetch(url, {
      ...init,
      next: { revalidate },
      signal: AbortSignal.timeout(timeoutMs),
    });

    if (!response.ok) {
      console.error('[%s] %s %s — %s', id, response.status, response.statusText, url);

      if (failFastStatuses?.includes(response.status)) {
        throw new HttpError(response.status, url, id);
      }

      return null;
    }

    return response;
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }

    console.error('[%s] request failed — %s', id, url, error);
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
    console.error('[%s] invalid JSON — %s', options.id ?? 'http', url, error);
    return null;
  }
}

export async function fetchText(url: string, options: RequestOptions = {}): Promise<string | null> {
  const response = await request(url, options);

  return response ? response.text() : null;
}
