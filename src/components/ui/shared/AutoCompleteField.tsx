import { Autocomplete, TextField } from "@mui/material";
import FormField from "./FormField";

type AutocompleteFieldProps<T> = Readonly<{
    label: string;
    required?: boolean;
    options: T[];
    value: T | null;
    onChange: (value: T | null) => void;
    getOptionLabel: (option: T) => string;
    placeholder?: string;
    noOptionsText?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
}>;

export default function AutocompleteField<T>({
    label,
    required,
    options,
    value,
    onChange,
    getOptionLabel,
    placeholder = "Selecione",
    noOptionsText = "Nenhuma opção encontrada",
    disabled,
    loading,
    loadingText,
}: AutocompleteFieldProps<T>) {
    return (
        <FormField label={label} required={required}>
            <Autocomplete
                options={options}
                value={value}
                onChange={(_, newValue) => onChange(newValue)}
                getOptionLabel={getOptionLabel}
                disabled={disabled}
                loading={loading}
                loadingText={loadingText}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder={placeholder}
                        variant="outlined"
                    />
                )}
                noOptionsText={noOptionsText}
            />
        </FormField>
    );
}
