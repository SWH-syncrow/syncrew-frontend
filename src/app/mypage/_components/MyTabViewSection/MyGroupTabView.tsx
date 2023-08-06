import ComponentWithSkeleton from "@components/ComponentWithSkeleton";
import GroupCard from "@components/GroupCard";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useState } from "react";
import { GetUserGroupsResponse } from "src/lib/apis/_models/UserDto";
import { MypageApis } from "src/lib/apis/mypageApis";

const MyGroupTabView = () => {
  const [groups, setGroups] = useState<GetUserGroupsResponse[]>([]);

  const { isFetched } = useQuery(["getMyGroups"], {
    queryFn: async () => await MypageApis.getMyGropus(),
    onSuccess: ({ data }) => {
      setGroups(data);
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <div className="grid grid-cols-3 gap-8 mt-[50px] ">
      <ComponentWithSkeleton
        isSkeletonUI={!isFetched}
        skeletonLength={3}
        Skeleton={<GroupCard.Skeleton />}
      >
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
        {groups.map((group) => (
          <GroupCard key={group.id} {...{ ...group }} />
        ))}
      </ComponentWithSkeleton>
    </div>
  );
};

export default MyGroupTabView;
