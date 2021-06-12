export interface PageMeta {
  title: string;
  pageName: string;
  modified: string;
  source: string;
  tags: string[];
  revision?: number;
  revisions?: { revision: number; createdAt: string }[];
}
