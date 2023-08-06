"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAtomValue } from "jotai";
import React from "react";
import { isSettledAuthAtom } from "./GlobalProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: process.env.NODE_ENV === "development" ? "always" : "online",
    },
  },
});
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isSettledAuth = useAtomValue(isSettledAuthAtom);
  queryClient.setDefaultOptions({
    queries: {
      ...queryClient.getDefaultOptions().queries,
      enabled: isSettledAuth,
    },
  });
  queryClient.setQueryDefaults(["getGroup"], { enabled: true });
  queryClient.setQueryDefaults(["getNotifications"], { enabled: true });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
