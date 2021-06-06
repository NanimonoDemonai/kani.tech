import { GetStaticPropsResult } from "next";
import { revalidate } from "./revalidate";

export const NotFoundResponse: GetStaticPropsResult<any> = { notFound: true };
export const NotFoundResponseWithRevalidate: GetStaticPropsResult<any> = {
  notFound: true,
  revalidate,
};
