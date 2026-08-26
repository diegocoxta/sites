import { XMLParser } from 'fast-xml-parser';

type GetRecentlFeedListingParamsType = {
  feed: string;
  limit?: number;
};

type GetRecentlFeedListingResponseType = {
  items: Array<{
    title: string;
    description: string;
    link: string;
    pubDate: string;
  }>;
};

export async function getFeedListing(
  params: GetRecentlFeedListingParamsType
): Promise<GetRecentlFeedListingResponseType> {
  try {
    const { feed, limit = 3 } = params;

    const response = await fetch(feed, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar o RSS: ${response.statusText}`);
    }

    const xmlData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
    });
    const parsedData = parser.parse(xmlData);

    const items = parsedData.rss?.channel?.item as GetRecentlFeedListingResponseType['items'];

    return { items: items.slice(0, limit) };
  } catch (error) {
    console.error('Erro ao processar o feed do Letterboxd:', error);
    return { items: [] } as GetRecentlFeedListingResponseType;
  }
}
