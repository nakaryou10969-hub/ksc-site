import { client } from "@/libs/client";
import { Event } from "@/libs/types";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

// 静的エクスポート用：全記事IDを事前生成
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

export default async function EventDetail({ params }: Props) {
  const { id } = await params;

  let event: Event;
  try {
    event = await client.getListDetail<Event>({
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
    <main className="pt-[72px]">
      <article className="max-w-3xl mx-auto px-8 py-16">
        {/* パンくず */}
        <nav className="text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-gray-600 transition-colors">ホーム</Link>
          <span className="mx-2">/</span>
          <Link href="/#openday" className="hover:text-gray-600 transition-colors">過去のイベント実績</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-600 line-clamp-1">{event!.title}</span>
        </nav>

        {/* 日付 */}
        {formattedDate && (
          <p className="text-sm text-gray-400 mb-4">{formattedDate}</p>
        )}

        {/* タイトル */}
        <h1 className="text-2xl md:text-3xl font-bold leading-tight mb-8">{event!.title}</h1>

        {/* アイキャッチ */}
        {event!.eyecatch?.url && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
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
            className="inline-block px-8 py-3 border border-gray-800 text-gray-800 rounded-full text-sm hover:bg-gray-800 hover:text-white transition-colors"
          >
            ← 過去のイベント実績に戻る
          </Link>
        </div>
      </article>
    </main>
  );
}
