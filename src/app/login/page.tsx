"use client";
import useAuthKakao from "@components/hooks/useAuthKakao";
import Link from "next/link";

const Page = () => {
  useAuthKakao();
  
  return (
    <div>
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?client_id=${
          process.env.NEXT_PUBLIC_KAKAO_REST_KEY
        }&redirect_uri=${
          process.env.NODE_ENV === "production"
            ? process.env.NEXT_PROD_DOMAIN
            : process.env.NEXT_PUBLIC_DOMAIN
        }/login&response_type=code`}
      >
        로그인
      </Link>
    </div>
  );
};

export default Page;
