'use client';

import Typography, { TypographyProps } from "@mui/material/Typography";

type FontWeight =
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | "light"
  | "regular"
  | "medium"
  | "bold";

interface TextProps extends Omit<TypographyProps, "color"> {
  weight?: FontWeight;
  color?: TypographyProps["color"] | string;
  truncate?: boolean;
}

export function Text({ weight, color = "text.primary", truncate = false, sx, children, ...rest }: TextProps) 
{
  return (
    <Typography
      color={color}
      sx={{
        fontWeight: weight,
        ...(truncate && {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }),
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Typography>
  );
};