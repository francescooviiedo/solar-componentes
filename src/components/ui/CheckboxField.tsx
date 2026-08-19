import React from "react";
import { Checkbox, FormControlLabel, type SxProps, type Theme } from "@mui/material";

export type CheckboxFieldProps = Readonly<{
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  color?: string;
  sx?: SxProps<Theme>;
}>;

export function CheckboxField({
  label,
  checked,
  onChange,
  disabled = false,
  color = "#207840",
  sx,
}: CheckboxFieldProps) {
  return (
    <FormControlLabel
      sx={{
        color: "#848484",
        fontWeight: 500,
        fontSize: "14px",
        ...sx,
      }}
      disabled={disabled}
      control={
        <Checkbox
          checked={checked}
          sx={{
            color,
            "&.Mui-checked": { color },
          }}
          onChange={(e) => onChange(e.target.checked)}
        />
      }
      label={label}
    />
  );
}

export default CheckboxField;
