"use client";

import Header from "./components/Header/Header";
import PageContent from "./components/PageContent";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <Header />
      <PageContent />
    </div>
  );
};

export default Home;
