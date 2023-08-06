import React, { useRef } from "react";
import styled, { keyframes } from "styled-components";
import usePortalTooltip from "./hooks/usePortalTooltip";
import { Dialog } from "@components/dialog";

interface TooltipChildPosition {
  position: "static" | "absolute" | "relative";
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}
interface ToolTipProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
  offset?: { x: number; y: number };
  tooltipContentElement?: React.ReactElement;
  tooltipChildPosition?: TooltipChildPosition;
  portalId?: string;
}

const ToolTip = React.forwardRef<HTMLDivElement, ToolTipProps>(
  (
    {
      children,
      offset = { x: 0, y: 0 },
      tooltipContentElement = <>빈 텍스트입니다</>,
      tooltipChildPosition = { position: "static" },
      portalId = "modal-root",
      ...props
    },
    ref
  ) => {
    const dialogRef = useRef(null);
    const { events, isHovered } = usePortalTooltip({
      offset,
      targetRef: dialogRef,
    });

    return (
      <StyledTooltipWrapper
        {...tooltipChildPosition}
        {...props}
        {...{ ...events }}
        ref={ref}
      >
        {React.Children.map(children, (child) => {
          const childComponent = child as React.ReactElement;
          return (
            childComponent &&
            React.cloneElement(childComponent, {
              key: childComponent.props["data-key"],
            })
          );
        })}
        {isHovered && (
          <Dialog.Root open modal={false}>
            <Dialog.Portal {...{ portalId }}>
              <ToolTipContent className="tooltip-content" ref={dialogRef}>
                {tooltipContentElement}
              </ToolTipContent>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </StyledTooltipWrapper>
    );
  }
);
ToolTip.displayName = "ToolTip";

export default ToolTip;
const StyledTooltipWrapper = styled.div<TooltipChildPosition>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: ${(props) => props.position};
  top: ${(props) => (props.top ? props.top : null)};
  right: ${(props) => (props.right ? props.right : null)};
  bottom: ${(props) => (props.bottom ? props.bottom : null)};
  left: ${(props) => (props.left ? props.left : null)};
`;

const fadeInKeyframes = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const ToolTipContent = styled(Dialog.Content)`
  pointer-events: none;
  position: absolute;
  visibility: hidden;
  z-index: 999;
  left: 0;
  top: 0;
  outline: none;
  overflow: visible;
  animation-name: ${fadeInKeyframes};
  animation-duration: 500ms;
  animation-fill-mode: forwards;
`;

export const Caption = ({
  children,
  ...props
}: React.PropsWithChildren<{ className?: string }>) => {
  return <div {...props}>{children}</div>;
};
