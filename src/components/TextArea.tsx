import clsx from "clsx";
import React from "react";

export type TextAreaProps = React.ComponentProps<"textarea">;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={clsx(
          "rounded-md py-1 px-4 text-sm active:outline-orange resize-none duration-300",
          className
        )}
        {...props}
        ref={ref}
      />
    );
  }
);
TextArea.displayName = "TextArea";

export default TextArea;
