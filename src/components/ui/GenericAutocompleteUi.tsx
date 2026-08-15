import { Autocomplete, Box, TextField } from "@mui/material";

type HasIdNome = { id: string | number; nome: string };

type Props<T extends HasIdNome> = Readonly<{
  value: T | null;
  options: T[];
  onChange: (novoValor: T | null) => void;
  placeholder: string;
  disabled?: boolean;
}>;

export default function GenericAutocompleteUi<T extends HasIdNome>({
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
}: Props<T>) {
  return (
    <Autocomplete
      options={options}
      getOptionLabel={(option) => option.nome}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      renderOption={({ key, ...props }, option) => (
        <Box
          component="li"
          key={key}
          {...props}
          title={option.nome}
          sx={{
            maxWidth: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "14px",
            p: 1,
          }}
        >
          {option.nome}
        </Box>
      )}
      renderInput={(params) => (
        <TextField {...params} label={placeholder} size="medium" />
      )}
      disabled={disabled}
      sx={{
        width: "100%",
      }}
    />
  );
}
