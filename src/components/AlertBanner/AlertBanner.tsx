import React from 'react';
import { Box, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

export type AlertBannerProps = {
  title?: string;
  message?: React.ReactNode;
  children?: React.ReactNode;
  variant?: 'warning' | 'info' | 'success' | 'error';
  bgColor?: string;
  icon?: React.ReactNode;
};

export function AlertBanner({
  title = "Atenção",
  message,
  children,
  variant = 'warning',
  bgColor,
  icon,
}: Readonly<AlertBannerProps>) {
  const defaultColors: Record<string, { bg: string; text: string; iconColor: string }> = {
    warning: { bg: "#FFFCE3", text: "#444444", iconColor: "#444444" },
    info: { bg: "#EBF8FF", text: "#2B6CB0", iconColor: "#2B6CB0" },
    success: { bg: "#F0FFF4", text: "#2F855A", iconColor: "#2F855A" },
    error: { bg: "#FFF5F5", text: "#C53030", iconColor: "#C53030" },
  };

  const currentTheme = defaultColors[variant] || defaultColors.warning;
  const finalBgColor = bgColor || currentTheme.bg;

  const defaultIcons: Record<string, React.ReactNode> = {
    warning: <WarningAmberIcon sx={{ color: currentTheme.iconColor }} />,
    info: <InfoOutlinedIcon sx={{ color: currentTheme.iconColor }} />,
    success: <CheckCircleOutlineIcon sx={{ color: currentTheme.iconColor }} />,
    error: <ErrorOutlineIcon sx={{ color: currentTheme.iconColor }} />,
  };

  const finalIcon = icon !== undefined ? icon : defaultIcons[variant];

  return (
    <Box
      sx={{
        backgroundColor: finalBgColor,
        borderRadius: "10px",
        padding: "24px",
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        width: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {finalIcon}
      <Box sx={{ flex: 1 }}>
        {title && (
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: currentTheme.text, mb: "4px" }}
          >
            {title}
          </Typography>
        )}
        {message && (
          <Typography variant="body2" sx={{ color: "#949494", mb: children ? 2 : 0 }}>
            {message}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
}

export function SearchAlert() {
  return (
    <AlertBanner
      title="Atenção"
      message="ALERTA: Esta página foi atualizada. Agora são exibidos os avisos (comunicações processuais) de todas as Defensorias em que você está vinculado. Para visualizar os avisos filtrados pelo seu nome, como ocorria antes, clique em Avisos Atribuídos a Mim."
    />
  );
}

export default AlertBanner;
