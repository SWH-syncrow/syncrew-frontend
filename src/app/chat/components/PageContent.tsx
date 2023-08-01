import ChannelSection from "./ChannelSection";
import ChatSection from "./ChatSection";

const PageContent = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <ChannelSection />
      <ChatSection />
    </div>
  );
};

export default PageContent;
