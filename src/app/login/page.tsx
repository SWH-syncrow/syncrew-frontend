"use client";
import useAuthKakao from "@components/hooks/useAuthKakao";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  useAuthKakao();
  const router = useRouter();

  return (
    <div className="flex flex-col items-center  w-full h-screen">
      <div className="w-[500px] h-full flex flex-col my-[70px] text-center">
        <button className="self-start" onClick={() => router.back()}>
          이전
        </button>
        <div className="flex flex-col items-center flex-1 py-20">
          <span className="text-3xl font-semibold mb-20">
            디지털 정보 친구를
            <br /> 만나러 가볼까요?
          </span>
          <span className="text-sm mb-4">먼저 로그인이 필요해요 :)</span>
          <Link
            className="font-semibold bg-grey-300 w-full py-2"
            href={`https://kauth.kakao.com/oauth/authorize?client_id=${
              process.env.NEXT_PUBLIC_KAKAO_REST_KEY
            }&redirect_uri=${
              process.env.NODE_ENV === "production"
                ? process.env.NEXT_PROD_DOMAIN
                : process.env.NEXT_PUBLIC_DOMAIN
            }/login&response_type=code`}
          >
            카카오로 3초 만에 시작하기
          </Link>
        </div>
        <div className="border-t border-grey-300 text-grey-500 pt-4">
          회원가입 시 syncrew의
          <br /> 서비스 이용 약관과 개인정보 보호정책에 동의하게 됩니다
        </div>
      </div>
    </div>
  );
};

export default Page;
