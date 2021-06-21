import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { z } from "zod";
import { getOptimizedImageURL } from "../utils/getURL";

const scheme = z.object({
  src: z.string(),
});

export const ImageComponent: FC<unknown> = (props) => {
  const data = scheme.safeParse(props);
  if (!data.success) return null;

  const { src } = data.data;
  return (
    <Box w={300} h={300} maxW={"100%"} position={"relative"}>
      <Image
        loader={({ src, width }) => {
          return getOptimizedImageURL(src, width);
        }}
        src={src}
        alt={src}
        layout="fill"
        objectFit={"contain"}
        objectPosition={"top center"}
      />
    </Box>
  );
};
