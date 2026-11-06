import { headers } from "next/headers";
import { auth } from "./auth";

export const getTokenFromServer = async () => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  return token;
};
