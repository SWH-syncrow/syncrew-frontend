import LoadingUI from "@components/LoadingUI";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { Message } from "../types";

const Message = ({
  message: { photoURL, text },
  isMine,
}: {
  message: Message;
  isMine: boolean;
}) => {
  const [loading, setLoading] = useState(true);
  return (
    <div
      className={clsx(
        isMine ? "self-end" : "self-start items-start",
        "flex flex-col max-w-[80%] gap-2"
      )}
    >
      {photoURL && (
        <div
          className={"relative max-w-[400px] w-fit rounded-3xl overflow-hidden"}
        >
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
              <LoadingUI className="w-10 h-10" />
            </div>
          )}
          <div className={clsx(loading && "blur-sm")}>
            <Image
              src={photoURL}
              alt="첨부 이미지"
              width={300}
              height={300}
              className="relative object-contain max-h-[50vh] !z-0"
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
          <div className="absolute top-0 w-full h-full bg-grey-0 !-z-10"></div>
        </div>
      )}
      {text && (
        <div
          className={clsx(
            isMine
              ? "self-end bg-orange text-white text-right"
              : "self-start bg-grey-0",
            "py-2 px-4 rounded-3xl first:mt-auto leading-8 "
          )}
          dangerouslySetInnerHTML={{
            __html: text.replace(/\n/g, "<br />"),
          }}
        />
      )}
    </div>
  );
};

export default Message;
