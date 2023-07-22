import React from "react";

import RootStyleRegistry from "./RootStyleRegistry";
import ReactQueryProvider from "./ReactQueryProvider";
import GlobalProvider from "./GlobalProvider";
import "src/styles/globals.css";

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
          <RootStyleRegistry>
            <GlobalProvider>{children}</GlobalProvider>
          </RootStyleRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
