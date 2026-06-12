import { client } from "@/libs/client";
import { Event } from "@/libs/types";
import type { MetadataRoute } from "next";

const siteUrl = "https://www.kansta.jp";

export const dynamic = "force-static";

type SitemapEvent = Pick<Event, "id" | "date"> & {
  revisedAt?: string;
  updatedAt?: string;
  publishedAt?: string;
};

async function getEvents(): Promise<SitemapEvent[]> {
  try {
    const data = await client.getList<SitemapEvent>({
      endpoint: "blog",
      queries: {
        limit: 100,
        fields: "id,date,revisedAt,updatedAt,publishedAt",
      },
    });

    return data.contents;
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getEvents();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...events.map((event) => ({
      url: `${siteUrl}/events/${event.id}/`,
      lastModified: new Date(event.revisedAt ?? event.updatedAt ?? event.publishedAt ?? event.date),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
