import { Checkbox, FormControlLabel, SxProps, Theme } from "@mui/material";

type CheckboxFieldProps = Readonly<{
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    sx?: SxProps<Theme>;
}>;

export default function CheckboxField({ label, checked, onChange, sx }: CheckboxFieldProps) {
    return (
        <FormControlLabel
            sx={{
                color: "#848484",
                fontWeight: 500,
                fontSize: "14px",
                ...sx,
            }}
            control={
                <Checkbox
                    checked={checked}
                    sx={{
                        color: '#207840',
                        "&.Mui-checked": { color: '#207840' }
                    }}
                    onChange={(e) => onChange(e.target.checked)}
                />
            }
            label={label}
        />
    );
}