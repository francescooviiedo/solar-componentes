import React, { useMemo } from "react";
import { Autocomplete, Box, TextField, type SxProps, type Theme } from "@mui/material";
import * as Icons from "@mui/icons-material";

export interface SelectIconeProps {
  id?: string;
  value?: string | null;
  onChange?: (iconName: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue?: (name: any, value: any, options?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clearErrors?: (name: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  helperText?: string;
  label?: string;
  name?: string;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export function SelectIcone({
  id = "select-icone",
  value,
  onChange,
  setValue,
  clearErrors,
  error,
  helperText,
  label = "Ícones",
  name = "icon",
  disabled = false,
  sx,
}: Readonly<SelectIconeProps>) {
  const icons = useMemo(
    () =>
      Object.keys(Icons).filter(
        (str) =>
          !["Outlined", "Rounded", "Sharp", "TwoTone"].some((suffix) =>
            str.includes(suffix)
          )
      ),
    []
  );

  const options = useMemo(
    () =>
      icons.map((icon: string, index: number) => {
        const IconComponent = (Icons as Record<string, React.ElementType>)[icon];
        return { label: icon, id: index, icon: <IconComponent /> };
      }),
    [icons]
  );

  const isError = Boolean(
    typeof error === "boolean"
      ? error
      : error?.[name] || error?.message || error
  );

  const errorMessage =
    helperText ??
    (typeof error === "object" && error !== null
      ? error[name]?.message ?? error.message
      : undefined);

  return (
    <Box sx={{ width: "100%", ...sx }}>
      <Autocomplete
        disablePortal
        id={id}
        disabled={disabled}
        options={options}
        sx={{ width: "100%" }}
        value={options.find((opt) => opt.label === value) || null}
        onChange={(_, newValue) => {
          const selectedLabel = newValue?.label ?? "";
          if (onChange) {
            onChange(selectedLabel);
          }
          if (setValue) {
            setValue(name, selectedLabel, {
              shouldValidate: true,
              shouldDirty: true,
            });
          }
          if (selectedLabel && clearErrors) {
            clearErrors(name);
          }
        }}
        filterOptions={(opts, state) => {
          const filtered = opts.filter((option) =>
            option.label.toLowerCase().includes(state.inputValue.toLowerCase())
          );
          return filtered;
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={isError}
            helperText={errorMessage}
          />
        )}
        renderOption={({ key, ...props }, option) => {
          const IconComponent = (Icons as Record<string, React.ElementType>)[
            option.label
          ];
          return (
            <Box
              component="li"
              key={key}
              {...props}
              sx={{
                width: "20%",
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 64,
                cursor: "pointer",
                border: "none",
                background: "none",
                p: 1,
              }}
            >
              <IconComponent color="primary" fontSize="large" />
              <span
                style={{
                  fontSize: 10,
                  marginTop: 4,
                  textAlign: "center",
                  wordBreak: "break-all",
                }}
              >
                {option.label}
              </span>
            </Box>
          );
        }}
        slotProps={{
          listbox: {
            sx: {
              display: "flex",
              flexWrap: "wrap",
              minWidth: 320,
              width: "100%",
              maxHeight: 220,
              overflowY: "auto",
              p: 1,
            },
          },
        }}
      />
    </Box>
  );
}

export default SelectIcone;
