import React from 'react';
import { Box, Typography } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export type AlertBannerProps = {
  title?: string;
  type?: 'warning' | 'info' | 'error' | 'success';
  children: React.ReactNode;
};

export function AlertBanner({ title, type = 'warning', children }: Readonly<AlertBannerProps>) {
  const getAlertStyles = () => {
    switch (type) {
      case 'warning':
        return { bg: "#FFFCE3", color: "#444444", icon: <WarningAmberIcon sx={{ color: "#444444" }} /> };
      case 'error':
        return { bg: "#FDECEA", color: "#611A15", icon: <ErrorOutlineIcon sx={{ color: "#611A15" }} /> };
      case 'success':
        return { bg: "#EDF7ED", color: "#1E4620", icon: <CheckCircleOutlineIcon sx={{ color: "#1E4620" }} /> };
      case 'info':
      default:
        return { bg: "#E5F6FD", color: "#014361", icon: <InfoOutlinedIcon sx={{ color: "#014361" }} /> };
    }
  };

  const styles = getAlertStyles();

  return (
    <Box
      sx={{
        backgroundColor: styles.bg,
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
      {styles.icon}
      <Box sx={{ flex: 1 }}>
        {title && (
          <Typography
            variant="body1"
            sx={{ fontWeight: "bold", color: styles.color, mb: "4px" }}
          >
            {title}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: "#949494", mb: 0 }}>
          {children}
        </Typography>
      </Box>
    </Box>
  );
}
