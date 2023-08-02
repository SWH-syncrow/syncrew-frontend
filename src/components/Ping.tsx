import clsx from "clsx";
import React, { PropsWithChildren } from "react";

const Ping = ({
  children,
  className,
  condition,
}: PropsWithChildren<{ className?: string; condition: boolean }>) => {
  return (
    <div className="relative flex items-center">
      {condition && (
        <div className={clsx("absolute", className)}>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-orange"></span>
          </span>
        </div>
      )}
      {children}
    </div>
  );
};

export default Ping;
