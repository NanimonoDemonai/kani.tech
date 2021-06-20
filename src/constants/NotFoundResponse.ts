import { revalidate } from "./revalidate";

export const NotFoundResponse = { notFound: true };
export const NotFoundResponseWithRevalidate = {
  notFound: true,
  revalidate,
};
