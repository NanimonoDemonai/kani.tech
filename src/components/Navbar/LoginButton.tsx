import { LockIcon, UnlockIcon } from "@chakra-ui/icons";
import { Avatar, HStack, IconButton } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/client";
import { VFC } from "react";

export const LoginButton: VFC = () => {
  const [session] = useSession();

  if (session)
    return (
      <HStack>
        <Avatar
          size="sm"
          name={session.user?.name || undefined}
          src={session.user?.image || undefined}
        />
        <IconButton
          colorScheme="red"
          variant="outline"
          aria-label="ログアウト"
          icon={<LockIcon />}
          onClick={() => {
            signOut();
          }}
          size="sm"
        />
      </HStack>
    );
  return (
    <IconButton
      variant="outline"
      colorScheme="red"
      aria-label="ログアウト"
      icon={<UnlockIcon />}
      onClick={() => {
        signIn();
      }}
      size="sm"
    />
  );
};
