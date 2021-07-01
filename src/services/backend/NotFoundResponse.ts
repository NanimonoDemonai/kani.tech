import { GetStaticPropsResult } from "next";
import { revalidate } from "../../constants/NextSecretEnv";

export const NotFoundResponse: GetStaticPropsResult<any> = { notFound: true };
export const NotFoundResponseWithRevalidate: GetStaticPropsResult<any> = {
  notFound: true,
  revalidate,
};
