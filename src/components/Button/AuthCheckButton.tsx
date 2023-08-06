import { userAtom } from "@app/GlobalProvider";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { ComponentProps, PropsWithChildren } from "react";
import { useGlobalModal } from "@components/modals/GlobalModal";
import Button from ".";

const AuthCheckButton = ({
  children,
  onClick,
  ...props
}: PropsWithChildren<ComponentProps<typeof Button>>) => {
  const isLoggedIn = useAtomValue(userAtom).id !== -1;
  const { setModalState, resetState } = useGlobalModal();

  return (
    <Button
      onClick={(e) => {
        if (isLoggedIn) {
          onClick && onClick(e);
        } else {
          setModalState({
            contents: "로그인이 필요해요",
            button: (
              <Link
                href={"/login"}
                onClick={() => resetState()}
                className="btn-orange rounded-none rounded-br-2xl flex items-center justify-center whitespace-nowrap"
              >
                로그인 이동
              </Link>
            ),
          });
        }
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AuthCheckButton;
