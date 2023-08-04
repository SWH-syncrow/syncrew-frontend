import React from "react";

import GlobalModal from "@components/modal/GlobalModal";
import localFont from "next/font/local";
import "src/styles/globals.css";
import GlobalProvider from "./GlobalProvider";
import ReactQueryProvider from "./ReactQueryProvider";
import RootStyleRegistry from "./RootStyleRegistry";
import GNB from "./_components/GNB";

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
        {process.env.NODE_ENV !== "development" && (
          <meta
            http-equiv="Content-Security-Policy"
            content="upgrade-insecure-requests"
          />
        )}
        <link rel="shortcut icon" href="/favicon.ico" />
        <script src="https://developers.kakao.com/sdk/js/kakao.js"></script>
        <title>syncrew</title>
      </head>
      <body>
        <ReactQueryProvider>
          <RootStyleRegistry>
            <GlobalProvider>
              <main className="flex w-full">
                <GlobalModal />
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
