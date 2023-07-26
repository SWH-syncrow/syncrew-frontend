import React, { useState } from "react";
import GroupCard from "./components/GroupCard";
import { Button } from "src/components/Button";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";

const CATEGORIES = [
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
const mock = [
  {
    id: 1,
    name: "스마트폰 초급 활용",
    memberCount: 5,
    postCount: 8,
  },
  {
    id: 2,
    name: "스마트폰 중급 활용",
    memberCount: 5,
    postCount: 8,
  },
];
const PageContent = () => {
  const [groups, setGroups] = useState<Group[]>(mock);
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useQuery(["getGroup"], {
    queryFn: (selectedCategory) => {},
    onSuccess: () => {
      //setGroups
    },
  });

  return (
    <div className="w-[918px]">
      <div className="w-full h-[237px] bg-gray-100 rounded-xl mb-[53px]"></div>
      <div className="text-[23px] font-medium leading-8">
        디지털 정보 교환을 위해
        <br /> 친구 신청 글쓰기를 시작해볼까요?
      </div>
      <div className="mt-9">
        <div className="flex justify-center gap-3 mb-[50px]">
          {CATEGORIES.map((category) => (
            <Button
              className={clsx(
                "py-3 w-[110px] border border-gray-200 rounded-3xl flex justify-center text-[14px] font-medium",
                selectedCategory === category.key && ""
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
