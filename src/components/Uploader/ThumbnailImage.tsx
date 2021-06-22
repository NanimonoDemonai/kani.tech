import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { VFC } from "react";
import { getOptimizedImageURL } from "../../utils/getURL";

export const ThumbnailImage: VFC<{ src: string }> = ({ src }) => (
  <Box w={30} h={30} position={"relative"}>
    <Image
      loader={({ src, width }) => {
        return getOptimizedImageURL(src, width);
      }}
      src={src}
      alt={src}
      layout="fill"
      objectFit="contain"
    />
  </Box>
);
