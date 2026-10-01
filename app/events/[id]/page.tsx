import { client } from "@/libs/client";
import { Event } from "@/libs/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import EventArticle from "@/app/components/EventArticle";
import { renderEventContent } from "@/libs/renderEventContent";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  try {
    const data = await client.getList<Event>({
      endpoint: "blog",
      queries: { limit: 100, fields: "id" },
    });
    return data.contents.map((event) => ({ id: event.id }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const event = await client.get<Event>({ endpoint: "blog", contentId: id });
    return {
      title: event.title,
      openGraph: {
        title: event.title,
        images: event.eyecatch?.url ? [event.eyecatch.url] : [],
      },
    };
  } catch {
    return { title: "記事が見つかりません" };
  }
}

export default async function EventDetail({ params }: Props) {
  const { id } = await params;

  let event: Event;
  try {
    event = await client.get<Event>({
      endpoint: "blog",
      contentId: id,
    });
  } catch {
    notFound();
  }

  return <EventArticle event={event} articleContent={renderEventContent(event.content, id)} />;
}
