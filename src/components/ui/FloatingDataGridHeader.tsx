import React, { RefObject } from "react";
import { Box } from "@mui/material";

type FloatingDataGridHeaderProps = Readonly<{
  floatingRef: RefObject<HTMLDivElement | null>;
  isVisible: boolean;
}>;

export function FloatingDataGridHeader({ floatingRef, isVisible }: FloatingDataGridHeaderProps) {
  return (
    <Box
      ref={floatingRef}
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 1100,
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.2s ease-in-out",
        boxShadow: isVisible ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
        backgroundColor: "#F5F5F5",
      }}
    />
  );
}

export default FloatingDataGridHeader;
