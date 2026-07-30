'use client';

import React, { SyntheticEvent } from 'react';
import { Box, TextField, useMediaQuery } from '@mui/material';
import { FilterLayout } from './FilterLayout';
import AutocompleteBuscaUnificada from './AutocompleteBuscaUnificada';
import AutocompleteFiltro from './AutocompleteFiltro';
import { FilterFieldConfig, GenericOptionList, GenericOption } from './types';

export type GenericFilterBarProps = {
  // Config
  fields: FilterFieldConfig[];
  unificadaOptions: GenericOptionList;

  // State
  activeGridFilters: Record<string, GenericOption | string | null>;
  activeUnificadaFilters: GenericOptionList;
  isOpen: boolean;
  isPending?: boolean;
  disabled?: boolean;
  topBarExtra?: React.ReactNode;

  // Handlers
  setIsOpen: (isOpen: boolean) => void;
  onSearch: () => void;
  onClear: () => void;
  onGridFilterChange: (fieldId: string, value: GenericOption | string | null) => void;
  onUnificadaFilterChange: (newValue: GenericOptionList) => void;
  onUnificadaTextChange?: (text: string) => void;
};

export function GenericFilterBar({
  fields,
  unificadaOptions,
  activeGridFilters,
  activeUnificadaFilters,
  isOpen,
  isPending = false,
  disabled = false,
  topBarExtra,
  setIsOpen,
  onSearch,
  onClear,
  onGridFilterChange,
  onUnificadaFilterChange,
  onUnificadaTextChange,
}: Readonly<GenericFilterBarProps>) {
  const isMobileOrTablet = useMediaQuery("(max-width:900px)");

  return (
    <FilterLayout
      isOpen={isOpen}
      isPending={isPending}
      onSearch={onSearch}
      onClear={onClear}
      onClose={() => setIsOpen(false)}
      isAbsolute={true}
      containerGap="24px"
      searchUnificada={
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "calc(100% + 48px)",
            mx: "-24px",
            mt: "-24px",
            gap: 2,
            bgcolor: "#D8D8D8",
            padding: "24px",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            flexDirection: isMobileOrTablet ? "column" : "row",
            boxSizing: "border-box",
          }}
        >
          {topBarExtra}
          
          <AutocompleteBuscaUnificada
            options={unificadaOptions}
            value={activeUnificadaFilters}
            onChange={(e, newValue) => onUnificadaFilterChange(newValue)}
            onChangeText={(e) => {
               if (onUnificadaTextChange) onUnificadaTextChange(e.target.value);
            }}
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            onClickIcon={onSearch}
            reversedAdornments={true}
            disabled={disabled}
          />
        </Box>
      }
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
          },
          rowGap: "24px",
          columnGap: "24px",
          width: "100%",
        }}
      >
        {fields.map((field) => {
          if (field.type === 'select') {
            return (
              <AutocompleteFiltro
                key={field.id}
                name={field.label}
                options={field.options ?? []}
                value={(activeGridFilters[field.id] as GenericOption) || null}
                onChange={(e, newValue) => onGridFilterChange(field.id, newValue)}
                width={field.width}
              />
            );
          }

          if (field.type === 'text' || field.type === 'date') {
            return (
              <Box key={field.id} sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  component="label"
                  htmlFor={field.id}
                  sx={{ fontWeight: 700, color: "#757575", mb: 0.5 }}
                >
                  {field.label}
                </Box>
                <TextField
                  id={field.id}
                  type={field.type}
                  size="small"
                  placeholder={field.label}
                  variant="outlined"
                  sx={{ width: field.width ?? "100%", bgcolor: "white" }}
                  onChange={(e) => onGridFilterChange(field.id, e.target.value)}
                  value={(activeGridFilters[field.id] as string) ?? ""}
                />
              </Box>
            );
          }
          
          return null;
        })}
      </Box>
    </FilterLayout>
  );
}
