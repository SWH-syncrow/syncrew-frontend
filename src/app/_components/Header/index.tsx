import { userAtom } from "@app/GlobalProvider";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Notification from "./Notification";

const Header = () => {
  const isLoggedIn = useAtomValue(userAtom).id !== -1;
  const headerRef = useRef<HTMLHeadElement | null>(null);

  const handleScroll = () => {
    if (!headerRef.current) return;

    const isHasBorder = headerRef.current.classList.contains("drop-shadow-sm");
    if (window.scrollY > 0) {
      !isHasBorder && headerRef.current.classList.add("drop-shadow-sm");
    } else {
      isHasBorder && headerRef.current.classList.remove("drop-shadow-sm");
    }
  };

  useEffect(() => {
    window?.addEventListener("scroll", handleScroll);
    return () => {
      window?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="py-8 w-full flex justify-center sticky top-0 bg-white z-10"
    >
      <div className="w-[918px] flex justify-end">
        {!isLoggedIn ? (
          <Link className="btn-orange rounded-full" href={"/login"}>
            로그인
          </Link>
        ) : (
          <Notification />
        )}
      </div>
    </header>
  );
};

export default Header;
