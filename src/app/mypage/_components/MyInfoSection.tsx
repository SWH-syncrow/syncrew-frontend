"use client";
import { isSettledAuthAtom, userAtom } from "@app/GlobalProvider";
import Button from "@components/Button";
import ToolTip from "@components/Tooltip";
import UserAvatar from "@components/UserAvatar";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";
import { useAtomValue } from "jotai";
import { useResetAtom } from "jotai/utils";
import { useRouter } from "next/navigation";
import Question from "public/assets/icons/question.svg";
import { AuthUserApis } from "src/lib/apis/authUserApis";

const MyInfoSection = () => {
  const router = useRouter();
  const user = useAtomValue(userAtom);
  const resetUser = useResetAtom(userAtom);
  const isSettledAuth = useAtomValue(isSettledAuthAtom);

  const logout = useMutation({
    mutationFn: async () => await AuthUserApis.kakaoLogout(),
    onSuccess: () => {
      resetUser();
      router.push("/");
    },
    onError: (e) => {
      console.error(e);
    },
  });

  return (
    <div className="flex justify-between w-[900px]">
      <div className="flex items-center gap-3">
        <UserAvatar profileImage={user.profileImage} className="w-15 h-15" />
        <div className="flex flex-col font-medium">
          <div className="flex items-center gap-4">
            <span className="text-lg flex items-center">
              <div
                className={clsx(
                  "inline-block",
                  !isSettledAuth &&
                    "animate-pulse bg-grey-50 w-14 h-7 rounded-md"
                )}
              >
                {user.username}
              </div>
              님, 현재 싱크루 온도는{" "}
              <span className="text-xl text-orange">{user.temp}˚C </span>
              예요!
            </span>
            <ToolTip
              tooltipContentElement={
                <ToolTip.Caption className="relative placeholder:bg-white shadow-normal py-5 rounded-xl text-sm leading-5 text-center px-6 translate-y-[calc(50%+32px)] translate-x-[calc(50%-32px)] modal-arrow-sm">
                  싱크루 한달 활동 기록으로
                  <br /> 온도가 측정되고 있어요
                </ToolTip.Caption>
              }
            >
              <Question className="" />
            </ToolTip>
          </div>
          <div
            className={clsx(
              "text-grey-300",
              !isSettledAuth &&
                "animate-pulse bg-grey-50 w-32 h-6 rounded-md mt-1"
            )}
          >
            {user.email}
          </div>
        </div>
      </div>
      <Button
        onClick={() => logout.mutate()}
        className="btn-grey-border rounded-full text-sm h-9 !py-0"
        disabled={!isSettledAuth}
      >
        로그아웃
      </Button>
    </div>
  );
};

export default MyInfoSection;
