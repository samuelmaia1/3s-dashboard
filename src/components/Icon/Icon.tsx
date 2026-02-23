import { IconName, icons } from "@/constants/icons";
import { CSSProperties } from "react";

interface IconProps {
  name: IconName;
  size?: number | string;
  color?: string;
  style?: CSSProperties;
}

export function Icon({
  name,
  size = 24,
  color = "currentColor",
  style,
}: IconProps) {
  const SvgIcon = icons[name];

  if (!SvgIcon) {
    return null;
  }

  return <SvgIcon width={size} height={size} fill={color} style={style} />;
}
