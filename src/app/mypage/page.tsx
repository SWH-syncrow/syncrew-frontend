import MyInfoSection from "./_components/MyInfoSection";
import MyTabViewSection from "./_components/MyTabViewSection";

const Page = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center py-[77px] gap-11">
        <MyInfoSection />
        <MyTabViewSection />
      </div>
    </div>
  );
};

export default Page;
