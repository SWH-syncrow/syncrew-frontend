import React from "react";
import "src/styles/globals.css";
import RootStyleRegistry from "./RootStyleRegistry";
import ReactQueryProvider from "./ReactQueryProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <title>syncrow</title>
      </head>
      <body>
        <ReactQueryProvider>
          <RootStyleRegistry>{children}</RootStyleRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
