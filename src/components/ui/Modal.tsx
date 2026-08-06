"use client";

import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Modal as MuiModal,
  Stack,
  Typography,
  IconButton,
  Theme,
  SxProps,
} from "@mui/material";
import React from "react";

type Props = Readonly<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
  title: string | React.ReactNode;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isDisabledConfirm?: boolean;
  isLoading?: boolean;
  warningMessage?: string;
  maxWidth?: number | string | { xs?: number | string; sm?: number | string; md?: number | string; lg?: number | string; xl?: number | string };
  maxHeight?: number | string | { xs?: number | string; sm?: number | string; md?: number | string; lg?: number | string; xl?: number | string };
  cancelButtonStyle?: SxProps<Theme>;
  confirmButtonStyle?: SxProps<Theme>;
  footerLeft?: React.ReactNode;
}>;

export function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  children,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isDisabledConfirm = false,
  isLoading = false,
  maxWidth,
  maxHeight,
  footerLeft,
}: Readonly<Props>) {
  return (
    <MuiModal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(245, 245, 245, 0.66)",
          },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { xs: "auto", sm: "50%" },
          bottom: { xs: 0, sm: "auto" },
          left: { xs: 0, sm: "50%" },
          right: { xs: 0, sm: "auto" },
          transform: { xs: "none", sm: "translate(-50%, -50%)" },
          width: "100%",
          maxWidth: maxWidth ?? { xs: "100%", sm: "650px" },
          maxHeight: maxHeight ?? { xs: "90vh", sm: "80vh" },
          bgcolor: "white",
          borderRadius: { xs: "16px 16px 0 0", sm: "4px" }, // Standardized radius
          border: "1px solid",
          borderColor: "grey.300",
          overflow: "auto",
          boxShadow:
            "0px 12px 32px rgba(0, 0, 0, 0.16), 0px 4px 12px rgba(0, 0, 0, 0.12)",
        }}
      >
        <form onSubmit={onSubmit}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: "rgba(32, 120, 64, 0.2)",
              py: '16px',
              px: '24px',
            }}
          >
            <Typography
              id="modal-title"
              sx={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#616161",
              }}
            >
              {title}
            </Typography>
            <IconButton onClick={onClose} size="small" sx={{ color: "grey.500" }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Box sx={{ p: '24px 24px 0 24px' }}>
            {children}
          </Box>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent={footerLeft ? "space-between" : "flex-end"}
            gap={3}
            p={'24px'}
            sx={{ borderTop: 1, borderColor: "divider" }}
          >
            {footerLeft && <Box>{footerLeft}</Box>}
            <Stack direction="row" alignItems="center" gap={3}>
            {onSubmit && (
              <Button
                variant="contained"
                onClick={onSubmit}
                loading={isLoading}
                disabled={isDisabledConfirm}
                sx={{
                  borderRadius: 2,
                  fontSize: "16px",
                  color: "white",
                }}
              >
                {confirmText}
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="contained"
              sx={{
                borderRadius: 2,
                fontSize: "16px",
                backgroundColor: "#757575",
                borderColor: "grey.600",
                color: "white",
              }}
            >
              {cancelText}
            </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </MuiModal>
  );
}
