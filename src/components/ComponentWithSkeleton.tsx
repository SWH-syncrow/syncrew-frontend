import React, { PropsWithChildren, ReactElement, createElement } from "react";

interface ComponentWithSkeletonProps {
  isSkeletonUI?: boolean;
  skeletonLength?: number;
  Skeleton: JSX.Element;
}
const ComponentWithSkeleton = ({
  children,
  isSkeletonUI,
  skeletonLength = 5,
  Skeleton,
}: PropsWithChildren<ComponentWithSkeletonProps>) => {
  return (
    <>
      {isSkeletonUI &&
        Array.from({ length: skeletonLength }, (_, i) => i + 1).map((e) => {
          return createElement(Skeleton.type, { ...Skeleton.props, key: e });
        })}
      {!isSkeletonUI && children}
    </>
  );
};

export default ComponentWithSkeleton;
