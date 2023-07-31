"use client";

import PageContent from "./PageContent";
import Header from "./components/Header/Header";

if (process.env.NODE_ENV === "development") {
  import("../mocks");
}

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <PageContent />
    </div>
  );
};

export default Home;
