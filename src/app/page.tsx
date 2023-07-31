"use client";

import { useEffect, useState } from "react";
import PageContent from "./PageContent";
import Header from "./components/Header/Header";

const Home = () => {
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

  return shouldRender ? (
    <div className="w-full flex flex-col items-center">
      <Header />
      <PageContent />
    </div>
  ) : (
    <div>loading mocks</div>
  );
};

export default Home;
