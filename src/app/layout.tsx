import React from "react";

import RootStyleRegistry from "./RootStyleRegistry";
import ReactQueryProvider from "./ReactQueryProvider";
import GlobalProvider from "./GlobalProvider";
import "src/styles/globals.css";
import GNB from "./components/GNB";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/font/PretendardVariable.woff2",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={pretendard.className}>
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <title>syncrew</title>
      </head>
      <body>
        <ReactQueryProvider>
          <RootStyleRegistry>
            <GlobalProvider>
              <main className="flex w-full">
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
