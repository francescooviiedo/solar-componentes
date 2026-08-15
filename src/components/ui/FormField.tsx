import { Box, Typography } from "@mui/material";

type FormFieldProps = Readonly<{
    label: string;
    required?: boolean;
    children: React.ReactNode;
}>;

export default function FormField({ label, required, children }: FormFieldProps) {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography sx={{
                fontFamily: "Inter",
                fontWeight: 700,
                fontSize: "16px",
                lineHeight: "20px",
                letterSpacing: "1%",
                verticalAlign: "middle",
                color: "#757575",
            }}>
                {label}
                {required ? " *" : ""}
            </Typography>
            {children}
        </Box>
    );
}
