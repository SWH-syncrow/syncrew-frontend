import GNB from "@app/search/components/GNB";
import React from "react";
import "src/styles/globals.css";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex w-full h-screen overflow-scroll">
      <GNB />
      {children}
    </main>
  );
}
