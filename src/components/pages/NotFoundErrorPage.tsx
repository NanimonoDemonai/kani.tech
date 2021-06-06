import Error from "next/error";
import { NextPage } from "next";

export const NotFoundErrorPage: NextPage = () => <Error statusCode={404} />;
