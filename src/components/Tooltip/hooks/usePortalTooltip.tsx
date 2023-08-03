import React, { useCallback, useEffect, useMemo, useState } from "react";

interface getCoordsParams {
  rectObject: DOMRect;
  offset: { x: number; y: number };
  tooltipContentSizeInfo: TooltipContentSizeInfo;
}

interface setTooltipPositionParams {
  tooltipContentElement: HTMLElement;
  hoveredElementRectInfo: DOMRect;
  offset: { x: number; y: number };
}

interface TooltipContentSizeInfo {
  contentWidth: number;
  contentHeight: number;
}

const getCoords = ({
  rectObject,
  offset,
  tooltipContentSizeInfo,
}: getCoordsParams) => {
  const absTop = rectObject.y + window.scrollY;
  const absLeft = rectObject.x + window.scrollX;
  const childElementSize = {
    width: rectObject.width,
    height: rectObject.height,
  };
  return {
    top: absTop - tooltipContentSizeInfo.contentHeight / 2 + offset.y,
    left:
      absLeft -
      tooltipContentSizeInfo.contentWidth / 2 +
      childElementSize.width / 2 +
      offset.x,
    childElementSize,
  };
};

const setTooltipPosition = ({
  tooltipContentElement,
  hoveredElementRectInfo,
  offset,
}: setTooltipPositionParams) => {
  const tooltipContentRect = tooltipContentElement.getBoundingClientRect();
  const newCoords = getCoords({
    rectObject: hoveredElementRectInfo,
    tooltipContentSizeInfo: {
      contentWidth: tooltipContentRect.width,
      contentHeight: tooltipContentRect.height,
    },
    offset,
  });

  tooltipContentElement.style.top = newCoords.top + "px";
  tooltipContentElement.style.left = newCoords.left + "px";
  tooltipContentElement.style.visibility = "visible";
};

/**
 * @component usePortalTooltip
 * @description React Portal을 이용한 툴팁 컴포넌트 위치 및 hoverEvent hook입니다
 * @property {x:number, y:number} offset children과 툴팁 컨텐츠 사이의 거리
 */
interface usePortalTooltipProps {
  offset: { x: number; y: number };
  targetRef: React.MutableRefObject<HTMLElement | null>;
}

const usePortalTooltip = ({
  offset = { x: 0, y: 0 },
  targetRef,
}: usePortalTooltipProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredElementRectInfo, setHoveredElementRectInfo] =
    useState<DOMRect>();

  const handleMouseHover = useCallback(() => {
    if (!targetRef.current || hoveredElementRectInfo === undefined) return;

    setTooltipPosition({
      tooltipContentElement: targetRef.current,
      hoveredElementRectInfo,
      offset,
    });
  }, [hoveredElementRectInfo, offset, targetRef]);

  useEffect(() => {
    if (!hoveredElementRectInfo || typeof window === "undefined") return;
    if (isHovered) {
      handleMouseHover();
    }
  }, [isHovered, handleMouseHover, hoveredElementRectInfo]);

  const events = useMemo(
    () => ({
      onPointerEnter: (e: React.MouseEvent) => {
        const hoveredCurrentTarget = e.target as HTMLElement;
        const hoveredCurrentTargetRectInfo =
          hoveredCurrentTarget.getBoundingClientRect() as DOMRect;
        setHoveredElementRectInfo(hoveredCurrentTargetRectInfo);
        setIsHovered(true);
      },
      onPointerLeave: () => setIsHovered(false),
      onWheel: () => setIsHovered(false),
    }),
    [],
  );

  return { events, isHovered };
};
export default usePortalTooltip;
