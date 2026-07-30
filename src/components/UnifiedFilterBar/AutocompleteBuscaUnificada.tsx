import {
  Box,
  Autocomplete,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  createFilterOptions,
} from "@mui/material";
import { GroupHeader, GroupItems, resizeString } from "./styledComponents";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { SyntheticEvent, useState } from "react";
import { GenericOptionList, GenericOption, FilterSchema } from "./types";

type Props = {
  options: GenericOptionList;
  value: GenericOptionList | null;
  onChange: (
    event: SyntheticEvent<Element, Event>,
    newValue: GenericOptionList,
  ) => void;
  onChangeText?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClickIcon: () => void;
  reversedAdornments?: boolean;
  disabled?: boolean;
  schema?: FilterSchema;
};

const filter = createFilterOptions<GenericOption>();

export default function AutocompleteBuscaUnificada({
  options,
  value,
  onChange,
  onChangeText,
  isOpen,
  setIsOpen,
  onClickIcon,
  reversedAdornments = false,
  disabled = false,
  schema = [],
}: Readonly<Props>) {
  const [listOpen, setListOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleSearch = () => {
    setListOpen(false);

    if (inputValue.trim() !== "" && schema) {
      const textItems = schema.filter((item) => item.inputType === "text");
      if (textItems.length === 1) {
        const textItem = textItems[0];
        const exists = (value || []).some(
          (v) => v.type === textItem.urlKey && String(v.id) === inputValue.trim()
        );
        if (!exists) {
          const customOpt: GenericOption = {
            id: inputValue.trim(),
            nome: `${textItem.label}: ${inputValue.trim()}`,
            type: textItem.urlKey,
          };
          const newValue = [
            ...(value || []).filter((v) => v.type !== textItem.urlKey),
            customOpt,
          ];
          onChange({} as SyntheticEvent, newValue);
        }
        setInputValue("");
      }
    }

    onClickIcon();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Autocomplete
        multiple
        options={options}
        disabled={disabled}
        size="small"
        sx={{ width: "100%", maxWidth: 800, marginRight: 2, borderRadius: 5 }}
        groupBy={(option) => option.type}
        getOptionLabel={(option) => option.nome}
        getOptionKey={(option) => String(option.id) + option.type}
        value={value || []}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (onChangeText && event) {
            onChangeText(event as React.ChangeEvent<HTMLInputElement>);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          const { inputValue } = params;

          if (inputValue.trim() !== "" && schema) {
            const textItems = schema.filter((item) => item.inputType === "text");
            if (textItems.length > 0) {
              textItems.forEach((textItem) => {
                filtered.push({
                  id: inputValue.trim(),
                  nome: `${textItem.label}: ${inputValue.trim()}`,
                  type: textItem.urlKey,
                });
              });
            }
          }

          return filtered;
        }}
        popupIcon={true}
        clearIcon={false}
        onChange={(event, newValue) => {
          setInputValue("");
          onChange(event, newValue);
        }}
        open={listOpen}
        onOpen={() => setListOpen(true)}
        onClose={() => setListOpen(false)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              icon={
                option.cor ? (
                  <LocalOfferIcon sx={{ color: option.cor }} />
                ) : undefined
              }
              sx={{
                borderColor: option.cor ?? "primary",
                "& .MuiChip-deleteIcon": {
                  color: option.cor,
                  "&:hover": {
                    color: option.cor,
                  },
                },
                "& .MuiChip-icon": {
                  color: option.cor,
                },
                ...(option.cor && {
                  color: option.cor,
                }),
              }}
              color={option.cor ? "default" : "primary"}
              variant="outlined"
              label={
                option.nome.length > 32
                  ? resizeString(option.nome, 32)
                  : option.nome
              }
              {...getTagProps({ index })}
              key={option.nome + index}
            />
          ))
        }
        renderGroup={(params) => (
          <li key={params.key}>
            <GroupHeader>
              {params.group.charAt(0).toUpperCase() + params.group.slice(1)}
            </GroupHeader>
            <GroupItems>{params.children}</GroupItems>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Pesquisar"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !listOpen) {
                handleSearch();
              }
            }}
            sx={{
              width: "100%",
              bgcolor: "white",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                height: "auto !important",
                minHeight: "50px",
                "& fieldset": { borderColor: "#207840", borderWidth: "1px" },
                "&:hover fieldset": { borderColor: "#207840" },
                "&.Mui-focused fieldset": { borderColor: "#207840" },
                borderRadius: "10px",
                color: "black",
                ...(reversedAdornments && {
                  pl: "48px !important",
                  pr: "48px !important",
                }),
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  <InputAdornment
                    position={reversedAdornments ? "end" : "start"}
                    sx={reversedAdornments ? { position: "absolute", right: 14, top: 25, transform: "translateY(-50%)" } : {}}
                  >
                    <IconButton
                      sx={reversedAdornments ? {} : { mr: -8 }}
                      disabled={disabled}
                      onClick={() => (reversedAdornments ? setIsOpen(!isOpen) : handleSearch())}
                      color={reversedAdornments && isOpen ? "primary" : "default"}
                    >
                      {reversedAdornments ? (
                        <TuneIcon sx={{ color: "#207840" }} />
                      ) : (
                        <SearchIcon sx={{ color: "#207840" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                  {params.InputProps.endAdornment}
                </>
              ),
              startAdornment: (
                <>
                  <InputAdornment
                    position={reversedAdornments ? "start" : "end"}
                    sx={reversedAdornments ? { position: "absolute", left: 14, top: 25, transform: "translateY(-50%)", zIndex: 1 } : {}}
                  >
                    <IconButton
                      onClick={() => (reversedAdornments ? handleSearch() : setIsOpen(!isOpen))}
                      disabled={disabled}
                      color={!reversedAdornments && isOpen ? "primary" : "default"}
                    >
                      {reversedAdornments ? (
                        <SearchIcon sx={{ color: "#207840" }} />
                      ) : (
                        <TuneIcon sx={{ color: "#207840" }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
