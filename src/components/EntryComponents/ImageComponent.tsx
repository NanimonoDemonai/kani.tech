import Image from "next/image";
import { VFC } from "react";
import { ImageObject } from "../../types/PageMeta";
import { getOptimizedImageURL } from "../../utils/getURL";
import { unknownPropsToSrc } from "../../utils/validators/unknownPropsToSrc";

export const ImageComponent: (images: ImageObject[]) => VFC<unknown> = (
  images
) => {
  const ImageComponentComponent: VFC<unknown> = (unknownProps) => {
    const props = unknownPropsToSrc(unknownProps);
    if (!props) return null;
    const { src } = props;
    const meta = images.find((e) => e.url === src);
    // eslint-disable-next-line @next/next/no-img-element
    if (!meta) return <img src={src} alt={src} />;
    return (
      <Image
        loader={({ src, width }) => {
          return getOptimizedImageURL(src, width);
        }}
        src={meta.key}
        alt={meta.url}
        width={meta.width}
        height={meta.height}
      />
    );
  };
  return ImageComponentComponent;
};
