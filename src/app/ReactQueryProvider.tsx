"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { authInstance } from "src/lib/axios/instance";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: process.env.NODE_ENV === "development" ? "always" : "online", // online is default
    },
  },
});
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  queryClient.setDefaultOptions({
    queries: {
      ...queryClient.getDefaultOptions().queries,
      enabled: !!authInstance.defaults.headers.common["Authorization"],
    },
  });
  queryClient.setQueryDefaults(["getGroup"], { enabled: true });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
