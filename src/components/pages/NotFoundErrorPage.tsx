import { NextPage } from "next";
import Error from "next/error";

export const NotFoundErrorPage: NextPage = () => <Error statusCode={404} />;
