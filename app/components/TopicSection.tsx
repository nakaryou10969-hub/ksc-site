import { Topic } from "@/libs/types";

type TopicItem = {
  id: string;
  title: string;
  href: string;
  date: string;
  isPdf: boolean;
};

type Props = {
  topics: Topic[];
};

function formatTopicDate(date?: string) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function normalizeHref(link?: string) {
  const value = link?.trim();
  if (!value) return "";

  if (/^(https?:|mailto:|tel:|\/)/i.test(value)) {
    return value;
  }

  return `https://${value}`;
}

function getTopicTitle(topic: Topic) {
  return topic.title ?? topic.タイトル ?? "";
}

function getTopicLink(topic: Topic) {
  return topic.link ?? topic.リンク ?? "";
}

function toTopicItem(topic: Topic): TopicItem | null {
  const title = getTopicTitle(topic).trim();
  const href = normalizeHref(getTopicLink(topic));

  if (!title || !href) return null;

  return {
    id: topic.id,
    title,
    href,
    date: formatTopicDate(topic.publishedAt ?? topic.date ?? topic.revisedAt ?? topic.createdAt),
    isPdf: /\.pdf($|[?#])/i.test(href),
  };
}

export default function TopicSection({ topics }: Props) {
  const items = topics.map(toTopicItem).filter((item): item is TopicItem => Boolean(item));

  if (items.length === 0) {
    return null;
  }

  return (
    <section id="topics" style={{ backgroundColor: "#EBE8E2" }}>
      <div className="pt-0 pb-12 md:pt-16 md:pb-16 max-w-[1440px] mx-auto px-6 lg:px-[117px]">
        <h2 className="h2-banner">トピック</h2>

        <div className="topic-panel mt-8">
          <div className="topic-list" aria-label="トピック一覧">
            {items.map((item) => (
              <article key={item.id} className="topic-item">
                {item.date && <time className="topic-item__date">{item.date}</time>}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="topic-item__link"
                >
                  <span className="topic-item__arrow" aria-hidden="true">
                    &gt;
                  </span>
                  <span className="topic-item__title">{item.title}</span>
                  {item.isPdf && <span className="topic-item__pdf">PDF</span>}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
