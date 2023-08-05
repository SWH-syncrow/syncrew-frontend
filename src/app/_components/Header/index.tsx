import { isFetchingAuthAtom, userAtom } from "@app/GlobalProvider";
import { useAtomValue } from "jotai";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Notification from "./Notification";
import clsx from "clsx";

const Header = () => {
  const isFetchingAuth = useAtomValue(isFetchingAuthAtom);
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
      <div
        className={clsx(
          "w-[918px] h-9 flex justify-end items-center duration-300",
          isFetchingAuth ? "opacity-0" : "opacity-100"
        )}
      >
        {!isLoggedIn ? (
          <Link
            className="btn-orange h-9 !py-0 flex items-center rounded-full"
            href={"/login"}
          >
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
