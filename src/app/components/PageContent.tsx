import GroupCard from "@components/GroupCard";
import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import axios, { AxiosResponse } from "axios";
import clsx from "clsx";
import { useState } from "react";
import { Button } from "src/components/Button";
import { GroupsApis } from "src/lib/apis/groupsApis";
import { GroupCategory } from "../types";

const CATEGORIES: { key: GroupCategory; text: string }[] = [
  { key: "ALL", text: "전체" },
  { key: "SMARTPHONE", text: "스마트폰" },
  { key: "PPT", text: "파워포인트" },
  { key: "VIDEO", text: "영상편집" },
  { key: "PS", text: "포토샵" },
];

interface Group {
  id: number;
  name: string;
  memberCount: number;
  postCount: number;
}
const PageContent = () => {
  const [groups, setGroups] = useState<Group[]>([]);
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
    <div className="w-[1118px] px-[100px]">
      <div className="w-full h-[237px] bg-grey-100 rounded-xl mb-[53px]"></div>
      <div className="text-[23px] leading-[30px] font-medium">
        디지털 정보 교환을 위해
        <br /> 친구 신청 글쓰기를 시작해볼까요?
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
  );
};

export default PageContent;
