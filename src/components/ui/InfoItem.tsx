import React from "react";
import { Box, Typography } from "@mui/material";

type InfoItemProps = Readonly<{
  rotulo: string;
  valor: string | number | null | undefined;
  gridSpan?: number;
  quebrarPalavra?: boolean;
}>;

export function InfoItem({ rotulo, valor, gridSpan, quebrarPalavra }: InfoItemProps) {
  return (
    <Box
      sx={{
        pb: "8px",
        borderBottom: "1px solid #E0E0E0",
        gridColumn: gridSpan ? { md: `span ${gridSpan}` } : undefined,
      }}
    >
      <Typography
        sx={{
          fontWeight: 500,
          display: "inline",
          color: "#333333",
          fontSize: "16px",
          fontFamily: "Inter",
        }}
      >
        {rotulo}:{" "}
      </Typography>
      <Typography
        sx={{
          display: "inline",
          color: "#757575",
          fontSize: "16px",
          fontFamily: "Inter",
          wordBreak: quebrarPalavra ? "break-all" : undefined,
        }}
      >
        {valor ?? "-"}
      </Typography>
    </Box>
  );
}

export default InfoItem;
