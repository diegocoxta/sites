import { XMLParser } from 'fast-xml-parser';

import { fetchText } from '~/lib/http';

type GetRecentlFeedListingParamsType = {
  feed: string;
  limit?: number;
};

type GetRecentlFeedListingResponseType = null | Array<{
  title: string;
  description: string;
  link: string;
  pubDate: string;
}>;

export async function getFeedListing(
  params: GetRecentlFeedListingParamsType
): Promise<GetRecentlFeedListingResponseType> {
  const { feed, limit = 3 } = params;

  const response = await fetchText(feed);

  if (!response) {
    return null;
  }

  try {
    const parsed = new XMLParser({ ignoreAttributes: false }).parse(response);
    const items = parsed.rss?.channel?.item;

    const itemsArray = Array.isArray(items) ? items : items ? [items] : [];

    return itemsArray.slice(0, limit);
  } catch (error) {
    console.error(`[feed] failed to parse — ${feed}`, error);
    return null;
  }
}
