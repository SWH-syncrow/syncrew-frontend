import InternalToolTip, { Caption } from "./ToolTip";

type InternalToolTipType = typeof InternalToolTip;
interface ToolTipType extends InternalToolTipType {
  Caption: typeof Caption;
}

const ToolTip = InternalToolTip as ToolTipType;

ToolTip.Caption = Caption;
export default ToolTip;
