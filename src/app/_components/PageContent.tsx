import { isLoggedInAtom, userAtom } from "@app/GlobalProvider";
import { CATEGORIES } from "@app/_constants";
import GroupCard from "@components/GroupCard";
import ToolTip from "@components/Tooltip";
import LevelTestModal from "@components/modal/LevelTestModal";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useState } from "react";
import { Button } from "src/components/Button";
import { GroupsApis } from "src/lib/apis/groupsApis";
import { GetGroupsResponse } from "src/lib/apis/_models/GroupsDto";
import { GroupCategory } from "../_types";

const PageContent = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
  const user = useAtomValue(userAtom);
  const [groups, setGroups] = useState<GetGroupsResponse["groups"]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<GroupCategory>("ALL");

  useQuery(["getGroup"], {
    queryFn: async () => GroupsApis.getGroups(selectedCategory),
    onSuccess: (res: AxiosResponse) => {
      setGroups(res.data.groups);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <>
      <LevelTestModal />
      <div className="w-[1118px] px-[100px]">
        <div className="w-full h-[237px] bg-grey-100 rounded-xl mb-[53px]"></div>
        <div className="flex justify-between">
          <div className="text-[23px] leading-[30px] font-medium">
            디지털 정보 교환을 위해
            <br /> 친구 신청 글쓰기를 시작해볼까요?
          </div>
          {isLoggedIn && user.isTestTarget && (
            <ToolTip
              tooltipContentElement={
                <ToolTip.Caption className="bg-white relative shadow-normal py-5 rounded-xl text-sm leading-5 text-center px-6 translate-y-[calc(100%+20px)] translate-x-[calc(50%-32px)] modal-arrow-sm">
                  테스트를 통해 서비스를
                  <br /> 원활히 이용할 수 있어요
                </ToolTip.Caption>
              }
            >
              <LevelTestModal.Trigger />
            </ToolTip>
          )}
        </div>
        <div className="mt-9">
          <div className="flex justify-center gap-3 mb-[50px]">
            {CATEGORIES.map((category) => (
              <Button
                className={clsx(
                  selectedCategory === category.key && "btn-orange-border",
                  "btn-grey-border py-2.5 w-[110px] flex justify-center font-medium !rounded-full"
                )}
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
              >
                {category.text}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-8">
            {groups.map((group) => (
              <GroupCard key={group.id} {...{ ...group }} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PageContent;