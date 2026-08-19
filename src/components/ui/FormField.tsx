import React from "react";
import { Box, Typography, type SxProps, type Theme } from "@mui/material";

export type FormFieldProps = Readonly<{
  label: string;
  required?: boolean;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}>;

export function FormField({ label, required, children, sx }: FormFieldProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", ...sx }}>
      <Typography
        sx={{
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: "16px",
          lineHeight: "20px",
          letterSpacing: "1%",
          verticalAlign: "middle",
          color: "#757575",
        }}
      >
        {label}
        {required ? " *" : ""}
      </Typography>
      {children}
    </Box>
  );
}

export default FormField;
