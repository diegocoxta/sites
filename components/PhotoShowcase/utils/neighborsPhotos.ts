/**
 * A fixed-size window of `items` centered on `index`, sliding towards
 * whichever side has room when `index` is near an edge so the window stays
 * as close to `radius * 2 + 1` items as the array allows.
 */
export function neighborsPhotos<T>(items: T[], index: number, radius: number): T[] {
  const size = Math.min(items.length, radius * 2 + 1);
  let start = index - radius;

  if (start < 0) {
    start = 0;
  } else if (start + size > items.length) {
    start = items.length - size;
  }

  return items.slice(start, start + size);
}
