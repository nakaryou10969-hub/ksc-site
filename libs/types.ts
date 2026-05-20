export type Category = {
  id: string;
  name: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  category?: Category[];
  body: string;
  summary?: string;
};

export type EventListResponse = {
  contents: Event[];
  totalCount: number;
  offset: number;
  limit: number;
};
