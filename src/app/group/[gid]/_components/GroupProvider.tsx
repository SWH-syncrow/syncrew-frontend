import { enteredGroupsAtom, userAtom } from "@app/GlobalProvider";
import { useQuery } from "@tanstack/react-query";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { notFound } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { GetGroupInfoResponse } from "src/lib/apis/_models/GroupsDto";
import { GroupsApis } from "src/lib/apis/groupsApis";

export const groupInfoAtom = atom<GetGroupInfoResponse>({
  id: -1,
  name: "",
  category: "SMARTPHONE",
  memberCount: 0,
  postCount: 0,
});

const GroupProvider = ({
  children,
  gid,
}: PropsWithChildren<{ gid: string }>) => {
  const setGroupInfo = useSetAtom(groupInfoAtom);
  const isLoggedIn = useAtomValue(userAtom).id !== -1;
  const enteredGroups = useAtomValue(enteredGroupsAtom);

  useQuery(["getGroupInfo", { gid }], {
    queryFn: async () => await GroupsApis.getGroupInfo(parseInt(gid)),
    onSuccess: ({ data }) => {
      setGroupInfo(data);
    },
    onError: (e) => {
      console.error(e);
    },
    enabled: isLoggedIn,
  });

  useEffect(() => {
    if (!enteredGroups.includes(0) && !enteredGroups.includes(parseInt(gid)))
      notFound();
  }, [enteredGroups]);

  if (!isLoggedIn) return;
  return <>{children}</>;
};

export default GroupProvider;
