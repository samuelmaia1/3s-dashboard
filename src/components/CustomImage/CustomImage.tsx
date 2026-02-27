"use client";

import Image from "next/image";
import NextLink from "next/link";
import { Box, Link } from "@mui/material";
import { styled } from "@mui/material/styles";

interface CustomImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  rounded?: boolean;
  href?: string;
}

const ImageWrapper = styled(Box)<{ rounded?: boolean }>(({ rounded }) => ({
  display: "inline-block",
  overflow: "hidden",
  borderRadius: rounded ? "50%" : "0",
}));

export function CustomImage({
  src,
  alt,
  width,
  height,
  rounded = false,
  href,
}: CustomImageProps) {
  const image = (
    <ImageWrapper rounded={rounded} sx={{ width, height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        style={{ objectFit: "cover" }}
      />
    </ImageWrapper>
  );

  if (href) {
    return (
      <Link
        component={NextLink}
        href={href}
        underline="none"
        sx={{ display: "inline-flex" }}
      >
        {image}
      </Link>
    );
  }

  return image;
}
