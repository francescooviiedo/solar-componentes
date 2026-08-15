import { Autocomplete, TextField } from "@mui/material";
import { UseFormClearErrors, UseFormSetValue, Path } from "react-hook-form";

interface GenericAutocompleteOption {
  value: string | number;
  label: string;
}

interface GenericAutocompleteProps<T extends GenericAutocompleteOption, TFieldValues extends object> {
  id: string;
  name: Path<TFieldValues>;
  label: string;
  options: T[];
  value?: string | number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: { [key: string]: any };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValue: UseFormSetValue<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clearErrors: UseFormClearErrors<any>;
  placeholder?: string;
  disabled?: boolean;
}

export function GenericAutocomplete<
  T extends GenericAutocompleteOption,
  TFieldValues extends object
>({
  id,
  name,
  label,
  options,
  value,
  error,
  setValue,
  clearErrors,
  placeholder,
  disabled
}: Readonly<GenericAutocompleteProps<T, TFieldValues>>) {
  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  return (
    <Autocomplete
      id={id}
      options={options}
      sx={{ width: "100%" }}
      value={selectedOption}
      disabled={disabled}
      onChange={(_, newValue) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setValue(name, (newValue?.value ?? null) as any, {
          shouldValidate: true,
          shouldDirty: true,
        });
        if (newValue?.value) {
          clearErrors(name);
        }
      }}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          error={!!error?.[name]}
          helperText={error?.[name]?.message}
        />
      )}
    />
  );
}
