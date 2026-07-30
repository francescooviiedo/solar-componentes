import { Box, Autocomplete, TextField } from "@mui/material";
import { SyntheticEvent } from "react";
import { GenericOption, GenericOptionList } from "./types";

type Props = {
  name: string,
  options: GenericOptionList,
  value: GenericOption | null,
  onChange: (event: SyntheticEvent<Element, Event>, newValue: GenericOption | null) => void
  disable?: boolean
  width?: number | string
  noLabel?: boolean
};

export default function AutocompleteFiltro({ name, options, value, onChange, disable = false, width = '100%', noLabel = false }: Readonly<Props>) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box
        component="label"
        htmlFor={name}
        hidden={noLabel}
        sx={{ fontWeight: 700, color: "#757575", mb: 0.5 }}
      >
        {name}
      </Box>
      <Autocomplete
        size="small"
        sx={{ width: width }}
        options={options}
        id={name}
        getOptionLabel={option => option.nome}
        getOptionKey={option => String(option.id)}
        value={value || null}
        disabled={disable}
        onChange={onChange}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            placeholder={name}
            sx={{ bgcolor: "white" }}
          />
        )}
      />
    </Box>
  );
}
