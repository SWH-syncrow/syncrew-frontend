"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

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
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* {process.env.NODE_ENV === "development" && <ReactQueryDevtools />} */}
    </QueryClientProvider>
  );
}
