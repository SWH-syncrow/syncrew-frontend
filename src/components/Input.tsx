import clsx from "clsx";
import React, { forwardRef } from "react";

type InputProps = React.ComponentProps<"input">;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, inputRef) => {
    return (
      <input
        {...props}
        className={clsx("rounded-md py-1 px-4", className)}
        ref={inputRef}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
