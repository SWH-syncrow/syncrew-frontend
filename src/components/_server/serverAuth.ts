"use server";

import { cookies } from "next/dist/client/components/headers";

export async function getRefreshTokenFromCookie() {
  return cookies().get("refreshToken")?.value;
}

export async function deleteRefreshTokenFromCookie() {
  return cookies().delete("refreshToken");
}
