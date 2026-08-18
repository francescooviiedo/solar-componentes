import React from "react";
import { Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = Readonly<{
  value?: boolean | unknown[] | unknown;
}>;

export function StatusIndicator({ value }: Props) {
  const isAtivo = Array.isArray(value) ? value.length > 0 : Boolean(value);

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      {isAtivo ? (
        <CheckCircleIcon sx={{ color: "#207840", fontSize: 20 }} />
      ) : (
        <CancelIcon sx={{ color: "#C62828", fontSize: 20 }} />
      )}
    </Box>
  );
}

export default StatusIndicator;
