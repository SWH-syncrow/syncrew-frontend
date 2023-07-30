import React, { ComponentProps, PropsWithChildren } from "react";
import { Button } from "./Button";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "@app/GlobalProvider";
import { useGlobalModal } from "./modal/GlobalModal";
import Link from "next/link";

const AuthCheckButton = ({
  children,
  onClick,
  ...props
}: PropsWithChildren<ComponentProps<typeof Button>>) => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
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
                className="btn-orange rounded-none rounded-br-xl flex items-center justify-center"
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
