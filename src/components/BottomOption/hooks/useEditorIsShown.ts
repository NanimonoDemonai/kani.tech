import { useSession } from "next-auth/client";

export const useEditorIsShown = (): boolean => {
  const [session, loading] = useSession();
  return !!(!loading && session && session.role === "USER");
};
