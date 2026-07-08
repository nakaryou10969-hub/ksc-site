export type Category = {
  id: string;
  name: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  eyecatch?: {
    url: string;
    height: number;
    width: number;
  };
  tag?: string[];
  content?: string;
  summary?: string;
};

export type EventListResponse = {
  contents: Event[];
  totalCount: number;
  offset: number;
  limit: number;
};

export type Topic = {
  id: string;
  title?: string;
  タイトル?: string;
  link?: string;
  リンク?: string;
  date?: string;
  publishedAt?: string;
  revisedAt?: string;
  createdAt?: string;
};
