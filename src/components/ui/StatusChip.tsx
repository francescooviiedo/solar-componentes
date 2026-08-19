import React from "react";
import { Box, Chip, Tooltip, type SxProps, type Theme } from "@mui/material";

export interface StatusChipProps {
  situacao?: number | string | null;
  label?: string;
  tooltipTitle?: string;
  isFullWidth?: boolean;
  clickable?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const getSituacaoStyles = (situacao?: number | string | null, isFullWidth?: boolean) => {
  const code = situacao !== null && situacao !== undefined ? Number(situacao) : NaN;
  let color = "#FA8518";
  let bg = "#FA851815";
  let hoverBg = "#fef3c7";
  let hoverBorder = "#f59e0b";
  let hoverShadow = "rgba(251, 191, 36, 0.18)";
  let hoverIconColor = "#f59e0b";

  switch (code) {
    case 90:
      color = "#DA3737";
      bg = "#DA373715";
      hoverBg = "#fee2e2";
      hoverBorder = "#dc2626";
      hoverShadow = "rgba(239, 68, 68, 0.18)";
      hoverIconColor = "#dc2626";
      break;
    case 40:
      color = "#0D9488";
      bg = "#0D948815";
      hoverBg = "#ccfbf1";
      hoverBorder = "#0f766e";
      hoverShadow = "rgba(13, 148, 136, 0.18)";
      hoverIconColor = "#0f766e";
      break;
    case 20:
      color = "#365AD3";
      bg = "#365AD315";
      hoverBg = "#dbeafe";
      hoverBorder = "#2563eb";
      hoverShadow = "rgba(59, 130, 246, 0.18)";
      hoverIconColor = "#2563eb";
      break;
    case 30:
      color = "#23A740";
      bg = "#23A74015";
      hoverBg = "#d1fae5";
      hoverBorder = "#059669";
      hoverShadow = "rgba(16, 185, 129, 0.18)";
      hoverIconColor = "#059669";
      break;
  }

  return {
    backgroundColor: bg,
    color,
    border: `1px solid ${color}`,
    fontWeight: "bold",
    padding: isFullWidth ? "16px" : "0px",
    fontSize: "11px",
    letterSpacing: "0.1px",
    height: isFullWidth ? 26 : 18,
    transition: "box-shadow 0.2s ease, border-color 0.2s ease",
    "&:hover": {
      boxShadow: `0 0 0 3px ${hoverShadow}`,
      borderColor: hoverBorder,
      backgroundColor: hoverBg,
    },
    "& .MuiChip-icon": {
      color: hoverIconColor,
      marginLeft: "6px",
    },
    "& .MuiChip-label": {
      paddingLeft: "4px",
      paddingRight: "8px",
    },
  };
};

function getDefaultLabel(situacao?: number | string | null): string {
  const code = situacao !== null && situacao !== undefined ? Number(situacao) : NaN;
  switch (code) {
    case 90:
      return "Erro no Protocolo";
    case 10:
      return "Aguardando Análise";
    case 40:
      return "Analisados";
    case 20:
      return "Na fila para protocolo";
    case 30:
      return "Protocoladas";
    default:
      return "";
  }
}

export function StatusChip({
  situacao,
  label,
  tooltipTitle = "Situação do processo",
  isFullWidth = false,
  clickable = true,
  onClick,
  sx,
}: Readonly<StatusChipProps>) {
  const displayLabel = label ?? getDefaultLabel(situacao);
  if (!displayLabel) return null;

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        marginTop: isFullWidth ? "10px" : "5px",
        marginBottom: isFullWidth ? "10px" : "5px",
        ...sx,
      }}
    >
      <Tooltip title={tooltipTitle} arrow>
        <Chip
          label={displayLabel}
          size="small"
          variant="outlined"
          clickable={clickable && Boolean(onClick)}
          onClick={onClick}
          sx={getSituacaoStyles(situacao, isFullWidth)}
        />
      </Tooltip>
    </Box>
  );
}

export const AguardandoAnaliseChip = StatusChip;

export default StatusChip;
