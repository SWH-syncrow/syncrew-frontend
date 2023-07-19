"use client";

import { useServerInsertedHTML } from "next/navigation";
import React, { useState } from "react";
import { theme } from "src/styles/theme";
import {
  ServerStyleSheet,
  StyleSheetManager,
  ThemeProvider,
} from "styled-components";

export default function RootStyleRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet());

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    styledComponentsStyleSheet.instance?.clearTag();
    return styles;
  });

  if (typeof window !== "undefined") {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </StyleSheetManager>
  );
}
