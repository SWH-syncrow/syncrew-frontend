import React from "react";
import Logo from "public/assets/logos/XS_01.svg";
import Image from "next/image";
import clsx from "clsx";

const UserAvatar = ({
  profileImage,
  className,
}: {
  profileImage: string | null;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "w-[54px] h-[54px] flex items-center justify-center bg-grey-50 border border-grey-100 rounded-full",
        className
      )}
    >
      {profileImage ? <Image src={profileImage} alt="프로필사진" /> : <Logo />}
    </div>
  );
};

export default UserAvatar;
