import React from 'react';
import { Chip, ChipProps } from '@mui/material';

export type StatusType = 'sucesso' | 'pendente' | 'erro' | 'info';

export interface SolarStatusBadgeProps {
  status: StatusType;
  label?: string;
  variant?: ChipProps['variant'];
}

const statusConfig: Record<StatusType, { color: 'success' | 'warning' | 'error' | 'info'; defaultLabel: string }> = {
  sucesso: { color: 'success', defaultLabel: 'Concluído' },
  pendente: { color: 'warning', defaultLabel: 'Pendente' },
  erro: { color: 'error', defaultLabel: 'Erro' },
  info: { color: 'info', defaultLabel: 'Informação' },
};

export function SolarStatusBadge({ status, label, variant = 'filled' }: SolarStatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.info;

  return (
    <Chip
      label={label || config.defaultLabel}
      color={config.color}
      variant={variant}
      sx={{
        fontWeight: 600,
        px: 1,
        borderRadius: 2,
      }}
    />
  );
}
