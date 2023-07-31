import GroupCard from "@components/GroupCard";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { MypageApis } from "src/lib/apis/mypageApis";

const MyGroupTabView = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "스마트폰 활용 초급",
      memberCount: 5,
      postCount: 8,
    },
  ]);
  useQuery(["getMyGroups"], {
    queryFn: async () => await MypageApis.getMyGropus(),
    onSuccess: ({ data }) => {
      setGroups(data.groups);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <div>
      {groups.length === 0 && (
        <div className="flex flex-col items-center mt-[162px]">
          <span className="mb-4 text-2xl font-medium">
            아직 참여 중인 탐색이 없어요
          </span>
          <span className="mb-[45px]">첫 싱크루 그룹을 탐색 해볼까요?</span>
          <Link href={"/"} className="btn-orange">
            싱크루 탐색 이동
          </Link>
        </div>
      )}
      <div className="grid grid-cols-3 gap-8 mt-[50px] ">
        {groups.map((group) => (
          <GroupCard key={group.id} {...{ ...group }} />
        ))}
      </div>
    </div>
  );
};

export default MyGroupTabView;
