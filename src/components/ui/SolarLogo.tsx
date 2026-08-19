import React from "react";
import { Box, type SxProps, type Theme } from "@mui/material";

export interface SolarLogoProps {
  src?: string;
  href?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  onClick?: () => void;
  priority?: boolean;
  sx?: SxProps<Theme>;
}

export function SolarLogo({
  src = "/v2/assets/images/solar-logo.png",
  href,
  alt = "Logo Solar",
  width = 145,
  height = 77,
  onClick,
  sx,
}: Readonly<SolarLogoProps>) {
  const content = (
    <Box
      component="img"
      src={src}
      alt={alt}
      width={width}
      height={height}
      sx={{
        cursor: href || onClick ? "pointer" : "default",
        objectFit: "contain",
        display: "block",
        ...sx,
      }}
    />
  );

  if (href) {
    return (
      <Box
        component="a"
        href={href}
        onClick={onClick}
        sx={{ display: "inline-flex", textDecoration: "none", alignItems: "center" }}
      >
        {content}
      </Box>
    );
  }

  if (onClick) {
    return (
      <Box
        component="button"
        type="button"
        onClick={onClick}
        sx={{
          display: "inline-flex",
          background: "none",
          border: "none",
          p: 0,
          cursor: "pointer",
        }}
      >
        {content}
      </Box>
    );
  }

  return content;
}

export function SolarLogoMobile({
  src = "/v2/assets/images/logo-mobile2.png",
  href,
  alt = "Logo Solar Mobile",
  width = 60,
  height = 60,
  onClick,
  sx,
}: Readonly<SolarLogoProps>) {
  return (
    <SolarLogo
      src={src}
      href={href}
      alt={alt}
      width={width}
      height={height}
      onClick={onClick}
      sx={sx}
    />
  );
}

export default SolarLogo;
