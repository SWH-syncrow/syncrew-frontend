import React from "react";

import RootStyleRegistry from "./RootStyleRegistry";
import ReactQueryProvider from "./ReactQueryProvider";
import GlobalProvider from "./GlobalProvider";
import "src/styles/globals.css";
import GNB from "./components/GNB";

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
        <title>syncrew</title>
      </head>
      <body>
        <ReactQueryProvider>
          <RootStyleRegistry>
            <GlobalProvider>
              <main className="flex w-full h-screen overflow-scroll">
                <GNB />
                {children}
              </main>
            </GlobalProvider>
          </RootStyleRegistry>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
