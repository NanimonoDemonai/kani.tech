export interface PageMeta {
  title: string;
  pageName: string;
  modified: string;
  source: string;
  tags: string[];
  revision?: number;
  revisions?: Revision[];
}

export interface Revision {
  revision: number;
  createdAt: string;
}
