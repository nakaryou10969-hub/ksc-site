import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Event } from "@/libs/types";
import { formatEventDate } from "@/libs/formatEventDate";

export type EventArticleData = Omit<Event, "date"> & { date?: string };

export default function EventArticle({ event, articleContent, previewControls }: { event: EventArticleData; articleContent?: string; previewControls?: ReactNode }) {
  const formattedDate = formatEventDate(event.date);
  return (
    <main className="pt-[72px] lg:pt-[147px]">
      {previewControls}

      {/* ページヘッダー */}
      <section className="border-b border-gray-300 py-12 px-8">
        <div className="max-w-3xl mx-auto">
          {/* パンくず */}
          <nav className="text-xs text-gray-400 mb-6 flex items-center gap-1.5">
            <Link href="/" className="hover:text-gray-600 transition-colors">ホーム</Link>
            <span>/</span>
            <Link href="/#openday" className="hover:text-gray-600 transition-colors">過去のイベント実績</Link>
            <span>/</span>
            <span className="text-gray-500 truncate max-w-[200px]">{event.title}</span>
          </nav>

          {/* 日付 */}
          {formattedDate && (
            <p className="text-sm text-gray-400 mb-3">{formattedDate}</p>
          )}

          {/* タイトル */}
          <h1>
            {event.title}
          </h1>
        </div>
      </section>

      {/* 記事本文 */}
      <section className="py-8 px-8">
        <div className="max-w-3xl mx-auto">

          {/* アイキャッチ */}
          {event.eyecatch?.url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-sm">
              <Image
                src={event.eyecatch.url}
                alt={event.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          )}

          {/* 本文 */}
          {articleContent ? (
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: articleContent }}
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
