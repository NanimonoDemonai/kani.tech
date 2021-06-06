import { revalidate } from "./revalidate";
import { GetStaticPropsResult } from "next";

export const NotFoundResponse: GetStaticPropsResult<any> = { notFound: true };
export const NotFoundResponseWithRevalidate: GetStaticPropsResult<any> = {
  notFound: true,
  revalidate,
};
