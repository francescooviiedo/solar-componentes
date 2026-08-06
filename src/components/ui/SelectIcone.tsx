"use client";

import { Autocomplete, Box, TextField } from "@mui/material";
import * as Icons from '@mui/icons-material';
import React, { useMemo } from "react";
import { UseFormSetValue, UseFormClearErrors } from "react-hook-form";

export default function SelectIcone({
    id,
    value,
    setValue,
    error,
    clearErrors,
}: Readonly<{
    id: string;
    value?: string | null,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setValue: UseFormSetValue<any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    clearErrors: UseFormClearErrors<any>
}>) {
    const icons = useMemo(() =>
        Object.keys(Icons).filter(str =>
            !['Outlined', 'Rounded', 'Sharp', 'TwoTone'].some(suffix => str.includes(suffix))
        ), []
    );

    const options = useMemo(() =>
        icons.map((icon: string, index: number) => {
            const IconComponent = (Icons as Record<string, React.ElementType>)[icon];
            return { label: icon, id: index, icon: <IconComponent /> };
        }), [icons]
    );

    return (
        <Box>
            <Autocomplete
                disablePortal
                id={id}
                options={options}
                sx={{ width: '100%' }}
                value={options.find(opt => opt.label === value) || null}
                onChange={(_, newValue) => {
                    setValue("icon", newValue?.label ?? "", { shouldValidate: true, shouldDirty: true });
                    if (newValue?.label) {
                        clearErrors("icon");
                    }
                }}
                filterOptions={(opts, state) => {
                    const filtered = opts.filter(option =>
                        option.label.toLowerCase().includes(state.inputValue.toLowerCase())
                    );
                    return filtered;
                }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label="Ícones"
                        error={!!error.icon}
                        helperText={error.icon?.message}
                    />
                }
                renderValue={(value) => {
                    const IconComponent = (Icons as Record<string, React.ElementType>)[value.label];
                    return <IconComponent color='primary' />;
                }}
                renderOption={({ key, ...props }, option) => {
                    const IconComponent = (Icons as Record<string, React.ElementType>)[option.label];
                    return (
                        <Box
                            component="li"
                            key={key}
                            {...props}
                            sx={{
                                width: '20%',
                                display: 'inline-flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                minHeight: 64,
                                cursor: 'pointer',
                                border: 'none',
                                background: 'none',
                                p: 1,
                            }}
                        >
                            <IconComponent color='primary' fontSize="large" />
                            <span style={{ fontSize: 10, marginTop: 4, textAlign: 'center', wordBreak: 'break-all' }}>
                                {option.label}
                            </span>
                        </Box>
                    );
                }}
                slotProps={{
                    listbox: {
                        sx: {
                            display: 'flex',
                            flexWrap: 'wrap',
                            minWidth: 320,
                            width: '100%',
                            maxHeight: 220,
                            overflowY: 'auto',
                            p: 1,
                        }
                    },
                }}
            />
        </Box>
    );
}
