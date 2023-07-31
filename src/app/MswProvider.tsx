"use client";
import LoadingScreen from "@components/LoadingScreen";
import React, { PropsWithChildren, useEffect, useState } from "react";

const MswProvider = ({ children }: PropsWithChildren) => {
  const [shouldRender, setShouldRender] = useState(
    !(process.env.NODE_ENV === "development")
  );

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("../mocks").then(async ({ initMocks }) => {
        await initMocks();
        setShouldRender(true);
      });
    }
  }, []);

  return <>{shouldRender ? children : <LoadingScreen />}</>;
};

export default MswProvider;
