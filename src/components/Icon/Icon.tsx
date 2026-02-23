import { CSSProperties } from "react";
import type { IconName } from 'lucide-react/dynamic';
import { DynamicIcon } from 'lucide-react/dynamic';

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
  return <DynamicIcon name={name} size={size} color={color} style={style} />;
}
