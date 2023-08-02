import Link from "next/link";
import { useEffect, useRef } from "react";
import Notification from "./Notification";
import { useAtomValue } from "jotai";
import { isLoggedInAtom } from "@app/GlobalProvider";

const Header = () => {
  const isLoggedIn = useAtomValue(isLoggedInAtom);
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
      className="py-8 w-full flex justify-center sticky top-0 bg-white"
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
