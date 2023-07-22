"use server";

import { cookies } from "next/dist/client/components/headers";

export async function setRefreshTokenToCookie(refresh_token: string) {
  cookies().set("refresh_token", refresh_token);
}
