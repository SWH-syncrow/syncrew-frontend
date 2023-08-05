import React, { useEffect } from "react";

interface useObserverProps {
  target: React.MutableRefObject<HTMLElement | null>;
  onIsIntersectingHandler: Function;
  threshold?: number;
}
const useObserver = ({
  target,
  onIsIntersectingHandler,
  threshold,
}: useObserverProps) => {
  useEffect(() => {
    if (target.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            onIsIntersectingHandler();
          }
        },
        { threshold }
      );
      observer.observe(target.current);
    }
  }, [target.current]);
};

export default useObserver;
