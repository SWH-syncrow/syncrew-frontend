import React from "react";
import LoadingUI from "./LoadingUI";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center gap-6">
        <LoadingUI />
        <span className="text-xl text-grey-200">loading ...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
