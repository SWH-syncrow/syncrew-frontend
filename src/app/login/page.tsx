"use client";
import { userAtom } from "@app/GlobalProvider";
import useAuthKakao from "@components/_hooks/useAuthKakao";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Prev from "public/assets/icons/left.svg";
import Kakao from "public/assets/kakao.svg";
import { useEffect } from "react";

const Page = () => {
  const { isLoading } = useAuthKakao();
  const router = useRouter();
  const isLoggedIn = useAtomValue(userAtom).id !== -1;

  useEffect(() => {
    isLoggedIn && router.replace("/");
  }, []);

  return (
    <div className="flex flex-col items-center  w-full h-screen">
      <div className="w-[300px] h-full flex flex-col my-[70px] text-center">
        <button className="self-start" onClick={() => router.back()}>
          <Prev />
        </button>
        <div className="flex flex-col items-center flex-1 py-20 leading-[33px]">
          <span className="text-[24px] font-semibold mb-20">
            디지털 정보 친구를
            <br /> 만나러 가볼까요?
          </span>
          <span className="text-sm mb-4 text-grey-200">
            먼저 로그인이 필요해요 :)
          </span>
          {isLoading && (
            <div className="bg-[#FEE500] rounded-[6px] w-full h-[45px] flex items-center justify-center">
              <div className="flex justify-center gap-2">
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-grey-500" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-grey-500" />
                <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-grey-500" />
              </div>
            </div>
          )}
          {!isLoading && (
            <Link
              href={`https://kauth.kakao.com/oauth/authorize?client_id=${
                process.env.NEXT_PUBLIC_KAKAO_REST_KEY
              }&redirect_uri=${
                process.env.NODE_ENV === "production"
                  ? process.env.NEXT_PUBLIC_PROD_DOMAIN
                  : process.env.NEXT_PUBLIC_DOMAIN
              }/login&response_type=code`}
            >
              <Kakao />
            </Link>
          )}
        </div>
        <div className="border-t border-grey-100 text-grey-200 pt-4 text-sm whitespace-nowrap">
          회원가입 시 syncrew의
          <br /> 서비스 이용 약관과 개인정보 보호정책에 동의하게 됩니다
        </div>
      </div>
    </div>
  );
};

export default Page;
