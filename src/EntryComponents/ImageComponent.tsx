import Image from "next/image";
import { VFC } from "react";
import { z } from "zod";
import { ImageObject } from "../types/PageMeta";
import { getOptimizedImageURL } from "../utils/getURL";

const scheme = z.object({
  src: z.string(),
});

export const ImageComponent: (images: ImageObject[]) => VFC<unknown> = (
  images
) => {
  const ImageComponentComponent: VFC<unknown> = (props) => {
    const data = scheme.safeParse(props);
    if (!data.success) return null;
    const { src } = data.data;
    const meta = images.find((e) => e.key === src);
    // eslint-disable-next-line @next/next/no-img-element
    if (!meta) return <img src={src} alt={src} />;
    return (
      <Image
        loader={({ src, width }) => {
          return getOptimizedImageURL(src, width);
        }}
        src={meta.key}
        alt={meta.key}
        width={meta.width}
        height={meta.height}
      />
    );
  };
  return ImageComponentComponent;
};
