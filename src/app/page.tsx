"use client";

import PageContent from "./PageContent";
import Header from "./components/Header/Header";

const Home = () => {
  return (
    <div className="w-full flex flex-col items-center px-[100px]">
      <Header />
      <PageContent />
    </div>
  );
};

export default Home;
