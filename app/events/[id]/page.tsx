import { client } from "@/libs/client";
import { Event } from "@/libs/types";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const COMPACT_IMAGE_EVENT_ID = "hwuj-4b16s";

const compactImageTargets = [
  { term: "パネルディスカッション", exact: true },
  { term: "ちよだプラットフォームスクウェア運営" },
  { term: "タクトピア株式会社" },
  { term: "株式会社Sworkers" },
  { term: "代表理事 平沢 純一" },
  { term: "スゴシリョ" },
  { term: "SenseDrive株式会社" },
];

function getTextContent(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function appendClass(tag: string, className: string) {
  if (tag.includes(className)) return tag;

  if (/\sclass=/.test(tag)) {
    return tag.replace(/\sclass=(["'])(.*?)\1/, ` class=$1$2 ${className}$1`);
  }

  return tag.replace(/>$/, ` class="${className}">`);
}

function addCompactImageStyle(imgTag: string) {
  const widthMatch = imgTag.match(/\swidth=(["']?)(\d+)\1/);
  const halfWidth = widthMatch ? Math.round(Number(widthMatch[2]) / 2) : undefined;
  const imageClass = "ksc-half-right-image";
  const nextTag = appendClass(imgTag, imageClass);

  if (!halfWidth) return nextTag;

  const customWidth = `--ksc-half-image-width: ${halfWidth}px`;
  if (/\sstyle=/.test(nextTag)) {
    return nextTag.replace(/\sstyle=(["'])(.*?)\1/, ` style=$1$2; ${customWidth}$1`);
  }

  return nextTag.replace(/>$/, ` style="${customWidth}">`);
}

function compactImagesBeforeTargets(html: string) {
  const blockPattern =
    /<figure[\s\S]*?<\/figure>|<h[1-6][\s\S]*?<\/h[1-6]>|<p[\s\S]*?<\/p>|<ul[\s\S]*?<\/ul>|<ol[\s\S]*?<\/ol>|<blockquote[\s\S]*?<\/blockquote>/g;
  const blocks = html.match(blockPattern);
  if (!blocks) return html;

  const transformed = [...blocks];

  for (let i = 1; i < transformed.length; i++) {
    const text = getTextContent(blocks[i]);
    const shouldCompact = compactImageTargets.some(({ term, exact }) =>
      exact ? text === term : text.includes(term)
    );

    if (!shouldCompact || !/^<figure[\s\S]*<\/figure>$/.test(blocks[i - 1])) {
      continue;
    }

    transformed[i - 1] = transformed[i - 1]
      .replace(/^<figure\b([^>]*)>/, (tag) => appendClass(tag, "ksc-half-right-figure"))
      .replace(/<img\b[^>]*>/, (tag) => addCompactImageStyle(tag));
  }

  let index = 0;
  return html.replace(blockPattern, () => transformed[index++]);
}

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
  const articleContent =
    id === COMPACT_IMAGE_EVENT_ID && event!.content
      ? compactImagesBeforeTargets(event!.content)
      : event!.content;

  return (
    <main className="pt-[72px] lg:pt-[147px]">

      {/* ページヘッダー */}
      <section className="border-b border-gray-300 py-12 px-8">
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
      <section className="py-8 px-8">
        <div className="max-w-3xl mx-auto">

          {/* アイキャッチ */}
          {event!.eyecatch?.url && (
            <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-sm">
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
