import ChannelSection from "./components/ChannelSection";
import ChatSection from "./components/ChatSection";

const PageContent = () => {
  return (
    <div className="flex flex-row w-full h-screen">
      <ChannelSection />
      <ChatSection />
    </div>
  );
};

export default PageContent;
