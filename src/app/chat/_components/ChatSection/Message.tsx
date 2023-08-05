import clsx from "clsx";
import { Message } from "../types";

const Message = ({
  message: { photoURL, text },
  isMine,
}: {
  message: Message;
  isMine: boolean;
}) => {
  return (
    <div
      className={clsx(
        isMine ? "self-end" : "self-start items-start",
        "flex flex-col max-w-[80%]"
      )}
    >
      {photoURL && (
        <div className="relative max-w-[400px] w-fit rounded-3xl overflow-hidden">
          <img
            src={photoURL}
            alt="첨부 이미지"
            className="relative object-contain max-h-[50vh] !z-0"
          />
          <div className="absolute top-0 w-full h-full bg-grey-50 !-z-10"></div>
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
