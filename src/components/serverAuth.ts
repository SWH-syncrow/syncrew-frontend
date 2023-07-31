"use server";

import { cookies } from "next/dist/client/components/headers";

export async function setRefreshTokenToCookie(refresh_token: string) {
  cookies().set("refreshToken", refresh_token);
}
export async function getRefreshTokenFromCookie() {
  return cookies().get("refreshToken");
}
