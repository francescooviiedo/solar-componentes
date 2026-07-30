'use client';

import React from 'react';
import { Box, TextField, useMediaQuery, Switch, Typography, FormLabel } from '@mui/material';
import { FilterLayout } from './FilterLayout';
import AutocompleteBuscaUnificada from './AutocompleteBuscaUnificada';
import AutocompleteFiltro from './AutocompleteFiltro';
import { FilterSchema, GenericOptionList, GenericOption } from './types';
import { useUnifiedFilter } from './useUnifiedFilter';

export type UnifiedFilterBarProps = {
  schema: FilterSchema;
  isPending?: boolean;
  disabled?: boolean;
  onSearchCallback?: () => void;
  onClearCallback?: () => void;
  onUrlUpdate?: (url: string) => void;
  topBarPrefix?: React.ReactNode;
  topBarSuffix?: React.ReactNode;
  hideSearchInput?: boolean;
  customSearchPlaceholder?: React.ReactNode;
};

export function UnifiedFilterBar({
  schema,
  isPending = false,
  disabled = false,
  onSearchCallback,
  onClearCallback,
  onUrlUpdate,
  topBarPrefix,
  topBarSuffix,
  hideSearchInput = false,
  customSearchPlaceholder,
}: Readonly<UnifiedFilterBarProps>) {
  const isMobileOrTablet = useMediaQuery("(max-width:900px)");

  const {
    activeFilters,
    activeUnificadaFilters,
    isOpen,
    setIsOpen,
    onSearch,
    onClear,
    handleFilterChange,
    handleUnificadaFilterChange
  } = useUnifiedFilter(schema, onSearchCallback, onClearCallback, onUrlUpdate);

  const unificadaOptions: GenericOptionList = [];
  schema.forEach(item => {
    if (item.inputType === 'select' && item.options) {
      item.options.forEach(opt => {
        const isActive = activeUnificadaFilters.some(f => f.type === item.urlKey && String(f.id) === String(opt.id));
        if (!isActive) {
          unificadaOptions.push({ ...opt, type: item.urlKey });
        }
      });
    }
  });

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
          {topBarPrefix}
          {schema.filter(item => item.placement === 'topBar').map(item => {
            if (item.inputType === 'switch') {
              const val = (activeFilters[item.urlKey] as boolean) || false;
              return (
                <Box key={item.urlKey} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                  <FormLabel component="legend">
                    <Typography color={val ? "warning" : 'textDisabled'}>{item.label}</Typography>
                  </FormLabel>
                  <Switch
                    value={val}
                    checked={val}
                    color="warning"
                    onChange={(e) => handleFilterChange(item.urlKey, e.target.checked)}
                  />
                </Box>
              );
            }
            return null;
          })}

          {hideSearchInput ? (
            customSearchPlaceholder
          ) : (
            <AutocompleteBuscaUnificada
              options={unificadaOptions}
              value={activeUnificadaFilters}
              onChange={(event, newValue) => handleUnificadaFilterChange(newValue)}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onClickIcon={onSearch}
              reversedAdornments={true}
              disabled={disabled}
              schema={schema}
            />
          )}
          {topBarSuffix}
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
        {schema.filter(item => item.placement === 'grid').map((field) => {
          if (field.inputType === 'select') {
            return (
              <AutocompleteFiltro
                key={field.urlKey}
                name={field.label}
                options={field.options ?? []}
                value={(activeFilters[field.urlKey] as GenericOption) || null}
                onChange={(e, newValue) => handleFilterChange(field.urlKey, newValue)}
                width={field.width}
              />
            );
          }

          if (field.inputType === 'text' || field.inputType === 'date') {
            return (
              <Box key={field.urlKey} sx={{ display: "flex", flexDirection: "column" }}>
                <Box
                  component="label"
                  htmlFor={field.urlKey}
                  sx={{ fontWeight: 700, color: "#757575", mb: 0.5 }}
                >
                  {field.label}
                </Box>
                <TextField
                  id={field.urlKey}
                  type={field.inputType}
                  size="small"
                  placeholder={field.label}
                  variant="outlined"
                  sx={{ width: field.width ?? "100%", bgcolor: "white" }}
                  onChange={(e) => handleFilterChange(field.urlKey, e.target.value)}
                  value={(activeFilters[field.urlKey] as string) ?? ""}
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
