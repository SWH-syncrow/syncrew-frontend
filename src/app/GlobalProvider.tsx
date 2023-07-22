"use client";

import useAuth from "@components/hooks/useAuth";
import React from "react";

export default function GlobalProvider(props: { children: React.ReactNode }) {
  useAuth();
  return (
    <>
      {/* <DevTools /> */}
      {props.children}
    </>
  );
}
