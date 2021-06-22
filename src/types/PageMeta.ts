export interface PageMeta {
  title: string;
  pageName: string;
  modified: string;
  source: string;
  tags: string[];
  revision: number;
  revisions: Revision[];
  imageObjects: ImageObject[];
  images: ImageObject[];
}

export interface Revision {
  revision: number;
  createdAt: string;
}

export interface ImageObject {
  width: number;
  height: number;
  size: number;
  key: string;
  modified: string;
  verified: string;
}
