import { client } from "@/libs/client";
import { Event } from "@/libs/types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

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

  const formattedDate = event!.date
    ? new Date(event!.date).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <main className="pt-[72px] bg-white">

      {/* ページヘッダー */}
      <section className="bg-gray-50 border-b border-gray-100 py-12 px-8">
        <div className="max-w-3xl mx-auto">
          {/* パンくず */}
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-gray-600 transition-colors">ホーム</Link>
            <span>/</span>
            <Link href="/#openday" className="hover:text-gray-600 transition-colors">過去のイベント実績</Link>
            <span>/</span>
            <span className="text-gray-500 truncate max-w-[200px]">{event!.title}</span>
          </nav>

          {/* 日付 */}
          {formattedDate && (
            <p className="text-sm text-gray-400 mb-3">{formattedDate}</p>
          )}

          {/* タイトル */}
          <h1>
            {event!.title}
          </h1>
        </div>
      </section>

      {/* 記事本文 */}
      <section className="py-16 px-8">
        <div className="max-w-3xl mx-auto">

          {/* アイキャッチ */}
          {event!.eyecatch?.url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-12 shadow-sm">
              <Image
                src={event!.eyecatch.url}
                alt={event!.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* 本文 */}
          {event!.content ? (
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: event!.content }}
            />
          ) : (
            <p className="text-gray-400 text-sm">本文はまだ登録されていません。</p>
          )}

          {/* 戻るボタン */}
          <div className="mt-16 pt-8 border-t border-gray-100">
            <Link
              href="/#openday"
              className="inline-flex items-center gap-2 px-8 py-3 border border-gray-800 text-gray-800 rounded-full text-sm hover:bg-gray-800 hover:text-white transition-colors"
            >
              <span>←</span>
              <span>過去のイベント実績に戻る</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
