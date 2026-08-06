"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ConfirmationDialogProps = {
  isOpen: boolean;
  title: string;
  message: string | React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  isConfirmColorError?: boolean;
  onConfirm: () => void | Promise<void>;
  onClose: () => void;
  isLoading?: boolean;
};

export function ConfirmationDialog({
  isOpen,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isConfirmColorError = false,
  onConfirm,
  onClose,
  isLoading = false,
}: Readonly<ConfirmationDialogProps>) {
  return (
    <Dialog
      open={isOpen}
      onClose={isLoading ? undefined : onClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 2,
          boxShadow: "0px 12px 32px rgba(0, 0, 0, 0.16)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          bgcolor: isConfirmColorError ? "rgba(211, 47, 47, 0.08)" : "rgba(32, 120, 64, 0.08)",
          py: "16px",
          px: "24px",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: isConfirmColorError ? "error.main" : "text.primary",
          }}
        >
          {title}
        </Typography>
        <IconButton onClick={onClose} size="small" sx={{ color: "grey.500" }} disabled={isLoading}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: "24px" }}>
        {typeof message === "string" ? (
          <DialogContentText sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
            {message}
          </DialogContentText>
        ) : (
          message
        )}
      </DialogContent>

      <DialogActions sx={{ px: "24px", pb: "24px", gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={isLoading}
          sx={{
            borderRadius: 2,
            borderColor: "grey.400",
            color: "grey.700",
            "&:hover": {
              borderColor: "grey.600",
              backgroundColor: "grey.50",
            },
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
          color={isConfirmColorError ? "error" : "primary"}
          sx={{
            borderRadius: 2,
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
