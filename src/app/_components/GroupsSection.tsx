import { CATEGORIES } from "@app/_constants";
import GroupCard from "@components/GroupCard";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import clsx from "clsx";
import { useState } from "react";
import Button from "@components/Button";
import { GetGroupsResponse } from "src/lib/apis/_models/GroupsDto";
import { GroupsApis } from "src/lib/apis/groupsApis";
import { GroupCategory } from "../_types";
import ComponentWithSkeleton from "@components/ComponentWithSkeleton";

const GroupsSection = () => {
  const [groups, setGroups] = useState<GetGroupsResponse["groups"]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<GroupCategory>("ALL");

  const { isFetched } = useQuery(["getGroup", { selectedCategory }], {
    queryFn: async () => GroupsApis.getGroups(selectedCategory),
    onSuccess: (res: AxiosResponse) => {
      setGroups(res.data);
    },
    onError: (e) => {
      console.error(e);
    },
  });
  return (
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
        <ComponentWithSkeleton
          isSkeletonUI={!isFetched}
          Skeleton={<GroupCard.Skeleton />}
          skeletonLength={12}
        >
          {groups.map((group) => (
            <GroupCard key={group.id} {...{ ...group }} />
          ))}
        </ComponentWithSkeleton>
      </div>
    </div>
  );
};

export default GroupsSection;
